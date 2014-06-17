/**
 Interface for editing view in Studio.
 The constructor initializes the DOM for editing.

 Args:
    runtime (Runtime): an XBlock runtime instance.
    element (DOM element): The DOM element representing this XBlock.
    server (OpenAssessment.Server): The interface to the XBlock server.

 Returns:
    OpenAssessment.StudioView
 **/

OpenAssessment.StudioView = function(runtime, element, server) {
    this.runtime = runtime;
    this.server = server;

    // Initialize the code box

    live_element = $(element)

    this.promptBox = live_element.find('.openassessment-prompt-editor').first().get(0);

    this.rubricXmlBox = CodeMirror.fromTextArea(
        live_element.find('.openassessment-rubric-editor').first().get(0),
        {mode: "xml", lineNumbers: true, lineWrapping: true}
    );

    this.titleField = live_element.find('.openassessment-title-editor').first().get(0);

    this.submissionStartField = live_element.find('.openassessment-submission-start-editor').first().get(0);

    this.submissionDueField = live_element.find('.openassessment-submission-due-editor').first().get(0);

    // Finds our boolean checkboxes that indicate the assessment definition
    this.hasPeer = live_element.find('#include-peer-assessment');
    this.hasSelf = live_element.find('#include-self-assessment');
    this.hasAI = live_element.find('#include-ai-assessment');
    this.hasTraining = live_element.find('#include-student-training');

    this.peerMustGrade = live_element.find('#peer-assessment-must-grade');
    this.peerGradedBy = live_element.find('#peer-assessment-graded-by');
    this.peerStart = live_element.find('#peer-assessment-start-date');
    this.peerDue = live_element.find('#peer-assessment-due-date');

    this.selfStart = live_element.find('#self-assessment-start-date');
    this.selfDue = live_element.find('#self-assessment-due-date');

    this.aiTrainingExamplesCodeBox = CodeMirror.fromTextArea(
        live_element.find('#ai-training-examples').get(0),
        {mode: "xml", lineNumbers: true, lineWrapping: true}
    );

    this.studentTrainingExamplesCodeBox = CodeMirror.fromTextArea(
        live_element.find('#student-training-examples').get(0),
        {mode: "xml", lineNumbers: true, lineWrapping: true}
    );

    // Install click handlers
    var view = this;
    live_element.find('.openassessment-save-button').click(
        function (eventData) {
            view.save();
        });

    live_element.find('.openassessment-cancel-button').click(
        function (eventData) {
            view.cancel();
        });

    live_element.find('.openassessment-editor-content-and-tabs').tabs({
        activate: function (event, ui){
            view.rubricXmlBox.refresh();
        }
    });

    live_element.find('#include-peer-assessment').change(function () {
        if (this.checked){
            $("#peer-assessment-settings-editor", live_element).fadeIn();
        } else {
            $("#peer-assessment-settings-editor", live_element).fadeOut();
        }
    });

    live_element.find('#include-self-assessment').change(function () {
        if (this.checked){
            $("#self-assessment-settings-editor", live_element).fadeIn();
        } else {
            $("#self-assessment-settings-editor", live_element).fadeOut();
        }
    });

    live_element.find('#include-ai-assessment').change(function () {
        if (this.checked){
            $("#ai-assessment-settings-editor", live_element).fadeIn();
        } else {
            $("#ai-assessment-settings-editor", live_element).fadeOut();
        }
    });

    live_element.find('#include-student-training').change(function () {
        if (this.checked){
            $("#student-training-settings-editor", live_element).fadeIn();
        } else {
            $("#student-training-settings-editor", live_element).fadeOut();
        }
    });
};

