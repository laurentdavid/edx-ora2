"""
TODO
"""
import pickle


WORD_PATTERNS = [
    (r'^-?[0-9]+(.[0-9]+)?$', 'CD'),
    (r'.*ould$', 'MD'),
    (r'.*ing$', 'VBG'),
    (r'.*ed$', 'VBD'),
    (r'.*ness$', 'NN'),
    (r'.*ment$', 'NN'),
    (r'.*ful$', 'JJ'),
    (r'.*ious$', 'JJ'),
    (r'.*ble$', 'JJ'),
    (r'.*ic$', 'JJ'),
    (r'.*ive$', 'JJ'),
    (r'.*ic$', 'JJ'),
    (r'.*est$', 'JJ'),
    (r'^a$', 'PREP'),
    (r'.*s$', 'NNS'),
    (r'.*', 'NN')
]


def tokenize_and_tag_pos(cls, text):
    """
    Tokenize words and tag parts of speech.

    Args:
        text (unicode): The text to tokenize and tag.

    Returns:
        list of part-of-speech tokens

    """
    import nltk
    tagger = nltk.tag.RegexpTagger(cls.WORD_PATTERNS)
    return [
        tagged[1] if tagged[1] is not None else '?'
        for tagged in tagger.tag(nltk.word_tokenize(text))
    ]


class ClassyAIAlgorithm(AIAlgorithm):
    """
    A basic scoring algorithm that uses:
        * TF-IDF for text feature extraction (scikit-learn)
        * Stop-word removal for English (scikit-learn)
        * Word tokenization (nltk)
        * Regex part-of-speech tagging (nltk)
        * Support vector machine for supervised learning and classification (scikit-learn)

    The algorithm is designed to be fast (especially for grading) and accurate.

    """
    VERSION = "0.0.1"

    @classmethod
    def train_classifier(self, examples):
        """
        Train a classifier based on example essays and scores.

        Args:
            examples (list of AIAlgorithm.ExampleEssay): Example essays and scores.

        Returns:
            JSON-serializable: The trained classifier.  This MUST be JSON-serializable.

        Raises:
            TrainingError: The classifier could not be trained successfully.

        """
        import sklearn
        import numpy
        import scipy
        import nltk
        pipeline = sklearn.pipeline.Pipeline([
            ('text-features', sklearn.pipeline.FeatureUnion([
                ('tfid', sklearn.feature_extraction.text.TfidfVectorizer(
                    min_df=1, ngram_range=(1, 2), stop_words='english'
                )),
                ('pos', sklearn.feature_extraction.text.CountVectorizer(
                    tokenizer=tokenize_and_tag_pos, ngram_range=(1, 2)
                )),
            ])),
            ('svc', sklearn.svm.SVC())
        ])
        transformed = sklearn.pipeline.Pipeline.fit_transform(
            [example.text for example in examples],
            [example.score for example in examples]
        )
        params = {'svc__C': [10.0 ** power for power in range(-2, 5)]}
        grid_search = sklearn.grid_search.GridSearchCV(pipeline, param_grid=params)
        grid_search.fit(transformed, [example.score for example in examples])
        return {
            'pipeline': pickle.dumps(grid_search.best_estimator_),
            'algorithm-version': self.VERSION,
            'sklearn-version': sklearn.__version__,
            'scipy-version': scipy.__version__,
            'numpy-version': numpy.__version__,
            'nltk-version': nltk.__version__,
        }

    def score(self, text, classifier):
        """
        Score an essay using a classifier.

        Args:
            text (unicode): The text to classify.
            classifier (JSON-serializable): A classifier, using the same format
                as `train_classifier()`.

        Raises:
            InvalidClassifier: The provided classifier cannot be used by this algorithm.
            ScoreError: An error occurred while scoring.

        """
        pipeline = pickle.loads(classifier['pipeline'])
        return pipeline.predict([text])[0]
