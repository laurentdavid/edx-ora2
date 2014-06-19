.. _PA Accès aux Évaluations et aux Statistiques Étudiants:

##########################################################
Accèder aux Évaluations et aux Statistiques des Étudiants:
##########################################################

Après que votre évaluation à question ouverte (Open Response Assesment) ait été mis en ligne, vous pouvez accéder aux informations concernant le nombre d'étudiant étant à chaque étapes de l'évaluation ou les performances individuelles de chaque étudiant. Cette information est disponible dans la section **Course Staff Information** à la fin de chaque évaluation. Pour y accéder, ouvrez l'évaluation dans le cours, descendez dans la page à la fin de l'évaluation et cliquez sur la bannière noire **Course Staff Information**.

.. image:: /Images/PA_CourseStaffInfo_Collapsed.png
   :alt: La bannière noire 'Course Staff Information' au bas de chaque évaluation

.. _PA Voir les Statistiques des Étapes Individuelles:

************************************************
Voir les Statistiques des Étapes Individuelles
************************************************

Vous pouvez voir le nombre d'étudiant qui ont complété, ou sont en train de compléter, les étapes suivantes:

* Les réponses soumises.
* Les évaluation par les pairs complétées.
* Les réponses en attente d'évaluation ou de notation.
* Les auto-évaluations complétées.
* Les personnes qui ont complété toutes les étapes. 

Pour trouver cette information, ouvrez l'évaluation dans le cours, descendez dans la page à la fin de l'évaluation et cliquez sur **Course Staff Information**

La section **Course Staff Information** se déroule, et vous pouvez voir le nombre d'étudiants qui sont en train de travailler (mais qui n'ont pas complété) chaque étape du problème.

.. image:: /Images/PA_CourseStaffInfo_Expanded.png
   :alt: La section Course Staff Information déroulée, montrant l'état du problème.

.. _Accéder aux Informations pour un Étudiant Donné:

***********************************************
Accéder aux Informations pour un Étudiant Donné
***********************************************

Vous pouvez accéder aux informations à propos des performances d'un étudiant donné sur une évaluation par les pairs, ceci inclus:

* La réponse de l'étudiant
* Les réponses à l'évaluation par les pairs d'autres étudiant sur la réponse de l'étudiant, ceci inclut les retours sur chaque critère individuel et la réponse globale.
* L'évaluation par les pairs que l'étudiant a réalisé sur d'autres étudiants, ceci inclut les retours sur les critères individuels et sur les réponses globales.
* L'auto-évaluation de l'étudiant.

Dans l'example suivant, vous pouvez voir la réponse de l'étudiant. La réponse a reçu une évaluation par les pairs, et l'étudiant a complété une évaluation par les pairs sur un autre étudiant. L'étudiant a aussi complété une auto-évaluation.

.. image:: /Images/PA_SpecificStudent.png
   :width: 500
   :alt: Rapport montrant une réponse d'un étudiant.

Pour un example qui montre une réponse d'un étudiant avec plus d'évaluations, voir :ref:`Access Student Information`.

Pour accéder aux information d'un étudiant donné, il y a deux étapes:

#. Déterminer l'identifiant anonymisé, spécificque au cours, de chaque étudiant.
#. Accéder aux information de cette étudiant.

=======================================================================
Déterminer l'identifiant anonymisé, spécificque au cours, de l'étudiant
=======================================================================

Pour déterminer l'identifiant anonymisé, spécificque au cours, de l'étudiant, vous avez besoin de deux feuilles de calcul au format .CSV pris sur les tableaux de bord de l'enseignant: la liste des notes (**<course name>_grade_report_<datetime>.csv**) et la liste des identifiants étudiants anonymisés (**<course name>-anon-ids.csv**).

#. Dans le LMS cliquez sur le lien **Instructor**
#. Dans le tableau de bord enseignant cliquez sur **Data Download**
#. Sur la page de **Data Download**, dans la section **Data Download**, cliquez ensuite sur **Get Student Anonymized IDs CSV**.  Une feuilles de calcul nommée **<course name>-anon-ids.csv** se télécharge automatiquement. Cliquez pour ouvrir la feuille.
#. Descendez sur la section **Reports**, et ensuite cliquez sur **Generate Grade Report**. 

   Le système commencera à générer les rapports de notes. Quand c'est fini, un lien vers le rapport des notes va apparaître dans la liste ci dessous **Reports Available for Download**.

   .. note:: Générer un rapport des notes pour un grand nombre d'étudiants inscrits peut prendres plusieurs heures.

5. Quand le lien sur le rapport des notes apparaît dans la liste **Reports Available for Download** list, cliquez pour ouvrir le document.
#. Quand vous avez les deux feuilles ouvertes, regardez **<course name>_grade_report_<datetime>.csv** spreadsheet. Localisez l'étudiant dont vous voulez le nom d'utilisateur ou l'adresse e-mail. Prenez note du nombre dans la colonne ID (colonne A) pour cet étudiant. Dans l'example suivant, l'ID de l'étudiant pour l'adresse email  ``amydorrit@example.com`` (nom d'utilisateur ``lildorrit``) est ``18557``.

   .. image:: /Images/PA_grade_report.png
      :width: 500
      :alt: Feuille de calcul listant les étudiants qui sont inscrits et leur notes

7. Allez sur la feuille **<course name>-anon-ids.csv**, localisez l'identifiant utilisateur que vous avez noté dans l'étape 6 et copiez la valeur dans la colonne "Course Specific Anonymized user ID" column (**colonne C**) pour l'utilisateur. La valeur de la colonne C est l'identifiant utilisateur pour ce cours. Dans cet example suivant l'identifiant utilisateur pour l'étudiant  ``18557`` est ``ofouw6265242gedud8w82g16qshsid87``.

   .. image:: /Images/PA_anon_ids.png
      :width: 500
      :alt: Feuille de calcul listant les identifants anonymisés des étudiants

   .. note:: Ne copiez pas les valeurs de la colonne B. Vous avez besoin de l'identifiant anonymisé spécifique au cours de la **colonne C**.

.. _Accéder aux Informations Étudiants:

=======================================
Accéder aux Informations Étudiants
=======================================
#. Dans le LMS, allez sur l'évaluation par les pairs que vous voulez voir.

#. Allez jusqu'a la fin du problème, et cliquez sur la bannière noire **Course Staff Information**.
#. Allez jusqu'a la boite **Get Student Info**, collez l'identifiant anonymisé dans la boite, et cliquez **Submit**.

L'information de l'étudiant apparaît en dessous de la boite **Get Student Info**.

L'example suivant montre:

* La réponse de l'étudiant 
* Les deux réponses aux évaluations par les pairs.
* Les deux réponses de l'étudiant aux évaluation par les pairs.
* L'auto-évaluation de l'étudiant.

For a larger view, click the image so that it opens by itself in the browser window, and then click anywhere on the image that opens.

.. image:: /Images/PA_SpecificStudent_long.png
   :width: 250
   :alt: Rapport montrant l'information à propos d'une réponse d'un étudiant.