OpenAssessment.StudioView.prototype = {

    /**
     Load the XBlock XML definition from the server and display it in the view.
     **/
    load: function () {
        var view = this;
        this.server.loadEditorContext().done(
            function (prompt, rubricXml, title, sub_start, sub_due, assessments) {
                view.rubricXmlBox.setValue(rubricXml);
                view.submissionStartField.value = sub_start;
                view.submissionDueField.value = sub_due;
                view.promptBox.value = prompt;
                view.titleField.value = title;
                for (i = 0; i < assessments.length; i++) {
                    var assessment = assessments[i];
                    if (assessment.name == 'peer-assessment') {
                        view.peerMustGrade.value = assessment.must_grade;
                        view.peerGradedBy.value = assessment.graded_by;
                        view.peerStart = assessment.start;
                        view.peerDue = assessment.due;
                    } else if (assessment.name == 'self-assessment') {
                        view.selfStart = assessment.start;
                        view.selfDue = assessment.due;
                    } else if (assessment.name == 'example-based-assessment') {
                        view.aiTrainingExamplesCodeBox.setValue(assessment.examples);
                    } else if (assessment.name == 'student-training') {
                        view.studentTrainingExamplesCodeBox.setValue(assessment.examples);
                    } else {

                    }
                }
            }).fail(function (msg) {
                view.showError(msg);
            }
        );
    },

    /**
     Save the problem's XML definition to the server.
     If the problem has been released, make the user confirm the save.
     **/
    save: function () {
        var view = this;

        // Check whether the problem has been released; if not,
        // warn the user and allow them to cancel.
        this.server.checkReleased().done(
            function (isReleased) {
                if (isReleased) {
                    view.confirmPostReleaseUpdate($.proxy(view.updateEditorContext, view));
                }
                else {
                    view.updateEditorContext();
                }
            }
        ).fail(function (errMsg) {
                view.showError(msg);
            });
    },

    /**
     Make the user confirm that he/she wants to update a problem
     that has already been released.

     Args:
        onConfirm (function): A function that accepts no arguments,
            executed if the user confirms the update.
     **/
    confirmPostReleaseUpdate: function (onConfirm) {
        var msg = gettext("This problem has already been released. Any changes will apply only to future assessments.");
        // TODO: classier confirm dialog
        if (confirm(msg)) {
            onConfirm();
        }
    },

    /**
     Save the updated XML definition to the server.
     **/
    updateEditorContext: function () {
        // Notify the client-side runtime that we are starting
        // to save so it can show the "Saving..." notification
        this.runtime.notify('save', {state: 'start'});

        // Send the updated XML to the server
        var prompt = this.promptBox.value;
        var rubricXml = this.rubricXmlBox.getValue();
        var title = this.titleField.value;
        var sub_start = this.submissionStartField.value;
        var sub_due = this.submissionDueField.value;

        var assessments = [];

        if (this.hasPeer.checked) {
            assessments[assessments.length] = {
                "name": "peer-assessment",
                "start": this.peerStart.value,
                "due": this.peerDue.value,
                "must_grade": this.peerMustGrade.value,
                "graded_by": this.peerGradedBy.value
            };
        }

        if (this.hasSelf.checked) {
            assessments[assessments.length] = {
                "name": "self-assessment",
                "start": this.selfStart.value,
                "due": this.selfDue.value
            };
        }

        if (this.hasAI.checked) {
            assessments[assessments.length] = {
                "name": "example-based-assessment",
                "algorithm_id": "ease",
                "examples": this.aiTrainingExamplesCodeBox.getValue()
            };
        }

        if (this.hasTraining.checked){
            assessments[assessments.length] = {
                "name": "student-training",
                "examples": this.studentTrainingExamplesCodeBox.getValue()
            };
        }


        var view = this;
        this.server.updateEditorContext(prompt, rubricXml, title, sub_start, sub_due, assessments).done(function () {
            // Notify the client-side runtime that we finished saving
            // so it can hide the "Saving..." notification.
            view.runtime.notify('save', {state: 'end'});

            // Reload the XML definition in the editor
            view.load();
        }).fail(function (msg) {
            view.showError(msg);
        });
    },

    /**
     Cancel editing.
     **/
    cancel: function () {
        // Notify the client-side runtime so it will close the editing modal.
        this.runtime.notify('cancel', {});
    },

    /**
     Display an error message to the user.

     Args:
        errorMsg (string): The error message to display.
     **/
    showError: function (errorMsg) {
        this.runtime.notify('error', {msg: errorMsg});
    }
};


/* XBlock entry point for Studio view */
function OpenAssessmentEditor(runtime, element) {

    /**
     Initialize the editing interface on page load.
     **/
    $(function ($) {
        var server = new OpenAssessment.Server(runtime, element);
        var view = new OpenAssessment.StudioView(runtime, element, server);
        view.load();
    });
};