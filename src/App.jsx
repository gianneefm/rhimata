import { useMemo, useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, X } from 'lucide-react';


const VERB_DATA = [
  {id: 1, present: 'αγαλλιάζω', future: 'θα αγαλλιάσω', aorist: 'αγαλλίασα', imperative: 'αγαλλίασε / αγαλλιάστε', translationEN: 'rejoice', translationRU: 'ликовать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 2, present: 'αγανακτώ', future: 'θα αγανακτήσω', aorist: 'αγανάκτησα', imperative: 'αγανάκτησε / αγανακτήστε', translationEN: 'be indignant', translationRU: 'возмущаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 3, present: 'αγαπώ', future: 'θα αγαπήσω', aorist: 'αγάπησα', imperative: 'αγάπησε / αγαπήστε', translationEN: 'love', translationRU: 'любить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 4, present: 'αγγίζω', future: 'θα αγγίξω', aorist: 'άγγιξα', imperative: 'άγγιξε / αγγίξτε', translationEN: 'touch', translationRU: 'касаться, трогать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 5, present: 'αγιάζω', future: 'θα αγιάσω', aorist: 'αγίασα', imperative: 'αγίασε / αγιάστε', translationEN: 'sanctify', translationRU: 'освящать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 6, present: 'αγκαλιάζω', future: 'θα αγκαλιάσω', aorist: 'αγκάλιασα', imperative: 'αγκάλιασε / αγκαλιάστε', translationEN: 'hug', translationRU: 'обнимать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 7, present: 'αγκομαχώ', future: 'θα αγκομαχήσω', aorist: 'αγκομάχησα', imperative: 'αγκομάχησε / αγκομαχήστε', translationEN: 'pant, gasp', translationRU: 'пыхтеть, задыхаться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 8, present: 'αγκυροβολώ', future: 'θα αγκυροβολήσω', aorist: 'αγκυροβόλησα', imperative: 'αγκυροβόλησε / αγκυροβολήστε', translationEN: 'anchor, moor', translationRU: 'становиться на якорь', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 9, present: 'αγνοώ', future: 'θα αγνοήσω', aorist: 'αγνόησα', imperative: 'αγνόησε / αγνοήστε', translationEN: 'ignore', translationRU: 'игнорировать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 10, present: 'αγοράζω', future: 'θα αγοράσω', aorist: 'αγόρασα', imperative: 'αγόρασε / αγοράστε', translationEN: 'buy', translationRU: 'покупать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 11, present: 'αγοραπωλώ', future: 'θα αγοραπωλήσω', aorist: 'αγοραπώλησα', imperative: 'αγοραπώλησε / αγοραπωλήστε', translationEN: 'buy and sell', translationRU: 'торговать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 12, present: 'αγχώνομαι', future: 'θα αγχωθώ', aorist: 'αγχώθηκα', imperative: 'αγχώσου / αγχωθείτε', translationEN: 'get stressed', translationRU: 'тревожиться, нервничать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 13, present: 'αγωνίζομαι', future: 'θα αγωνιστώ', aorist: 'αγωνίστηκα', imperative: 'αγωνίσου / αγωνιστείτε', translationEN: 'fight, struggle', translationRU: 'бороться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 14, present: 'αγωνιώ', future: 'θα αγωνιάσω', aorist: 'αγωνίασα', imperative: 'αγωνίασε / αγωνιάστε', translationEN: 'be anxious, agonize', translationRU: 'тревожиться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 15, present: 'αδειάζω', future: 'θα αδειάσω', aorist: 'άδειασα', imperative: 'άδειασε / αδειάστε', translationEN: 'empty', translationRU: 'опустошать, освобождать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 16, present: 'αδικώ', future: 'θα αδικήσω', aorist: 'αδίκησα', imperative: 'αδίκησε / αδικήστε', translationEN: 'wrong, treat unfairly', translationRU: 'обижать, поступать несправедливо', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 17, present: 'αδυνατίζω', future: 'θα αδυνατίσω', aorist: 'αδυνάτισα', imperative: 'αδυνάτισε / αδυνατίστε', translationEN: 'lose weight', translationRU: 'худеть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 18, present: 'αερίζω', future: 'θα αερίσω', aorist: 'αέρισα', imperative: 'αέρισε / αερίστε', translationEN: 'ventilate, air', translationRU: 'проветривать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 19, present: 'αηδιάζω', future: 'θα αηδιάσω', aorist: 'αηδίασα', imperative: 'αηδίασε / αηδιάστε', translationEN: 'disgust', translationRU: 'вызывать отвращение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 20, present: 'αθετώ', future: 'θα αθετήσω', aorist: 'αθέτησα', imperative: 'αθέτησε / αθετήστε', translationEN: 'break (a promise)', translationRU: 'нарушать (обещание)', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 21, present: 'αθλούμαι', future: 'θα αθληθώ', aorist: 'αθλήθηκα', imperative: 'αθλήσου / αθληθείτε', translationEN: 'do sport', translationRU: 'заниматься спортом', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 22, present: 'αθροίζω', future: 'θα αθροίσω', aorist: 'άθροισα', imperative: 'άθροισε / αθροίστε', translationEN: 'add up', translationRU: 'складывать, суммировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 23, present: 'αθωώνω', future: 'θα αθωώσω', aorist: 'αθώωσα', imperative: 'αθώωσε / αθωώστε', translationEN: 'acquit', translationRU: 'оправдывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 24, present: 'αιμορραγώ', future: 'θα αιμορραγήσω', aorist: 'αιμορράγησα', imperative: 'αιμορράγησε / αιμορραγήστε', translationEN: 'bleed (haemorrhage)', translationRU: 'истекать кровью', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 25, present: 'αισθάνομαι', future: 'θα αισθανθώ', aorist: 'αισθάνθηκα', imperative: 'αισθάνσου / αισθανθείτε', translationEN: 'feel', translationRU: 'чувствовать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 26, present: 'αισιοδοξώ', future: 'θα αισιοδοξήσω', aorist: 'αισιοδόξησα', imperative: 'αισιοδόξησε / αισιοδοξήστε', translationEN: 'be optimistic', translationRU: 'быть оптимистом', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 27, present: 'αιχμαλωτίζω', future: 'θα αιχμαλωτίσω', aorist: 'αιχμαλώτισα', imperative: 'αιχμαλώτισε / αιχμαλωτίστε', translationEN: 'capture', translationRU: 'брать в плен, пленять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 28, present: 'ακινητοποιώ', future: 'θα ακινητοποιήσω', aorist: 'ακινητοποίησα', imperative: 'ακινητοποίησε / ακινητοποιήστε', translationEN: 'immobilize', translationRU: 'обездвиживать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 29, present: 'ακμάζω', future: 'θα ακμάσω', aorist: 'άκμασα', imperative: 'άκμασε / ακμάστε', translationEN: 'flourish', translationRU: 'расцветать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 30, present: 'ακολουθώ', future: 'θα ακολουθήσω', aorist: 'ακολούθησα', imperative: 'ακολούθησε / ακολουθήστε', translationEN: 'follow', translationRU: 'следовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 31, present: 'ακουμπώ', future: 'θα ακουμπήσω', aorist: 'ακούμπησα', imperative: 'ακούμπησε / ακουμπήστε', translationEN: 'lean, put down, touch', translationRU: 'прислонять, касаться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 32, present: 'ακούω', future: 'θα ακούσω', aorist: 'άκουσα', imperative: 'άκουσε / ακούστε', translationEN: 'hear, listen', translationRU: 'слышать, слушать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 33, present: 'ακτινοβολώ', future: 'θα ακτινοβολήσω', aorist: 'ακτινοβόλησα', imperative: 'ακτινοβόλησε / ακτινοβολήστε', translationEN: 'radiate', translationRU: 'излучать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 34, present: 'ακτινογραφώ', future: 'θα ακτινογραφήσω', aorist: 'ακτινογράφησα', imperative: 'ακτινογράφησε / ακτινογραφήστε', translationEN: 'X-ray', translationRU: 'делать рентген', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 35, present: 'ακυρώνω', future: 'θα ακυρώσω', aorist: 'ακύρωσα', imperative: 'ακύρωσε / ακυρώστε', translationEN: 'cancel', translationRU: 'отменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 36, present: 'αλατίζω', future: 'θα αλατίσω', aorist: 'αλάτισα', imperative: 'αλάτισε / αλατίστε', translationEN: 'salt', translationRU: 'солить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 37, present: 'αλέθω', future: 'θα αλέσω', aorist: 'άλεσα', imperative: 'άλεσε / αλέστε', translationEN: 'grind, mill', translationRU: 'молоть', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 38, present: 'αλείφομαι', future: 'θα αλειφτώ', aorist: 'αλείφτηκα', imperative: 'αλείψου / αλειφτείτε', translationEN: 'put on (cream)', translationRU: 'мазаться', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 39, present: 'αλείφω', future: 'θα αλείψω', aorist: 'άλειψα', imperative: 'άλειψε / αλείψτε', translationEN: 'spread, rub on', translationRU: 'намазывать, смазывать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 40, present: 'αλιεύω', future: 'θα αλιεύσω', aorist: 'αλίευσα', imperative: 'αλίευσε / αλιεύστε', translationEN: 'fish (professionally)', translationRU: 'промышлять рыбу', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 41, present: 'αλλάζω', future: 'θα αλλάξω', aorist: 'άλλαξα', imperative: 'άλλαξε / αλλάξτε', translationEN: 'change', translationRU: 'менять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 42, present: 'αλωνίζω', future: 'θα αλωνίσω', aorist: 'αλώνισα', imperative: 'αλώνισε / αλωνίστε', translationEN: 'thresh', translationRU: 'молотить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 43, present: 'αμηχανώ', future: 'θα αμηχανήσω', aorist: 'αμηχάνησα', imperative: 'αμηχάνησε / αμηχανήστε', translationEN: 'be embarrassed', translationRU: 'смущаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 44, present: 'αμύνομαι', future: 'θα αμυνθώ', aorist: 'αμύνθηκα', imperative: 'αμύνσου / αμυνθείτε', translationEN: 'defend oneself', translationRU: 'защищаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 45, present: 'αμφισβητώ', future: 'θα αμφισβητήσω', aorist: 'αμφισβήτησα', imperative: 'αμφισβήτησε / αμφισβητήστε', translationEN: 'challenge, dispute', translationRU: 'оспаривать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 46, present: 'αναβαθμίζω', future: 'θα αναβαθμίσω', aorist: 'αναβάθμισα', imperative: 'αναβάθμισε / αναβαθμίστε', translationEN: 'upgrade', translationRU: 'обновлять, повышать уровень', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 47, present: 'αναβάλλω', future: 'θα αναβάλω', aorist: 'ανέβαλα', imperative: 'ανάβαλε / αναβάλετε', translationEN: 'postpone', translationRU: 'откладывать', lexicalCategory: ['lexicalTime','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 48, present: 'αναβοσβήνω', future: 'θα αναβοσβήσω', aorist: 'αναβόσβησα', imperative: 'αναβόσβησε / αναβοσβήστε', translationEN: 'blink, flash on and off', translationRU: 'мигать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 49, present: 'ανάβω', future: 'θα ανάψω', aorist: 'άναψα', imperative: 'άναψε / ανάψτε', translationEN: 'light, turn on', translationRU: 'зажигать, включать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 50, present: 'αναγγέλλω', future: 'θα αναγγείλω', aorist: 'ανήγγειλα', imperative: 'ανάγγειλε / αναγγείλετε', translationEN: 'announce', translationRU: 'объявлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 51, present: 'αναγεννιέμαι', future: 'θα αναγεννηθώ', aorist: 'αναγεννήθηκα', imperative: 'αναγεννήσου / αναγεννηθείτε', translationEN: 'be reborn', translationRU: 'возрождаться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 52, present: 'αναγεννώ', future: 'θα αναγεννήσω', aorist: 'αναγέννησα', imperative: 'αναγέννησε / αναγεννήστε', translationEN: 'regenerate, revive', translationRU: 'возрождать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 53, present: 'αναγκάζομαι', future: 'θα αναγκαστώ', aorist: 'αναγκάστηκα', imperative: 'αναγκάσου / αναγκαστείτε', translationEN: 'be forced', translationRU: 'быть вынужденным', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 54, present: 'αναγκάζω', future: 'θα αναγκάσω', aorist: 'ανάγκασα', imperative: 'ανάγκασε / αναγκάστε', translationEN: 'force', translationRU: 'принуждать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 55, present: 'αναγνωρίζω', future: 'θα αναγνωρίσω', aorist: 'αναγνώρισα', imperative: 'αναγνώρισε / αναγνωρίστε', translationEN: 'recognize', translationRU: 'узнавать, признавать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 56, present: 'αναδημοσιεύω', future: 'θα αναδημοσιεύσω', aorist: 'αναδημοσίευσα', imperative: 'αναδημοσίευσε / αναδημοσιεύστε', translationEN: 'republish', translationRU: 'републиковать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 57, present: 'αναδύομαι', future: 'θα αναδυθώ', aorist: 'αναδύθηκα', imperative: 'αναδύσου / αναδυθείτε', translationEN: 'emerge', translationRU: 'всплывать, появляться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 58, present: 'αναζητώ', future: 'θα αναζητήσω', aorist: 'αναζήτησα', imperative: 'αναζήτησε / αναζητήστε', translationEN: 'search for', translationRU: 'искать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 59, present: 'αναζωογονώ', future: 'θα αναζωογονήσω', aorist: 'αναζωογόνησα', imperative: 'αναζωογόνησε / αναζωογονήστε', translationEN: 'revitalize', translationRU: 'оживлять, освежать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 60, present: 'αναζωπυρώνω', future: 'θα αναζωπυρώσω', aorist: 'αναζωπύρωσα', imperative: 'αναζωπύρωσε / αναζωπυρώστε', translationEN: 'rekindle', translationRU: 'разжигать вновь', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 61, present: 'αναθαρρώ', future: 'θα αναθαρρήσω', aorist: 'αναθάρρησα', imperative: 'αναθάρρησε / αναθαρρήστε', translationEN: 'take heart', translationRU: 'воспрянуть духом', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 62, present: 'αναθέτω', future: 'θα αναθέσω', aorist: 'ανέθεσα', imperative: 'ανάθεσε / αναθέστε', translationEN: 'assign', translationRU: 'поручать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 63, present: 'αναθεωρώ', future: 'θα αναθεωρήσω', aorist: 'αναθεώρησα', imperative: 'αναθεώρησε / αναθεωρήστε', translationEN: 'revise, review', translationRU: 'пересматривать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 64, present: 'αναθρέφω', future: 'θα αναθρέψω', aorist: 'ανέθρεψα', imperative: 'ανάθρεψε / αναθρέψτε', translationEN: 'bring up, raise', translationRU: 'воспитывать, растить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 65, present: 'ανακαινίζω', future: 'θα ανακαινίσω', aorist: 'ανακαίνισα', imperative: 'ανακαίνισε / ανακαινίστε', translationEN: 'renovate', translationRU: 'ремонтировать, обновлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 66, present: 'ανακαλύπτω', future: 'θα ανακαλύψω', aorist: 'ανακάλυψα', imperative: 'ανακάλυψε / ανακαλύψτε', translationEN: 'discover', translationRU: 'открывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 67, present: 'ανακαλώ', future: 'θα ανακαλέσω', aorist: 'ανακάλεσα', imperative: 'ανακάλεσε / ανακαλέστε', translationEN: 'recall, revoke', translationRU: 'отзывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 68, present: 'ανακατεύω', future: 'θα ανακατέψω', aorist: 'ανακάτεψα', imperative: 'ανακάτεψε / ανακατέψτε', translationEN: 'mix, stir', translationRU: 'смешивать, помешивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 69, present: 'ανακεφαλαιώνω', future: 'θα ανακεφαλαιώσω', aorist: 'ανακεφαλαίωσα', imperative: 'ανακεφαλαίωσε / ανακεφαλαιώστε', translationEN: 'sum up', translationRU: 'подводить итоги', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 70, present: 'ανακοινώνω', future: 'θα ανακοινώσω', aorist: 'ανακοίνωσα', imperative: 'ανακοίνωσε / ανακοινώστε', translationEN: 'announce', translationRU: 'объявлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 71, present: 'ανακουφίζομαι', future: 'θα ανακουφιστώ', aorist: 'ανακουφίστηκα', imperative: 'ανακουφίσου / ανακουφιστείτε', translationEN: 'feel relieved', translationRU: 'чувствовать облегчение', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 72, present: 'ανακουφίζω', future: 'θα ανακουφίσω', aorist: 'ανακούφισα', imperative: 'ανακούφισε / ανακουφίστε', translationEN: 'relieve', translationRU: 'облегчать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 73, present: 'ανακρίνω', future: 'θα ανακρίνω', aorist: 'ανέκρινα', imperative: 'ανάκρινε / ανακρίνετε', translationEN: 'interrogate', translationRU: 'допрашивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 74, present: 'ανακτώ', future: 'θα ανακτήσω', aorist: 'ανέκτησα', imperative: 'ανάκτησε / ανακτήστε', translationEN: 'recover, regain', translationRU: 'восстанавливать, возвращать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 75, present: 'ανακυκλώνω', future: 'θα ανακυκλώσω', aorist: 'ανακύκλωσα', imperative: 'ανακύκλωσε / ανακυκλώστε', translationEN: 'recycle', translationRU: 'перерабатывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 76, present: 'ανακύπτω', future: 'θα ανακύψω', aorist: 'ανέκυψα', imperative: 'ανάκυψε / ανακύψτε', translationEN: 'arise, emerge', translationRU: 'возникать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 77, present: 'αναλαμβάνω', future: 'θα αναλάβω', aorist: 'ανέλαβα', imperative: 'ανάλαβε / αναλάβετε', translationEN: 'undertake, take over', translationRU: 'брать на себя', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 78, present: 'αναλογίζομαι', future: 'θα αναλογιστώ', aorist: 'αναλογίστηκα', imperative: 'αναλογίσου / αναλογιστείτε', translationEN: 'consider, reflect on', translationRU: 'обдумывать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 79, present: 'αναλύω', future: 'θα αναλύσω', aorist: 'ανάλυσα', imperative: 'ανάλυσε / αναλύστε', translationEN: 'analyze', translationRU: 'анализировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 80, present: 'αναμασώ', future: 'θα αναμασήσω', aorist: 'αναμάσησα', imperative: 'αναμάσησε / αναμασήστε', translationEN: 'ruminate, chew over', translationRU: 'пережёвывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 81, present: 'αναμειγνύομαι', future: 'θα αναμειχθώ', aorist: 'αναμείχθηκα', imperative: 'αναμείξου / αναμειχθείτε', translationEN: 'get involved, mix', translationRU: 'вмешиваться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 82, present: 'αναμειγνύω', future: 'θα αναμείξω', aorist: 'ανέμειξα', imperative: 'ανάμειξε / αναμείξτε', translationEN: 'mix, blend', translationRU: 'смешивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 83, present: 'ανανεώνω', future: 'θα ανανεώσω', aorist: 'ανανέωσα', imperative: 'ανανέωσε / ανανεώστε', translationEN: 'renew', translationRU: 'обновлять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 84, present: 'αναπαράγομαι', future: 'θα αναπαραχθώ', aorist: 'αναπαράχθηκα', imperative: 'αναπαράξου / αναπαραχθείτε', translationEN: 'reproduce', translationRU: 'размножаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 85, present: 'αναπαράγω', future: 'θα αναπαράγω', aorist: 'αναπαρήγαγα', imperative: 'αναπαράγαγε / αναπαραγάγετε', translationEN: 'reproduce, replay', translationRU: 'воспроизводить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 86, present: 'αναπαριστώ', future: 'θα αναπαραστήσω', aorist: 'αναπαρέστησα', imperative: 'αναπαράστησε / αναπαραστήστε', translationEN: 'depict, reenact', translationRU: 'изображать, воспроизводить', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2','grammarIrregular']},
  {id: 87, present: 'αναπαύομαι', future: 'θα αναπαυθώ', aorist: 'αναπαύθηκα', imperative: 'αναπαύσου / αναπαυθείτε', translationEN: 'rest', translationRU: 'отдыхать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 88, present: 'αναπηδώ', future: 'θα αναπηδήσω', aorist: 'αναπήδησα', imperative: 'αναπήδησε / αναπηδήστε', translationEN: 'bounce, jump up', translationRU: 'подскакивать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 89, present: 'αναπνέω', future: 'θα αναπνεύσω', aorist: 'ανέπνευσα', imperative: 'ανάπνευσε / αναπνεύστε', translationEN: 'breathe', translationRU: 'дышать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 90, present: 'αναπολώ', future: 'θα αναπολήσω', aorist: 'αναπόλησα', imperative: 'αναπόλησε / αναπολήστε', translationEN: 'reminisce, recall fondly', translationRU: 'вспоминать с нежностью', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 91, present: 'αναπτερώνω', future: 'θα αναπτερώσω', aorist: 'αναπτέρωσα', imperative: 'αναπτέρωσε / αναπτερώστε', translationEN: 'boost, revive (hopes)', translationRU: 'воодушевлять', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 92, present: 'αναπτύσσομαι', future: 'θα αναπτυχθώ', aorist: 'αναπτύχθηκα', imperative: 'αναπτύξου / αναπτυχθείτε', translationEN: 'develop, grow', translationRU: 'развиваться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 93, present: 'αναπτύσσω', future: 'θα αναπτύξω', aorist: 'ανέπτυξα', imperative: 'ανάπτυξε / αναπτύξτε', translationEN: 'develop', translationRU: 'развивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 94, present: 'αναρριχώμαι', future: 'θα αναρριχηθώ', aorist: 'αναρριχήθηκα', imperative: 'αναρριχήσου / αναρριχηθείτε', translationEN: 'climb (mountaineering)', translationRU: 'взбираться, лазать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 95, present: 'αναρρώνω', future: 'θα αναρρώσω', aorist: 'ανάρρωσα', imperative: 'ανάρρωσε / αναρρώστε', translationEN: 'recover (from illness)', translationRU: 'выздоравливать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 96, present: 'αναρτώ', future: 'θα αναρτήσω', aorist: 'ανάρτησα', imperative: 'ανάρτησε / αναρτήστε', translationEN: 'post, upload', translationRU: 'размещать, публиковать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 97, present: 'αναρωτιέμαι', future: 'θα αναρωτηθώ', aorist: 'αναρωτήθηκα', imperative: 'αναρωτήσου / αναρωτηθείτε', translationEN: 'wonder', translationRU: 'задаваться вопросом', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 98, present: 'ανασαίνω', future: 'θα ανασάνω', aorist: 'ανάσανα', imperative: 'ανάσανε / ανασάνετε', translationEN: 'breathe, catch one\'s breath', translationRU: 'дышать, переводить дух', lexicalCategory: ['lexicalHealth','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 99, present: 'ανασηκώνομαι', future: 'θα ανασηκωθώ', aorist: 'ανασηκώθηκα', imperative: 'ανασηκώσου / ανασηκωθείτε', translationEN: 'raise oneself', translationRU: 'приподниматься', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 100, present: 'ανασηκώνω', future: 'θα ανασηκώσω', aorist: 'ανασήκωσα', imperative: 'ανασήκωσε / ανασηκώστε', translationEN: 'lift up, raise slightly', translationRU: 'приподнимать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 101, present: 'αναστατώνομαι', future: 'θα αναστατωθώ', aorist: 'αναστατώθηκα', imperative: 'αναστατώσου / αναστατωθείτε', translationEN: 'get upset', translationRU: 'волноваться, приходить в смятение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 102, present: 'αναστατώνω', future: 'θα αναστατώσω', aorist: 'αναστάτωσα', imperative: 'αναστάτωσε / αναστατώστε', translationEN: 'upset, disturb', translationRU: 'волновать, расстраивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 103, present: 'αναστέλλω', future: 'θα αναστείλω', aorist: 'ανέστειλα', imperative: 'ανάστειλε / αναστείλετε', translationEN: 'suspend, halt', translationRU: 'приостанавливать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 104, present: 'αναστενάζω', future: 'θα αναστενάξω', aorist: 'αναστέναξα', imperative: 'αναστέναξε / αναστενάξτε', translationEN: 'sigh', translationRU: 'вздыхать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 105, present: 'αναστηλώνω', future: 'θα αναστηλώσω', aorist: 'αναστήλωσα', imperative: 'αναστήλωσε / αναστηλώστε', translationEN: 'restore (monument)', translationRU: 'реставрировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 106, present: 'αναστήνω', future: 'θα αναστήσω', aorist: 'ανάστησα', imperative: 'ανάστησε / αναστήστε', translationEN: 'resurrect', translationRU: 'воскрешать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 107, present: 'ανασύρω', future: 'θα ανασύρω', aorist: 'ανέσυρα', imperative: 'ανάσυρε / ανασύρετε', translationEN: 'pull up, retrieve', translationRU: 'вытаскивать, извлекать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 108, present: 'ανατέλλω', future: 'θα ανατείλω', aorist: 'ανέτειλα', imperative: 'ανάτειλε / ανατείλετε', translationEN: 'rise (sun)', translationRU: 'восходить', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 109, present: 'ανατινάζω', future: 'θα ανατινάξω', aorist: 'ανατίναξα', imperative: 'ανατίναξε / ανατινάξτε', translationEN: 'blow up', translationRU: 'взрывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 110, present: 'ανατρέπομαι', future: 'θα ανατραπώ', aorist: 'ανατράπηκα', imperative: 'ανατρέψου / ανατραπείτε', translationEN: 'overturn, capsize', translationRU: 'опрокидываться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 111, present: 'ανατρέπω', future: 'θα ανατρέψω', aorist: 'ανέτρεψα', imperative: 'ανάτρεψε / ανατρέψτε', translationEN: 'overturn', translationRU: 'опрокидывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 112, present: 'ανατρέφω', future: 'θα ανατρέψω', aorist: 'ανέθρεψα', imperative: 'ανάτρεψε / ανατρέψτε', translationEN: 'raise (children)', translationRU: 'воспитывать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 113, present: 'ανατρέχω', future: 'θα ανατρέξω', aorist: 'ανέτρεξα', imperative: 'ανάτρεξε / ανατρέξτε', translationEN: 'refer to, look back', translationRU: 'обращаться к, возвращаться', lexicalCategory: ['lexicalInfluence','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 114, present: 'ανατριχιάζω', future: 'θα ανατριχιάσω', aorist: 'ανατρίχιασα', imperative: 'ανατρίχιασε / ανατριχιάστε', translationEN: 'shiver, get goosebumps', translationRU: 'содрогаться, покрываться мурашками', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 115, present: 'αναφέρομαι', future: 'θα αναφερθώ', aorist: 'αναφέρθηκα', imperative: 'αναφέρσου / αναφερθείτε', translationEN: 'refer to', translationRU: 'ссылаться, касаться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 116, present: 'αναφέρω', future: null, aorist: 'ανέφερα', imperative: 'ανέφερε / ανεφέρετε', translationEN: 'mention', translationRU: 'упоминать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 117, present: 'αναφωνώ', future: 'θα αναφωνήσω', aorist: 'αναφώνησα', imperative: 'αναφώνησε / αναφωνήστε', translationEN: 'exclaim', translationRU: 'восклицать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 118, present: 'αναχαιτίζω', future: 'θα αναχαιτίσω', aorist: 'αναχαίτισα', imperative: 'αναχαίτισε / αναχαιτίστε', translationEN: 'intercept, check', translationRU: 'перехватывать, сдерживать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 119, present: 'αναχωρώ', future: 'θα αναχωρήσω', aorist: 'αναχώρησα', imperative: 'αναχώρησε / αναχωρήστε', translationEN: 'depart', translationRU: 'отбывать', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammar2']},
  {id: 120, present: 'ανεβάζω', future: 'θα ανεβάσω', aorist: 'ανέβασα', imperative: 'ανέβασε / ανεβάστε', translationEN: 'raise, upload', translationRU: 'поднимать, загружать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 121, present: 'ανεβαίνω', future: 'θα ανέβω', aorist: 'ανέβηκα', imperative: 'ανέβα / ανεβείτε', translationEN: 'go up, climb', translationRU: 'подниматься', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 122, present: 'ανεμίζω', future: 'θα ανεμίσω', aorist: 'ανέμισα', imperative: 'ανέμισε / ανεμίστε', translationEN: 'wave, flutter', translationRU: 'развеваться, размахивать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 123, present: 'ανέρχομαι', future: 'θα ανέλθω', aorist: 'ανήλθα', imperative: 'άνελθε / ανέλθετε', translationEN: 'ascend, amount to', translationRU: 'подниматься, достигать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 124, present: 'ανεφοδιάζω', future: 'θα ανεφοδιάσω', aorist: 'ανεφοδίασα', imperative: 'ανεφοδίασε / ανεφοδιάστε', translationEN: 'refuel, resupply', translationRU: 'заправлять, снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 125, present: 'ανέχομαι', future: 'θα ανεχτώ', aorist: 'ανέχτηκα', imperative: 'ανέξου / ανεχτείτε', translationEN: 'tolerate', translationRU: 'терпеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 126, present: 'ανήκω', future: 'θα ανήκω', aorist: null, imperative: null, translationEN: 'belong', translationRU: 'принадлежать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 127, present: 'ανησυχώ', future: 'θα ανησυχήσω', aorist: 'ανησύχησα', imperative: 'ανησύχησε / ανησυχήστε', translationEN: 'worry', translationRU: 'беспокоиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 128, present: 'ανθίζω', future: 'θα ανθίσω', aorist: 'άνθισα', imperative: 'άνθισε / ανθίστε', translationEN: 'bloom', translationRU: 'цвести', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 129, present: 'ανιχνεύω', future: 'θα ανιχνεύσω', aorist: 'ανίχνευσα', imperative: 'ανίχνευσε / ανιχνεύστε', translationEN: 'detect, trace', translationRU: 'обнаруживать, выявлять', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 130, present: 'ανοίγομαι', future: 'θα ανοιχτώ', aorist: 'ανοίχτηκα', imperative: 'ανοίξου / ανοιχτείτε', translationEN: 'open up, confide', translationRU: 'раскрываться, открываться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 131, present: 'ανοίγω', future: 'θα ανοίξω', aorist: 'άνοιξα', imperative: 'άνοιξε / ανοίξτε', translationEN: 'open', translationRU: 'открывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 132, present: 'ανοικοδομώ', future: 'θα ανοικοδομήσω', aorist: 'ανοικοδόμησα', imperative: 'ανοικοδόμησε / ανοικοδομήστε', translationEN: 'rebuild', translationRU: 'восстанавливать, отстраивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 133, present: 'ανταγωνίζομαι', future: 'θα ανταγωνιστώ', aorist: 'ανταγωνίστηκα', imperative: 'ανταγωνίσου / ανταγωνιστείτε', translationEN: 'compete', translationRU: 'конкурировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 134, present: 'ανταλλάσσω', future: 'θα ανταλλάξω', aorist: 'αντάλλαξα', imperative: 'αντάλλαξε / ανταλλάξτε', translationEN: 'exchange', translationRU: 'обменивать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 135, present: 'αντανακλώ', future: 'θα αντανακλάσω', aorist: 'αντανάκλασα', imperative: 'αντανάκλασε / αντανακλάστε', translationEN: 'reflect', translationRU: 'отражать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 136, present: 'ανταποκρίνομαι', future: 'θα ανταποκριθώ', aorist: 'ανταποκρίθηκα', imperative: 'ανταποκρίσου / ανταποκριθείτε', translationEN: 'respond, meet (expectations)', translationRU: 'откликаться, соответствовать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 137, present: 'αντέχω', future: 'θα αντέξω', aorist: 'άντεξα', imperative: 'άντεξε / αντέξτε', translationEN: 'endure', translationRU: 'выдерживать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 138, present: 'αντιγράφω', future: 'θα αντιγράψω', aorist: 'αντέγραψα', imperative: 'αντίγραψε / αντιγράψτε', translationEN: 'copy', translationRU: 'копировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 139, present: 'αντιδρώ', future: 'θα αντιδράσω', aorist: 'αντέδρασα', imperative: 'αντίδρασε / αντιδράστε', translationEN: 'react', translationRU: 'реагировать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 140, present: 'αντικαθιστώ', future: 'θα αντικαταστήσω', aorist: 'αντικατέστησα', imperative: 'αντικατάστησε / αντικαταστήστε', translationEN: 'replace', translationRU: 'заменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 141, present: 'αντιλαμβάνομαι', future: 'θα αντιληφθώ', aorist: 'αντιλήφθηκα', imperative: null, translationEN: 'perceive, realize', translationRU: 'осознавать, замечать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 142, present: 'αντιμετωπίζω', future: 'θα αντιμετωπίσω', aorist: 'αντιμετώπισα', imperative: 'αντιμετώπισε / αντιμετωπίστε', translationEN: 'face, deal with', translationRU: 'сталкиваться, справляться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 143, present: 'αντιπαθώ', future: 'θα αντιπαθήσω', aorist: 'αντιπάθησα', imperative: null, translationEN: 'dislike', translationRU: 'не любить, питать антипатию', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 144, present: 'αντιπροσωπεύω', future: 'θα αντιπροσωπεύσω', aorist: 'αντιπροσώπευσα', imperative: 'αντιπροσώπευσε / αντιπροσωπεύστε', translationEN: 'represent', translationRU: 'представлять', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 145, present: 'αντιστέκομαι', future: 'θα αντισταθώ', aorist: 'αντιστάθηκα', imperative: 'αντιστάσου / αντισταθείτε', translationEN: 'resist', translationRU: 'сопротивляться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 146, present: 'ανυψώνω', future: 'θα ανυψώσω', aorist: 'ανύψωσα', imperative: 'ανύψωσε / ανυψώστε', translationEN: 'raise, elevate', translationRU: 'поднимать, возвышать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 147, present: 'αξίζω', future: null, aorist: 'άξιζα', imperative: null, translationEN: 'be worth, deserve', translationRU: 'стоить, заслуживать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 148, present: 'αξιολογώ', future: 'θα αξιολογήσω', aorist: 'αξιολόγησα', imperative: 'αξιολόγησε / αξιολογήστε', translationEN: 'evaluate', translationRU: 'оценивать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 149, present: 'απαγγέλλω', future: 'θα απαγγείλω', aorist: 'απήγγειλα', imperative: 'απάγγειλε / απαγγείλετε', translationEN: 'recite', translationRU: 'декламировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 150, present: 'απαγορεύω', future: 'θα απαγορεύσω', aorist: 'απαγόρευσα', imperative: 'απαγόρευσε / απαγορεύστε', translationEN: 'forbid', translationRU: 'запрещать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 151, present: 'απαισιοδοξώ', future: 'θα απαισιοδοξήσω', aorist: 'απαισιοδόξησα', imperative: 'απαισιοδόξησε / απαισιοδοξήστε', translationEN: 'be pessimistic', translationRU: 'быть пессимистом', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 152, present: 'απαιτώ', future: 'θα απαιτήσω', aorist: 'απαίτησα', imperative: 'απαίτησε / απαιτήστε', translationEN: 'demand', translationRU: 'требовать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 153, present: 'απαλλάσσω', future: 'θα απαλλάξω', aorist: 'απήλλαξα', imperative: 'απάλλαξε / απαλλάξτε', translationEN: 'relieve, exempt', translationRU: 'освобождать (от чего-л.)', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 154, present: 'απαντώ', future: 'θα απαντήσω', aorist: 'απάντησα', imperative: 'απάντησε / απαντήστε', translationEN: 'answer', translationRU: 'отвечать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 155, present: 'απασχολώ', future: 'θα απασχολήσω', aorist: 'απασχόλησα', imperative: 'απασχόλησε / απασχολήστε', translationEN: 'occupy, employ', translationRU: 'занимать, нанимать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 156, present: 'απειλώ', future: 'θα απειλήσω', aorist: 'απείλησα', imperative: 'απείλησε / απειλήστε', translationEN: 'threaten', translationRU: 'угрожать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 157, present: 'απελευθερώνω', future: 'θα απελευθερώσω', aorist: 'απελευθέρωσα', imperative: 'απελευθέρωσε / απελευθερώστε', translationEN: 'free, liberate', translationRU: 'освобождать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 158, present: 'απελπίζομαι', future: 'θα απελπιστώ', aorist: 'απελπίστηκα', imperative: 'απελπίσου / απελπιστείτε', translationEN: 'despair', translationRU: 'отчаиваться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 159, present: 'απενεργοποιώ', future: 'θα απενεργοποιήσω', aorist: 'απενεργοποίησα', imperative: 'απενεργοποίησε / απενεργοποιήστε', translationEN: 'deactivate, switch off', translationRU: 'отключать, деактивировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 160, present: 'απεργώ', future: 'θα απεργήσω', aorist: 'απέργησα', imperative: 'απέργησε / απεργήστε', translationEN: 'strike (labour)', translationRU: 'бастовать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 161, present: 'απευθύνομαι', future: 'θα απευθυνθώ', aorist: 'απευθύνθηκα', imperative: 'απευθύνσου / απευθυνθείτε', translationEN: 'address, turn to', translationRU: 'обращаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 162, present: 'απευθύνω', future: 'θα απευθύνω', aorist: 'απηύθυνα', imperative: 'απεύθυνε / απευθύνετε', translationEN: 'address, direct to', translationRU: 'адресовать, обращать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 163, present: 'απέχω', future: null, aorist: 'απείχα', imperative: null, translationEN: 'be far, abstain', translationRU: 'отстоять, воздерживаться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 164, present: 'απλοποιώ', future: 'θα απλοποιήσω', aorist: 'απλοποίησα', imperative: 'απλοποίησε / απλοποιήστε', translationEN: 'simplify', translationRU: 'упрощать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 165, present: 'απλώνομαι', future: 'θα απλωθώ', aorist: 'απλώθηκα', imperative: 'απλώσου / απλωθείτε', translationEN: 'spread out, stretch out', translationRU: 'растягиваться, разворачиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 166, present: 'απλώνω', future: 'θα απλώσω', aorist: 'άπλωσα', imperative: 'άπλωσε / απλώστε', translationEN: 'spread, hang out', translationRU: 'расстилать, развешивать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 167, present: 'αποβιβάζομαι', future: 'θα αποβιβαστώ', aorist: 'αποβιβάστηκα', imperative: 'αποβιβάσου / αποβιβαστείτε', translationEN: 'disembark, get off', translationRU: 'сходить (с транспорта)', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 168, present: 'απογειώνομαι', future: 'θα απογειωθώ', aorist: 'απογειώθηκα', imperative: 'απογειώσου / απογειωθείτε', translationEN: 'take off', translationRU: 'взлетать', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 169, present: 'απογοητεύομαι', future: 'θα απογοητευτώ', aorist: 'απογοητεύτηκα', imperative: 'απογοητεύσου / απογοητευτείτε', translationEN: 'be disappointed', translationRU: 'разочаровываться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 170, present: 'απογοητεύω', future: 'θα απογοητεύσω', aorist: 'απογοήτευσα', imperative: 'απογοήτευσε / απογοητεύστε', translationEN: 'disappoint', translationRU: 'разочаровывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 171, present: 'αποδεικνύω', future: 'θα αποδείξω', aorist: 'απέδειξα', imperative: 'απόδειξε / αποδείξτε', translationEN: 'prove', translationRU: 'доказывать', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 172, present: 'αποδέχομαι', future: 'θα αποδεχτώ', aorist: 'αποδέχτηκα', imperative: 'αποδέξου / αποδεχτείτε', translationEN: 'accept', translationRU: 'принимать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 173, present: 'αποδίδω', future: 'θα αποδώσω', aorist: 'απέδωσα', imperative: 'απόδωσε / αποδώστε', translationEN: 'attribute, render', translationRU: 'приписывать, отдавать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 174, present: 'αποδυναμώνω', future: 'θα αποδυναμώσω', aorist: 'αποδυνάμωσα', imperative: 'αποδυνάμωσε / αποδυναμώστε', translationEN: 'weaken', translationRU: 'ослаблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 175, present: 'αποζημιώνω', future: 'θα αποζημιώσω', aorist: 'αποζημίωσα', imperative: 'αποζημίωσε / αποζημιώστε', translationEN: 'compensate', translationRU: 'компенсировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 176, present: 'αποθαρρύνω', future: 'θα αποθαρρύνω', aorist: 'αποθάρρυνα', imperative: 'αποθάρρυνε / αποθαρρύνετε', translationEN: 'discourage', translationRU: 'обескураживать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 177, present: 'αποθηκεύω', future: 'θα αποθηκεύσω', aorist: 'αποθήκευσα', imperative: 'αποθήκευσε / αποθηκεύστε', translationEN: 'store, save', translationRU: 'хранить, сохранять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 178, present: 'αποκαθιστώ', future: 'θα αποκαταστήσω', aorist: 'αποκατέστησα', imperative: 'αποκατάστησε / αποκαταστήστε', translationEN: 'restore', translationRU: 'восстанавливать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 179, present: 'αποκαλύπτω', future: 'θα αποκαλύψω', aorist: 'αποκάλυψα', imperative: 'αποκάλυψε / αποκαλύψτε', translationEN: 'reveal, disclose', translationRU: 'раскрывать, обнаруживать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 180, present: 'αποκαλώ', future: 'θα αποκαλέσω', aorist: 'αποκάλεσα', imperative: 'αποκάλεσε / αποκαλέστε', translationEN: 'call, name', translationRU: 'называть', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 181, present: 'αποκεντρώνω', future: 'θα αποκεντρώσω', aorist: 'αποκέντρωσα', imperative: 'αποκέντρωσε / αποκεντρώστε', translationEN: 'decentralize', translationRU: 'децентрализовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 182, present: 'αποκλείω', future: 'θα αποκλείσω', aorist: 'απέκλεισα', imperative: 'απόκλεισε / αποκλείστε', translationEN: 'exclude', translationRU: 'исключать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 183, present: 'αποκοιμιέμαι', future: 'θα αποκοιμηθώ', aorist: 'αποκοιμήθηκα', imperative: 'αποκοιμήσου / αποκοιμηθείτε', translationEN: 'fall asleep', translationRU: 'засыпать', lexicalCategory: ['lexicalHealth','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 184, present: 'αποκρίνομαι', future: 'θα αποκριθώ', aorist: 'αποκρίθηκα', imperative: 'αποκρίσου / αποκριθείτε', translationEN: 'reply, respond', translationRU: 'отвечать, откликаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 185, present: 'αποκρυπτογραφώ', future: 'θα αποκρυπτογραφήσω', aorist: 'αποκρυπτογράφησα', imperative: 'αποκρυπτογράφησε / αποκρυπτογραφήστε', translationEN: 'decipher, decrypt', translationRU: 'расшифровывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 186, present: 'αποκτώ', future: 'θα αποκτήσω', aorist: 'απέκτησα', imperative: 'απόκτησε / αποκτήστε', translationEN: 'acquire, get', translationRU: 'приобретать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 187, present: 'απολαμβάνω', future: 'θα απολαύσω', aorist: 'απόλαυσα', imperative: 'απόλαυσε / απολαύστε', translationEN: 'enjoy', translationRU: 'наслаждаться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 188, present: 'απολογούμαι', future: 'θα απολογηθώ', aorist: 'απολογήθηκα', imperative: 'απολογήσου / απολογηθείτε', translationEN: 'apologize, defend oneself', translationRU: 'оправдываться, извиняться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 189, present: 'απολυμαίνω', future: 'θα απολυμάνω', aorist: 'απολύμανα', imperative: 'απολύμανε / απολυμάνετε', translationEN: 'disinfect', translationRU: 'дезинфицировать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 190, present: 'απολύομαι', future: 'θα απολυθώ', aorist: 'απολύθηκα', imperative: 'απολύσου / απολυθείτε', translationEN: 'be fired', translationRU: 'быть уволенным', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 191, present: 'απολυτηριάζω', future: 'θα απολυτηριάσω', aorist: 'απολυτηρίασα', imperative: 'απολυτηρίασε / απολυτηριάστε', translationEN: 'graduate (school)', translationRU: 'заканчивать школу', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 192, present: 'απολύω', future: 'θα απολύσω', aorist: 'απέλυσα', imperative: 'απόλυσε / απολύστε', translationEN: 'fire, dismiss', translationRU: 'увольнять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 193, present: 'απομακρύνομαι', future: 'θα απομακρυνθώ', aorist: 'απομακρύνθηκα', imperative: 'απομακρύνσου / απομακρυνθείτε', translationEN: 'move away', translationRU: 'отдаляться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 194, present: 'απομακρύνω', future: null, aorist: 'απομάκρυνα', imperative: 'απομάκρυνε / απομακρύνετε', translationEN: 'remove, move away', translationRU: 'удалять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 195, present: 'απομονώνομαι', future: 'θα απομονωθώ', aorist: 'απομονώθηκα', imperative: 'απομονώσου / απομονωθείτε', translationEN: 'isolate oneself', translationRU: 'уединяться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 196, present: 'απομονώνω', future: 'θα απομονώσω', aorist: 'απομόνωσα', imperative: 'απομόνωσε / απομονώστε', translationEN: 'isolate', translationRU: 'изолировать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 197, present: 'αποξηραίνω', future: 'θα αποξηράνω', aorist: 'αποξήρανα', imperative: 'αποξήρανε / αποξηράνετε', translationEN: 'drain, dry out', translationRU: 'осушать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 198, present: 'αποπλανώ', future: 'θα αποπλανήσω', aorist: 'αποπλάνησα', imperative: 'αποπλάνησε / αποπλανήστε', translationEN: 'seduce, mislead', translationRU: 'соблазнять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 199, present: 'αποπροσανατολίζω', future: 'θα αποπροσανατολίσω', aorist: 'αποπροσανατόλισα', imperative: 'αποπροσανατόλισε / αποπροσανατολίστε', translationEN: 'disorient', translationRU: 'дезориентировать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 200, present: 'απορρίπτομαι', future: 'θα απορριφθώ', aorist: 'απορρίφθηκα', imperative: 'απορρίψου / απορριφθείτε', translationEN: 'be rejected', translationRU: 'быть отвергнутым', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 201, present: 'απορρίπτω', future: 'θα απορρίψω', aorist: 'απέρριψα', imperative: 'απόρριψε / απορρίψτε', translationEN: 'reject', translationRU: 'отвергать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 202, present: 'απορροφώ', future: 'θα απορροφήσω', aorist: 'απορρόφησα', imperative: 'απορρόφησε / απορροφήστε', translationEN: 'absorb', translationRU: 'поглощать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 203, present: 'απορώ', future: 'θα απορήσω', aorist: 'απόρησα', imperative: null, translationEN: 'wonder, be surprised', translationRU: 'удивляться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 204, present: 'αποσαφηνίζω', future: 'θα αποσαφηνίσω', aorist: 'αποσαφήνισα', imperative: 'αποσαφήνισε / αποσαφηνίστε', translationEN: 'clarify', translationRU: 'проясниться, разъяснять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 205, present: 'αποσπώ', future: 'θα αποσπάσω', aorist: 'απέσπασα', imperative: 'απόσπασε / αποσπάστε', translationEN: 'detach, distract, extract', translationRU: 'отвлекать, отрывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 206, present: 'αποστάζω', future: 'θα αποστάξω', aorist: 'απέσταξα', imperative: 'απόσταξε / αποστάξτε', translationEN: 'distil', translationRU: 'перегонять, дистиллировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 207, present: 'αποσταθεροποιώ', future: 'θα αποσταθεροποιήσω', aorist: 'αποσταθεροποίησα', imperative: 'αποσταθεροποίησε / αποσταθεροποιήστε', translationEN: 'destabilize', translationRU: 'дестабилизировать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 208, present: 'αποστειρώνω', future: 'θα αποστειρώσω', aorist: 'αποστείρωσα', imperative: 'αποστείρωσε / αποστειρώστε', translationEN: 'sterilize', translationRU: 'стерилизовать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 209, present: 'αποστέλλω', future: 'θα αποστείλω', aorist: 'απέστειλα', imperative: 'απόστειλε / αποστείλετε', translationEN: 'send (formal)', translationRU: 'отправлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 210, present: 'αποστηθίζω', future: 'θα αποστηθίσω', aorist: 'αποστήθισα', imperative: 'αποστήθισε / αποστηθίστε', translationEN: 'memorize', translationRU: 'заучивать наизусть', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 211, present: 'αποσυμπιέζω', future: 'θα αποσυμπιέσω', aorist: 'αποσυμπίεσα', imperative: 'αποσυμπίεσε / αποσυμπιέστε', translationEN: 'decompress, unzip', translationRU: 'распаковывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 212, present: 'αποσυνδέομαι', future: 'θα αποσυνδεθώ', aorist: 'αποσυνδέθηκα', imperative: 'αποσυνδέσου / αποσυνδεθείτε', translationEN: 'log out, disconnect', translationRU: 'выходить из системы, отключаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 213, present: 'αποσύρω', future: null, aorist: 'απέσυρα', imperative: 'απόσυρε / αποσύρετε', translationEN: 'withdraw, pull back', translationRU: 'отзывать, снимать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 214, present: 'αποταμιεύω', future: 'θα αποταμιεύσω', aorist: 'αποταμίευσα', imperative: 'αποταμίευσε / αποταμιεύστε', translationEN: 'save (money)', translationRU: 'копить, сберегать', lexicalCategory: ['lexicalWork','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 215, present: 'αποτελώ', future: 'θα αποτελέσω', aorist: 'αποτέλεσα', imperative: null, translationEN: 'constitute', translationRU: 'составлять', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 216, present: 'αποτρέπω', future: 'θα αποτρέψω', aorist: 'απέτρεψα', imperative: 'απότρεψε / αποτρέψτε', translationEN: 'prevent', translationRU: 'предотвращать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 217, present: 'αποτυγχάνω', future: 'θα αποτύχω', aorist: 'απέτυχα', imperative: null, translationEN: 'fail', translationRU: 'терпеть неудачу', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 218, present: 'απουσιάζω', future: 'θα απουσιάσω', aorist: 'απουσίασα', imperative: 'απουσίασε / απουσιάστε', translationEN: 'be absent', translationRU: 'отсутствовать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 219, present: 'αποφασίζω', future: 'θα αποφασίσω', aorist: 'αποφάσισα', imperative: 'αποφάσισε / αποφασίστε', translationEN: 'decide', translationRU: 'решать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 220, present: 'αποφεύγω', future: 'θα αποφύγω', aorist: 'απέφυγα', imperative: 'απόφυγε / αποφύγετε', translationEN: 'avoid', translationRU: 'избегать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 221, present: 'αποφοιτώ', future: 'θα αποφοιτήσω', aorist: 'αποφοίτησα', imperative: 'αποφοίτησε / αποφοιτήστε', translationEN: 'graduate', translationRU: 'оканчивать (учебное заведение)', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 222, present: 'αποχαιρετώ', future: 'θα αποχαιρετήσω', aorist: 'αποχαιρέτησα', imperative: 'αποχαιρέτησε / αποχαιρετήστε', translationEN: 'bid farewell', translationRU: 'прощаться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 223, present: 'αποχωρώ', future: 'θα αποχωρήσω', aorist: 'αποχώρησα', imperative: 'αποχώρησε / αποχωρήστε', translationEN: 'withdraw, leave', translationRU: 'уходить, удаляться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 224, present: 'αραιώνω', future: 'θα αραιώσω', aorist: 'αραίωσα', imperative: 'αραίωσε / αραιώστε', translationEN: 'dilute, thin out', translationRU: 'разбавлять, разрежать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 225, present: 'αργώ', future: 'θα αργήσω', aorist: 'άργησα', imperative: 'άργησε / αργήστε', translationEN: 'be late, delay', translationRU: 'опаздывать, медлить', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 226, present: 'αρδεύω', future: 'θα αρδεύσω', aorist: 'άρδευσα', imperative: 'άρδευσε / αρδεύστε', translationEN: 'irrigate', translationRU: 'орошать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 227, present: 'αρέσω', future: null, aorist: 'άρεσα', imperative: null, translationEN: 'be liked, please', translationRU: 'нравиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 228, present: 'αρθρώνω', future: 'θα αρθρώσω', aorist: 'άρθρωσα', imperative: 'άρθρωσε / αρθρώστε', translationEN: 'articulate', translationRU: 'артикулировать, произносить чётко', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 229, present: 'αρκώ', future: 'θα αρκέσω', aorist: 'άρκεσα', imperative: null, translationEN: 'suffice, be enough', translationRU: 'хватать, быть достаточным', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 230, present: 'αρμέγω', future: 'θα αρμέξω', aorist: 'άρμεξα', imperative: 'άρμεξε / αρμέξτε', translationEN: 'milk', translationRU: 'доить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 231, present: 'αρνούμαι', future: 'θα αρνηθώ', aorist: 'αρνήθηκα', imperative: 'αρνήσου / αρνηθείτε', translationEN: 'refuse, deny', translationRU: 'отказываться, отрицать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 232, present: 'αρπάζω', future: 'θα αρπάξω', aorist: 'άρπαξα', imperative: 'άρπαξε / αρπάξτε', translationEN: 'grab', translationRU: 'хватать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 233, present: 'αρραβωνιάζομαι', future: 'θα αρραβωνιαστώ', aorist: 'αρραβωνιάστηκα', imperative: 'αρραβωνιάσου / αρραβωνιαστείτε', translationEN: 'get engaged', translationRU: 'обручаться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 234, present: 'αρρωσταίνω', future: 'θα αρρωστήσω', aorist: 'αρρώστησα', imperative: 'αρρώστησε / αρρωστήστε', translationEN: 'fall ill', translationRU: 'заболевать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 235, present: 'αρχειοθετώ', future: 'θα αρχειοθετήσω', aorist: 'αρχειοθέτησα', imperative: 'αρχειοθέτησε / αρχειοθετήστε', translationEN: 'file, archive', translationRU: 'архивировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 236, present: 'αρχίζω', future: 'θα αρχίσω', aorist: 'άρχισα', imperative: 'άρχισε / αρχίστε', translationEN: 'begin', translationRU: 'начинать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 237, present: 'ασκώ', future: 'θα ασκήσω', aorist: 'άσκησα', imperative: 'άσκησε / ασκήστε', translationEN: 'exercise, practise', translationRU: 'осуществлять, упражнять', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 238, present: 'ασπάζομαι', future: 'θα ασπαστώ', aorist: 'ασπάστηκα', imperative: 'ασπάσου / ασπαστείτε', translationEN: 'embrace (an idea), kiss', translationRU: 'принимать (идею), целовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 239, present: 'αστειεύομαι', future: 'θα αστειευτώ', aorist: 'αστειεύτηκα', imperative: 'αστειέψου / αστειευτείτε', translationEN: 'joke', translationRU: 'шутить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 240, present: 'αστράφτω', future: 'θα αστράψω', aorist: 'άστραψα', imperative: 'άστραψε / αστράψτε', translationEN: 'flash (lightning), flash with light', translationRU: 'сверкать, блистать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 241, present: 'ασφαλίζομαι', future: 'θα ασφαλιστώ', aorist: 'ασφαλίστηκα', imperative: 'ασφαλίσου / ασφαλιστείτε', translationEN: 'get insured', translationRU: 'страховаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 242, present: 'ασφαλίζω', future: 'θα ασφαλίσω', aorist: 'ασφάλισα', imperative: 'ασφάλισε / ασφαλίστε', translationEN: 'insure, secure', translationRU: 'страховать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 243, present: 'ασφυκτιώ', future: 'θα ασφυκτιάσω', aorist: 'ασφυκτίασα', imperative: 'ασφυκτίασε / ασφυκτιάστε', translationEN: 'suffocate', translationRU: 'задыхаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 244, present: 'ασχολούμαι', future: 'θα ασχοληθώ', aorist: 'ασχολήθηκα', imperative: 'ασχολήσου / ασχοληθείτε', translationEN: 'be occupied with, deal with', translationRU: 'заниматься', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 245, present: 'αυξάνω', future: 'θα αυξήσω', aorist: 'αύξησα', imperative: 'αύξησε / αυξήστε', translationEN: 'increase', translationRU: 'увеличивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 246, present: 'αυτοματοποιώ', future: 'θα αυτοματοποιήσω', aorist: 'αυτοματοποίησα', imperative: 'αυτοματοποίησε / αυτοματοποιήστε', translationEN: 'automate', translationRU: 'автоматизировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 247, present: 'αυτοσχεδιάζω', future: 'θα αυτοσχεδιάσω', aorist: 'αυτοσχεδίασα', imperative: 'αυτοσχεδίασε / αυτοσχεδιάστε', translationEN: 'improvise', translationRU: 'импровизировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 248, present: 'αφαιρούμαι', future: 'θα αφαιρεθώ', aorist: 'αφαιρέθηκα', imperative: 'αφαιρέσου / αφαιρεθείτε', translationEN: 'be subtracted, be absorbed', translationRU: 'вычитаться, отвлекаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 249, present: 'αφαιρώ', future: 'θα αφαιρέσω', aorist: 'αφαίρεσα', imperative: 'αφαίρεσε / αφαιρέστε', translationEN: 'remove, subtract', translationRU: 'удалять, вычитать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 250, present: 'αφηγούμαι', future: 'θα αφηγηθώ', aorist: 'αφηγήθηκα', imperative: 'αφηγήσου / αφηγηθείτε', translationEN: 'narrate, recount', translationRU: 'повествовать', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 251, present: 'αφήνω', future: 'θα αφήσω', aorist: 'άφησα', imperative: 'άφησε / αφήστε', translationEN: 'leave, let', translationRU: 'оставлять, позволять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 252, present: 'αφθονώ', future: 'θα αφθονήσω', aorist: 'αφθόνησα', imperative: 'αφθόνησε / αφθονήστε', translationEN: 'abound', translationRU: 'изобиловать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 253, present: 'αφιερώνομαι', future: 'θα αφιερωθώ', aorist: 'αφιερώθηκα', imperative: 'αφιερώσου / αφιερωθείτε', translationEN: 'devote oneself', translationRU: 'посвящать себя', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 254, present: 'αφιερώνω', future: 'θα αφιερώσω', aorist: 'αφιέρωσα', imperative: 'αφιέρωσε / αφιερώστε', translationEN: 'dedicate', translationRU: 'посвящать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 255, present: 'αφοπλίζω', future: 'θα αφοπλίσω', aorist: 'αφόπλισα', imperative: 'αφόπλισε / αφοπλίστε', translationEN: 'disarm', translationRU: 'разоружать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 256, present: 'βαδίζω', future: 'θα βαδίσω', aorist: 'βάδισα', imperative: 'βάδισε / βαδίστε', translationEN: 'walk, march', translationRU: 'шагать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 257, present: 'βάζω', future: 'θα βάλω', aorist: 'έβαλα', imperative: 'βάλε / βάλτε', translationEN: 'put', translationRU: 'класть, ставить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 258, present: 'βαθαίνω', future: 'θα βαθύνω', aorist: 'βάθυνα', imperative: 'βάθυνε / βαθύνετε', translationEN: 'deepen', translationRU: 'углублять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 259, present: 'βαθμολογώ', future: 'θα βαθμολογήσω', aorist: 'βαθμολόγησα', imperative: 'βαθμολόγησε / βαθμολογήστε', translationEN: 'grade, mark', translationRU: 'ставить оценку', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 260, present: 'βαπτίζω', future: 'θα βαπτίσω', aorist: 'βάπτισα', imperative: 'βάπτισε / βαπτίστε', translationEN: 'baptize', translationRU: 'крестить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 261, present: 'βαραίνω', future: 'θα βαρύνω', aorist: 'βάρυνα', imperative: 'βάρυνε / βαρύνετε', translationEN: 'weigh down, become heavy', translationRU: 'тяжелеть, отягощать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 262, present: 'βαριέμαι', future: 'θα βαρεθώ', aorist: 'βαρέθηκα', imperative: null, translationEN: 'be bored', translationRU: 'скучать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 263, present: 'βαρώ', future: 'θα βαρέσω', aorist: 'βάρεσα', imperative: 'βάρεσε / βαρέστε', translationEN: 'hit, strike', translationRU: 'бить, ударять', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar2']},
  {id: 264, present: 'βασανίζω', future: 'θα βασανίσω', aorist: 'βασάνισα', imperative: 'βασάνισε / βασανίστε', translationEN: 'torture', translationRU: 'мучить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 265, present: 'βασίζομαι', future: 'θα βασιστώ', aorist: 'βασίστηκα', imperative: 'βασίσου / βασιστείτε', translationEN: 'rely', translationRU: 'полагаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 266, present: 'βασιλεύω', future: 'θα βασιλέψω', aorist: 'βασίλεψα', imperative: 'βασίλεψε / βασιλέψτε', translationEN: 'reign', translationRU: 'царствовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 267, present: 'βαστώ', future: 'θα βαστάξω', aorist: 'βάσταξα', imperative: 'βάσταξε / βαστάξτε', translationEN: 'hold, bear', translationRU: 'держать, выдерживать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 268, present: 'βαφτίζω', future: 'θα βαφτίσω', aorist: 'βάφτισα', imperative: 'βάφτισε / βαφτίστε', translationEN: 'baptize', translationRU: 'крестить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 269, present: 'βάφω', future: 'θα βάψω', aorist: 'έβαψα', imperative: 'βάψε / βάψτε', translationEN: 'paint, dye', translationRU: 'красить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 270, present: 'βγάζω', future: 'θα βγάλω', aorist: 'έβγαλα', imperative: 'βγάλε / βγάλτε', translationEN: 'take out, remove', translationRU: 'вынимать, снимать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 271, present: 'βγαίνω', future: 'θα βγω', aorist: 'βγήκα', imperative: 'βγες / βγείτε', translationEN: 'go out', translationRU: 'выходить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 272, present: 'βεβαιώνω', future: 'θα βεβαιώσω', aorist: 'βεβαίωσα', imperative: 'βεβαίωσε / βεβαιώστε', translationEN: 'assure, confirm', translationRU: 'заверять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 273, present: 'βελάζω', future: 'θα βελάξω', aorist: 'βέλαξα', imperative: 'βέλαξε / βελάξτε', translationEN: 'bleat', translationRU: 'блеять', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 274, present: 'βελτιστοποιώ', future: 'θα βελτιστοποιήσω', aorist: 'βελτιστοποίησα', imperative: 'βελτιστοποίησε / βελτιστοποιήστε', translationEN: 'optimize', translationRU: 'оптимизировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 275, present: 'βελτιώνω', future: 'θα βελτιώσω', aorist: 'βελτίωσα', imperative: 'βελτίωσε / βελτιώστε', translationEN: 'improve', translationRU: 'улучшать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 276, present: 'βηματίζω', future: 'θα βηματίσω', aorist: 'βημάτισα', imperative: 'βημάτισε / βηματίστε', translationEN: 'pace, stride', translationRU: 'шагать, ходить взад-вперёд', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 277, present: 'βήχω', future: 'θα βήξω', aorist: 'έβηξα', imperative: 'βήξε / βήξτε', translationEN: 'cough', translationRU: 'кашлять', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 278, present: 'βιάζομαι', future: 'θα βιαστώ', aorist: 'βιάστηκα', imperative: 'βιάσου / βιαστείτε', translationEN: 'hurry', translationRU: 'спешить', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 279, present: 'βιδώνω', future: 'θα βιδώσω', aorist: 'βίδωσα', imperative: 'βίδωσε / βιδώστε', translationEN: 'screw in', translationRU: 'вкручивать, привинчивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 280, present: 'βλάπτω', future: 'θα βλάψω', aorist: 'έβλαψα', imperative: 'βλάψε / βλάψτε', translationEN: 'harm, damage', translationRU: 'вредить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 281, present: 'βλαστάνω', future: 'θα βλαστήσω', aorist: 'βλάστησα', imperative: 'βλάστησε / βλαστήστε', translationEN: 'sprout', translationRU: 'прорастать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 282, present: 'βλαστημώ', future: 'θα βλαστημήσω', aorist: 'βλαστήμησα', imperative: 'βλαστήμησε / βλαστημήστε', translationEN: 'swear, curse', translationRU: 'богохульствовать, ругаться', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 283, present: 'βλέπω', future: 'θα δω', aorist: 'είδα', imperative: 'δες / δείτε', translationEN: 'see', translationRU: 'видеть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 284, present: 'βογκώ', future: 'θα βογκήξω', aorist: 'βόγκηξα', imperative: null, translationEN: 'groan, moan', translationRU: 'стонать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 285, present: 'βοηθώ', future: 'θα βοηθήσω', aorist: 'βοήθησα', imperative: 'βοήθησε / βοηθήστε', translationEN: 'help', translationRU: 'помогать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 286, present: 'βολεύομαι', future: 'θα βολευτώ', aorist: 'βολεύτηκα', imperative: 'βολέψου / βολευτείτε', translationEN: 'make oneself comfortable', translationRU: 'устраиваться удобно', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 287, present: 'βολεύω', future: 'θα βολέψω', aorist: 'βόλεψα', imperative: 'βόλεψε / βολέψτε', translationEN: 'suit, arrange', translationRU: 'устраивать, подходить', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 288, present: 'βομβαρδίζω', future: 'θα βομβαρδίσω', aorist: 'βομβάρδισα', imperative: 'βομβάρδισε / βομβαρδίστε', translationEN: 'bomb', translationRU: 'бомбить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 289, present: 'βοσκώ', future: 'θα βοσκήσω', aorist: 'βόσκησα', imperative: 'βόσκησε / βοσκήστε', translationEN: 'graze, pasture', translationRU: 'пасти, пастись', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 290, present: 'βουίζω', future: 'θα βουίξω', aorist: 'βούιξα', imperative: 'βούιξε / βουίξτε', translationEN: 'buzz, hum', translationRU: 'жужжать, гудеть', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 291, present: 'βουλιάζω', future: 'θα βουλιάξω', aorist: 'βούλιαξα', imperative: 'βούλιαξε / βουλιάξτε', translationEN: 'sink', translationRU: 'тонуть', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 292, present: 'βουρκώνω', future: 'θα βουρκώσω', aorist: 'βούρκωσα', imperative: 'βούρκωσε / βουρκώστε', translationEN: 'well up with tears', translationRU: 'наворачиваются слёзы', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 293, present: 'βουτώ', future: 'θα βουτήξω', aorist: 'βούτηξα', imperative: 'βούτηξε / βουτήξτε', translationEN: 'dip, dive', translationRU: 'окунать, нырять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 294, present: 'βράζω', future: 'θα βράσω', aorist: 'έβρασα', imperative: 'βράσε / βράστε', translationEN: 'boil', translationRU: 'кипятить, варить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 295, present: 'βραχυκυκλώνω', future: 'θα βραχυκυκλώσω', aorist: 'βραχυκύκλωσα', imperative: 'βραχυκύκλωσε / βραχυκυκλώστε', translationEN: 'short-circuit', translationRU: 'замыкать накоротко', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 296, present: 'βρέχομαι', future: 'θα βραχώ', aorist: 'βράχηκα', imperative: 'βρέξου / βραχείτε', translationEN: 'get wet', translationRU: 'мокнуть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 297, present: 'βρέχω', future: 'θα βρέξω', aorist: 'έβρεξα', imperative: 'βρέξε / βρέξτε', translationEN: 'wet; rain', translationRU: 'мочить; идти (о дожде)', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 298, present: 'βρίζω', future: 'θα βρίσω', aorist: 'έβρισα', imperative: 'βρίσε / βρίστε', translationEN: 'swear at, insult', translationRU: 'ругать, оскорблять', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 299, present: 'βρίσκω', future: 'θα βρω', aorist: 'βρήκα', imperative: 'βρες / βρείτε', translationEN: 'find', translationRU: 'находить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 300, present: 'βροντώ', future: 'θα βροντήξω', aorist: 'βρόντηξα', imperative: 'βρόντηξε / βροντήξτε', translationEN: 'thunder, bang', translationRU: 'греметь', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 301, present: 'βρυχώμαι', future: 'θα βρυχηθώ', aorist: 'βρυχήθηκα', imperative: null, translationEN: 'roar', translationRU: 'рычать, рёвом реветь', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 302, present: 'βυθίζομαι', future: 'θα βυθιστώ', aorist: 'βυθίστηκα', imperative: 'βυθίσου / βυθιστείτε', translationEN: 'sink, plunge', translationRU: 'тонуть, погружаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 303, present: 'βυθίζω', future: 'θα βυθίσω', aorist: 'βύθισα', imperative: 'βύθισε / βυθίστε', translationEN: 'sink (transitive), immerse', translationRU: 'топить, погружать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 304, present: 'γαβγίζω', future: 'θα γαβγίσω', aorist: 'γάβγισα', imperative: 'γάβγισε / γαβγίστε', translationEN: 'bark', translationRU: 'лаять', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 305, present: 'γαργαλώ', future: 'θα γαργαλήσω', aorist: 'γαργάλησα', imperative: 'γαργάλησε / γαργαλήστε', translationEN: 'tickle', translationRU: 'щекотать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 306, present: 'γδέρνω', future: 'θα γδάρω', aorist: 'έγδαρα', imperative: 'γδάρε / γδάρτε', translationEN: 'scrape, skin', translationRU: 'сдирать, обдирать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 307, present: 'γδύνω', future: 'θα γδύσω', aorist: 'έγδυσα', imperative: 'γδύσε / γδύστε', translationEN: 'undress (someone)', translationRU: 'раздевать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 308, present: 'γειώνω', future: 'θα γειώσω', aorist: 'γείωσα', imperative: 'γείωσε / γειώστε', translationEN: 'ground (electrical)', translationRU: 'заземлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 309, present: 'γελιέμαι', future: 'θα γελαστώ', aorist: 'γελάστηκα', imperative: null, translationEN: 'be mistaken', translationRU: 'ошибаться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 310, present: 'γελοιοποιώ', future: 'θα γελοιοποιήσω', aorist: 'γελοιοποίησα', imperative: 'γελοιοποίησε / γελοιοποιήστε', translationEN: 'ridicule', translationRU: 'выставлять на посмешище', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 311, present: 'γελώ', future: 'θα γελάσω', aorist: 'γέλασα', imperative: 'γέλασε / γελάστε', translationEN: 'laugh', translationRU: 'смеяться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 312, present: 'γεμίζω', future: 'θα γεμίσω', aorist: 'γέμισα', imperative: 'γέμισε / γεμίστε', translationEN: 'fill', translationRU: 'наполнять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 313, present: 'γεννιέμαι', future: 'θα γεννηθώ', aorist: 'γεννήθηκα', imperative: null, translationEN: 'be born', translationRU: 'рождаться', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 314, present: 'γεννοβολώ', future: 'θα γεννοβολήσω', aorist: 'γεννοβόλησα', imperative: 'γεννοβόλησε / γεννοβολήστε', translationEN: 'breed, bear young', translationRU: 'плодиться, приносить потомство', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 315, present: 'γεννώ', future: 'θα γεννήσω', aorist: 'γέννησα', imperative: 'γέννησε / γεννήστε', translationEN: 'give birth', translationRU: 'рожать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 316, present: 'γερνώ', future: 'θα γεράσω', aorist: 'γέρασα', imperative: null, translationEN: 'grow old', translationRU: 'стареть', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 317, present: 'γέρνω', future: 'θα γείρω', aorist: 'έγειρα', imperative: 'γείρε / γείρτε', translationEN: 'lean, tilt', translationRU: 'наклоняться, клониться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 318, present: 'γεύομαι', future: 'θα γευτώ', aorist: 'γεύτηκα', imperative: 'γεύσου / γευτείτε', translationEN: 'taste', translationRU: 'пробовать на вкус', lexicalCategory: ['lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 319, present: 'γιατρεύω', future: 'θα γιατρέψω', aorist: 'γιάτρεψα', imperative: 'γιάτρεψε / γιατρέψτε', translationEN: 'cure', translationRU: 'лечить', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 320, present: 'γίνομαι', future: 'θα γίνω', aorist: 'έγινα', imperative: 'γίνε / γίνετε', translationEN: 'become', translationRU: 'становиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 321, present: 'γιορτάζω', future: 'θα γιορτάσω', aorist: 'γιόρτασα', imperative: 'γιόρτασε / γιορτάστε', translationEN: 'celebrate', translationRU: 'праздновать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 322, present: 'γκρεμίζω', future: 'θα γκρεμίσω', aorist: 'γκρέμισα', imperative: 'γκρέμισε / γκρεμίστε', translationEN: 'demolish', translationRU: 'разрушать, сносить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 323, present: 'γκρινιάζω', future: 'θα γκρινιάξω', aorist: 'γκρίνιαξα', imperative: 'γκρίνιαξε / γκρινιάξτε', translationEN: 'grumble', translationRU: 'ныть, ворчать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 324, present: 'γλείφω', future: 'θα γλείψω', aorist: 'έγλειψα', imperative: 'γλείψε / γλείψτε', translationEN: 'lick', translationRU: 'лизать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 325, present: 'γλεντώ', future: 'θα γλεντήσω', aorist: 'γλέντησα', imperative: 'γλέντησε / γλεντήστε', translationEN: 'party, enjoy oneself', translationRU: 'веселиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 326, present: 'γλιστρώ', future: 'θα γλιστρήσω', aorist: 'γλίστρησα', imperative: 'γλίστρησε / γλιστρήστε', translationEN: 'slip', translationRU: 'скользить', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 327, present: 'γλιτώνω', future: 'θα γλιτώσω', aorist: 'γλίτωσα', imperative: 'γλίτωσε / γλιτώστε', translationEN: 'escape, save, get rid of', translationRU: 'спасаться, избавляться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 328, present: 'γλυκαίνω', future: 'θα γλυκάνω', aorist: 'γλύκανα', imperative: 'γλύκανε / γλυκάνετε', translationEN: 'sweeten', translationRU: 'подслащивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 329, present: 'γλυτώνω', future: 'θα γλυτώσω', aorist: 'γλύτωσα', imperative: 'γλύτωσε / γλυτώστε', translationEN: 'escape, save', translationRU: 'спасаться, избавляться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 330, present: 'γνωρίζω', future: 'θα γνωρίσω', aorist: 'γνώρισα', imperative: 'γνώρισε / γνωρίστε', translationEN: 'know, introduce', translationRU: 'знать, знакомить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 331, present: 'γογγύζω', future: 'θα γογγύσω', aorist: 'γόγγυσα', imperative: null, translationEN: 'grumble, murmur', translationRU: 'ворчать, роптать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 332, present: 'γοητεύομαι', future: 'θα γοητευτώ', aorist: 'γοητεύτηκα', imperative: 'γοητεύσου / γοητευτείτε', translationEN: 'be charmed', translationRU: 'очаровываться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 333, present: 'γοητεύω', future: 'θα γοητεύσω', aorist: 'γοήτευσα', imperative: 'γοήτευσε / γοητεύστε', translationEN: 'charm', translationRU: 'очаровывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 334, present: 'γονατίζω', future: 'θα γονατίσω', aorist: 'γονάτισα', imperative: 'γονάτισε / γονατίστε', translationEN: 'kneel', translationRU: 'становиться на колени', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 335, present: 'γονιμοποιώ', future: 'θα γονιμοποιήσω', aorist: 'γονιμοποίησα', imperative: 'γονιμοποίησε / γονιμοποιήστε', translationEN: 'fertilize', translationRU: 'оплодотворять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 336, present: 'γρατζουνώ', future: 'θα γρατζουνίσω', aorist: 'γρατζούνισα', imperative: 'γρατζούνισε / γρατζουνίστε', translationEN: 'scratch', translationRU: 'царапать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 337, present: 'γράφω', future: 'θα γράψω', aorist: 'έγραψα', imperative: 'γράψε / γράψτε', translationEN: 'write', translationRU: 'писать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 338, present: 'γρυλίζω', future: 'θα γρυλίσω', aorist: 'γρύλισα', imperative: 'γρύλισε / γρυλίστε', translationEN: 'growl', translationRU: 'рычать (о животных), хрюкать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 339, present: 'γυαλίζω', future: 'θα γυαλίσω', aorist: 'γύαλισα', imperative: 'γύαλισε / γυαλίστε', translationEN: 'polish', translationRU: 'полировать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 340, present: 'γυμνάζομαι', future: 'θα γυμναστώ', aorist: 'γυμνάστηκα', imperative: 'γυμνάσου / γυμναστείτε', translationEN: 'exercise', translationRU: 'заниматься спортом, тренироваться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 341, present: 'γυμνάζω', future: 'θα γυμνάσω', aorist: 'γύμνασα', imperative: 'γύμνασε / γυμνάστε', translationEN: 'train, exercise (someone)', translationRU: 'тренировать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 342, present: 'γυρεύω', future: 'θα γυρέψω', aorist: 'γύρεψα', imperative: 'γύρεψε / γυρέψτε', translationEN: 'seek, look for', translationRU: 'искать, добиваться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 343, present: 'γυρίζω', future: 'θα γυρίσω', aorist: 'γύρισα', imperative: 'γύρισε / γυρίστε', translationEN: 'turn, return', translationRU: 'поворачивать, возвращаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 344, present: 'δαγκώνω', future: 'θα δαγκώσω', aorist: 'δάγκωσα', imperative: 'δάγκωσε / δαγκώστε', translationEN: 'bite', translationRU: 'кусать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 345, present: 'δακρύζω', future: 'θα δακρύσω', aorist: 'δάκρυσα', imperative: null, translationEN: 'shed tears', translationRU: 'наворачиваться слезам', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 346, present: 'δακτυλογραφώ', future: 'θα δακτυλογραφήσω', aorist: 'δακτυλογράφησα', imperative: 'δακτυλογράφησε / δακτυλογραφήστε', translationEN: 'type', translationRU: 'печатать на машинке', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 347, present: 'δαμάζω', future: 'θα δαμάσω', aorist: 'δάμασα', imperative: 'δάμασε / δαμάστε', translationEN: 'tame, subdue', translationRU: 'укрощать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 348, present: 'δανείζομαι', future: 'θα δανειστώ', aorist: 'δανείστηκα', imperative: 'δανείσου / δανειστείτε', translationEN: 'borrow', translationRU: 'занимать (у кого-л.)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 349, present: 'δανείζω', future: 'θα δανείσω', aorist: 'δάνεισα', imperative: 'δάνεισε / δανείστε', translationEN: 'lend', translationRU: 'одалживать (кому-л.)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 350, present: 'δειλιάζω', future: 'θα δειλιάσω', aorist: 'δείλιασα', imperative: 'δείλιασε / δειλιάστε', translationEN: 'lose courage', translationRU: 'трусить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 351, present: 'δειπνώ', future: 'θα δειπνήσω', aorist: 'δείπνησα', imperative: 'δείπνησε / δειπνήστε', translationEN: 'dine', translationRU: 'ужинать', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 352, present: 'δείχνω', future: 'θα δείξω', aorist: 'έδειξα', imperative: 'δείξε / δείξτε', translationEN: 'show', translationRU: 'показывать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 353, present: 'δένομαι', future: 'θα δεθώ', aorist: 'δέθηκα', imperative: 'δέσου / δεθείτε', translationEN: 'be tied, become attached', translationRU: 'привязываться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 354, present: 'δένω', future: 'θα δέσω', aorist: 'έδεσα', imperative: 'δέσε / δέστε', translationEN: 'tie', translationRU: 'завязывать, привязывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 355, present: 'δέρνω', future: 'θα δείρω', aorist: 'έδειρα', imperative: 'δείρε / δείρτε', translationEN: 'beat', translationRU: 'бить', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 356, present: 'δεσμεύω', future: 'θα δεσμεύσω', aorist: 'δέσμευσα', imperative: 'δέσμευσε / δεσμεύστε', translationEN: 'bind, commit', translationRU: 'связывать, обязывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 357, present: 'δεσπόζω', future: 'θα δεσπόσω', aorist: 'δέσποσα', imperative: 'δέσποσε / δεσπόστε', translationEN: 'dominate, tower over', translationRU: 'возвышаться, господствовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 358, present: 'δέχομαι', future: 'θα δεχτώ', aorist: 'δέχτηκα', imperative: 'δέξου / δεχτείτε', translationEN: 'accept, receive', translationRU: 'принимать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 359, present: 'δηλώνω', future: 'θα δηλώσω', aorist: 'δήλωσα', imperative: 'δήλωσε / δηλώστε', translationEN: 'declare', translationRU: 'заявлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 360, present: 'δημιουργώ', future: 'θα δημιουργήσω', aorist: 'δημιούργησα', imperative: 'δημιούργησε / δημιουργήστε', translationEN: 'create', translationRU: 'создавать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 361, present: 'δημοπρατώ', future: 'θα δημοπρατήσω', aorist: 'δημοπράτησα', imperative: 'δημοπράτησε / δημοπρατήστε', translationEN: 'auction off', translationRU: 'выставлять на торги', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 362, present: 'δημοσιεύω', future: 'θα δημοσιεύσω', aorist: 'δημοσίευσα', imperative: 'δημοσίευσε / δημοσιεύστε', translationEN: 'publish', translationRU: 'публиковать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 363, present: 'διαβάζω', future: 'θα διαβάσω', aorist: 'διάβασα', imperative: 'διάβασε / διαβάστε', translationEN: 'read, study', translationRU: 'читать, учить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 364, present: 'διαβεβαιώνω', future: 'θα διαβεβαιώσω', aorist: 'διαβεβαίωσα', imperative: 'διαβεβαίωσε / διαβεβαιώστε', translationEN: 'assure', translationRU: 'заверять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 365, present: 'διαβρέχω', future: 'θα διαβρέξω', aorist: 'διέβρεξα', imperative: 'διάβρεξε / διαβρέξτε', translationEN: 'soak, drench', translationRU: 'смачивать, промачивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 366, present: 'διαβρώνω', future: 'θα διαβρώσω', aorist: 'διάβρωσα', imperative: 'διάβρωσε / διαβρώστε', translationEN: 'erode, corrode', translationRU: 'разъедать, подтачивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 367, present: 'διαγράφω', future: 'θα διαγράψω', aorist: 'διέγραψα', imperative: 'διάγραψε / διαγράψτε', translationEN: 'delete', translationRU: 'удалять, стирать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 368, present: 'διαγωνίζομαι', future: 'θα διαγωνιστώ', aorist: 'διαγωνίστηκα', imperative: 'διαγωνίσου / διαγωνιστείτε', translationEN: 'compete', translationRU: 'соревноваться', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 369, present: 'διαδηλώνω', future: 'θα διαδηλώσω', aorist: 'διαδήλωσα', imperative: 'διαδήλωσε / διαδηλώστε', translationEN: 'demonstrate, protest', translationRU: 'участвовать в демонстрации', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 370, present: 'διαδίδομαι', future: 'θα διαδοθώ', aorist: 'διαδόθηκα', imperative: 'διαδόσου / διαδοθείτε', translationEN: 'spread (news)', translationRU: 'распространяться (о слухах)', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 371, present: 'διαδίδω', future: 'θα διαδώσω', aorist: 'διέδωσα', imperative: 'διάδωσε / διαδώστε', translationEN: 'spread (news)', translationRU: 'распространять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 372, present: 'διαζεύγομαι', future: 'θα διαζευχθώ', aorist: 'διαζεύχθηκα', imperative: 'διαζεύξου / διαζευχθείτε', translationEN: 'get divorced', translationRU: 'разводиться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 373, present: 'διαθέτω', future: 'θα διαθέσω', aorist: 'διέθεσα', imperative: 'διάθεσε / διαθέστε', translationEN: 'have at one\'s disposal', translationRU: 'располагать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 374, present: 'διαθλώ', future: 'θα διαθλάσω', aorist: 'διέθλασα', imperative: 'διάθλασε / διαθλάστε', translationEN: 'refract', translationRU: 'преломлять', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 375, present: 'διαιρώ', future: 'θα διαιρέσω', aorist: 'διαίρεσα', imperative: 'διαίρεσε / διαιρέστε', translationEN: 'divide', translationRU: 'делить (мат.)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 376, present: 'διαισθάνομαι', future: 'θα διαισθανθώ', aorist: 'διαισθάνθηκα', imperative: 'διαισθάνσου / διαισθανθείτε', translationEN: 'sense, intuit', translationRU: 'чувствовать интуитивно', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 377, present: 'διαιτητεύω', future: 'θα διαιτητεύσω', aorist: 'διαιτήτευσα', imperative: 'διαιτήτευσε / διαιτητεύστε', translationEN: 'referee', translationRU: 'судить (матч)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 378, present: 'διακηρύσσω', future: 'θα διακηρύξω', aorist: 'διακήρυξα', imperative: 'διακήρυξε / διακηρύξτε', translationEN: 'proclaim', translationRU: 'провозглашать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 379, present: 'διακινώ', future: 'θα διακινήσω', aorist: 'διακίνησα', imperative: 'διακίνησε / διακινήστε', translationEN: 'distribute, traffic', translationRU: 'перевозить, распространять', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 380, present: 'διακομίζω', future: 'θα διακομίσω', aorist: 'διακόμισα', imperative: 'διακόμισε / διακομίστε', translationEN: 'transport, convey', translationRU: 'перевозить, доставлять', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 381, present: 'διακόπτω', future: 'θα διακόψω', aorist: 'διέκοψα', imperative: 'διάκοψε / διακόψτε', translationEN: 'interrupt', translationRU: 'прерывать', lexicalCategory: ['lexicalTime','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 382, present: 'διακοσμώ', future: 'θα διακοσμήσω', aorist: 'διακόσμησα', imperative: 'διακόσμησε / διακοσμήστε', translationEN: 'decorate', translationRU: 'украшать, декорировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 383, present: 'διακρίνομαι', future: 'θα διακριθώ', aorist: 'διακρίθηκα', imperative: 'διακρίσου / διακριθείτε', translationEN: 'distinguish oneself, excel', translationRU: 'отличаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 384, present: 'διακρίνω', future: null, aorist: 'διέκρινα', imperative: 'διάκρινε / διακρίνετε', translationEN: 'distinguish', translationRU: 'различать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 385, present: 'διαλέγω', future: 'θα διαλέξω', aorist: 'διάλεξα', imperative: 'διάλεξε / διαλέξτε', translationEN: 'choose', translationRU: 'выбирать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 386, present: 'διαλύομαι', future: 'θα διαλυθώ', aorist: 'διαλύθηκα', imperative: 'διαλύσου / διαλυθείτε', translationEN: 'dissolve, fall apart', translationRU: 'растворяться, распадаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 387, present: 'διαλύω', future: 'θα διαλύσω', aorist: 'διέλυσα', imperative: 'διάλυσε / διαλύστε', translationEN: 'dissolve, break up', translationRU: 'растворять, распускать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 388, present: 'διαμαρτύρομαι', future: 'θα διαμαρτυρηθώ', aorist: 'διαμαρτυρήθηκα', imperative: 'διαμαρτυρήσου / διαμαρτυρηθείτε', translationEN: 'protest, complain', translationRU: 'протестовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 389, present: 'διαμοιράζω', future: 'θα διαμοιράσω', aorist: 'διαμοίρασα', imperative: 'διαμοίρασε / διαμοιράστε', translationEN: 'distribute, share out', translationRU: 'раздавать, распределять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 390, present: 'διαμορφώνω', future: 'θα διαμορφώσω', aorist: 'διαμόρφωσα', imperative: 'διαμόρφωσε / διαμορφώστε', translationEN: 'shape, configure', translationRU: 'формировать, настраивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 391, present: 'διανέμω', future: 'θα διανείμω', aorist: 'διένειμα', imperative: 'διάνειμε / διανείμετε', translationEN: 'distribute', translationRU: 'распределять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 392, present: 'διαπαιδαγωγώ', future: 'θα διαπαιδαγωγήσω', aorist: 'διαπαιδαγώγησα', imperative: 'διαπαιδαγώγησε / διαπαιδαγωγήστε', translationEN: 'educate, bring up', translationRU: 'воспитывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 393, present: 'διαπερνώ', future: 'θα διαπεράσω', aorist: 'διαπέρασα', imperative: 'διαπέρασε / διαπεράστε', translationEN: 'pass through, penetrate', translationRU: 'пронзать, проходить насквозь', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 394, present: 'διαπιστώνω', future: 'θα διαπιστώσω', aorist: 'διαπίστωσα', imperative: 'διαπίστωσε / διαπιστώστε', translationEN: 'ascertain', translationRU: 'констатировать', lexicalCategory: ['lexicalSense','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 395, present: 'διαποτίζω', future: 'θα διαποτίσω', aorist: 'διαπότισα', imperative: 'διαπότισε / διαποτίστε', translationEN: 'saturate, permeate', translationRU: 'пропитывать, насыщать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 396, present: 'διαπραγματεύομαι', future: 'θα διαπραγματευτώ', aorist: 'διαπραγματεύτηκα', imperative: 'διαπραγματεύσου / διαπραγματευτείτε', translationEN: 'negotiate', translationRU: 'вести переговоры', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 397, present: 'διαπρέπω', future: 'θα διαπρέψω', aorist: 'διέπρεψα', imperative: 'διάπρεψε / διαπρέψτε', translationEN: 'excel', translationRU: 'выдаваться, блистать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 398, present: 'διαρκώ', future: 'θα διαρκέσω', aorist: 'διήρκεσα', imperative: null, translationEN: 'last', translationRU: 'длиться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 399, present: 'διαρρέω', future: 'θα διαρρεύσω', aorist: 'διέρρευσα', imperative: 'διάρρευσε / διαρρεύστε', translationEN: 'leak', translationRU: 'протекать, просачиваться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 400, present: 'διασκεδάζω', future: 'θα διασκεδάσω', aorist: 'διασκέδασα', imperative: 'διασκέδασε / διασκεδάστε', translationEN: 'have fun, entertain', translationRU: 'развлекаться, развлекать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 401, present: 'διασπώ', future: 'θα διασπάσω', aorist: 'διέσπασα', imperative: 'διάσπασε / διασπάστε', translationEN: 'split, divide', translationRU: 'расщеплять, раскалывать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 402, present: 'διασταυρώνω', future: 'θα διασταυρώσω', aorist: 'διασταύρωσα', imperative: 'διασταύρωσε / διασταυρώστε', translationEN: 'cross, intersect', translationRU: 'скрещивать, пересекать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 403, present: 'διαστέλλω', future: 'θα διαστείλω', aorist: 'διέστειλα', imperative: 'διάστειλε / διαστείλετε', translationEN: 'expand, dilate', translationRU: 'расширять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 404, present: 'διασύρω', future: 'θα διασύρω', aorist: 'διέσυρα', imperative: 'διάσυρε / διασύρετε', translationEN: 'disparage, discredit', translationRU: 'порочить, позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 405, present: 'διασχίζω', future: 'θα διασχίσω', aorist: 'διέσχισα', imperative: 'διάσχισε / διασχίστε', translationEN: 'cross', translationRU: 'пересекать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 406, present: 'διατάζω', future: 'θα διατάξω', aorist: 'διέταξα', imperative: 'διάταξε / διατάξτε', translationEN: 'order, command', translationRU: 'приказывать', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 407, present: 'διατηρώ', future: 'θα διατηρήσω', aorist: 'διατήρησα', imperative: 'διατήρησε / διατηρήστε', translationEN: 'maintain, preserve', translationRU: 'сохранять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 408, present: 'διατρέχω', future: 'θα διατρέξω', aorist: 'διέτρεξα', imperative: 'διάτρεξε / διατρέξτε', translationEN: 'run through, risk', translationRU: 'пробегать, подвергаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 409, present: 'διατυμπανίζω', future: 'θα διατυμπανίσω', aorist: 'διατυμπάνισα', imperative: 'διατυμπάνισε / διατυμπανίστε', translationEN: 'trumpet, proclaim loudly', translationRU: 'трубить, раструбить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 410, present: 'διατυπώνω', future: 'θα διατυπώσω', aorist: 'διατύπωσα', imperative: 'διατύπωσε / διατυπώστε', translationEN: 'formulate', translationRU: 'формулировать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 411, present: 'διαφέρω', future: null, aorist: 'διέφερα', imperative: null, translationEN: 'differ', translationRU: 'отличаться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 412, present: 'διαφημίζω', future: 'θα διαφημίσω', aorist: 'διαφήμισα', imperative: 'διαφήμισε / διαφημίστε', translationEN: 'advertise', translationRU: 'рекламировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 413, present: 'διαφωνώ', future: 'θα διαφωνήσω', aorist: 'διαφώνησα', imperative: 'διαφώνησε / διαφωνήστε', translationEN: 'disagree', translationRU: 'не соглашаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 414, present: 'διαχειρίζομαι', future: 'θα διαχειριστώ', aorist: 'διαχειρίστηκα', imperative: 'διαχειρίσου / διαχειριστείτε', translationEN: 'manage', translationRU: 'управлять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 415, present: 'διαχέομαι', future: 'θα διαχυθώ', aorist: 'διαχύθηκα', imperative: 'διαχύσου / διαχυθείτε', translationEN: 'spread, diffuse', translationRU: 'растекаться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 416, present: 'διαχέω', future: 'θα διαχύσω', aorist: 'διέχυσα', imperative: 'διάχυσε / διαχύστε', translationEN: 'diffuse', translationRU: 'рассеивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 417, present: 'διαχωρίζω', future: 'θα διαχωρίσω', aorist: 'διαχώρισα', imperative: 'διαχώρισε / διαχωρίστε', translationEN: 'separate', translationRU: 'разделять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 418, present: 'διαψεύδω', future: 'θα διαψεύσω', aorist: 'διέψευσα', imperative: 'διάψευσε / διαψεύστε', translationEN: 'deny, disprove', translationRU: 'опровергать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 419, present: 'διδάσκω', future: 'θα διδάξω', aorist: 'δίδαξα', imperative: 'δίδαξε / διδάξτε', translationEN: 'teach', translationRU: 'преподавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 420, present: 'διεισδύω', future: 'θα διεισδύσω', aorist: 'διείσδυσα', imperative: 'διείσδυσε / διεισδύστε', translationEN: 'penetrate', translationRU: 'проникать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 421, present: 'διεκδικώ', future: 'θα διεκδικήσω', aorist: 'διεκδίκησα', imperative: 'διεκδίκησε / διεκδικήστε', translationEN: 'claim, demand', translationRU: 'требовать, добиваться', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 422, present: 'διέρχομαι', future: 'θα διέλθω', aorist: 'διήλθα', imperative: 'δίελθε / διέλθετε', translationEN: 'pass through', translationRU: 'проходить через', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 423, present: 'διερωτώμαι', future: 'θα διερωτηθώ', aorist: 'διερωτήθηκα', imperative: 'διερωτήσου / διερωτηθείτε', translationEN: 'wonder', translationRU: 'задаваться вопросом', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 424, present: 'διευθετώ', future: 'θα διευθετήσω', aorist: 'διευθέτησα', imperative: 'διευθέτησε / διευθετήστε', translationEN: 'arrange, settle', translationRU: 'улаживать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 425, present: 'διευθύνω', future: null, aorist: 'διεύθυνα', imperative: 'διεύθυνε / διευθύνετε', translationEN: 'direct, manage', translationRU: 'руководить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 426, present: 'διευκολύνω', future: 'θα διευκολύνω', aorist: 'διευκόλυνα', imperative: 'διευκόλυνε / διευκολύνετε', translationEN: 'facilitate, make easier', translationRU: 'облегчать, содействовать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 427, present: 'διευκρινίζω', future: 'θα διευκρινίσω', aorist: 'διευκρίνισα', imperative: 'διευκρίνισε / διευκρινίστε', translationEN: 'clarify', translationRU: 'уточнять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 428, present: 'διηγούμαι', future: 'θα διηγηθώ', aorist: 'διηγήθηκα', imperative: 'διηγήσου / διηγηθείτε', translationEN: 'narrate, tell', translationRU: 'рассказывать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 429, present: 'δικάζομαι', future: 'θα δικαστώ', aorist: 'δικάστηκα', imperative: 'δικάσου / δικαστείτε', translationEN: 'stand trial', translationRU: 'быть под судом', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 430, present: 'δικάζω', future: 'θα δικάσω', aorist: 'δίκασα', imperative: 'δίκασε / δικάστε', translationEN: 'judge, try', translationRU: 'судить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 431, present: 'δικαιολογώ', future: 'θα δικαιολογήσω', aorist: 'δικαιολόγησα', imperative: 'δικαιολόγησε / δικαιολογήστε', translationEN: 'justify, excuse', translationRU: 'оправдывать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 432, present: 'δίνω', future: 'θα δώσω', aorist: 'έδωσα', imperative: 'δώσε / δώστε', translationEN: 'give', translationRU: 'давать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 433, present: 'διορθώνω', future: 'θα διορθώσω', aorist: 'διόρθωσα', imperative: 'διόρθωσε / διορθώστε', translationEN: 'correct, fix', translationRU: 'исправлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 434, present: 'διορίζω', future: 'θα διορίσω', aorist: 'διόρισα', imperative: 'διόρισε / διορίστε', translationEN: 'appoint', translationRU: 'назначать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 435, present: 'διπλώνω', future: 'θα διπλώσω', aorist: 'δίπλωσα', imperative: 'δίπλωσε / διπλώστε', translationEN: 'fold', translationRU: 'складывать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 436, present: 'διστάζω', future: 'θα διστάσω', aorist: 'δίστασα', imperative: 'δίστασε / διστάστε', translationEN: 'hesitate', translationRU: 'колебаться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 437, present: 'διυλίζω', future: 'θα διυλίσω', aorist: 'διύλισα', imperative: 'διύλισε / διυλίστε', translationEN: 'filter, refine', translationRU: 'фильтровать, очищать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 438, present: 'διψώ', future: 'θα διψάσω', aorist: 'δίψασα', imperative: null, translationEN: 'be thirsty', translationRU: 'хотеть пить', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 439, present: 'διώχνω', future: 'θα διώξω', aorist: 'έδιωξα', imperative: 'δίωξε / διώξτε', translationEN: 'chase away, fire', translationRU: 'прогонять, увольнять', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 440, present: 'δοκιμάζω', future: 'θα δοκιμάσω', aorist: 'δοκίμασα', imperative: 'δοκίμασε / δοκιμάστε', translationEN: 'try, taste', translationRU: 'пробовать, примерять', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 441, present: 'δοξάζω', future: 'θα δοξάσω', aorist: 'δόξασα', imperative: 'δόξασε / δοξάστε', translationEN: 'glorify', translationRU: 'прославлять', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 442, present: 'δουλεύω', future: 'θα δουλέψω', aorist: 'δούλεψα', imperative: 'δούλεψε / δουλέψτε', translationEN: 'work', translationRU: 'работать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 443, present: 'δραπετεύω', future: 'θα δραπετεύσω', aorist: 'δραπέτευσα', imperative: 'δραπέτευσε / δραπετεύστε', translationEN: 'escape', translationRU: 'сбегать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 444, present: 'δρέπω', future: 'θα δρέψω', aorist: 'έδρεψα', imperative: 'δρέψε / δρέψτε', translationEN: 'reap, pluck', translationRU: 'пожинать, срывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 445, present: 'δρομολογώ', future: 'θα δρομολογήσω', aorist: 'δρομολόγησα', imperative: 'δρομολόγησε / δρομολογήστε', translationEN: 'route, schedule', translationRU: 'маршрутизировать, запускать', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 446, present: 'δροσίζομαι', future: 'θα δροσιστώ', aorist: 'δροσίστηκα', imperative: 'δροσίσου / δροσιστείτε', translationEN: 'cool down, refresh oneself', translationRU: 'освежаться, охлаждаться', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 447, present: 'δροσίζω', future: 'θα δροσίσω', aorist: 'δρόσισα', imperative: 'δρόσισε / δροσίστε', translationEN: 'cool, refresh', translationRU: 'освежать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 448, present: 'δυναμώνω', future: 'θα δυναμώσω', aorist: 'δυνάμωσα', imperative: 'δυνάμωσε / δυναμώστε', translationEN: 'strengthen', translationRU: 'усиливать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 449, present: 'δυσανασχετώ', future: 'θα δυσανασχετήσω', aorist: 'δυσανασχέτησα', imperative: 'δυσανασχέτησε / δυσανασχετήστε', translationEN: 'be displeased', translationRU: 'быть недовольным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 450, present: 'δυσκολεύομαι', future: 'θα δυσκολευτώ', aorist: 'δυσκολεύτηκα', imperative: 'δυσκολέψου / δυσκολευτείτε', translationEN: 'have difficulty', translationRU: 'затрудняться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 451, present: 'δυσκολεύω', future: 'θα δυσκολέψω', aorist: 'δυσκόλεψα', imperative: 'δυσκόλεψε / δυσκολέψτε', translationEN: 'make difficult', translationRU: 'затруднять', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 452, present: 'δυστυχώ', future: 'θα δυστυχήσω', aorist: 'δυστύχησα', imperative: 'δυστύχησε / δυστυχήστε', translationEN: 'be unhappy', translationRU: 'быть несчастным', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 453, present: 'δύω', future: 'θα δύσω', aorist: 'έδυσα', imperative: 'δύσε / δύστε', translationEN: 'set (sun)', translationRU: 'заходить (о солнце)', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 454, present: 'δωρεοδοτώ', future: 'θα δωρεοδοτήσω', aorist: 'δωρεοδότησα', imperative: 'δωρεοδότησε / δωρεοδοτήστε', translationEN: 'donate', translationRU: 'жертвовать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 455, present: 'δωρίζω', future: 'θα δωρίσω', aorist: 'δώρισα', imperative: 'δώρισε / δωρίστε', translationEN: 'donate, gift', translationRU: 'дарить, жертвовать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 456, present: 'δωροδοκώ', future: 'θα δωροδοκήσω', aorist: 'δωροδόκησα', imperative: 'δωροδόκησε / δωροδοκήστε', translationEN: 'bribe', translationRU: 'подкупать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 457, present: 'εγγράφομαι', future: 'θα εγγραφώ', aorist: 'εγγράφηκα', imperative: 'εγγράψου / εγγραφείτε', translationEN: 'enroll, register', translationRU: 'записываться, регистрироваться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 458, present: 'εγγράφω', future: 'θα εγγράψω', aorist: 'ενέγραψα', imperative: 'εγγράψε / εγγράψτε', translationEN: 'register, enter', translationRU: 'вносить в список', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 459, present: 'εγγυώμαι', future: 'θα εγγυηθώ', aorist: 'εγγυήθηκα', imperative: 'εγγυήσου / εγγυηθείτε', translationEN: 'guarantee', translationRU: 'гарантировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 460, present: 'εγκαθιστώ', future: 'θα εγκαταστήσω', aorist: 'εγκατέστησα', imperative: 'εγκατάστησε / εγκαταστήστε', translationEN: 'install, settle', translationRU: 'устанавливать, поселять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 461, present: 'εγκαταλείπω', future: 'θα εγκαταλείψω', aorist: 'εγκατέλειψα', imperative: 'εγκατάλειψε / εγκαταλείψτε', translationEN: 'abandon', translationRU: 'бросать, покидать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 462, present: 'εγκρίνω', future: null, aorist: 'ενέκρινα', imperative: 'έγκρινε / εγκρίνετε', translationEN: 'approve', translationRU: 'одобрять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 463, present: 'ειδοποιώ', future: 'θα ειδοποιήσω', aorist: 'ειδοποίησα', imperative: 'ειδοποίησε / ειδοποιήστε', translationEN: 'notify', translationRU: 'уведомлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 464, present: 'είμαι', future: null, aorist: 'ήμουν', imperative: null, translationEN: 'be', translationRU: 'быть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarIrregular']},
  {id: 465, present: 'εισάγω', future: 'θα εισαγάγω', aorist: 'εισήγαγα', imperative: null, translationEN: 'import, introduce', translationRU: 'импортировать, вводить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 466, present: 'εισβάλλω', future: 'θα εισβάλω', aorist: 'εισέβαλα', imperative: 'εισέβαλε / εισεβάλετε', translationEN: 'invade', translationRU: 'вторгаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 467, present: 'εισέρχομαι', future: 'θα εισέλθω', aorist: 'εισήλθα', imperative: 'είσελθε / εισέλθετε', translationEN: 'enter', translationRU: 'входить', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 468, present: 'εισηγούμαι', future: 'θα εισηγηθώ', aorist: 'εισηγήθηκα', imperative: 'εισηγήσου / εισηγηθείτε', translationEN: 'propose, recommend', translationRU: 'предлагать, докладывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 469, present: 'εισπράττω', future: 'θα εισπράξω', aorist: 'εισέπραξα', imperative: 'είσπραξε / εισπράξτε', translationEN: 'collect (money)', translationRU: 'получать (деньги)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 470, present: 'εισχωρώ', future: 'θα εισχωρήσω', aorist: 'εισχώρησα', imperative: 'εισχώρησε / εισχωρήστε', translationEN: 'penetrate', translationRU: 'проникать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 471, present: 'εκβιάζω', future: 'θα εκβιάσω', aorist: 'εκβίασα', imperative: 'εκβίασε / εκβιάστε', translationEN: 'blackmail', translationRU: 'шантажировать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 472, present: 'εκδηλώνω', future: 'θα εκδηλώσω', aorist: 'εκδήλωσα', imperative: 'εκδήλωσε / εκδηλώστε', translationEN: 'express, manifest', translationRU: 'проявлять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 473, present: 'εκδίδω', future: 'θα εκδώσω', aorist: 'εξέδωσα', imperative: 'έκδωσε / εκδώστε', translationEN: 'publish, issue', translationRU: 'издавать, выдавать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 474, present: 'εκδικούμαι', future: 'θα εκδικηθώ', aorist: 'εκδικήθηκα', imperative: 'εκδικήσου / εκδικηθείτε', translationEN: 'take revenge', translationRU: 'мстить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 475, present: 'εκθειάζω', future: 'θα εκθειάσω', aorist: 'εκθείασα', imperative: 'εκθείασε / εκθειάστε', translationEN: 'extol, praise', translationRU: 'превозносить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 476, present: 'εκθέτω', future: 'θα εκθέσω', aorist: 'έκθεσα', imperative: 'έκθεσε / εκθέστε', translationEN: 'expose, exhibit', translationRU: 'выставлять, подвергать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 477, present: 'εκκινώ', future: 'θα εκκινήσω', aorist: 'εκκίνησα', imperative: 'εκκίνησε / εκκινήστε', translationEN: 'start, launch', translationRU: 'запускать, стартовать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 478, present: 'εκκολάπτω', future: 'θα εκκολάψω', aorist: 'εξέκολαψα', imperative: 'εκκόλαψε / εκκολάψτε', translationEN: 'hatch', translationRU: 'высиживать, выводить', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 479, present: 'εκλέγομαι', future: 'θα εκλεγώ', aorist: 'εκλέχθηκα', imperative: 'εκλέξου / εκλεχθείτε', translationEN: 'be elected', translationRU: 'избираться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 480, present: 'εκλέγω', future: 'θα εκλέξω', aorist: 'εξέλεξα', imperative: null, translationEN: 'elect', translationRU: 'избирать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 481, present: 'εκλιπαρώ', future: 'θα εκλιπαρήσω', aorist: 'εκλιπάρησα', imperative: 'εκλιπάρησε / εκλιπαρήστε', translationEN: 'beg, implore', translationRU: 'умолять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 482, present: 'εκμεταλλεύομαι', future: 'θα εκμεταλλευτώ', aorist: 'εκμεταλλεύτηκα', imperative: 'εκμεταλλεύσου / εκμεταλλευτείτε', translationEN: 'exploit, take advantage of', translationRU: 'использовать, эксплуатировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 483, present: 'εκνευρίζομαι', future: 'θα εκνευριστώ', aorist: 'εκνευρίστηκα', imperative: 'εκνευρίσου / εκνευριστείτε', translationEN: 'get annoyed', translationRU: 'раздражаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 484, present: 'εκνευρίζω', future: 'θα εκνευρίσω', aorist: 'εκνεύρισα', imperative: 'εκνεύρισε / εκνευρίστε', translationEN: 'irritate', translationRU: 'раздражать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 485, present: 'εκπαιδεύομαι', future: 'θα εκπαιδευτώ', aorist: 'εκπαιδεύτηκα', imperative: 'εκπαιδεύσου / εκπαιδευτείτε', translationEN: 'be trained, train', translationRU: 'обучаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 486, present: 'εκπαιδεύω', future: 'θα εκπαιδεύσω', aorist: 'εκπαίδευσα', imperative: 'εκπαίδευσε / εκπαιδεύστε', translationEN: 'train, educate', translationRU: 'обучать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 487, present: 'εκπέμπω', future: 'θα εκπέμψω', aorist: 'εξέπεμψα', imperative: 'εκπέμψε / εκπέμψτε', translationEN: 'emit, broadcast', translationRU: 'излучать, передавать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 488, present: 'εκπληρώνω', future: 'θα εκπληρώσω', aorist: 'εκπλήρωσα', imperative: 'εκπλήρωσε / εκπληρώστε', translationEN: 'fulfill', translationRU: 'исполнять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 489, present: 'εκπλήσσομαι', future: 'θα εκπλαγώ', aorist: 'εκπλάγηκα', imperative: 'εκπλήξου / εκπλαγείτε', translationEN: 'be surprised', translationRU: 'удивляться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 490, present: 'εκπλήσσω', future: 'θα εκπλήξω', aorist: 'εξέπληξα', imperative: 'έκπληξε / εκπλήξτε', translationEN: 'surprise', translationRU: 'удивлять', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 491, present: 'εκριζώνω', future: 'θα εκριζώσω', aorist: 'εκρίζωσα', imperative: 'εκρίζωσε / εκριζώστε', translationEN: 'uproot, eradicate', translationRU: 'вырывать с корнем, искоренять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 492, present: 'εκστομίζω', future: 'θα εκστομίσω', aorist: 'εξέστομισα', imperative: 'εκστόμισε / εκστομίστε', translationEN: 'utter', translationRU: 'изрекать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 493, present: 'εκσυγχρονίζω', future: 'θα εκσυγχρονίσω', aorist: 'εκσυγχρόνισα', imperative: 'εκσυγχρόνισε / εκσυγχρονίστε', translationEN: 'modernize', translationRU: 'модернизировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 494, present: 'εκτείνομαι', future: 'θα εκταθώ', aorist: 'εκτάθηκα', imperative: 'εκτάσου / εκταθείτε', translationEN: 'extend, stretch out', translationRU: 'простираться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 495, present: 'εκτείνω', future: 'θα εκτείνω', aorist: 'εξέτεινα', imperative: 'έκτεινε / εκτείνετε', translationEN: 'extend, stretch', translationRU: 'простирать, вытягивать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 496, present: 'εκτελώ', future: 'θα εκτελέσω', aorist: 'εκτέλεσα', imperative: 'εκτέλεσε / εκτελέστε', translationEN: 'execute, carry out', translationRU: 'выполнять, казнить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 497, present: 'εκτιμώ', future: 'θα εκτιμήσω', aorist: 'εκτίμησα', imperative: 'εκτίμησε / εκτιμήστε', translationEN: 'appreciate, estimate', translationRU: 'ценить, оценивать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 498, present: 'εκτοξεύω', future: 'θα εκτοξεύσω', aorist: 'εκτόξευσα', imperative: 'εκτόξευσε / εκτοξεύστε', translationEN: 'launch, hurl', translationRU: 'запускать, метать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 499, present: 'εκτροχιάζομαι', future: 'θα εκτροχιαστώ', aorist: 'εκτροχιάστηκα', imperative: 'εκτροχιάσου / εκτροχιαστείτε', translationEN: 'derail', translationRU: 'сходить с рельсов', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 500, present: 'εκτυπώνω', future: 'θα εκτυπώσω', aorist: 'εκτύπωσα', imperative: 'εκτύπωσε / εκτυπώστε', translationEN: 'print out', translationRU: 'распечатывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 501, present: 'εκφέρω', future: 'θα εκφέρω', aorist: 'εξέφερα', imperative: 'εκφέρε / εκφέρετε', translationEN: 'utter, express', translationRU: 'произносить, выражать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 502, present: 'εκφοβίζω', future: 'θα εκφοβίσω', aorist: 'εκφόβισα', imperative: 'εκφόβισε / εκφοβίστε', translationEN: 'intimidate', translationRU: 'запугивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 503, present: 'εκφορτώνω', future: 'θα εκφορτώσω', aorist: 'εκφόρτωσα', imperative: 'εκφόρτωσε / εκφορτώστε', translationEN: 'unload', translationRU: 'разгружать', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 504, present: 'εκφράζω', future: 'θα εκφράσω', aorist: 'εξέφρασα', imperative: 'έκφρασε / εκφράστε', translationEN: 'express', translationRU: 'выражать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 505, present: 'εκφωνώ', future: 'θα εκφωνήσω', aorist: 'εκφώνησα', imperative: 'εκφώνησε / εκφωνήστε', translationEN: 'deliver (a speech), announce', translationRU: 'произносить (речь)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 506, present: 'ελαττώνω', future: 'θα ελαττώσω', aorist: 'ελάττωσα', imperative: 'ελάττωσε / ελαττώστε', translationEN: 'reduce', translationRU: 'уменьшать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 507, present: 'ελαφρύνω', future: 'θα ελαφρύνω', aorist: 'ελάφρυνα', imperative: 'ελάφρυνε / ελαφρύνετε', translationEN: 'lighten, relieve', translationRU: 'облегчать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 508, present: 'ελέγχω', future: 'θα ελέγξω', aorist: 'έλεγξα', imperative: 'έλεγξε / ελέγξτε', translationEN: 'check, control', translationRU: 'проверять, контролировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 509, present: 'ελευθερώνω', future: 'θα ελευθερώσω', aorist: 'ελευθέρωσα', imperative: 'ελευθέρωσε / ελευθερώστε', translationEN: 'free', translationRU: 'освобождать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 510, present: 'ελπίζω', future: 'θα ελπίσω', aorist: 'έλπισα', imperative: 'έλπισε / ελπίστε', translationEN: 'hope', translationRU: 'надеяться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 511, present: 'εμβολιάζω', future: 'θα εμβολιάσω', aorist: 'εμβολίασα', imperative: 'εμβολίασε / εμβολιάστε', translationEN: 'vaccinate', translationRU: 'делать прививку', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 512, present: 'εμπίπτω', future: 'θα εμπέσω', aorist: 'ενέπεσα', imperative: 'έμπεσε / εμπέστε', translationEN: 'fall within', translationRU: 'подпадать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 513, present: 'εμπιστεύομαι', future: 'θα εμπιστευτώ', aorist: 'εμπιστεύτηκα', imperative: 'εμπιστεύσου / εμπιστευτείτε', translationEN: 'trust', translationRU: 'доверять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 514, present: 'εμπλέκω', future: 'θα εμπλέξω', aorist: 'ενέπλεξα', imperative: null, translationEN: 'involve, entangle', translationRU: 'вовлекать, запутывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 515, present: 'εμπνέω', future: 'θα εμπνεύσω', aorist: 'ενέπνευσα', imperative: 'έμπνευσε / εμπνεύστε', translationEN: 'inspire', translationRU: 'вдохновлять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 516, present: 'εμποδίζω', future: 'θα εμποδίσω', aorist: 'εμπόδισα', imperative: 'εμπόδισε / εμποδίστε', translationEN: 'prevent, hinder', translationRU: 'мешать, препятствовать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 517, present: 'εμπορεύομαι', future: 'θα εμπορευτώ', aorist: 'εμπορεύτηκα', imperative: null, translationEN: 'trade', translationRU: 'торговать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 518, present: 'εμποτίζω', future: 'θα εμποτίσω', aorist: 'εμπότισα', imperative: 'εμπότισε / εμποτίστε', translationEN: 'soak, impregnate', translationRU: 'пропитывать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 519, present: 'εμφανίζομαι', future: 'θα εμφανιστώ', aorist: 'εμφανίστηκα', imperative: 'εμφανίσου / εμφανιστείτε', translationEN: 'appear', translationRU: 'появляться', lexicalCategory: ['lexicalSense','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
  {id: 520, present: 'εμφανίζω', future: 'θα εμφανίσω', aorist: 'εμφάνισα', imperative: 'εμφάνισε / εμφανίστε', translationEN: 'show, develop (photos)', translationRU: 'показывать, проявлять', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 521, present: 'ενδιαφέρομαι', future: 'θα ενδιαφερθώ', aorist: 'ενδιαφέρθηκα', imperative: 'ενδιαφέρσου / ενδιαφερθείτε', translationEN: 'be interested', translationRU: 'интересоваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 522, present: 'ενδυναμώνω', future: 'θα ενδυναμώσω', aorist: 'ενδυνάμωσα', imperative: 'ενδυνάμωσε / ενδυναμώστε', translationEN: 'strengthen', translationRU: 'укреплять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 523, present: 'ενεργοποιώ', future: 'θα ενεργοποιήσω', aorist: 'ενεργοποίησα', imperative: 'ενεργοποίησε / ενεργοποιήστε', translationEN: 'activate', translationRU: 'активировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 524, present: 'ενεργώ', future: 'θα ενεργήσω', aorist: 'ενήργησα', imperative: 'ενέργησε / ενεργήστε', translationEN: 'act', translationRU: 'действовать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 525, present: 'ενημερώνω', future: 'θα ενημερώσω', aorist: 'ενημέρωσα', imperative: 'ενημέρωσε / ενημερώστε', translationEN: 'inform, update', translationRU: 'информировать, обновлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 526, present: 'ενθαρρύνω', future: null, aorist: 'ενθάρρυνα', imperative: 'ενθάρρυνε / ενθαρρύνετε', translationEN: 'encourage', translationRU: 'поощрять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 527, present: 'ενθουσιάζομαι', future: 'θα ενθουσιαστώ', aorist: 'ενθουσιάστηκα', imperative: 'ενθουσιάσου / ενθουσιαστείτε', translationEN: 'get excited', translationRU: 'восторгаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 528, present: 'ενθουσιάζω', future: 'θα ενθουσιάσω', aorist: 'ενθουσίασα', imperative: 'ενθουσίασε / ενθουσιάστε', translationEN: 'excite, thrill', translationRU: 'восхищать, воодушевлять', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 529, present: 'ενισχύω', future: 'θα ενισχύσω', aorist: 'ενίσχυσα', imperative: 'ενίσχυσε / ενισχύστε', translationEN: 'reinforce, support', translationRU: 'усиливать, поддерживать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 530, present: 'εννοώ', future: 'θα εννοήσω', aorist: 'εννόησα', imperative: 'εννόησε / εννοήστε', translationEN: 'mean', translationRU: 'подразумевать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 531, present: 'ενοικιάζω', future: 'θα ενοικιάσω', aorist: 'ενοικίασα', imperative: 'ενοικίασε / ενοικιάστε', translationEN: 'rent out, rent', translationRU: 'сдавать, арендовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 532, present: 'ενορχηστρώνω', future: 'θα ενορχηστρώσω', aorist: 'ενορχήστρωσα', imperative: 'ενορχήστρωσε / ενορχηστρώστε', translationEN: 'orchestrate', translationRU: 'оркестровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 533, present: 'ενοχλώ', future: 'θα ενοχλήσω', aorist: 'ενόχλησα', imperative: 'ενόχλησε / ενοχλήστε', translationEN: 'bother, disturb', translationRU: 'беспокоить, мешать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 534, present: 'ενσωματώνω', future: 'θα ενσωματώσω', aorist: 'ενσωμάτωσα', imperative: 'ενσωμάτωσε / ενσωματώστε', translationEN: 'integrate, embed', translationRU: 'встраивать, интегрировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 535, present: 'ενταφιάζω', future: 'θα ενταφιάσω', aorist: 'ενταφίασα', imperative: 'ενταφίασε / ενταφιάστε', translationEN: 'inter, bury', translationRU: 'погребать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 536, present: 'ενώνω', future: 'θα ενώσω', aorist: 'ένωσα', imperative: 'ένωσε / ενώστε', translationEN: 'unite, connect', translationRU: 'соединять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 537, present: 'εξαγοράζω', future: 'θα εξαγοράσω', aorist: 'εξαγόρασα', imperative: 'εξαγόρασε / εξαγοράστε', translationEN: 'buy out, bribe', translationRU: 'выкупать, подкупать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 538, present: 'εξάγω', future: 'θα εξάγω', aorist: 'εξήγαγα', imperative: 'εξάγαγε / εξαγάγετε', translationEN: 'export, extract', translationRU: 'экспортировать, извлекать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 539, present: 'εξαερώνω', future: 'θα εξαερώσω', aorist: 'εξαέρωσα', imperative: 'εξαέρωσε / εξαερώστε', translationEN: 'vaporize', translationRU: 'испарять, газифицировать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 540, present: 'εξαιρώ', future: 'θα εξαιρέσω', aorist: 'εξαίρεσα', imperative: 'εξαίρεσε / εξαιρέστε', translationEN: 'exclude, exempt', translationRU: 'исключать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 541, present: 'εξακολουθώ', future: 'θα εξακολουθήσω', aorist: 'εξακολούθησα', imperative: 'εξακολούθησε / εξακολουθήστε', translationEN: 'continue', translationRU: 'продолжать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 542, present: 'εξακριβώνω', future: 'θα εξακριβώσω', aorist: 'εξακρίβωσα', imperative: 'εξακρίβωσε / εξακριβώστε', translationEN: 'ascertain, verify', translationRU: 'удостоверяться, выяснять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 543, present: 'εξαλείφω', future: 'θα εξαλείψω', aorist: 'εξάλειψα', imperative: 'εξάλειψε / εξαλείψτε', translationEN: 'eradicate, erase', translationRU: 'стирать, искоренять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 544, present: 'εξαντλούμαι', future: 'θα εξαντληθώ', aorist: 'εξαντλήθηκα', imperative: 'εξαντλήσου / εξαντληθείτε', translationEN: 'be exhausted', translationRU: 'истощаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 545, present: 'εξαντλώ', future: 'θα εξαντλήσω', aorist: 'εξάντλησα', imperative: 'εξάντλησε / εξαντλήστε', translationEN: 'exhaust', translationRU: 'истощать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 546, present: 'εξαπατώ', future: 'θα εξαπατήσω', aorist: 'εξαπάτησα', imperative: 'εξαπάτησε / εξαπατήστε', translationEN: 'deceive, cheat', translationRU: 'обманывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 547, present: 'εξαπλώνομαι', future: 'θα εξαπλωθώ', aorist: 'εξαπλώθηκα', imperative: 'εξαπλώσου / εξαπλωθείτε', translationEN: 'spread, sprawl', translationRU: 'распространяться, развалиться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
  {id: 548, present: 'εξαπλώνω', future: 'θα εξαπλώσω', aorist: 'εξάπλωσα', imperative: 'εξάπλωσε / εξαπλώστε', translationEN: 'spread out', translationRU: 'распространять, расстилать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 549, present: 'εξαρτώμαι', future: 'θα εξαρτηθώ', aorist: 'εξαρτήθηκα', imperative: null, translationEN: 'depend', translationRU: 'зависеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 550, present: 'εξασκούμαι', future: 'θα εξασκηθώ', aorist: 'εξασκήθηκα', imperative: 'εξασκήσου / εξασκηθείτε', translationEN: 'practice', translationRU: 'упражняться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 551, present: 'εξασκώ', future: 'θα εξασκήσω', aorist: 'εξάσκησα', imperative: 'εξάσκησε / εξασκήστε', translationEN: 'train, exercise', translationRU: 'упражнять, тренировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 552, present: 'εξασφαλίζω', future: 'θα εξασφαλίσω', aorist: 'εξασφάλισα', imperative: 'εξασφάλισε / εξασφαλίστε', translationEN: 'secure, ensure', translationRU: 'обеспечивать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 553, present: 'εξατμίζομαι', future: 'θα εξατμιστώ', aorist: 'εξατμίστηκα', imperative: 'εξατμίσου / εξατμιστείτε', translationEN: 'evaporate', translationRU: 'испаряться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 554, present: 'εξαφανίζομαι', future: 'θα εξαφανιστώ', aorist: 'εξαφανίστηκα', imperative: 'εξαφανίσου / εξαφανιστείτε', translationEN: 'disappear', translationRU: 'исчезать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 555, present: 'εξαφανίζω', future: 'θα εξαφανίσω', aorist: 'εξαφάνισα', imperative: 'εξαφάνισε / εξαφανίστε', translationEN: 'make disappear', translationRU: 'уничтожать, прятать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 556, present: 'εξεγείρομαι', future: 'θα εξεγερθώ', aorist: 'εξεγέρθηκα', imperative: 'εξεγέρσου / εξεγερθείτε', translationEN: 'rebel, rise up', translationRU: 'восставать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 557, present: 'εξελίσσομαι', future: 'θα εξελιχθώ', aorist: 'εξελίχθηκα', imperative: null, translationEN: 'evolve', translationRU: 'развиваться, эволюционировать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 558, present: 'εξέρχομαι', future: 'θα εξέλθω', aorist: 'εξήλθα', imperative: 'έξελθε / εξέλθετε', translationEN: 'exit, go out', translationRU: 'выходить', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 559, present: 'εξετάζομαι', future: 'θα εξεταστώ', aorist: 'εξετάστηκα', imperative: 'εξετάσου / εξεταστείτε', translationEN: 'take an exam', translationRU: 'сдавать экзамен', lexicalCategory: ['lexicalWork','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 560, present: 'εξετάζω', future: 'θα εξετάσω', aorist: 'εξέτασα', imperative: 'εξέτασε / εξετάστε', translationEN: 'examine', translationRU: 'исследовать, экзаменовать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 561, present: 'εξευτελίζω', future: 'θα εξευτελίσω', aorist: 'εξευτέλισα', imperative: 'εξευτέλισε / εξευτελίστε', translationEN: 'humiliate, degrade', translationRU: 'унижать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 562, present: 'εξηγώ', future: 'θα εξηγήσω', aorist: 'εξήγησα', imperative: 'εξήγησε / εξηγήστε', translationEN: 'explain', translationRU: 'объяснять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 563, present: 'εξημερώνω', future: 'θα εξημερώσω', aorist: 'εξημέρωσα', imperative: 'εξημέρωσε / εξημερώστε', translationEN: 'tame, domesticate', translationRU: 'приручать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 564, present: 'εξισώνω', future: 'θα εξισώσω', aorist: 'εξίσωσα', imperative: 'εξίσωσε / εξισώστε', translationEN: 'equalize, level', translationRU: 'уравнивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 565, present: 'εξοικονομώ', future: 'θα εξοικονομήσω', aorist: 'εξοικονόμησα', imperative: 'εξοικονόμησε / εξοικονομήστε', translationEN: 'save (money, time)', translationRU: 'экономить', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 566, present: 'εξολοθρεύω', future: 'θα εξολοθρεύσω', aorist: 'εξολόθρευσα', imperative: 'εξολόθρευσε / εξολοθρεύστε', translationEN: 'wipe out', translationRU: 'истреблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 567, present: 'εξομαλύνω', future: 'θα εξομαλύνω', aorist: 'εξόμαλυνα', imperative: 'εξόμαλυνε / εξομαλύνετε', translationEN: 'smooth out', translationRU: 'сглаживать, налаживать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 568, present: 'εξομολογούμαι', future: 'θα εξομολογηθώ', aorist: 'εξομολογήθηκα', imperative: 'εξομολογήσου / εξομολογηθείτε', translationEN: 'confess', translationRU: 'исповедоваться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 569, present: 'εξοντώνω', future: 'θα εξοντώσω', aorist: 'εξόντωσα', imperative: 'εξόντωσε / εξοντώστε', translationEN: 'exterminate', translationRU: 'уничтожать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 570, present: 'εξοργίζω', future: 'θα εξοργίσω', aorist: 'εξόργισα', imperative: 'εξόργισε / εξοργίστε', translationEN: 'enrage', translationRU: 'приводить в ярость', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 571, present: 'εξουδετερώνω', future: 'θα εξουδετερώσω', aorist: 'εξουδετέρωσα', imperative: 'εξουδετέρωσε / εξουδετερώστε', translationEN: 'neutralize', translationRU: 'нейтрализовать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 572, present: 'εξουσιάζω', future: 'θα εξουσιάσω', aorist: 'εξουσίασα', imperative: 'εξουσίασε / εξουσιάστε', translationEN: 'rule over', translationRU: 'властвовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 573, present: 'εξοφλώ', future: 'θα εξοφλήσω', aorist: 'εξόφλησα', imperative: 'εξόφλησε / εξοφλήστε', translationEN: 'pay off, settle', translationRU: 'погашать, оплачивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 574, present: 'εξυπηρετώ', future: 'θα εξυπηρετήσω', aorist: 'εξυπηρέτησα', imperative: 'εξυπηρέτησε / εξυπηρετήστε', translationEN: 'serve, help', translationRU: 'обслуживать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 575, present: 'επαινώ', future: 'θα επαινέσω', aorist: 'επαίνεσα', imperative: 'επαίνεσε / επαινέστε', translationEN: 'praise', translationRU: 'хвалить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 576, present: 'επακολουθώ', future: 'θα επακολουθήσω', aorist: 'επακολούθησα', imperative: 'επακολούθησε / επακολουθήστε', translationEN: 'follow, ensue', translationRU: 'следовать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 577, present: 'επαληθεύω', future: 'θα επαληθεύσω', aorist: 'επαλήθευσα', imperative: 'επαλήθευσε / επαληθεύστε', translationEN: 'verify', translationRU: 'проверять, подтверждать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 578, present: 'επαναλαμβάνω', future: 'θα επαναλάβω', aorist: 'επανέλαβα', imperative: 'επανάλαβε / επαναλάβετε', translationEN: 'repeat', translationRU: 'повторять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 579, present: 'επαναστατώ', future: 'θα επαναστατήσω', aorist: 'επαναστάτησα', imperative: 'επαναστάτησε / επαναστατήστε', translationEN: 'rebel', translationRU: 'бунтовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 580, present: 'επαναφέρω', future: 'θα επαναφέρω', aorist: 'επανέφερα', imperative: 'επανάφερε / επαναφέρετε', translationEN: 'restore, bring back', translationRU: 'возвращать, восстанавливать', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 581, present: 'επαναφορτίζω', future: 'θα επαναφορτίσω', aorist: 'επαναφόρτισα', imperative: 'επαναφόρτισε / επαναφορτίστε', translationEN: 'recharge', translationRU: 'перезаряжать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 582, present: 'επανεκκινώ', future: 'θα επανεκκινήσω', aorist: 'επανεκκίνησα', imperative: 'επανεκκίνησε / επανεκκινήστε', translationEN: 'restart', translationRU: 'перезапускать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 583, present: 'επανεμφανίζομαι', future: 'θα επανεμφανιστώ', aorist: 'επανεμφανίστηκα', imperative: 'επανεμφανίσου / επανεμφανιστείτε', translationEN: 'reappear', translationRU: 'появляться снова', lexicalCategory: ['lexicalMotion','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 584, present: 'επανέρχομαι', future: 'θα επανέλθω', aorist: 'επανήλθα', imperative: 'επάνελθε / επανέλθετε', translationEN: 'return, recur', translationRU: 'возвращаться', lexicalCategory: ['lexicalMotion','lexicalTime'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 585, present: 'επεκτείνω', future: null, aorist: 'επέκτεινα', imperative: 'επέκτεινε / επεκτείνετε', translationEN: 'extend', translationRU: 'расширять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 586, present: 'επενδύομαι', future: 'θα επενδυθώ', aorist: 'επενδύθηκα', imperative: 'επενδύσου / επενδυθείτε', translationEN: 'be invested', translationRU: 'быть вложенным', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 587, present: 'επενδύω', future: 'θα επενδύσω', aorist: 'επένδυσα', imperative: 'επένδυσε / επενδύστε', translationEN: 'invest', translationRU: 'инвестировать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 588, present: 'επεξεργάζομαι', future: 'θα επεξεργαστώ', aorist: 'επεξεργάστηκα', imperative: 'επεξεργάσου / επεξεργαστείτε', translationEN: 'process, edit', translationRU: 'обрабатывать, редактировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 589, present: 'επηρεάζω', future: 'θα επηρεάσω', aorist: 'επηρέασα', imperative: 'επηρέασε / επηρεάστε', translationEN: 'affect, influence', translationRU: 'влиять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 590, present: 'επιβάλλω', future: 'θα επιβάλω', aorist: 'επέβαλα', imperative: 'επίβαλε / επιβάλετε', translationEN: 'impose', translationRU: 'навязывать, налагать', lexicalCategory: ['lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 591, present: 'επιβεβαιώνω', future: 'θα επιβεβαιώσω', aorist: 'επιβεβαίωσα', imperative: 'επιβεβαίωσε / επιβεβαιώστε', translationEN: 'confirm', translationRU: 'подтверждать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 592, present: 'επιβιβάζομαι', future: 'θα επιβιβαστώ', aorist: 'επιβιβάστηκα', imperative: 'επιβιβάσου / επιβιβαστείτε', translationEN: 'board, get on', translationRU: 'садиться (на транспорт)', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 593, present: 'επιβιβάζω', future: 'θα επιβιβάσω', aorist: 'επιβίβασα', imperative: 'επιβίβασε / επιβιβάστε', translationEN: 'put on board', translationRU: 'сажать на борт', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 594, present: 'επιβιώνω', future: 'θα επιβιώσω', aorist: 'επιβίωσα', imperative: null, translationEN: 'survive', translationRU: 'выживать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 595, present: 'επιβλέπω', future: 'θα επιβλέψω', aorist: 'επέβλεψα', imperative: 'επίβλεψε / επιβλέψτε', translationEN: 'oversee', translationRU: 'наблюдать, руководить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 596, present: 'επιβραδύνω', future: 'θα επιβραδύνω', aorist: 'επιβράδυνα', imperative: 'επιβράδυνε / επιβραδύνετε', translationEN: 'slow down', translationRU: 'замедлять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 597, present: 'επιδεικνύω', future: 'θα επιδείξω', aorist: 'επέδειξα', imperative: 'επίδειξε / επιδείξτε', translationEN: 'show off, display', translationRU: 'демонстрировать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 598, present: 'επιδεινώνω', future: 'θα επιδεινώσω', aorist: 'επιδείνωσα', imperative: 'επιδείνωσε / επιδεινώστε', translationEN: 'worsen', translationRU: 'ухудшать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 599, present: 'επιδιορθώνω', future: 'θα επιδιορθώσω', aorist: 'επιδιόρθωσα', imperative: 'επιδιόρθωσε / επιδιορθώστε', translationEN: 'repair, fix', translationRU: 'ремонтировать, чинить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 600, present: 'επιδιώκω', future: 'θα επιδιώξω', aorist: 'επιδίωξα', imperative: 'επιδίωξε / επιδιώξτε', translationEN: 'seek, pursue', translationRU: 'стремиться, добиваться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 601, present: 'επιδοτώ', future: 'θα επιδοτήσω', aorist: 'επιδότησα', imperative: 'επιδότησε / επιδοτήστε', translationEN: 'subsidize', translationRU: 'субсидировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 602, present: 'επιθυμώ', future: 'θα επιθυμήσω', aorist: 'επιθύμησα', imperative: null, translationEN: 'desire', translationRU: 'желать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 603, present: 'επικοινωνώ', future: 'θα επικοινωνήσω', aorist: 'επικοινώνησα', imperative: 'επικοινώνησε / επικοινωνήστε', translationEN: 'communicate, contact', translationRU: 'общаться, связываться', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 604, present: 'επικολλώ', future: 'θα επικολλήσω', aorist: 'επικόλλησα', imperative: 'επικόλλησε / επικολλήστε', translationEN: 'paste', translationRU: 'вставлять (скопированное)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 605, present: 'επικονιάζω', future: 'θα επικονιάσω', aorist: 'επικονίασα', imperative: 'επικονίασε / επικονιάστε', translationEN: 'pollinate', translationRU: 'опылять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 606, present: 'επικρατώ', future: 'θα επικρατήσω', aorist: 'επικράτησα', imperative: 'επικράτησε / επικρατήστε', translationEN: 'prevail', translationRU: 'преобладать, торжествовать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 607, present: 'επιλέγω', future: 'θα επιλέξω', aorist: 'επέλεξα', imperative: 'επίλεξε / επιλέξτε', translationEN: 'select', translationRU: 'выбирать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 608, present: 'επιλύω', future: 'θα επιλύσω', aorist: 'επέλυσα', imperative: 'επίλυσε / επιλύστε', translationEN: 'resolve, solve', translationRU: 'разрешать (проблему)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 609, present: 'επιμελούμαι', future: 'θα επιμεληθώ', aorist: 'επιμελήθηκα', imperative: 'επιμελήσου / επιμεληθείτε', translationEN: 'edit, take care of', translationRU: 'редактировать, заботиться', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 610, present: 'επιμένω', future: 'θα επιμείνω', aorist: 'επέμεινα', imperative: 'επίμεινε / επιμείνετε', translationEN: 'insist', translationRU: 'настаивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 611, present: 'επιπίπτω', future: 'θα επιπέσω', aorist: 'επέπεσα', imperative: 'επίπεσε / επιπέστε', translationEN: 'fall upon', translationRU: 'нападать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 612, present: 'επιπλέω', future: 'θα επιπλεύσω', aorist: 'επέπλευσα', imperative: 'επίπλευσε / επιπλεύστε', translationEN: 'float', translationRU: 'плавать на поверхности', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 613, present: 'επιπλήττω', future: 'θα επιπλήξω', aorist: 'επέπληξα', imperative: 'επίπληξε / επιπλήξτε', translationEN: 'reprimand', translationRU: 'делать выговор, порицать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 614, present: 'επιπλώνω', future: 'θα επιπλώσω', aorist: 'επίπλωσα', imperative: 'επίπλωσε / επιπλώστε', translationEN: 'furnish', translationRU: 'обставлять мебелью', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 615, present: 'επισκέπτομαι', future: 'θα επισκεφτώ', aorist: 'επισκέφτηκα', imperative: 'επισκέψου / επισκεφτείτε', translationEN: 'visit', translationRU: 'посещать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 616, present: 'επισκευάζω', future: 'θα επισκευάσω', aorist: 'επισκεύασα', imperative: 'επισκεύασε / επισκευάστε', translationEN: 'repair', translationRU: 'ремонтировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 617, present: 'επισπεύδω', future: 'θα επισπεύσω', aorist: 'επέσπευσα', imperative: 'επίσπευσε / επισπεύστε', translationEN: 'speed up', translationRU: 'ускорять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 618, present: 'επιστρατεύω', future: 'θα επιστρατεύσω', aorist: 'επιστράτευσα', imperative: 'επιστράτευσε / επιστρατεύστε', translationEN: 'mobilize, enlist', translationRU: 'мобилизовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 619, present: 'επιστρέφω', future: 'θα επιστρέψω', aorist: 'επέστρεψα', imperative: 'επίστρεψε / επιστρέψτε', translationEN: 'return', translationRU: 'возвращаться, возвращать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 620, present: 'επιταχύνω', future: null, aorist: 'επιτάχυνα', imperative: 'επιτάχυνε / επιταχύνετε', translationEN: 'accelerate', translationRU: 'ускорять', lexicalCategory: ['lexicalMotion','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 621, present: 'επιτηρώ', future: 'θα επιτηρήσω', aorist: 'επιτήρησα', imperative: 'επιτήρησε / επιτηρήστε', translationEN: 'supervise, invigilate', translationRU: 'надзирать, следить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 622, present: 'επιτίθεμαι', future: 'θα επιτεθώ', aorist: 'επιτέθηκα', imperative: null, translationEN: 'attack', translationRU: 'нападать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 623, present: 'επιτρέπω', future: 'θα επιτρέψω', aorist: 'επέτρεψα', imperative: 'επίτρεψε / επιτρέψτε', translationEN: 'allow', translationRU: 'разрешать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 624, present: 'επιτυγχάνω', future: 'θα επιτύχω', aorist: 'επέτυχα', imperative: 'επίτυχε / επιτύχετε', translationEN: 'achieve, succeed', translationRU: 'достигать, добиваться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 625, present: 'επιχειρώ', future: 'θα επιχειρήσω', aorist: 'επιχείρησα', imperative: 'επιχείρησε / επιχειρήστε', translationEN: 'attempt', translationRU: 'пытаться, предпринимать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 626, present: 'επιχορηγώ', future: 'θα επιχορηγήσω', aorist: 'επιχορήγησα', imperative: 'επιχορήγησε / επιχορηγήστε', translationEN: 'grant funds to', translationRU: 'субсидировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 627, present: 'εποπτεύω', future: 'θα εποπτεύσω', aorist: 'επόπτευσα', imperative: 'επόπτευσε / εποπτεύστε', translationEN: 'supervise', translationRU: 'надзирать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 628, present: 'επουλώνω', future: 'θα επουλώσω', aorist: 'επούλωσα', imperative: 'επούλωσε / επουλώστε', translationEN: 'heal (a wound)', translationRU: 'заживлять', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 629, present: 'εργάζομαι', future: 'θα εργαστώ', aorist: 'εργάστηκα', imperative: 'εργάσου / εργαστείτε', translationEN: 'work', translationRU: 'работать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 630, present: 'εργοδοτώ', future: 'θα εργοδοτήσω', aorist: 'εργοδότησα', imperative: 'εργοδότησε / εργοδοτήστε', translationEN: 'employ', translationRU: 'нанимать, давать работу', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 631, present: 'ερεθίζω', future: 'θα ερεθίσω', aorist: 'ερέθισα', imperative: 'ερέθισε / ερεθίστε', translationEN: 'irritate, arouse', translationRU: 'раздражать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 632, present: 'ερευνώ', future: 'θα ερευνήσω', aorist: 'ερεύνησα', imperative: 'ερεύνησε / ερευνήστε', translationEN: 'investigate, research', translationRU: 'исследовать, расследовать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 633, present: 'ερμηνεύω', future: 'θα ερμηνεύσω', aorist: 'ερμήνευσα', imperative: 'ερμήνευσε / ερμηνεύστε', translationEN: 'interpret', translationRU: 'толковать, исполнять', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 634, present: 'έρχομαι', future: 'θα έρθω', aorist: 'ήρθα', imperative: 'έλα / ελάτε', translationEN: 'come', translationRU: 'приходить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 635, present: 'ερωτεύομαι', future: 'θα ερωτευτώ', aorist: 'ερωτεύτηκα', imperative: 'ερωτεύσου / ερωτευτείτε', translationEN: 'fall in love', translationRU: 'влюбляться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 636, present: 'ερωτώ', future: 'θα ερωτήσω', aorist: 'ερώτησα', imperative: 'ερώτησε / ερωτήστε', translationEN: 'ask', translationRU: 'спрашивать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 637, present: 'ετοιμάζομαι', future: 'θα ετοιμαστώ', aorist: 'ετοιμάστηκα', imperative: 'ετοιμάσου / ετοιμαστείτε', translationEN: 'get ready', translationRU: 'готовиться', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 638, present: 'ετοιμάζω', future: 'θα ετοιμάσω', aorist: 'ετοίμασα', imperative: 'ετοίμασε / ετοιμάστε', translationEN: 'prepare', translationRU: 'готовить, подготавливать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 639, present: 'ευδοκιμώ', future: 'θα ευδοκιμήσω', aorist: 'ευδοκίμησα', imperative: 'ευδοκίμησε / ευδοκιμήστε', translationEN: 'thrive, flourish', translationRU: 'процветать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 640, present: 'ευημερώ', future: 'θα ευημερήσω', aorist: 'ευημέρησα', imperative: 'ευημέρησε / ευημερήστε', translationEN: 'prosper', translationRU: 'благоденствовать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 641, present: 'ευλογούμαι', future: 'θα ευλογηθώ', aorist: 'ευλογήθηκα', imperative: 'ευλογήσου / ευλογηθείτε', translationEN: 'be blessed', translationRU: 'быть благословлённым', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 642, present: 'ευλογώ', future: 'θα ευλογήσω', aorist: 'ευλόγησα', imperative: 'ευλόγησε / ευλογήστε', translationEN: 'bless', translationRU: 'благословлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 643, present: 'ευτυχώ', future: 'θα ευτυχήσω', aorist: 'ευτύχησα', imperative: 'ευτύχησε / ευτυχήστε', translationEN: 'be happy, be fortunate', translationRU: 'быть счастливым', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 644, present: 'ευφραίνω', future: 'θα ευφράνω', aorist: 'εύφρανα', imperative: 'εύφρανε / ευφράνετε', translationEN: 'delight, gladden', translationRU: 'радовать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 645, present: 'ευχαριστιέμαι', future: 'θα ευχαριστηθώ', aorist: 'ευχαριστήθηκα', imperative: null, translationEN: 'enjoy, take pleasure', translationRU: 'получать удовольствие', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 646, present: 'ευχαριστώ', future: 'θα ευχαριστήσω', aorist: 'ευχαρίστησα', imperative: 'ευχαρίστησε / ευχαριστήστε', translationEN: 'thank, please', translationRU: 'благодарить, радовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 647, present: 'εύχομαι', future: 'θα ευχηθώ', aorist: 'ευχήθηκα', imperative: 'ευχήσου / ευχηθείτε', translationEN: 'wish', translationRU: 'желать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 648, present: 'εφαρμόζω', future: 'θα εφαρμόσω', aorist: 'εφάρμοσα', imperative: 'εφάρμοσε / εφαρμόστε', translationEN: 'apply, fit', translationRU: 'применять, подходить по размеру', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 649, present: 'εφευρίσκω', future: 'θα εφεύρω', aorist: 'εφηύρα', imperative: null, translationEN: 'invent', translationRU: 'изобретать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 650, present: 'εφοδιάζω', future: 'θα εφοδιάσω', aorist: 'εφοδίασα', imperative: 'εφοδίασε / εφοδιάστε', translationEN: 'supply', translationRU: 'снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 651, present: 'έχω', future: null, aorist: 'είχα', imperative: 'έχε / έχετε', translationEN: 'have', translationRU: 'иметь', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 652, present: 'ζαλίζω', future: 'θα ζαλίσω', aorist: 'ζάλισα', imperative: 'ζάλισε / ζαλίστε', translationEN: 'make dizzy', translationRU: 'кружить голову', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 653, present: 'ζαρώνω', future: 'θα ζαρώσω', aorist: 'ζάρωσα', imperative: 'ζάρωσε / ζαρώστε', translationEN: 'wrinkle, shrivel', translationRU: 'морщиться, съёживаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 654, present: 'ζεματίζω', future: 'θα ζεματίσω', aorist: 'ζέματισα', imperative: 'ζέματισε / ζεματίστε', translationEN: 'scald', translationRU: 'ошпаривать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 655, present: 'ζεσταίνομαι', future: 'θα ζεσταθώ', aorist: 'ζεστάθηκα', imperative: 'ζεστάσου / ζεσταθείτε', translationEN: 'get warm', translationRU: 'согреваться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 656, present: 'ζεσταίνω', future: 'θα ζεστάνω', aorist: 'ζέστανα', imperative: 'ζέστανε / ζεστάνετε', translationEN: 'warm up', translationRU: 'греть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 657, present: 'ζευγαρώνω', future: 'θα ζευγαρώσω', aorist: 'ζευγάρωσα', imperative: 'ζευγάρωσε / ζευγαρώστε', translationEN: 'mate, pair up', translationRU: 'спариваться, сочетать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 658, present: 'ζηλεύομαι', future: 'θα ζηλευτώ', aorist: 'ζηλεύτηκα', imperative: 'ζηλέψου / ζηλευτείτε', translationEN: 'be envied', translationRU: 'вызывать зависть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 659, present: 'ζηλεύω', future: 'θα ζηλέψω', aorist: 'ζήλεψα', imperative: 'ζήλεψε / ζηλέψτε', translationEN: 'be jealous, envy', translationRU: 'ревновать, завидовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 660, present: 'ζηλοτυπώ', future: 'θα ζηλοτυπήσω', aorist: 'ζηλοτύπησα', imperative: 'ζηλοτύπησε / ζηλοτυπήστε', translationEN: 'be jealous', translationRU: 'ревновать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 661, present: 'ζητώ', future: 'θα ζητήσω', aorist: 'ζήτησα', imperative: 'ζήτησε / ζητήστε', translationEN: 'ask for, request', translationRU: 'просить, требовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 662, present: 'ζητωκραυγάζω', future: 'θα ζητωκραυγάσω', aorist: 'ζητωκραύγασα', imperative: 'ζητωκραύγασε / ζητωκραυγάστε', translationEN: 'cheer, acclaim', translationRU: 'приветствовать криками', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 663, present: 'ζορίζω', future: 'θα ζορίσω', aorist: 'ζόρισα', imperative: 'ζόρισε / ζορίστε', translationEN: 'strain, pressure', translationRU: 'давить, напрягать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 664, present: 'ζουλώ', future: 'θα ζουλήξω', aorist: 'ζούληξα', imperative: 'ζούληξε / ζουλήξτε', translationEN: 'squeeze', translationRU: 'давить, сжимать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 665, present: 'ζυγίζω', future: 'θα ζυγίσω', aorist: 'ζύγισα', imperative: 'ζύγισε / ζυγίστε', translationEN: 'weigh', translationRU: 'взвешивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 666, present: 'ζυμώνω', future: 'θα ζυμώσω', aorist: 'ζύμωσα', imperative: 'ζύμωσε / ζυμώστε', translationEN: 'knead', translationRU: 'месить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 667, present: 'ζω', future: 'θα ζήσω', aorist: 'έζησα', imperative: 'ζήσε / ζήστε', translationEN: 'live', translationRU: 'жить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 668, present: 'ζωγραφίζω', future: 'θα ζωγραφίσω', aorist: 'ζωγράφισα', imperative: 'ζωγράφισε / ζωγραφίστε', translationEN: 'paint, draw', translationRU: 'рисовать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 669, present: 'ζώνομαι', future: 'θα ζωστώ', aorist: 'ζώστηκα', imperative: 'ζώσου / ζωστείτε', translationEN: 'fasten one\'s belt', translationRU: 'опоясываться, пристёгиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 670, present: 'ζωντανεύω', future: 'θα ζωντανέψω', aorist: 'ζωντάνεψα', imperative: 'ζωντάνεψε / ζωντανέψτε', translationEN: 'come alive, revive', translationRU: 'оживать, оживлять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 671, present: 'ζώνω', future: 'θα ζώσω', aorist: 'έζωσα', imperative: 'ζώσε / ζώστε', translationEN: 'gird, belt', translationRU: 'опоясывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 672, present: 'ηγούμαι', future: 'θα ηγηθώ', aorist: 'ηγήθηκα', imperative: 'ηγήσου / ηγηθείτε', translationEN: 'lead', translationRU: 'возглавлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 673, present: 'ηλεκτρίζω', future: 'θα ηλεκτρίσω', aorist: 'ηλέκτρισα', imperative: 'ηλέκτρισε / ηλεκτρίστε', translationEN: 'electrify', translationRU: 'электризовать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 674, present: 'ηλεκτροδοτώ', future: 'θα ηλεκτροδοτήσω', aorist: 'ηλεκτροδότησα', imperative: 'ηλεκτροδότησε / ηλεκτροδοτήστε', translationEN: 'supply with electricity', translationRU: 'подавать электричество', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 675, present: 'ηρεμώ', future: 'θα ηρεμήσω', aorist: 'ηρέμησα', imperative: 'ηρέμησε / ηρεμήστε', translationEN: 'calm down', translationRU: 'успокаиваться', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 676, present: 'ησυχάζω', future: 'θα ησυχάσω', aorist: 'ησύχασα', imperative: 'ησύχασε / ησυχάστε', translationEN: 'quiet down', translationRU: 'затихать, успокаиваться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 677, present: 'ηχογραφώ', future: 'θα ηχογραφήσω', aorist: 'ηχογράφησα', imperative: 'ηχογράφησε / ηχογραφήστε', translationEN: 'record (sound)', translationRU: 'записывать звук', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 678, present: 'ηχώ', future: 'θα ηχήσω', aorist: 'ήχησα', imperative: null, translationEN: 'sound, resound', translationRU: 'звучать, раздаваться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 679, present: 'θάβω', future: 'θα θάψω', aorist: 'έθαψα', imperative: 'θάψε / θάψτε', translationEN: 'bury', translationRU: 'хоронить, зарывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 680, present: 'θαμπώνομαι', future: 'θα θαμπωθώ', aorist: 'θαμπώθηκα', imperative: 'θαμπώσου / θαμπωθείτε', translationEN: 'be dazzled', translationRU: 'быть ослеплённым', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 681, present: 'θαμπώνω', future: 'θα θαμπώσω', aorist: 'θάμπωσα', imperative: 'θάμπωσε / θαμπώστε', translationEN: 'dazzle, blur', translationRU: 'слепить, затуманивать', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 682, present: 'θαρρώ', future: 'θα θαρρέψω', aorist: 'θάρρεψα', imperative: null, translationEN: 'think, believe', translationRU: 'полагать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 683, present: 'θαυμάζομαι', future: 'θα θαυμαστώ', aorist: 'θαυμάστηκα', imperative: 'θαυμάσου / θαυμαστείτε', translationEN: 'be admired', translationRU: 'вызывать восхищение', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 684, present: 'θαυμάζω', future: 'θα θαυμάσω', aorist: 'θαύμασα', imperative: 'θαύμασε / θαυμάστε', translationEN: 'admire', translationRU: 'восхищаться', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 685, present: 'θέλω', future: 'θα θελήσω', aorist: 'θέλησα', imperative: null, translationEN: 'want', translationRU: 'хотеть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 686, present: 'θεμελιώνω', future: 'θα θεμελιώσω', aorist: 'θεμελίωσα', imperative: 'θεμελίωσε / θεμελιώστε', translationEN: 'found, establish', translationRU: 'закладывать, обосновывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 687, present: 'θεραπεύομαι', future: 'θα θεραπευτώ', aorist: 'θεραπεύτηκα', imperative: 'θεραπεύσου / θεραπευτείτε', translationEN: 'be cured, undergo treatment', translationRU: 'лечиться', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 688, present: 'θεραπεύω', future: 'θα θεραπεύσω', aorist: 'θεράπευσα', imperative: 'θεράπευσε / θεραπεύστε', translationEN: 'cure, treat', translationRU: 'лечить', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 689, present: 'θερίζω', future: 'θα θερίσω', aorist: 'θέρισα', imperative: 'θέρισε / θερίστε', translationEN: 'reap', translationRU: 'жать, косить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 690, present: 'θερμαίνω', future: 'θα θερμάνω', aorist: 'θέρμανα', imperative: 'θέρμανε / θερμάνετε', translationEN: 'heat', translationRU: 'нагревать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 691, present: 'θεσπίζω', future: 'θα θεσπίσω', aorist: 'θέσπισα', imperative: 'θέσπισε / θεσπίστε', translationEN: 'enact', translationRU: 'устанавливать (закон)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 692, present: 'θέτω', future: 'θα θέσω', aorist: 'έθεσα', imperative: 'θέσε / θέστε', translationEN: 'put, set, pose', translationRU: 'ставить, полагать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 693, present: 'θεωρώ', future: 'θα θεωρήσω', aorist: 'θεώρησα', imperative: 'θεώρησε / θεωρήστε', translationEN: 'consider', translationRU: 'считать, рассматривать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 694, present: 'θηλάζω', future: 'θα θηλάσω', aorist: 'θήλασα', imperative: 'θήλασε / θηλάστε', translationEN: 'breastfeed', translationRU: 'кормить грудью', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 695, present: 'θίγω', future: 'θα θίξω', aorist: 'έθιξα', imperative: 'θίξε / θίξτε', translationEN: 'touch upon, offend', translationRU: 'затрагивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 696, present: 'θλίβομαι', future: 'θα θλιβώ', aorist: 'θλίφτηκα', imperative: 'θλίψου / θλιφτείτε', translationEN: 'be sad', translationRU: 'грустить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 697, present: 'θλίβω', future: 'θα θλίψω', aorist: 'έθλιψα', imperative: 'θλίψε / θλίψτε', translationEN: 'grieve, sadden', translationRU: 'печалить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 698, present: 'θρέφω', future: 'θα θρέψω', aorist: 'έθρεψα', imperative: 'θρέψε / θρέψτε', translationEN: 'feed, nourish', translationRU: 'кормить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 699, present: 'θρηνώ', future: 'θα θρηνήσω', aorist: 'θρήνησα', imperative: 'θρήνησε / θρηνήστε', translationEN: 'mourn', translationRU: 'оплакивать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 700, present: 'θρυμματίζομαι', future: 'θα θρυμματιστώ', aorist: 'θρυμματίστηκα', imperative: 'θρυμματίσου / θρυμματιστείτε', translationEN: 'shatter', translationRU: 'разбиваться вдребезги', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 701, present: 'θρυμματίζω', future: 'θα θρυμματίσω', aorist: 'θρυμμάτισα', imperative: 'θρυμμάτισε / θρυμματίστε', translationEN: 'shatter, crumble', translationRU: 'крошить, дробить', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 702, present: 'θυμάμαι', future: 'θα θυμηθώ', aorist: 'θυμήθηκα', imperative: 'θυμήσου / θυμηθείτε', translationEN: 'remember', translationRU: 'помнить, вспоминать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 703, present: 'θυμίζω', future: 'θα θυμίσω', aorist: 'θύμισα', imperative: 'θύμισε / θυμίστε', translationEN: 'remind', translationRU: 'напоминать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 704, present: 'θυμώνω', future: 'θα θυμώσω', aorist: 'θύμωσα', imperative: 'θύμωσε / θυμώστε', translationEN: 'anger; get angry', translationRU: 'сердить; сердиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 705, present: 'θυσιάζω', future: 'θα θυσιάσω', aorist: 'θυσίασα', imperative: 'θυσίασε / θυσιάστε', translationEN: 'sacrifice', translationRU: 'жертвовать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 706, present: 'ιδρύω', future: 'θα ιδρύσω', aorist: 'ίδρυσα', imperative: 'ίδρυσε / ιδρύστε', translationEN: 'found', translationRU: 'основывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 707, present: 'ιδρώνω', future: 'θα ιδρώσω', aorist: 'ίδρωσα', imperative: null, translationEN: 'sweat', translationRU: 'потеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 708, present: 'ιεραρχώ', future: 'θα ιεραρχήσω', aorist: 'ιεράρχησα', imperative: 'ιεράρχησε / ιεραρχήστε', translationEN: 'prioritize, rank', translationRU: 'выстраивать иерархию', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 709, present: 'ικανοποιώ', future: 'θα ικανοποιήσω', aorist: 'ικανοποίησα', imperative: 'ικανοποίησε / ικανοποιήστε', translationEN: 'satisfy', translationRU: 'удовлетворять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 710, present: 'ικετεύω', future: 'θα ικετεύσω', aorist: 'ικέτευσα', imperative: 'ικέτευσε / ικετεύστε', translationEN: 'beg, plead', translationRU: 'умолять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 711, present: 'ιονίζω', future: 'θα ιονίσω', aorist: 'ιόνισα', imperative: 'ιόνισε / ιονίστε', translationEN: 'ionize', translationRU: 'ионизировать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 712, present: 'ισοπεδώνω', future: 'θα ισοπεδώσω', aorist: 'ισοπέδωσα', imperative: 'ισοπέδωσε / ισοπεδώστε', translationEN: 'level, raze', translationRU: 'выравнивать, сравнивать с землёй', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 713, present: 'ισορροπώ', future: 'θα ισορροπήσω', aorist: 'ισορρόπησα', imperative: 'ισορρόπησε / ισορροπήστε', translationEN: 'balance', translationRU: 'балансировать, уравновешивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 714, present: 'ισοφαρίζω', future: 'θα ισοφαρίσω', aorist: 'ισοφάρισα', imperative: 'ισοφάρισε / ισοφαρίστε', translationEN: 'equalize', translationRU: 'сравнивать счёт', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 715, present: 'ιστιοπλοώ', future: 'θα ιστιοπλοήσω', aorist: 'ιστιοπλόησα', imperative: 'ιστιοπλόησε / ιστιοπλοήστε', translationEN: 'sail (sport)', translationRU: 'ходить под парусом', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 716, present: 'ισχύω', future: 'θα ισχύσω', aorist: 'ίσχυσα', imperative: null, translationEN: 'be valid', translationRU: 'действовать, быть в силе', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 717, present: 'καβουρδίζω', future: 'θα καβουρδίσω', aorist: 'καβούρδισα', imperative: 'καβούρδισε / καβουρδίστε', translationEN: 'roast (coffee, nuts)', translationRU: 'обжаривать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 718, present: 'καθαρίζω', future: 'θα καθαρίσω', aorist: 'καθάρισα', imperative: 'καθάρισε / καθαρίστε', translationEN: 'clean', translationRU: 'чистить, убирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 719, present: 'καθησυχάζω', future: 'θα καθησυχάσω', aorist: 'καθησύχασα', imperative: 'καθησύχασε / καθησυχάστε', translationEN: 'reassure, calm', translationRU: 'успокаивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 720, present: 'καθίζω', future: 'θα καθίσω', aorist: 'κάθισα', imperative: 'κάθισε / καθίστε', translationEN: 'seat, sit down (someone)', translationRU: 'усаживать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 721, present: 'καθιστώ', future: 'θα καταστήσω', aorist: 'κατέστησα', imperative: 'κατάστησε / καταστήστε', translationEN: 'render, make', translationRU: 'делать (каким-л.)', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 722, present: 'καθοδηγώ', future: 'θα καθοδηγήσω', aorist: 'καθοδήγησα', imperative: 'καθοδήγησε / καθοδηγήστε', translationEN: 'guide, mentor', translationRU: 'наставлять, направлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 723, present: 'κάθομαι', future: 'θα κάτσω', aorist: 'κάθισα', imperative: 'κάτσε / κάτσετε', translationEN: 'sit', translationRU: 'сидеть, садиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 724, present: 'καθορίζω', future: 'θα καθορίσω', aorist: 'καθόρισα', imperative: 'καθόρισε / καθορίστε', translationEN: 'determine, set', translationRU: 'определять, устанавливать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 725, present: 'καθυστερούμαι', future: 'θα καθυστερηθώ', aorist: 'καθυστερήθηκα', imperative: 'καθυστερήσου / καθυστερηθείτε', translationEN: 'be delayed', translationRU: 'задерживаться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 726, present: 'καθυστερώ', future: 'θα καθυστερήσω', aorist: 'καθυστέρησα', imperative: 'καθυστέρησε / καθυστερήστε', translationEN: 'delay', translationRU: 'задерживать, опаздывать', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 727, present: 'καίγομαι', future: 'θα καώ', aorist: 'κάηκα', imperative: 'κάψου / καείτε', translationEN: 'burn oneself', translationRU: 'обжигаться, гореть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 728, present: 'καίω', future: 'θα κάψω', aorist: 'έκαψα', imperative: 'κάψε / κάψτε', translationEN: 'burn', translationRU: 'жечь', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 729, present: 'κακολογώ', future: 'θα κακολογήσω', aorist: 'κακολόγησα', imperative: 'κακολόγησε / κακολογήστε', translationEN: 'speak ill of', translationRU: 'злословить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 730, present: 'κακομαθαίνω', future: 'θα κακομάθω', aorist: 'κακόμαθα', imperative: 'κακόμαθε / κακομάθετε', translationEN: 'spoil', translationRU: 'баловать, портить воспитанием', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 731, present: 'καλημερίζω', future: 'θα καλημερίσω', aorist: 'καλημέρισα', imperative: 'καλημέρισε / καλημερίστε', translationEN: 'say good morning', translationRU: 'желать доброго утра', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 732, present: 'καλλιεργώ', future: 'θα καλλιεργήσω', aorist: 'καλλιέργησα', imperative: 'καλλιέργησε / καλλιεργήστε', translationEN: 'cultivate', translationRU: 'выращивать, культивировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 733, present: 'καλμάρω', future: 'θα καλμάρω', aorist: 'κάλμαρα', imperative: 'κάλμαρε / καλμάρετε', translationEN: 'calm down', translationRU: 'успокаиваться, стихать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 734, present: 'καλύπτω', future: 'θα καλύψω', aorist: 'κάλυψα', imperative: 'κάλυψε / καλύψτε', translationEN: 'cover', translationRU: 'покрывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 735, present: 'καλώ', future: 'θα καλέσω', aorist: 'κάλεσα', imperative: 'κάλεσε / καλέστε', translationEN: 'call, invite', translationRU: 'звать, приглашать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 736, present: 'καλωσορίζω', future: 'θα καλωσορίσω', aorist: 'καλωσόρισα', imperative: 'καλωσόρισε / καλωσορίστε', translationEN: 'welcome', translationRU: 'приветствовать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 737, present: 'καμαρώνω', future: 'θα καμαρώσω', aorist: 'καμάρωσα', imperative: 'καμάρωσε / καμαρώστε', translationEN: 'be proud, admire', translationRU: 'гордиться, любоваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 738, present: 'κάμπτω', future: 'θα κάμψω', aorist: 'έκαμψα', imperative: 'κάμψε / κάμψτε', translationEN: 'bend, bow, break (resistance)', translationRU: 'сгибать, ломать (сопротивление)', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 739, present: 'καμώνομαι', future: 'θα καμωθώ', aorist: 'καμώθηκα', imperative: 'καμώσου / καμωθείτε', translationEN: 'pretend', translationRU: 'притворяться, делать вид', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 740, present: 'κανονίζω', future: 'θα κανονίσω', aorist: 'κανόνισα', imperative: 'κανόνισε / κανονίστε', translationEN: 'arrange', translationRU: 'устраивать, улаживать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 741, present: 'κάνω', future: null, aorist: 'έκανα', imperative: 'κάνε / κάντε', translationEN: 'do, make', translationRU: 'делать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 742, present: 'καπνίζω', future: 'θα καπνίσω', aorist: 'κάπνισα', imperative: 'κάπνισε / καπνίστε', translationEN: 'smoke', translationRU: 'курить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 743, present: 'καρπίζω', future: 'θα καρπίσω', aorist: 'κάρπισα', imperative: 'κάρπισε / καρπίστε', translationEN: 'bear fruit', translationRU: 'плодоносить', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 744, present: 'καρφώνω', future: 'θα καρφώσω', aorist: 'κάρφωσα', imperative: 'κάρφωσε / καρφώστε', translationEN: 'nail', translationRU: 'забивать (гвоздь)', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 745, present: 'καταβροχθίζω', future: 'θα καταβροχθίσω', aorist: 'καταβρόχθισα', imperative: 'καταβρόχθισε / καταβροχθίστε', translationEN: 'devour, gobble up', translationRU: 'пожирать, проглатывать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 746, present: 'καταγγέλλω', future: 'θα καταγγείλω', aorist: 'κατήγγειλα', imperative: 'κατάγγειλε / καταγγείλετε', translationEN: 'report, denounce', translationRU: 'заявлять, обвинять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 747, present: 'καταγράφω', future: 'θα καταγράψω', aorist: 'κατέγραψα', imperative: 'κατάγραψε / καταγράψτε', translationEN: 'record, list', translationRU: 'записывать, регистрировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 748, present: 'καταδίδω', future: 'θα καταδώσω', aorist: 'κατέδωσα', imperative: 'κατάδωσε / καταδώστε', translationEN: 'inform on, betray', translationRU: 'доносить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 749, present: 'καταδικάζομαι', future: 'θα καταδικαστώ', aorist: 'καταδικάστηκα', imperative: 'καταδικάσου / καταδικαστείτε', translationEN: 'be sentenced', translationRU: 'быть осуждённым', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 750, present: 'καταδικάζω', future: 'θα καταδικάσω', aorist: 'καταδίκασα', imperative: 'καταδίκασε / καταδικάστε', translationEN: 'condemn, sentence', translationRU: 'осуждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 751, present: 'καταδύομαι', future: 'θα καταδυθώ', aorist: 'καταδύθηκα', imperative: 'καταδύσου / καταδυθείτε', translationEN: 'dive, submerge', translationRU: 'погружаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 752, present: 'καταθέτω', future: 'θα καταθέσω', aorist: 'κατέθεσα', imperative: 'κατάθεσε / καταθέστε', translationEN: 'deposit, testify', translationRU: 'вносить, давать показания', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 753, present: 'καταιγίζω', future: 'θα καταιγίσω', aorist: 'καταίγισα', imperative: 'καταίγισε / καταιγίστε', translationEN: 'storm, rage', translationRU: 'бушевать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 754, present: 'κατακερματίζω', future: 'θα κατακερματίσω', aorist: 'κατακερμάτισα', imperative: 'κατακερμάτισε / κατακερματίστε', translationEN: 'fragment', translationRU: 'дробить', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 755, present: 'κατακρίνω', future: null, aorist: 'κατέκρινα', imperative: 'κατάκρινε / κατακρίνετε', translationEN: 'criticize, condemn', translationRU: 'осуждать, критиковать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 756, present: 'κατακτώ', future: 'θα κατακτήσω', aorist: 'κατέκτησα', imperative: 'κατάκτησε / κατακτήστε', translationEN: 'conquer', translationRU: 'завоёвывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 757, present: 'καταλαβαίνω', future: 'θα καταλάβω', aorist: 'κατάλαβα', imperative: 'κατάλαβε / καταλάβετε', translationEN: 'understand', translationRU: 'понимать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 758, present: 'καταλαγιάζω', future: 'θα καταλαγιάσω', aorist: 'καταλάγιασα', imperative: 'καταλάγιασε / καταλαγιάστε', translationEN: 'subside, abate', translationRU: 'утихать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 759, present: 'καταλαμβάνω', future: 'θα καταλάβω', aorist: 'κατέλαβα', imperative: 'κατάλαβε / καταλάβετε', translationEN: 'occupy, seize', translationRU: 'занимать, захватывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 760, present: 'καταλήγω', future: 'θα καταλήξω', aorist: 'κατέληξα', imperative: 'κατάληξε / καταλήξτε', translationEN: 'end up', translationRU: 'заканчиваться, приходить к', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 761, present: 'καταλύω', future: 'θα καταλύσω', aorist: 'κατέλυσα', imperative: 'κατάλυσε / καταλύστε', translationEN: 'catalyze, abolish', translationRU: 'катализировать, упразднять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 762, present: 'καταναλώνω', future: 'θα καταναλώσω', aorist: 'κατανάλωσα', imperative: 'κατανάλωσε / καταναλώστε', translationEN: 'consume', translationRU: 'потреблять', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 763, present: 'καταπιέζω', future: 'θα καταπιέσω', aorist: 'καταπίεσα', imperative: 'καταπίεσε / καταπιέστε', translationEN: 'oppress', translationRU: 'угнетать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 764, present: 'καταπίνω', future: 'θα καταπιώ', aorist: 'κατάπια', imperative: 'κατάπιε / καταπιείτε', translationEN: 'swallow', translationRU: 'глотать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 765, present: 'καταπολεμώ', future: 'θα καταπολεμήσω', aorist: 'καταπολέμησα', imperative: 'καταπολέμησε / καταπολεμήστε', translationEN: 'combat', translationRU: 'бороться с', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 766, present: 'καταπονώ', future: 'θα καταπονήσω', aorist: 'καταπόνησα', imperative: 'καταπόνησε / καταπονήστε', translationEN: 'exhaust, strain', translationRU: 'изнурять', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 767, present: 'καταργώ', future: 'θα καταργήσω', aorist: 'κατήργησα', imperative: 'κατάργησε / καταργήστε', translationEN: 'abolish', translationRU: 'отменять, упразднять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 768, present: 'καταριέμαι', future: 'θα καταραστώ', aorist: 'καταράστηκα', imperative: 'καταράσου / καταραστείτε', translationEN: 'curse', translationRU: 'проклинать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 769, present: 'καταρρέω', future: 'θα καταρρεύσω', aorist: 'κατέρρευσα', imperative: 'κατάρρευσε / καταρρεύστε', translationEN: 'collapse', translationRU: 'рушиться, терпеть крах', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 770, present: 'κατασκευάζω', future: 'θα κατασκευάσω', aorist: 'κατασκεύασα', imperative: 'κατασκεύασε / κατασκευάστε', translationEN: 'build, construct', translationRU: 'строить, изготавливать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 771, present: 'κατασκοπεύω', future: 'θα κατασκοπεύσω', aorist: 'κατασκόπευσα', imperative: 'κατασκόπευσε / κατασκοπεύστε', translationEN: 'spy on', translationRU: 'шпионить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 772, present: 'καταστρέφω', future: 'θα καταστρέψω', aorist: 'κατέστρεψα', imperative: 'κατάστρεψε / καταστρέψτε', translationEN: 'destroy', translationRU: 'разрушать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 773, present: 'καταφέρνω', future: 'θα καταφέρω', aorist: 'κατάφερα', imperative: 'κατάφερε / καταφέρετε', translationEN: 'manage, succeed', translationRU: 'суметь, добиться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 774, present: 'καταφεύγω', future: 'θα καταφύγω', aorist: 'κατέφυγα', imperative: null, translationEN: 'take refuge, resort', translationRU: 'прибегать, укрываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 775, present: 'καταχωρώ', future: 'θα καταχωρήσω', aorist: 'καταχώρησα', imperative: 'καταχώρησε / καταχωρήστε', translationEN: 'register, enter', translationRU: 'регистрировать, заносить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 776, present: 'κατεβάζω', future: 'θα κατεβάσω', aorist: 'κατέβασα', imperative: 'κατέβασε / κατεβάστε', translationEN: 'take down, download', translationRU: 'снимать, скачивать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 777, present: 'κατεβαίνω', future: 'θα κατέβω', aorist: 'κατέβηκα', imperative: 'κατέβα / κατεβείτε', translationEN: 'go down', translationRU: 'спускаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 778, present: 'κατεδαφίζω', future: 'θα κατεδαφίσω', aorist: 'κατεδάφισα', imperative: 'κατεδάφισε / κατεδαφίστε', translationEN: 'demolish', translationRU: 'сносить, разрушать (здание)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 779, present: 'κατευθύνομαι', future: 'θα κατευθυνθώ', aorist: 'κατευθύνθηκα', imperative: 'κατευθύνσου / κατευθυνθείτε', translationEN: 'head towards', translationRU: 'направляться', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
{id: 780, present: 'κατευθύνω', future: 'θα κατευθύνω', aorist: 'κατεύθυνα', imperative: 'κατεύθυνε / κατευθύνετε', translationEN: 'direct, steer', translationRU: 'направлять', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 781, present: 'κατέχω', future: null, aorist: 'κατείχα', imperative: null, translationEN: 'possess, know well', translationRU: 'владеть, разбираться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 782, present: 'κατηγοριοποιώ', future: 'θα κατηγοριοποιήσω', aorist: 'κατηγοριοποίησα', imperative: 'κατηγοριοποίησε / κατηγοριοποιήστε', translationEN: 'categorize', translationRU: 'распределять по категориям', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 783, present: 'κατηγορώ', future: 'θα κατηγορήσω', aorist: 'κατηγόρησα', imperative: 'κατηγόρησε / κατηγορήστε', translationEN: 'accuse', translationRU: 'обвинять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 784, present: 'κατοικώ', future: 'θα κατοικήσω', aorist: 'κατοίκησα', imperative: null, translationEN: 'reside', translationRU: 'проживать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 785, present: 'κατοχυρώνω', future: 'θα κατοχυρώσω', aorist: 'κατοχύρωσα', imperative: 'κατοχύρωσε / κατοχυρώστε', translationEN: 'secure, patent', translationRU: 'закреплять, патентовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 786, present: 'καυχιέμαι', future: 'θα καυχηθώ', aorist: 'καυχήθηκα', imperative: 'καυχήσου / καυχηθείτε', translationEN: 'boast', translationRU: 'хвастаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 787, present: 'κελαηδώ', future: 'θα κελαηδήσω', aorist: 'κελάηδησα', imperative: 'κελάηδησε / κελαηδήστε', translationEN: 'chirp, warble', translationRU: 'щебетать, петь (о птицах)', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 788, present: 'κεντώ', future: 'θα κεντήσω', aorist: 'κέντησα', imperative: 'κέντησε / κεντήστε', translationEN: 'embroider, sting', translationRU: 'вышивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 789, present: 'κερδίζω', future: 'θα κερδίσω', aorist: 'κέρδισα', imperative: 'κέρδισε / κερδίστε', translationEN: 'win, earn', translationRU: 'выигрывать, зарабатывать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 790, present: 'κερνώ', future: 'θα κεράσω', aorist: 'κέρασα', imperative: 'κέρασε / κεράστε', translationEN: 'treat, offer', translationRU: 'угощать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 791, present: 'κηδεύω', future: 'θα κηδέψω', aorist: 'κήδεψα', imperative: 'κήδεψε / κηδέψτε', translationEN: 'bury, hold a funeral', translationRU: 'хоронить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 792, present: 'κηρύσσω', future: 'θα κηρύξω', aorist: 'κήρυξα', imperative: 'κήρυξε / κηρύξτε', translationEN: 'declare, preach', translationRU: 'провозглашать, проповедовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 793, present: 'κινδυνεύω', future: 'θα κινδυνεύσω', aorist: 'κινδύνεψα', imperative: 'κινδύνεψε / κινδυνέψτε', translationEN: 'be in danger, risk', translationRU: 'рисковать, находиться в опасности', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 794, present: 'κινηματογραφώ', future: 'θα κινηματογραφήσω', aorist: 'κινηματογράφησα', imperative: 'κινηματογράφησε / κινηματογραφήστε', translationEN: 'film', translationRU: 'снимать фильм', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 795, present: 'κινούμαι', future: 'θα κινηθώ', aorist: 'κινήθηκα', imperative: 'κινήσου / κινηθείτε', translationEN: 'move', translationRU: 'двигаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 796, present: 'κινώ', future: 'θα κινήσω', aorist: 'κίνησα', imperative: 'κίνησε / κινήστε', translationEN: 'set in motion', translationRU: 'приводить в движение', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 797, present: 'κλαδεύω', future: 'θα κλαδέψω', aorist: 'κλάδεψα', imperative: 'κλάδεψε / κλαδέψτε', translationEN: 'prune', translationRU: 'обрезать ветки', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 798, present: 'κλαίγομαι', future: 'θα κλαφτώ', aorist: 'κλάφτηκα', imperative: 'κλάψου / κλαφτείτε', translationEN: 'complain, lament', translationRU: 'жаловаться, плакаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 799, present: 'κλαίω', future: 'θα κλάψω', aorist: 'έκλαψα', imperative: 'κλάψε / κλάψτε', translationEN: 'cry', translationRU: 'плакать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 800, present: 'κλαψουρίζω', future: 'θα κλαψουρίσω', aorist: 'κλαψούρισα', imperative: 'κλαψούρισε / κλαψουρίστε', translationEN: 'whine', translationRU: 'ныть, скулить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 801, present: 'κλέβω', future: 'θα κλέψω', aorist: 'έκλεψα', imperative: 'κλέψε / κλέψτε', translationEN: 'steal', translationRU: 'красть', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 802, present: 'κλειδώνω', future: 'θα κλειδώσω', aorist: 'κλείδωσα', imperative: 'κλείδωσε / κλειδώστε', translationEN: 'lock', translationRU: 'запирать на ключ', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 803, present: 'κλείνομαι', future: 'θα κλειστώ', aorist: 'κλείστηκα', imperative: 'κλείσου / κλειστείτε', translationEN: 'shut oneself in', translationRU: 'запираться, замыкаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 804, present: 'κλείνω', future: 'θα κλείσω', aorist: 'έκλεισα', imperative: 'κλείσε / κλείστε', translationEN: 'close, book', translationRU: 'закрывать, бронировать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 805, present: 'κληρονομούμαι', future: 'θα κληρονομηθώ', aorist: 'κληρονομήθηκα', imperative: 'κληρονομήσου / κληρονομηθείτε', translationEN: 'be inherited', translationRU: 'передаваться по наследству', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 806, present: 'κληρονομώ', future: 'θα κληρονομήσω', aorist: 'κληρονόμησα', imperative: 'κληρονόμησε / κληρονομήστε', translationEN: 'inherit', translationRU: 'наследовать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 807, present: 'κλίνω', future: 'θα κλίνω', aorist: 'έκλινα', imperative: 'κλίνε / κλίνετε', translationEN: 'lean, incline, decline (grammar)', translationRU: 'наклонять, склонять', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 808, present: 'κλωνοποιώ', future: 'θα κλωνοποιήσω', aorist: 'κλωνοποίησα', imperative: 'κλωνοποίησε / κλωνοποιήστε', translationEN: 'clone', translationRU: 'клонировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 809, present: 'κλωτσώ', future: 'θα κλωτσήσω', aorist: 'κλώτσησα', imperative: 'κλώτσησε / κλωτσήστε', translationEN: 'kick', translationRU: 'пинать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 810, present: 'κόβω', future: 'θα κόψω', aorist: 'έκοψα', imperative: 'κόψε / κόψτε', translationEN: 'cut', translationRU: 'резать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 811, present: 'κοιμάμαι', future: 'θα κοιμηθώ', aorist: 'κοιμήθηκα', imperative: 'κοιμήσου / κοιμηθείτε', translationEN: 'sleep', translationRU: 'спать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 812, present: 'κοινοποιώ', future: 'θα κοινοποιήσω', aorist: 'κοινοποίησα', imperative: 'κοινοποίησε / κοινοποιήστε', translationEN: 'notify, share', translationRU: 'уведомлять, делиться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 813, present: 'κοιτάζω', future: 'θα κοιτάξω', aorist: 'κοίταξα', imperative: 'κοίταξε / κοιτάξτε', translationEN: 'look', translationRU: 'смотреть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 814, present: 'κοκκινίζω', future: 'θα κοκκινίσω', aorist: 'κοκκίνισα', imperative: 'κοκκίνισε / κοκκινίστε', translationEN: 'redden, blush', translationRU: 'краснеть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 815, present: 'κολακεύω', future: 'θα κολακέψω', aorist: 'κολάκεψα', imperative: 'κολάκεψε / κολακέψτε', translationEN: 'flatter', translationRU: 'льстить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 816, present: 'κολλώ', future: 'θα κολλήσω', aorist: 'κόλλησα', imperative: 'κόλλησε / κολλήστε', translationEN: 'stick, glue', translationRU: 'клеить, прилипать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 817, present: 'κολυμπώ', future: 'θα κολυμπήσω', aorist: 'κολύμπησα', imperative: 'κολύμπησε / κολυμπήστε', translationEN: 'swim', translationRU: 'плавать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 818, present: 'κομίζω', future: 'θα κομίσω', aorist: 'κόμισα', imperative: 'κόμισε / κομίστε', translationEN: 'bring, carry', translationRU: 'приносить, доставлять', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 819, present: 'κομματιάζω', future: 'θα κομματιάσω', aorist: 'κομμάτιασα', imperative: 'κομμάτιασε / κομματιάστε', translationEN: 'tear to pieces', translationRU: 'рвать на куски', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 820, present: 'κομπάζω', future: 'θα κομπάσω', aorist: 'κόμπασα', imperative: 'κόμπασε / κομπάστε', translationEN: 'brag', translationRU: 'хвастаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 821, present: 'κοντεύω', future: 'θα κοντέψω', aorist: 'κόντεψα', imperative: null, translationEN: 'be about to, approach', translationRU: 'почти, приближаться', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 822, present: 'κοντύνω', future: 'θα κοντύνω', aorist: 'κόντυνα', imperative: 'κόντυνε / κοντύνετε', translationEN: 'shorten', translationRU: 'укорачивать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 823, present: 'κοπιάζω', future: 'θα κοπιάσω', aorist: 'κόπιασα', imperative: 'κόπιασε / κοπιάστε', translationEN: 'toil; (polite) come', translationRU: 'трудиться; пожалуйте', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 824, present: 'κοπρίζω', future: 'θα κοπρίσω', aorist: 'κόπρισα', imperative: 'κόπρισε / κοπρίστε', translationEN: 'manure', translationRU: 'удобрять навозом', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 825, present: 'κοροϊδεύω', future: 'θα κοροϊδέψω', aorist: 'κορόιδεψα', imperative: 'κορόιδεψε / κοροϊδέψτε', translationEN: 'mock, fool', translationRU: 'дразнить, обманывать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 826, present: 'κοστίζω', future: 'θα κοστίσω', aorist: 'κόστισα', imperative: null, translationEN: 'cost', translationRU: 'стоить', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 827, present: 'κουβαλώ', future: 'θα κουβαλήσω', aorist: 'κουβάλησα', imperative: 'κουβάλησε / κουβαλήστε', translationEN: 'carry', translationRU: 'таскать, носить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 828, present: 'κουβεντιάζω', future: 'θα κουβεντιάσω', aorist: 'κουβέντιασα', imperative: 'κουβέντιασε / κουβεντιάστε', translationEN: 'chat', translationRU: 'беседовать, болтать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 829, present: 'κουμπώνω', future: 'θα κουμπώσω', aorist: 'κούμπωσα', imperative: 'κούμπωσε / κουμπώστε', translationEN: 'button up', translationRU: 'застёгивать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 830, present: 'κουνιέμαι', future: 'θα κουνηθώ', aorist: 'κουνήθηκα', imperative: 'κουνήσου / κουνηθείτε', translationEN: 'move, stir', translationRU: 'двигаться, шевелиться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 831, present: 'κουνώ', future: 'θα κουνήσω', aorist: 'κούνησα', imperative: 'κούνησε / κουνήστε', translationEN: 'shake, move', translationRU: 'трясти, двигать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 832, present: 'κουράζομαι', future: 'θα κουραστώ', aorist: 'κουράστηκα', imperative: 'κουράσου / κουραστείτε', translationEN: 'get tired', translationRU: 'уставать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 833, present: 'κουράζω', future: 'θα κουράσω', aorist: 'κούρασα', imperative: 'κούρασε / κουράστε', translationEN: 'tire', translationRU: 'утомлять', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 834, present: 'κουρδίζω', future: 'θα κουρδίσω', aorist: 'κούρδισα', imperative: 'κούρδισε / κουρδίστε', translationEN: 'wind up, tune', translationRU: 'заводить, настраивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 835, present: 'κουρεύω', future: 'θα κουρέψω', aorist: 'κούρεψα', imperative: 'κούρεψε / κουρέψτε', translationEN: 'cut hair, mow', translationRU: 'стричь', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 836, present: 'κουρνιάζω', future: 'θα κουρνιάσω', aorist: 'κούρνιασα', imperative: 'κούρνιασε / κουρνιάστε', translationEN: 'perch, roost', translationRU: 'устраиваться на насесте, ютиться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 837, present: 'κουτσαίνω', future: 'θα κουτσάνω', aorist: 'κούτσανα', imperative: 'κούτσανε / κουτσάνετε', translationEN: 'limp', translationRU: 'хромать', lexicalCategory: ['lexicalHealth','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 838, present: 'κρατιέμαι', future: 'θα κρατηθώ', aorist: 'κρατήθηκα', imperative: 'κρατήσου / κρατηθείτε', translationEN: 'hold on, restrain oneself', translationRU: 'держаться, сдерживаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 839, present: 'κρατώ', future: 'θα κρατήσω', aorist: 'κράτησα', imperative: 'κράτησε / κρατήστε', translationEN: 'hold, keep', translationRU: 'держать, хранить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 840, present: 'κραυγάζω', future: 'θα κραυγάσω', aorist: 'κραύγασα', imperative: 'κραύγασε / κραυγάστε', translationEN: 'shout', translationRU: 'кричать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 841, present: 'κρεμώ', future: 'θα κρεμάσω', aorist: 'κρέμασα', imperative: 'κρέμασε / κρεμάστε', translationEN: 'hang', translationRU: 'вешать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 842, present: 'κρίνω', future: null, aorist: 'έκρινα', imperative: 'κρίνε / κρίνετε', translationEN: 'judge', translationRU: 'судить, оценивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 843, present: 'κριτικάρω', future: null, aorist: 'κριτίκαρα', imperative: 'κριτίκαρε / κριτικάρετε', translationEN: 'criticize', translationRU: 'критиковать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 844, present: 'κρύβομαι', future: 'θα κρυφτώ', aorist: 'κρύφτηκα', imperative: 'κρύψου / κρυφτείτε', translationEN: 'hide (oneself)', translationRU: 'прятаться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 845, present: 'κρύβω', future: 'θα κρύψω', aorist: 'έκρυψα', imperative: 'κρύψε / κρύψτε', translationEN: 'hide', translationRU: 'прятать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 846, present: 'κρυπτογραφώ', future: 'θα κρυπτογραφήσω', aorist: 'κρυπτογράφησα', imperative: 'κρυπτογράφησε / κρυπτογραφήστε', translationEN: 'encrypt', translationRU: 'шифровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 847, present: 'κρυώνω', future: 'θα κρυώσω', aorist: 'κρύωσα', imperative: null, translationEN: 'be cold, catch cold', translationRU: 'мёрзнуть, простужаться', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 848, present: 'κτίζω', future: 'θα κτίσω', aorist: 'έκτισα', imperative: 'κτίσε / κτίστε', translationEN: 'build', translationRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 849, present: 'κυβερνώ', future: 'θα κυβερνήσω', aorist: 'κυβέρνησα', imperative: 'κυβέρνησε / κυβερνήστε', translationEN: 'govern', translationRU: 'управлять, править', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 850, present: 'κυκλοφορώ', future: 'θα κυκλοφορήσω', aorist: 'κυκλοφόρησα', imperative: 'κυκλοφόρησε / κυκλοφορήστε', translationEN: 'circulate, release', translationRU: 'циркулировать, выпускать', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 851, present: 'κυλιέμαι', future: 'θα κυλιστώ', aorist: 'κυλίστηκα', imperative: 'κυλίσου / κυλιστείτε', translationEN: 'roll about, wallow', translationRU: 'кататься, валяться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 852, present: 'κυλώ', future: 'θα κυλήσω', aorist: 'κύλησα', imperative: 'κύλησε / κυλήστε', translationEN: 'roll', translationRU: 'катить, катиться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 853, present: 'κυνηγώ', future: 'θα κυνηγήσω', aorist: 'κυνήγησα', imperative: 'κυνήγησε / κυνηγήστε', translationEN: 'hunt, chase', translationRU: 'охотиться, преследовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 854, present: 'κυοφορώ', future: 'θα κυοφορήσω', aorist: 'κυοφόρησα', imperative: 'κυοφόρησε / κυοφορήστε', translationEN: 'carry (a pregnancy)', translationRU: 'вынашивать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 855, present: 'κυριαρχώ', future: 'θα κυριαρχήσω', aorist: 'κυριάρχησα', imperative: 'κυριάρχησε / κυριαρχήστε', translationEN: 'dominate', translationRU: 'господствовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 856, present: 'κωδικοποιώ', future: 'θα κωδικοποιήσω', aorist: 'κωδικοποίησα', imperative: 'κωδικοποίησε / κωδικοποιήστε', translationEN: 'encode, codify', translationRU: 'кодировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 857, present: 'κωπηλατώ', future: 'θα κωπηλατήσω', aorist: 'κωπηλάτησα', imperative: 'κωπηλάτησε / κωπηλατήστε', translationEN: 'row', translationRU: 'грести', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 858, present: 'λαδώνω', future: 'θα λαδώσω', aorist: 'λάδωσα', imperative: 'λάδωσε / λαδώστε', translationEN: 'grease, bribe', translationRU: 'смазывать, подкупать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 859, present: 'λαλώ', future: 'θα λαλήσω', aorist: 'λάλησα', imperative: 'λάλησε / λαλήστε', translationEN: 'crow, sing (birds)', translationRU: 'петь (о птицах), кричать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 860, present: 'λαμβάνω', future: 'θα λάβω', aorist: 'έλαβα', imperative: 'λάβε / λάβετε', translationEN: 'receive, take', translationRU: 'получать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 861, present: 'λαμπυρίζω', future: 'θα λαμπυρίσω', aorist: 'λαμπύρισα', imperative: 'λαμπύρισε / λαμπυρίστε', translationEN: 'glitter, sparkle', translationRU: 'сверкать, мерцать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 862, present: 'λάμπω', future: 'θα λάμψω', aorist: 'έλαμψα', imperative: 'λάμψε / λάμψτε', translationEN: 'shine', translationRU: 'сиять, блестеть', lexicalCategory: ['lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 863, present: 'λασκάρω', future: 'θα λασκάρω', aorist: 'λάσκαρα', imperative: 'λάσκαρε / λασκάρετε', translationEN: 'slacken, loosen', translationRU: 'ослаблять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 864, present: 'λατρεύομαι', future: 'θα λατρευτώ', aorist: 'λατρεύτηκα', imperative: 'λατρέψου / λατρευτείτε', translationEN: 'be adored', translationRU: 'быть обожаемым', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 865, present: 'λατρεύω', future: 'θα λατρέψω', aorist: 'λάτρεψα', imperative: 'λάτρεψε / λατρέψτε', translationEN: 'adore', translationRU: 'обожать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 866, present: 'λαχανιάζω', future: 'θα λαχανιάσω', aorist: 'λαχάνιασα', imperative: 'λαχάνιασε / λαχανιάστε', translationEN: 'pant, be out of breath', translationRU: 'запыхаться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 867, present: 'λαχταρώ', future: 'θα λαχταρήσω', aorist: 'λαχτάρησα', imperative: null, translationEN: 'long for', translationRU: 'страстно желать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
{id: 868, present: 'λειαίνω', future: 'θα λειάνω', aorist: 'λείανα', imperative: 'λείανε / λειάνετε', translationEN: 'smooth, polish', translationRU: 'шлифовать, сглаживать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 869, present: 'λείπω', future: 'θα λείψω', aorist: 'έλειψα', imperative: null, translationEN: 'be absent, be missing', translationRU: 'отсутствовать, не хватать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 870, present: 'λειτουργώ', future: 'θα λειτουργήσω', aorist: 'λειτούργησα', imperative: 'λειτούργησε / λειτουργήστε', translationEN: 'operate, function', translationRU: 'работать, функционировать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 871, present: 'λεπταίνω', future: 'θα λεπτύνω', aorist: 'λέπτυνα', imperative: 'λέπτυνε / λεπτύνετε', translationEN: 'thin out', translationRU: 'утончать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 872, present: 'λερώνω', future: 'θα λερώσω', aorist: 'λέρωσα', imperative: 'λέρωσε / λερώστε', translationEN: 'dirty', translationRU: 'пачкать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 873, present: 'λευκαίνω', future: 'θα λευκάνω', aorist: 'λεύκανα', imperative: 'λεύκανε / λευκάνετε', translationEN: 'whiten', translationRU: 'отбеливать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 874, present: 'λέω', future: 'θα πω', aorist: 'είπα', imperative: 'πες / πείτε', translationEN: 'say, tell', translationRU: 'говорить, сказать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 875, present: 'λησμονώ', future: 'θα λησμονήσω', aorist: 'λησμόνησα', imperative: 'λησμόνησε / λησμονήστε', translationEN: 'forget', translationRU: 'забывать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
{id: 876, present: 'λιγοστεύω', future: 'θα λιγοστέψω', aorist: 'λιγόστεψα', imperative: 'λιγόστεψε / λιγοστέψτε', translationEN: 'diminish', translationRU: 'убавлять, убывать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 877, present: 'λιγώνω', future: 'θα λιγώσω', aorist: 'λίγωσα', imperative: null, translationEN: 'make faint, make queasy', translationRU: 'вызывать слабость, тошноту', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 878, present: 'λικνίζομαι', future: 'θα λικνιστώ', aorist: 'λικνίστηκα', imperative: 'λικνίσου / λικνιστείτε', translationEN: 'sway, rock', translationRU: 'покачиваться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 879, present: 'λιπαίνω', future: 'θα λιπάνω', aorist: 'λίπανα', imperative: 'λίπανε / λιπάνετε', translationEN: 'fertilize', translationRU: 'удобрять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 880, present: 'λιποθυμώ', future: 'θα λιποθυμήσω', aorist: 'λιποθύμησα', imperative: null, translationEN: 'faint', translationRU: 'падать в обморок', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 881, present: 'λιχνίζω', future: 'θα λιχνίσω', aorist: 'λίχνισα', imperative: 'λίχνισε / λιχνίστε', translationEN: 'winnow', translationRU: 'веять зерно', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 882, present: 'λιώνω', future: 'θα λιώσω', aorist: 'έλιωσα', imperative: 'λιώσε / λιώστε', translationEN: 'melt, crush', translationRU: 'таять, растирать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 883, present: 'λογαριάζω', future: 'θα λογαριάσω', aorist: 'λογάριασα', imperative: 'λογάριασε / λογαριάστε', translationEN: 'calculate, reckon', translationRU: 'считать, учитывать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 884, present: 'λούζομαι', future: 'θα λουστώ', aorist: 'λούστηκα', imperative: 'λούσου / λουστείτε', translationEN: 'wash one\'s hair', translationRU: 'мыть голову', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 885, present: 'λούζω', future: 'θα λούσω', aorist: 'έλουσα', imperative: 'λούσε / λούστε', translationEN: 'wash (hair)', translationRU: 'мыть (голову)', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 886, present: 'λυγίζω', future: 'θα λυγίσω', aorist: 'λύγισα', imperative: 'λύγισε / λυγίστε', translationEN: 'bend', translationRU: 'гнуть, сгибаться', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 887, present: 'λύνω', future: 'θα λύσω', aorist: 'έλυσα', imperative: 'λύσε / λύστε', translationEN: 'solve, untie', translationRU: 'решать, развязывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 888, present: 'λυπάμαι', future: 'θα λυπηθώ', aorist: 'λυπήθηκα', imperative: 'λυπήσου / λυπηθείτε', translationEN: 'be sorry, pity', translationRU: 'сожалеть, жалеть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 889, present: 'λυπώ', future: 'θα λυπήσω', aorist: 'λύπησα', imperative: 'λύπησε / λυπήστε', translationEN: 'sadden', translationRU: 'огорчать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 890, present: 'λυτρώνω', future: 'θα λυτρώσω', aorist: 'λύτρωσα', imperative: 'λύτρωσε / λυτρώστε', translationEN: 'redeem, deliver', translationRU: 'избавлять, спасать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 891, present: 'μαγειρεύω', future: 'θα μαγειρέψω', aorist: 'μαγείρεψα', imperative: 'μαγείρεψε / μαγειρέψτε', translationEN: 'cook', translationRU: 'готовить (еду)', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 892, present: 'μαγεύομαι', future: 'θα μαγευτώ', aorist: 'μαγεύτηκα', imperative: 'μαγέψου / μαγευτείτε', translationEN: 'be enchanted', translationRU: 'быть очарованным', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 893, present: 'μαγεύω', future: 'θα μαγέψω', aorist: 'μάγεψα', imperative: 'μάγεψε / μαγέψτε', translationEN: 'bewitch', translationRU: 'очаровывать', lexicalCategory: ['lexicalInfluence','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 894, present: 'μαζεύομαι', future: 'θα μαζευτώ', aorist: 'μαζεύτηκα', imperative: 'μαζέψου / μαζευτείτε', translationEN: 'gather, huddle', translationRU: 'собираться, сжиматься', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 895, present: 'μαζεύω', future: 'θα μαζέψω', aorist: 'μάζεψα', imperative: 'μάζεψε / μαζέψτε', translationEN: 'gather, collect', translationRU: 'собирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 896, present: 'μαθαίνω', future: 'θα μάθω', aorist: 'έμαθα', imperative: 'μάθε / μάθετε', translationEN: 'learn, teach', translationRU: 'учить, узнавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 897, present: 'μακραίνω', future: 'θα μακρύνω', aorist: 'μάκρυνα', imperative: 'μάκρυνε / μακρύνετε', translationEN: 'lengthen', translationRU: 'удлинять', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 898, present: 'μαλακώνω', future: 'θα μαλακώσω', aorist: 'μαλάκωσα', imperative: 'μαλάκωσε / μαλακώστε', translationEN: 'soften', translationRU: 'смягчать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 899, present: 'μαλώνω', future: 'θα μαλώσω', aorist: 'μάλωσα', imperative: 'μάλωσε / μαλώστε', translationEN: 'scold, quarrel', translationRU: 'ругать, ссориться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 900, present: 'μαντεύω', future: 'θα μαντέψω', aorist: 'μάντεψα', imperative: 'μάντεψε / μαντέψτε', translationEN: 'guess', translationRU: 'угадывать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 901, present: 'μαντρώνω', future: 'θα μαντρώσω', aorist: 'μάντρωσα', imperative: 'μάντρωσε / μαντρώστε', translationEN: 'pen, corral', translationRU: 'загонять в загон', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 902, present: 'μαραίνομαι', future: 'θα μαρανθώ', aorist: 'μαράθηκα', imperative: 'μαράσου / μαραθείτε', translationEN: 'wither', translationRU: 'вянуть', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 903, present: 'μαρτυρώ', future: 'θα μαρτυρήσω', aorist: 'μαρτύρησα', imperative: 'μαρτύρησε / μαρτυρήστε', translationEN: 'testify, betray', translationRU: 'свидетельствовать, выдавать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 904, present: 'μασκαρεύομαι', future: 'θα μασκαρευτώ', aorist: 'μασκαρεύτηκα', imperative: 'μασκαρέψου / μασκαρευτείτε', translationEN: 'dress up in costume', translationRU: 'наряжаться в маскарадный костюм', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 905, present: 'μασκαρεύω', future: 'θα μασκαρέψω', aorist: 'μασκάρεψα', imperative: 'μασκάρεψε / μασκαρέψτε', translationEN: 'dress in costume', translationRU: 'наряжать в маскарадный костюм', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 906, present: 'μασουλώ', future: 'θα μασουλήσω', aorist: 'μασούλησα', imperative: 'μασούλησε / μασουλήστε', translationEN: 'nibble, munch', translationRU: 'жевать, грызть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 907, present: 'μασώ', future: 'θα μασήσω', aorist: 'μάσησα', imperative: 'μάσησε / μασήστε', translationEN: 'chew', translationRU: 'жевать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 908, present: 'ματαιώνω', future: 'θα ματαιώσω', aorist: 'ματαίωσα', imperative: 'ματαίωσε / ματαιώστε', translationEN: 'frustrate, call off', translationRU: 'срывать, отменять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 909, present: 'ματώνω', future: 'θα ματώσω', aorist: 'μάτωσα', imperative: 'μάτωσε / ματώστε', translationEN: 'bleed, draw blood', translationRU: 'кровоточить, ранить до крови', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 910, present: 'μαυρίζω', future: 'θα μαυρίσω', aorist: 'μαύρισα', imperative: 'μαύρισε / μαυρίστε', translationEN: 'blacken, tan', translationRU: 'чернить, загорать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 911, present: 'μάχομαι', future: 'θα μαχηθώ', aorist: 'μαχήθηκα', imperative: 'μαχήσου / μαχηθείτε', translationEN: 'fight', translationRU: 'сражаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 912, present: 'μεγαλώνω', future: 'θα μεγαλώσω', aorist: 'μεγάλωσα', imperative: 'μεγάλωσε / μεγαλώστε', translationEN: 'grow, raise', translationRU: 'расти, растить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 913, present: 'μεθύσκω', future: 'θα μεθύσω', aorist: 'μέθυσα', imperative: 'μέθυσε / μεθύστε', translationEN: 'make drunk', translationRU: 'опьянять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 914, present: 'μεθώ', future: 'θα μεθύσω', aorist: 'μέθυσα', imperative: null, translationEN: 'get drunk', translationRU: 'напиваться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 915, present: 'μειώνω', future: 'θα μειώσω', aorist: 'μείωσα', imperative: 'μείωσε / μειώστε', translationEN: 'reduce', translationRU: 'уменьшать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 916, present: 'μελετώ', future: 'θα μελετήσω', aorist: 'μελέτησα', imperative: 'μελέτησε / μελετήστε', translationEN: 'study', translationRU: 'изучать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 917, present: 'μελοποιώ', future: 'θα μελοποιήσω', aorist: 'μελοποίησα', imperative: 'μελοποίησε / μελοποιήστε', translationEN: 'set to music', translationRU: 'класть на музыку', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 918, present: 'μένω', future: 'θα μείνω', aorist: 'έμεινα', imperative: 'μείνε / μείνετε', translationEN: 'stay, live', translationRU: 'оставаться, жить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 919, present: 'μεριμνώ', future: 'θα μεριμνήσω', aorist: 'μερίμνησα', imperative: 'μερίμνησε / μεριμνήστε', translationEN: 'take care of, see to', translationRU: 'заботиться, позаботиться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 920, present: 'μεταβάλλω', future: 'θα μεταβάλω', aorist: 'μετέβαλα', imperative: 'μετάβαλε / μεταβάλετε', translationEN: 'change, alter', translationRU: 'изменять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 921, present: 'μεταγλωττίζω', future: 'θα μεταγλωττίσω', aorist: 'μεταγλώττισα', imperative: 'μεταγλώττισε / μεταγλωττίστε', translationEN: 'dub', translationRU: 'дублировать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 922, present: 'μεταγράφω', future: 'θα μεταγράψω', aorist: 'μετέγραψα', imperative: 'μετάγραψε / μεταγράψτε', translationEN: 'transcribe', translationRU: 'транскрибировать, переписывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 923, present: 'μεταδίδω', future: 'θα μεταδώσω', aorist: 'μετέδωσα', imperative: 'μετάδωσε / μεταδώστε', translationEN: 'transmit, broadcast', translationRU: 'передавать, транслировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 924, present: 'μετακινούμαι', future: 'θα μετακινηθώ', aorist: 'μετακινήθηκα', imperative: 'μετακινήσου / μετακινηθείτε', translationEN: 'move around, travel', translationRU: 'перемещаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 925, present: 'μετακινώ', future: 'θα μετακινήσω', aorist: 'μετακίνησα', imperative: 'μετακίνησε / μετακινήστε', translationEN: 'move, shift', translationRU: 'перемещать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 926, present: 'μεταλαβαίνω', future: 'θα μεταλάβω', aorist: 'μετέλαβα', imperative: 'μετάλαβε / μεταλάβετε', translationEN: 'take communion', translationRU: 'причащаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 927, present: 'μεταλλάσσω', future: 'θα μεταλλάξω', aorist: 'μετάλλαξα', imperative: 'μετάλλαξε / μεταλλάξτε', translationEN: 'mutate, alter', translationRU: 'видоизменять, мутировать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 928, present: 'μεταμορφώνομαι', future: 'θα μεταμορφωθώ', aorist: 'μεταμορφώθηκα', imperative: 'μεταμορφώσου / μεταμορφωθείτε', translationEN: 'transform, be transformed', translationRU: 'преображаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 929, present: 'μεταμορφώνω', future: 'θα μεταμορφώσω', aorist: 'μεταμόρφωσα', imperative: 'μεταμόρφωσε / μεταμορφώστε', translationEN: 'transform', translationRU: 'преображать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 930, present: 'μεταμοσχεύω', future: 'θα μεταμοσχεύσω', aorist: 'μεταμόσχευσα', imperative: 'μεταμόσχευσε / μεταμοσχεύστε', translationEN: 'transplant', translationRU: 'пересаживать', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 931, present: 'μεταμφιέζομαι', future: 'θα μεταμφιεστώ', aorist: 'μεταμφιέστηκα', imperative: 'μεταμφιέσου / μεταμφιεστείτε', translationEN: 'dress up, disguise oneself', translationRU: 'переодеваться, маскироваться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 932, present: 'μεταμφιέζω', future: 'θα μεταμφιέσω', aorist: 'μεταμφίεσα', imperative: 'μεταμφίεσε / μεταμφιέστε', translationEN: 'disguise', translationRU: 'переодевать, маскировать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 933, present: 'μεταναστεύω', future: 'θα μεταναστεύσω', aorist: 'μετανάστευσα', imperative: 'μετανάστευσε / μεταναστεύστε', translationEN: 'emigrate', translationRU: 'эмигрировать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 934, present: 'μετανιώνω', future: 'θα μετανιώσω', aorist: 'μετάνιωσα', imperative: 'μετάνιωσε / μετανιώστε', translationEN: 'regret', translationRU: 'сожалеть, раскаиваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 935, present: 'μετανοώ', future: 'θα μετανοήσω', aorist: 'μετανόησα', imperative: 'μετανόησε / μετανοήστε', translationEN: 'repent', translationRU: 'каяться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 936, present: 'μετατρέπω', future: 'θα μετατρέψω', aorist: 'μετέτρεψα', imperative: 'μετάτρεψε / μετατρέψτε', translationEN: 'convert', translationRU: 'превращать, преобразовывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 937, present: 'μεταφέρω', future: null, aorist: 'μετέφερα', imperative: 'μετάφερε / μεταφέρετε', translationEN: 'transport, carry', translationRU: 'перевозить, переносить', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 938, present: 'μεταφορτώνω', future: 'θα μεταφορτώσω', aorist: 'μεταφόρτωσα', imperative: 'μεταφόρτωσε / μεταφορτώστε', translationEN: 'upload', translationRU: 'загружать на сервер', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 939, present: 'μεταφράζω', future: 'θα μεταφράσω', aorist: 'μετέφρασα', imperative: 'μετάφρασε / μεταφράστε', translationEN: 'translatιοn', translationRU: 'переводить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 940, present: 'μεταχειρίζομαι', future: 'θα μεταχειριστώ', aorist: 'μεταχειρίστηκα', imperative: 'μεταχειρίσου / μεταχειριστείτε', translationEN: 'use, treat', translationRU: 'использовать, обращаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 941, present: 'μετριάζω', future: 'θα μετριάσω', aorist: 'μετρίασα', imperative: 'μετρίασε / μετριάστε', translationEN: 'moderate, mitigate', translationRU: 'смягчать, умерять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 942, present: 'μετρώ', future: 'θα μετρήσω', aorist: 'μέτρησα', imperative: 'μέτρησε / μετρήστε', translationEN: 'count, measure', translationRU: 'считать, измерять', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 943, present: 'μηνύω', future: 'θα μηνύσω', aorist: 'μήνυσα', imperative: 'μήνυσε / μηνύστε', translationEN: 'sue', translationRU: 'подавать в суд', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 944, present: 'μιλώ', future: 'θα μιλήσω', aorist: 'μίλησα', imperative: 'μίλησε / μιλήστε', translationEN: 'speak', translationRU: 'говорить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 945, present: 'μιμούμαι', future: 'θα μιμηθώ', aorist: 'μιμήθηκα', imperative: 'μιμήσου / μιμηθείτε', translationEN: 'imitate', translationRU: 'подражать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 946, present: 'μισθώνω', future: 'θα μισθώσω', aorist: 'μίσθωσα', imperative: 'μίσθωσε / μισθώστε', translationEN: 'rent, hire', translationRU: 'арендовать, нанимать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 947, present: 'μισώ', future: 'θα μισήσω', aorist: 'μίσησα', imperative: 'μίσησε / μισήστε', translationEN: 'hate', translationRU: 'ненавидеть', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 948, present: 'μοιάζω', future: 'θα μοιάσω', aorist: 'μοίασα', imperative: null, translationEN: 'resemble', translationRU: 'быть похожим', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 949, present: 'μοιράζομαι', future: 'θα μοιραστώ', aorist: 'μοιράστηκα', imperative: 'μοιράσου / μοιραστείτε', translationEN: 'share', translationRU: 'делиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 950, present: 'μοιράζω', future: 'θα μοιράσω', aorist: 'μοίρασα', imperative: 'μοίρασε / μοιράστε', translationEN: 'distribute, deal', translationRU: 'раздавать, делить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 951, present: 'μολύνω', future: null, aorist: 'μόλυνα', imperative: 'μόλυνε / μολύνετε', translationEN: 'contaminate, infect', translationRU: 'загрязнять, заражать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 952, present: 'μονολογώ', future: 'θα μονολογήσω', aorist: 'μονολόγησα', imperative: 'μονολόγησε / μονολογήστε', translationEN: 'talk to oneself', translationRU: 'говорить с собой', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 953, present: 'μορφοποιώ', future: 'θα μορφοποιήσω', aorist: 'μορφοποίησα', imperative: 'μορφοποίησε / μορφοποιήστε', translationEN: 'format', translationRU: 'форматировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 954, present: 'μουγκρίζω', future: 'θα μουγκρίσω', aorist: 'μούγκρισα', imperative: 'μούγκρισε / μουγκρίστε', translationEN: 'roar, moo', translationRU: 'мычать, рычать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 955, present: 'μουδιάζω', future: 'θα μουδιάσω', aorist: 'μούδιασα', imperative: 'μούδιασε / μουδιάστε', translationEN: 'go numb', translationRU: 'неметь, затекать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 956, present: 'μουρμουρίζω', future: 'θα μουρμουρίσω', aorist: 'μουρμούρισα', imperative: 'μουρμούρισε / μουρμουρίστε', translationEN: 'mutter, hum', translationRU: 'бормотать, напевать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 957, present: 'μουσκεύω', future: 'θα μουσκέψω', aorist: 'μούσκεψα', imperative: 'μούσκεψε / μουσκέψτε', translationEN: 'soak', translationRU: 'мочить, вымачивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 958, present: 'μουχλιάζω', future: 'θα μουχλιάσω', aorist: 'μούχλιασα', imperative: 'μούχλιασε / μουχλιάστε', translationEN: 'go mouldy', translationRU: 'плесневеть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 959, present: 'μοχθώ', future: 'θα μοχθήσω', aorist: 'μόχθησα', imperative: 'μόχθησε / μοχθήστε', translationEN: 'toil, labor', translationRU: 'трудиться, маяться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 960, present: 'μπαίνω', future: 'θα μπω', aorist: 'μπήκα', imperative: 'μπες / μπείτε', translationEN: 'enter', translationRU: 'входить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 961, present: 'μπερδεύω', future: 'θα μπερδέψω', aorist: 'μπέρδεψα', imperative: 'μπέρδεψε / μπερδέψτε', translationEN: 'confuse, mix up', translationRU: 'путать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 962, present: 'μπλέκω', future: 'θα μπλέξω', aorist: 'έμπλεξα', imperative: 'μπλέξε / μπλέξτε', translationEN: 'get tangled, involve', translationRU: 'запутывать, впутываться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 963, present: 'μπλοκάρω', future: 'θα μπλοκάρω', aorist: 'μπλόκαρα', imperative: 'μπλόκαρε / μπλοκάρετε', translationEN: 'block', translationRU: 'блокировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 964, present: 'μπογιατίζω', future: 'θα μπογιατίσω', aorist: 'μπογιάτισα', imperative: 'μπογιάτισε / μπογιατίστε', translationEN: 'paint (walls)', translationRU: 'красить, красить стены', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 965, present: 'μπολιάζω', future: 'θα μπολιάσω', aorist: 'μπόλιασα', imperative: 'μπόλιασε / μπολιάστε', translationEN: 'graft, inoculate', translationRU: 'прививать (растение)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 966, present: 'μπορώ', future: 'θα μπορέσω', aorist: 'μπόρεσα', imperative: null, translationEN: 'can, be able', translationRU: 'мочь, уметь', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 967, present: 'μυρίζω', future: 'θα μυρίσω', aorist: 'μύρισα', imperative: 'μύρισε / μυρίστε', translationEN: 'smell', translationRU: 'пахнуть, нюхать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 968, present: 'νανουρίζω', future: 'θα νανουρίσω', aorist: 'νανούρισα', imperative: 'νανούρισε / νανουρίστε', translationEN: 'lull', translationRU: 'убаюкивать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 969, present: 'ναυαγώ', future: 'θα ναυαγήσω', aorist: 'ναυάγησα', imperative: 'ναυάγησε / ναυαγήστε', translationEN: 'be shipwrecked', translationRU: 'терпеть кораблекрушение', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 970, present: 'ναυλώνω', future: 'θα ναυλώσω', aorist: 'ναύλωσα', imperative: 'ναύλωσε / ναυλώστε', translationEN: 'charter', translationRU: 'фрахтовать', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 971, present: 'νερώνω', future: 'θα νερώσω', aorist: 'νέρωσα', imperative: 'νέρωσε / νερώστε', translationEN: 'dilute', translationRU: 'разбавлять', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 972, present: 'νευριάζω', future: 'θα νευριάσω', aorist: 'νεύριασα', imperative: 'νεύριασε / νευριάστε', translationEN: 'get annoyed, irritate', translationRU: 'злиться, раздражать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 973, present: 'νεύω', future: 'θα νεύσω', aorist: 'ένευσα', imperative: null, translationEN: 'nod, beckon', translationRU: 'кивать, делать знак', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 974, present: 'νηστεύω', future: 'θα νηστέψω', aorist: 'νήστεψα', imperative: null, translationEN: 'fast', translationRU: 'поститься', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 975, present: 'νιαουρίζω', future: 'θα νιαουρίσω', aorist: 'νιαούρισα', imperative: 'νιαούρισε / νιαουρίστε', translationEN: 'meow', translationRU: 'мяукать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 976, present: 'νικώ', future: 'θα νικήσω', aorist: 'νίκησα', imperative: 'νίκησε / νικήστε', translationEN: 'win, defeat', translationRU: 'побеждать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 977, present: 'νιώθω', future: 'θα νιώσω', aorist: 'ένιωσα', imperative: 'νιώσε / νιώστε', translationEN: 'feel', translationRU: 'чувствовать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 978, present: 'νοιάζομαι', future: 'θα νοιαστώ', aorist: 'νοιάστηκα', imperative: 'νοιάσου / νοιαστείτε', translationEN: 'care', translationRU: 'заботиться, переживать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 979, present: 'νοικιάζω', future: 'θα νοικιάσω', aorist: 'νοίκιασα', imperative: 'νοίκιασε / νοικιάστε', translationEN: 'rent', translationRU: 'арендовать, снимать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 980, present: 'νομίζω', future: 'θα νομίσω', aorist: 'νόμισα', imperative: null, translationEN: 'think, suppose', translationRU: 'думать, полагать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 981, present: 'νομιμοποιώ', future: 'θα νομιμοποιήσω', aorist: 'νομιμοποίησα', imperative: 'νομιμοποίησε / νομιμοποιήστε', translationEN: 'legalize', translationRU: 'легализовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 982, present: 'νομοθετώ', future: 'θα νομοθετήσω', aorist: 'νομοθέτησα', imperative: 'νομοθέτησε / νομοθετήστε', translationEN: 'legislate', translationRU: 'принимать законы', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 983, present: 'νοσηλεύω', future: 'θα νοσηλεύσω', aorist: 'νοσήλευσα', imperative: 'νοσήλευσε / νοσηλεύστε', translationEN: 'nurse, treat', translationRU: 'лечить, ухаживать за больным', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 984, present: 'νοσταλγώ', future: 'θα νοσταλγήσω', aorist: 'νοστάλγησα', imperative: null, translationEN: 'miss, long for', translationRU: 'тосковать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 985, present: 'ντρέπομαι', future: 'θα ντραπώ', aorist: 'ντράπηκα', imperative: 'ντρέψου / ντραπείτε', translationEN: 'be ashamed', translationRU: 'стыдиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 986, present: 'ντροπιάζω', future: 'θα ντροπιάσω', aorist: 'ντροπίασα', imperative: 'ντροπίασε / ντροπιάστε', translationEN: 'shame, disgrace', translationRU: 'позорить, стыдить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 987, present: 'ντύνομαι', future: 'θα ντυθώ', aorist: 'ντύθηκα', imperative: 'ντύσου / ντυθείτε', translationEN: 'get dressed', translationRU: 'одеваться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 988, present: 'ντύνω', future: 'θα ντύσω', aorist: 'έντυσα', imperative: 'ντύσε / ντύστε', translationEN: 'dress (someone)', translationRU: 'одевать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 989, present: 'νυστάζω', future: 'θα νυστάξω', aorist: 'νύσταξα', imperative: null, translationEN: 'be sleepy', translationRU: 'хотеть спать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 990, present: 'νυχτώνω', future: 'θα νυχτώσω', aorist: 'νύχτωσα', imperative: null, translationEN: 'get dark (night falls)', translationRU: 'темнеть, наступать (о ночи)', lexicalCategory: ['lexicalTime','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 991, present: 'ξαγρυπνώ', future: 'θα ξαγρυπνήσω', aorist: 'ξαγρύπνησα', imperative: 'ξαγρύπνησε / ξαγρυπνήστε', translationEN: 'stay awake, keep vigil', translationRU: 'бодрствовать, не спать', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 992, present: 'ξαναβάζω', future: 'θα ξαναβάλω', aorist: 'ξαναέβαλα', imperative: 'ξαναβάλε / ξαναβάλτε', translationEN: 'put again', translationRU: 'класть снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 993, present: 'ξαναβλέπω', future: 'θα ξαναδώ', aorist: 'ξαναείδα', imperative: 'ξαναδές / ξαναδείτε', translationEN: 'see again', translationRU: 'видеть снова', lexicalCategory: ['lexicalSense','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 994, present: 'ξαναβρίσκω', future: 'θα ξαναβρώ', aorist: 'ξαναβρήκα', imperative: 'ξαναβρές / ξαναβρείτε', translationEN: 'find again', translationRU: 'находить снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 995, present: 'ξαναγεννιέμαι', future: 'θα ξαναγεννηθώ', aorist: 'ξαναγεννήθηκα', imperative: 'ξαναγεννήσου / ξαναγεννηθείτε', translationEN: 'be reborn', translationRU: 'рождаться заново', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 996, present: 'ξαναγίνομαι', future: 'θα ξαναγίνω', aorist: 'ξαναέγινα', imperative: 'ξαναγίνε / ξαναγίνετε', translationEN: 'become again', translationRU: 'становиться снова', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 997, present: 'ξαναγράφω', future: 'θα ξαναγράψω', aorist: 'ξαναέγραψα', imperative: 'ξαναγράψε / ξαναγράψτε', translationEN: 'rewrite', translationRU: 'переписывать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 998, present: 'ξαναδένω', future: 'θα ξαναδέσω', aorist: 'ξανάδεσα', imperative: 'ξαναδέσε / ξαναδέστε', translationEN: 'retie', translationRU: 'завязывать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 999, present: 'ξαναδιαβάζω', future: 'θα ξαναδιαβάσω', aorist: 'ξαναδιάβασα', imperative: 'ξαναδιάβασε / ξαναδιαβάστε', translationEN: 'reread', translationRU: 'перечитывать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1000, present: 'ξαναδοκιμάζω', future: 'θα ξαναδοκιμάσω', aorist: 'ξαναδοκίμασα', imperative: 'ξαναδοκίμασε / ξαναδοκιμάστε', translationEN: 'try again', translationRU: 'пробовать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1001, present: 'ξανακάνω', future: 'θα ξανακάνω', aorist: 'ξανάκανα', imperative: 'ξανακάνε / ξανακάντε', translationEN: 'do again', translationRU: 'делать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1002, present: 'ξαναλέω', future: 'θα ξαναπώ', aorist: 'ξαναείπα', imperative: 'ξαναπές / ξαναπείτε', translationEN: 'say again', translationRU: 'говорить снова', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1003, present: 'ξαναπαίρνω', future: 'θα ξαναπάρω', aorist: 'ξαναπήρα', imperative: 'ξαναπάρε / ξαναπάρτε', translationEN: 'take again', translationRU: 'брать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1004, present: 'ξαναπαντρεύομαι', future: 'θα ξαναπαντρευτώ', aorist: 'ξαναπαντρεύτηκα', imperative: 'ξαναπαντρέψου / ξαναπαντρευτείτε', translationEN: 'remarry', translationRU: 'жениться снова', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 1005, present: 'ξαναπλένω', future: 'θα ξαναπλύνω', aorist: 'ξαναέπλυνα', imperative: 'ξαναπλύνε / ξαναπλύνετε', translationEN: 'wash again', translationRU: 'мыть снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1006, present: 'ξαναρχίζω', future: 'θα ξαναρχίσω', aorist: 'ξανάρχισα', imperative: 'ξανάρχισε / ξαναρχίστε', translationEN: 'start again', translationRU: 'начинать снова', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1007, present: 'ξαναρωτώ', future: 'θα ξαναρωτήσω', aorist: 'ξαναρώτησα', imperative: 'ξαναρώτησε / ξαναρωτήστε', translationEN: 'ask again', translationRU: 'спрашивать снова', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1008, present: 'ξανασκέφτομαι', future: 'θα ξανασκεφτώ', aorist: 'ξανασκέφτηκα', imperative: 'ξανασκέψου / ξανασκεφτείτε', translationEN: 'reconsider', translationRU: 'обдумывать заново', lexicalCategory: ['lexicalInfluence','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 1009, present: 'ξαναφτιάχνω', future: 'θα ξαναφτιάξω', aorist: 'ξαναέφτιαξα', imperative: 'ξαναφτιάξε / ξαναφτιάξτε', translationEN: 'remake', translationRU: 'переделывать', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1010, present: 'ξανοίγω', future: 'θα ξανοίξω', aorist: 'ξάνοιξα', imperative: 'ξάνοιξε / ξανοίξτε', translationEN: 'open again, clear up', translationRU: 'раскрывать, проясняться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1011, present: 'ξαπλώνω', future: 'θα ξαπλώσω', aorist: 'ξάπλωσα', imperative: 'ξάπλωσε / ξαπλώστε', translationEN: 'lie down', translationRU: 'ложиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1012, present: 'ξεβάφω', future: 'θα ξεβάψω', aorist: 'ξέβαψα', imperative: 'ξέβαψε / ξεβάψτε', translationEN: 'fade, lose colour', translationRU: 'линять, обесцвечивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1013, present: 'ξεβγάζω', future: 'θα ξεβγάλω', aorist: 'ξέβγαλα', imperative: 'ξέβγαλε / ξεβγάλτε', translationEN: 'rinse, see off', translationRU: 'ополаскивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1014, present: 'ξεβιδώνω', future: 'θα ξεβιδώσω', aorist: 'ξεβίδωσα', imperative: 'ξεβίδωσε / ξεβιδώστε', translationEN: 'unscrew', translationRU: 'выкручивать, отвинчивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1015, present: 'ξεβράζω', future: 'θα ξεβράσω', aorist: 'ξέβρασα', imperative: 'ξέβρασε / ξεβράστε', translationEN: 'wash ashore, cast up', translationRU: 'выбрасывать на берег', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1016, present: 'ξεγελώ', future: 'θα ξεγελάσω', aorist: 'ξεγέλασα', imperative: 'ξεγέλασε / ξεγελάστε', translationEN: 'deceive, trick', translationRU: 'обманывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1017, present: 'ξεγυμνώνω', future: 'θα ξεγυμνώσω', aorist: 'ξεγύμνωσα', imperative: 'ξεγύμνωσε / ξεγυμνώστε', translationEN: 'strip bare', translationRU: 'обнажать, раздевать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1018, present: 'ξεδιαλύνω', future: 'θα ξεδιαλύνω', aorist: 'ξεδιάλυνα', imperative: 'ξεδιάλυνε / ξεδιαλύνετε', translationEN: 'sort out, clear up', translationRU: 'разбирать, прояснять', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1019, present: 'ξεδίνω', future: 'θα ξεδώσω', aorist: 'ξέδωσα', imperative: 'ξέδωσε / ξεδώστε', translationEN: 'unwind, let off steam', translationRU: 'расслабляться, отвести душу', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1020, present: 'ξεδιπλώνω', future: 'θα ξεδιπλώσω', aorist: 'ξεδίπλωσα', imperative: 'ξεδίπλωσε / ξεδιπλώστε', translationEN: 'unfold', translationRU: 'разворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1021, present: 'ξεδιψώ', future: 'θα ξεδιψάσω', aorist: 'ξεδίψασα', imperative: null, translationEN: 'quench thirst', translationRU: 'утолять жажду', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1022, present: 'ξεζώνω', future: 'θα ξεζώσω', aorist: 'ξέζωσα', imperative: 'ξέζωσε / ξεζώστε', translationEN: 'ungird, unbelt', translationRU: 'расстёгивать пояс', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1023, present: 'ξεθάβω', future: 'θα ξεθάψω', aorist: 'ξέθαψα', imperative: 'ξέθαψε / ξεθάψτε', translationEN: 'dig up, exhume', translationRU: 'выкапывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1024, present: 'ξεθαρρεύω', future: 'θα ξεθαρρέψω', aorist: 'ξεθάρρεψα', imperative: 'ξεθάρρεψε / ξεθαρρέψτε', translationEN: 'become bold', translationRU: 'осмеливаться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1025, present: 'ξεθυμαίνω', future: 'θα ξεθυμάνω', aorist: 'ξεθύμανα', imperative: 'ξεθύμανε / ξεθυμάνετε', translationEN: 'lose fizz, calm down', translationRU: 'выдыхаться, остывать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1026, present: 'ξεθωριάζω', future: 'θα ξεθωριάσω', aorist: 'ξεθώριασα', imperative: null, translationEN: 'fade', translationRU: 'выцветать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1027, present: 'ξεκαθαρίζω', future: 'θα ξεκαθαρίσω', aorist: 'ξεκαθάρισα', imperative: 'ξεκαθάρισε / ξεκαθαρίστε', translationEN: 'clarify, sort out', translationRU: 'прояснять, улаживать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1028, present: 'ξεκάνω', future: 'θα ξεκάνω', aorist: 'ξέκανα', imperative: 'ξέκανε / ξεκάνετε', translationEN: 'finish off, kill', translationRU: 'прикончить, разделаться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1029, present: 'ξεκαρδίζομαι', future: 'θα ξεκαρδιστώ', aorist: 'ξεκαρδίστηκα', imperative: 'ξεκαρδίσου / ξεκαρδιστείτε', translationEN: 'burst out laughing', translationRU: 'покатываться со смеху', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1030, present: 'ξεκινώ', future: 'θα ξεκινήσω', aorist: 'ξεκίνησα', imperative: 'ξεκίνησε / ξεκινήστε', translationEN: 'start, set off', translationRU: 'начинать, отправляться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1031, present: 'ξεκλειδώνω', future: 'θα ξεκλειδώσω', aorist: 'ξεκλείδωσα', imperative: 'ξεκλείδωσε / ξεκλειδώστε', translationEN: 'unlock', translationRU: 'отпирать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1032, present: 'ξεκληρίζω', future: 'θα ξεκληρίσω', aorist: 'ξεκλήρισα', imperative: 'ξεκλήρισε / ξεκληρίστε', translationEN: 'wipe out', translationRU: 'истреблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1033, present: 'ξεκοιλιάζω', future: 'θα ξεκοιλιάσω', aorist: 'ξεκοίλιασα', imperative: 'ξεκοίλιασε / ξεκοιλιάστε', translationEN: 'disembowel', translationRU: 'потрошить', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1034, present: 'ξεκοκαλίζω', future: 'θα ξεκοκαλίσω', aorist: 'ξεκοκάλισα', imperative: 'ξεκοκάλισε / ξεκοκαλίστε', translationEN: 'pick clean', translationRU: 'обгладывать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1035, present: 'ξεκολλώ', future: 'θα ξεκολλήσω', aorist: 'ξεκόλλησα', imperative: 'ξεκόλλησε / ξεκολλήστε', translationEN: 'unstick, detach', translationRU: 'отклеивать, отлипать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1036, present: 'ξεκουμπίζομαι', future: 'θα ξεκουμπιστώ', aorist: 'ξεκουμπίστηκα', imperative: 'ξεκουμπίσου / ξεκουμπιστείτε', translationEN: 'clear off, get lost', translationRU: 'убираться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1037, present: 'ξεκουμπώνω', future: 'θα ξεκουμπώσω', aorist: 'ξεκούμπωσα', imperative: 'ξεκούμπωσε / ξεκουμπώστε', translationEN: 'unbutton', translationRU: 'расстёгивать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1038, present: 'ξεκουράζομαι', future: 'θα ξεκουραστώ', aorist: 'ξεκουράστηκα', imperative: 'ξεκουράσου / ξεκουραστείτε', translationEN: 'rest', translationRU: 'отдыхать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1039, present: 'ξεκουφαίνω', future: 'θα ξεκουφάνω', aorist: 'ξεκούφανα', imperative: 'ξεκούφανε / ξεκουφάνετε', translationEN: 'deafen', translationRU: 'оглушать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1040, present: 'ξελογιάζω', future: 'θα ξελογιάσω', aorist: 'ξελόγιασα', imperative: 'ξελόγιασε / ξελογιάστε', translationEN: 'lure, bewitch', translationRU: 'соблазнять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1041, present: 'ξεμακραίνω', future: 'θα ξεμακρύνω', aorist: 'ξεμάκρυνα', imperative: 'ξεμάκρυνε / ξεμακρύνετε', translationEN: 'move far away', translationRU: 'удаляться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1042, present: 'ξεμαλλιάζω', future: 'θα ξεμαλλιάσω', aorist: 'ξεμάλλιασα', imperative: 'ξεμάλλιασε / ξεμαλλιάστε', translationEN: 'dishevel, pull hair out', translationRU: 'растрёпывать, таскать за волосы', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1043, present: 'ξεμένω', future: 'θα ξεμείνω', aorist: 'ξέμεινα', imperative: null, translationEN: 'run out of, be stranded', translationRU: 'остаться без, застрять', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1044, present: 'ξεμπερδεύω', future: 'θα ξεμπερδέψω', aorist: 'ξεμπέρδεψα', imperative: 'ξεμπέρδεψε / ξεμπερδέψτε', translationEN: 'untangle, sort out', translationRU: 'распутывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1045, present: 'ξεμπλέκω', future: 'θα ξεμπλέξω', aorist: 'ξέμπλεξα', imperative: 'ξέμπλεξε / ξεμπλέξτε', translationEN: 'disentangle', translationRU: 'выпутываться, распутывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1046, present: 'ξεμπροστιάζω', future: 'θα ξεμπροστιάσω', aorist: 'ξεμπρόστιασα', imperative: 'ξεμπρόστιασε / ξεμπροστιάστε', translationEN: 'expose, shame', translationRU: 'разоблачать, позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1047, present: 'ξεμυαλίζω', future: 'θα ξεμυαλίσω', aorist: 'ξεμυάλισα', imperative: 'ξεμυάλισε / ξεμυαλίστε', translationEN: 'turn someone\'s head', translationRU: 'кружить голову', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1048, present: 'ξεμυτίζω', future: 'θα ξεμυτίσω', aorist: 'ξεμύτισα', imperative: 'ξεμύτισε / ξεμυτίστε', translationEN: 'venture out', translationRU: 'высовываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1049, present: 'ξεπαγώνω', future: 'θα ξεπαγώσω', aorist: 'ξεπάγωσα', imperative: 'ξεπάγωσε / ξεπαγώστε', translationEN: 'defrost, thaw', translationRU: 'размораживать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1050, present: 'ξεπαστρεύω', future: 'θα ξεπαστρέψω', aorist: 'ξεπάστρεψα', imperative: 'ξεπάστρεψε / ξεπαστρέψτε', translationEN: 'exterminate', translationRU: 'истреблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1051, present: 'ξεπερνώ', future: 'θα ξεπεράσω', aorist: 'ξεπέρασα', imperative: 'ξεπέρασε / ξεπεράστε', translationEN: 'surpass, overcome', translationRU: 'превосходить, преодолевать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1052, present: 'ξεπέφτω', future: 'θα ξεπέσω', aorist: 'ξέπεσα', imperative: 'ξέπεσε / ξεπέστε', translationEN: 'decline, fall low', translationRU: 'опускаться, приходить в упадок', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1053, present: 'ξεπλένω', future: 'θα ξεπλύνω', aorist: 'ξέπλυνα', imperative: 'ξέπλυνε / ξεπλύνετε', translationEN: 'rinse', translationRU: 'полоскать, ополаскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1054, present: 'ξεπουλώ', future: 'θα ξεπουλήσω', aorist: 'ξεπούλησα', imperative: 'ξεπούλησε / ξεπουλήστε', translationEN: 'sell off', translationRU: 'распродавать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1055, present: 'ξεπροβάλλω', future: 'θα ξεπροβάλω', aorist: 'ξεπρόβαλα', imperative: 'ξεπρόβαλε / ξεπροβάλετε', translationEN: 'appear, emerge', translationRU: 'появляться, выглядывать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1056, present: 'ξεπροβοδίζω', future: 'θα ξεπροβοδίσω', aorist: 'ξεπροβόδισα', imperative: 'ξεπροβόδισε / ξεπροβοδίστε', translationEN: 'see off', translationRU: 'провожать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1057, present: 'ξεραίνω', future: 'θα ξεράνω', aorist: 'ξέρανα', imperative: 'ξέρανε / ξεράνετε', translationEN: 'dry up, wither', translationRU: 'сушить, иссушать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1058, present: 'ξεριζώνω', future: 'θα ξεριζώσω', aorist: 'ξερίζωσα', imperative: 'ξερίζωσε / ξεριζώστε', translationEN: 'uproot', translationRU: 'вырывать с корнем', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1059, present: 'ξερνώ', future: 'θα ξεράσω', aorist: 'ξέρασα', imperative: 'ξέρασε / ξεράστε', translationEN: 'vomit', translationRU: 'рвать (тошнить)', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1060, present: 'ξεροκαταπίνω', future: 'θα ξεροκαταπιώ', aorist: 'ξεροκατάπια', imperative: 'ξεροκατάπιε / ξεροκαταπιείτε', translationEN: 'gulp, swallow hard', translationRU: 'глотать всухую', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1061, present: 'ξέρω', future: null, aorist: 'ήξερα', imperative: null, translationEN: 'know', translationRU: 'знать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1062, present: 'ξεσηκώνομαι', future: 'θα ξεσηκωθώ', aorist: 'ξεσηκώθηκα', imperative: 'ξεσηκώσου / ξεσηκωθείτε', translationEN: 'rise up, rebel', translationRU: 'подниматься, восставать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1063, present: 'ξεσηκώνω', future: 'θα ξεσηκώσω', aorist: 'ξεσήκωσα', imperative: 'ξεσήκωσε / ξεσηκώστε', translationEN: 'rouse, incite', translationRU: 'поднимать, подстрекать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1064, present: 'ξεσκεπάζω', future: 'θα ξεσκεπάσω', aorist: 'ξεσκέπασα', imperative: 'ξεσκέπασε / ξεσκεπάστε', translationEN: 'uncover', translationRU: 'раскрывать, снимать покров', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1065, present: 'ξεσκίζω', future: 'θα ξεσκίσω', aorist: 'ξέσκισα', imperative: 'ξέσκισε / ξεσκίστε', translationEN: 'tear up', translationRU: 'разрывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1066, present: 'ξεσκονίζω', future: 'θα ξεσκονίσω', aorist: 'ξεσκόνισα', imperative: 'ξεσκόνισε / ξεσκονίστε', translationEN: 'dust', translationRU: 'вытирать пыль', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1067, present: 'ξεσπώ', future: 'θα ξεσπάσω', aorist: 'ξέσπασα', imperative: 'ξέσπασε / ξεσπάστε', translationEN: 'burst out', translationRU: 'вспыхивать, срываться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1068, present: 'ξεστομίζω', future: 'θα ξεστομίσω', aorist: 'ξεστόμισα', imperative: 'ξεστόμισε / ξεστομίστε', translationEN: 'utter, blurt out', translationRU: 'выпаливать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1069, present: 'ξεστρατίζω', future: 'θα ξεστρατίσω', aorist: 'ξεστράτισα', imperative: 'ξεστράτισε / ξεστρατίστε', translationEN: 'go astray', translationRU: 'сбиваться с пути', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1070, present: 'ξετρελαίνω', future: 'θα ξετρελάνω', aorist: 'ξετρέλανα', imperative: 'ξετρέλανε / ξετρελάνετε', translationEN: 'drive crazy', translationRU: 'сводить с ума', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1071, present: 'ξετυλίγω', future: 'θα ξετυλίξω', aorist: 'ξετύλιξα', imperative: 'ξετύλιξε / ξετυλίξτε', translationEN: 'unwrap, unroll', translationRU: 'разворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1072, present: 'ξεφεύγω', future: 'θα ξεφύγω', aorist: 'ξέφυγα', imperative: 'ξέφυγε / ξεφύγετε', translationEN: 'escape, slip away', translationRU: 'ускользать, вырываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1073, present: 'ξεφλουδίζω', future: 'θα ξεφλουδίσω', aorist: 'ξεφλούδισα', imperative: 'ξεφλούδισε / ξεφλουδίστε', translationEN: 'peel', translationRU: 'чистить (от кожуры)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1074, present: 'ξεφορτίζομαι', future: 'θα ξεφορτιστώ', aorist: 'ξεφορτίστηκα', imperative: 'ξεφορτίσου / ξεφορτιστείτε', translationEN: 'run out of charge', translationRU: 'разряжаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1075, present: 'ξεφορτώνω', future: 'θα ξεφορτώσω', aorist: 'ξεφόρτωσα', imperative: 'ξεφόρτωσε / ξεφορτώστε', translationEN: 'unload, get rid of', translationRU: 'разгружать, избавляться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1076, present: 'ξεφουσκώνω', future: 'θα ξεφουσκώσω', aorist: 'ξεφούσκωσα', imperative: 'ξεφούσκωσε / ξεφουσκώστε', translationEN: 'deflate', translationRU: 'сдувать, сдуваться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1077, present: 'ξεφτίζω', future: 'θα ξεφτίσω', aorist: 'ξέφτισα', imperative: 'ξέφτισε / ξεφτίστε', translationEN: 'fray', translationRU: 'истрепаться, обтрепаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1078, present: 'ξεφτιλίζω', future: 'θα ξεφτιλίσω', aorist: 'ξεφτίλισα', imperative: 'ξεφτίλισε / ξεφτιλίστε', translationEN: 'disgrace, humiliate', translationRU: 'позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1079, present: 'ξεφυλλίζω', future: 'θα ξεφυλλίσω', aorist: 'ξεφύλλισα', imperative: 'ξεφύλλισε / ξεφυλλίστε', translationEN: 'leaf through', translationRU: 'листать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1080, present: 'ξεφωνίζω', future: 'θα ξεφωνίσω', aorist: 'ξεφώνισα', imperative: 'ξεφώνισε / ξεφωνίστε', translationEN: 'shout out', translationRU: 'выкрикивать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1081, present: 'ξεχαρβαλώνω', future: 'θα ξεχαρβαλώσω', aorist: 'ξεχαρβάλωσα', imperative: 'ξεχαρβάλωσε / ξεχαρβαλώστε', translationEN: 'wreck, dismantle', translationRU: 'разбалтывать, ломать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1082, present: 'ξεχειλίζω', future: 'θα ξεχειλίσω', aorist: 'ξεχείλισα', imperative: null, translationEN: 'overflow', translationRU: 'переливаться через край', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1083, present: 'ξεχνώ', future: 'θα ξεχάσω', aorist: 'ξέχασα', imperative: 'ξέχασε / ξεχάστε', translationEN: 'forget', translationRU: 'забывать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1084, present: 'ξεχορταριάζω', future: 'θα ξεχορταριάσω', aorist: 'ξεχορτάριασα', imperative: 'ξεχορτάριασε / ξεχορταριάστε', translationEN: 'weed', translationRU: 'полоть', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1085, present: 'ξεχωρίζω', future: 'θα ξεχωρίσω', aorist: 'ξεχώρισα', imperative: 'ξεχώρισε / ξεχωρίστε', translationEN: 'separate, stand out', translationRU: 'отделять, выделяться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1086, present: 'ξεψυχώ', future: 'θα ξεψυχήσω', aorist: 'ξεψύχησα', imperative: 'ξεψύχησε / ξεψυχήστε', translationEN: 'breathe one\'s last', translationRU: 'испускать дух', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1087, present: 'ξημερώνω', future: 'θα ξημερώσω', aorist: 'ξημέρωσα', imperative: null, translationEN: 'dawn', translationRU: 'рассветать', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1088, present: 'ξινίζω', future: 'θα ξινίσω', aorist: 'ξίνισα', imperative: 'ξίνισε / ξινίστε', translationEN: 'turn sour', translationRU: 'киснуть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1089, present: 'ξοδεύω', future: 'θα ξοδέψω', aorist: 'ξόδεψα', imperative: 'ξόδεψε / ξοδέψτε', translationEN: 'spend', translationRU: 'тратить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1090, present: 'ξορκίζω', future: 'θα ξορκίσω', aorist: 'ξόρκισα', imperative: 'ξόρκισε / ξορκίστε', translationEN: 'exorcise', translationRU: 'изгонять (бесов)', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1091, present: 'ξύνω', future: 'θα ξύσω', aorist: 'έξυσα', imperative: 'ξύσε / ξύστε', translationEN: 'scratch', translationRU: 'чесать, скрести', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1092, present: 'ξυπνώ', future: 'θα ξυπνήσω', aorist: 'ξύπνησα', imperative: 'ξύπνησε / ξυπνήστε', translationEN: 'wake up', translationRU: 'просыпаться, будить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1093, present: 'ξυρίζομαι', future: 'θα ξυριστώ', aorist: 'ξυρίστηκα', imperative: 'ξυρίσου / ξυριστείτε', translationEN: 'shave (oneself)', translationRU: 'бриться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1094, present: 'ξυρίζω', future: 'θα ξυρίσω', aorist: 'ξύρισα', imperative: 'ξύρισε / ξυρίστε', translationEN: 'shave', translationRU: 'брить', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1095, present: 'οδηγώ', future: 'θα οδηγήσω', aorist: 'οδήγησα', imperative: 'οδήγησε / οδηγήστε', translationEN: 'drive, lead', translationRU: 'водить, вести', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1096, present: 'οικοδομώ', future: 'θα οικοδομήσω', aorist: 'οικοδόμησα', imperative: 'οικοδόμησε / οικοδομήστε', translationEN: 'build', translationRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1097, present: 'ολισθαίνω', future: 'θα ολισθήσω', aorist: 'ολίσθησα', imperative: 'ολίσθησε / ολισθήστε', translationEN: 'slide, slip', translationRU: 'скользить', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1098, present: 'ολοκληρώνω', future: 'θα ολοκληρώσω', aorist: 'ολοκλήρωσα', imperative: 'ολοκλήρωσε / ολοκληρώστε', translationEN: 'complete', translationRU: 'завершать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1099, present: 'ομολογώ', future: 'θα ομολογήσω', aorist: 'ομολόγησα', imperative: 'ομολόγησε / ομολογήστε', translationEN: 'confess', translationRU: 'признавать, признаваться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1100, present: 'ομορφαίνω', future: 'θα ομορφύνω', aorist: 'ομόρφυνα', imperative: 'ομόρφυνε / ομορφύνετε', translationEN: 'beautify', translationRU: 'украшать, хорошеть', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1101, present: 'ονειρεύομαι', future: 'θα ονειρευτώ', aorist: 'ονειρεύτηκα', imperative: 'ονειρέψου / ονειρευτείτε', translationEN: 'dream', translationRU: 'мечтать, видеть сны', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1102, present: 'ονομάζομαι', future: 'θα ονομαστώ', aorist: 'ονομάστηκα', imperative: 'ονομάσου / ονομαστείτε', translationEN: 'be called', translationRU: 'называться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1103, present: 'ονομάζω', future: 'θα ονομάσω', aorist: 'ονόμασα', imperative: 'ονόμασε / ονομάστε', translationEN: 'name', translationRU: 'называть', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1104, present: 'οξειδώνω', future: 'θα οξειδώσω', aorist: 'οξείδωσα', imperative: 'οξείδωσε / οξειδώστε', translationEN: 'oxidize', translationRU: 'окислять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1105, present: 'οπισθοχωρώ', future: 'θα οπισθοχωρήσω', aorist: 'οπισθοχώρησα', imperative: 'οπισθοχώρησε / οπισθοχωρήστε', translationEN: 'retreat', translationRU: 'отступать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1106, present: 'οπλίζω', future: 'θα οπλίσω', aorist: 'όπλισα', imperative: 'όπλισε / οπλίστε', translationEN: 'arm', translationRU: 'вооружать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1107, present: 'οργανώνω', future: 'θα οργανώσω', aorist: 'οργάνωσα', imperative: 'οργάνωσε / οργανώστε', translationEN: 'organize', translationRU: 'организовывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1108, present: 'οργίζομαι', future: 'θα οργιστώ', aorist: 'οργίστηκα', imperative: 'οργίσου / οργιστείτε', translationEN: 'get angry', translationRU: 'гневаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1109, present: 'οργώνω', future: 'θα οργώσω', aorist: 'όργωσα', imperative: 'όργωσε / οργώστε', translationEN: 'plough', translationRU: 'пахать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1110, present: 'ορθογραφώ', future: 'θα ορθογραφήσω', aorist: 'ορθογράφησα', imperative: 'ορθογράφησε / ορθογραφήστε', translationEN: 'spell correctly', translationRU: 'писать грамотно', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1111, present: 'ορίζω', future: 'θα ορίσω', aorist: 'όρισα', imperative: 'όρισε / ορίστε', translationEN: 'define, set', translationRU: 'определять, назначать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1112, present: 'ορκίζομαι', future: 'θα ορκιστώ', aorist: 'ορκίστηκα', imperative: 'ορκίσου / ορκιστείτε', translationEN: 'swear', translationRU: 'клясться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1113, present: 'ορμώ', future: 'θα ορμήσω', aorist: 'όρμησα', imperative: 'όρμησε / ορμήστε', translationEN: 'rush, charge', translationRU: 'бросаться, устремляться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1114, present: 'ουρλιάζω', future: 'θα ουρλιάξω', aorist: 'ούρλιαξα', imperative: 'ούρλιαξε / ουρλιάξτε', translationEN: 'howl, scream', translationRU: 'выть, вопить', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1115, present: 'οφείλω', future: null, aorist: 'όφειλα', imperative: null, translationEN: 'owe, ought', translationRU: 'быть должным', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1116, present: 'οχυρώνω', future: 'θα οχυρώσω', aorist: 'οχύρωσα', imperative: 'οχύρωσε / οχυρώστε', translationEN: 'fortify', translationRU: 'укреплять', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1117, present: 'παγιδεύομαι', future: 'θα παγιδευτώ', aorist: 'παγιδεύτηκα', imperative: 'παγιδέψου / παγιδευτείτε', translationEN: 'get trapped', translationRU: 'попадаться в ловушку', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1118, present: 'παγιδεύω', future: 'θα παγιδεύσω', aorist: 'παγίδευσα', imperative: 'παγίδευσε / παγιδεύστε', translationEN: 'trap', translationRU: 'ловить в ловушку', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1119, present: 'παγώνω', future: 'θα παγώσω', aorist: 'πάγωσα', imperative: 'πάγωσε / παγώστε', translationEN: 'freeze', translationRU: 'замерзать, замораживать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1120, present: 'παζαρεύω', future: 'θα παζαρέψω', aorist: 'παζάρεψα', imperative: 'παζάρεψε / παζαρέψτε', translationEN: 'haggle', translationRU: 'торговаться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1121, present: 'παθαίνω', future: 'θα πάθω', aorist: 'έπαθα', imperative: 'πάθε / πάθετε', translationEN: 'suffer, undergo', translationRU: 'страдать, претерпевать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1122, present: 'παίζω', future: 'θα παίξω', aorist: 'έπαιξα', imperative: 'παίξε / παίξτε', translationEN: 'play', translationRU: 'играть', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1123, present: 'παίρνω', future: 'θα πάρω', aorist: 'πήρα', imperative: 'πάρε / πάρτε', translationEN: 'take', translationRU: 'брать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1124, present: 'παλεύω', future: 'θα παλέψω', aorist: 'πάλεψα', imperative: 'πάλεψε / παλέψτε', translationEN: 'wrestle, fight', translationRU: 'бороться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1125, present: 'παντρεύομαι', future: 'θα παντρευτώ', aorist: 'παντρεύτηκα', imperative: 'παντρέψου / παντρευτείτε', translationEN: 'get married', translationRU: 'жениться, выходить замуж', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1126, present: 'παραγγέλνω', future: 'θα παραγγείλω', aorist: 'παρήγγειλα', imperative: 'παράγγειλε / παραγγείλετε', translationEN: 'order', translationRU: 'заказывать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1127, present: 'παράγω', future: null, aorist: 'παρήγαγα', imperative: null, translationEN: 'produce', translationRU: 'производить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1128, present: 'παραδέχομαι', future: 'θα παραδεχτώ', aorist: 'παραδέχτηκα', imperative: 'παραδέξου / παραδεχτείτε', translationEN: 'admit', translationRU: 'признавать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1129, present: 'παραδίδω', future: 'θα παραδώσω', aorist: 'παρέδωσα', imperative: 'παράδωσε / παραδώστε', translationEN: 'hand over, deliver', translationRU: 'сдавать, передавать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1130, present: 'παραθέτω', future: 'θα παραθέσω', aorist: 'παρέθεσα', imperative: 'παράθεσε / παραθέστε', translationEN: 'quote, cite', translationRU: 'цитировать, приводить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1131, present: 'παραιτούμαι', future: 'θα παραιτηθώ', aorist: 'παραιτήθηκα', imperative: 'παραιτήσου / παραιτηθείτε', translationEN: 'resign', translationRU: 'уходить в отставку, отказываться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1132, present: 'παρακαλώ', future: 'θα παρακαλέσω', aorist: 'παρακάλεσα', imperative: 'παρακάλεσε / παρακαλέστε', translationEN: 'beg, request', translationRU: 'просить, умолять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1133, present: 'παρακινώ', future: 'θα παρακινήσω', aorist: 'παρακίνησα', imperative: 'παρακίνησε / παρακινήστε', translationEN: 'urge, motivate', translationRU: 'побуждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1134, present: 'παρακμάζω', future: 'θα παρακμάσω', aorist: 'παρήκμασα', imperative: null, translationEN: 'decline', translationRU: 'приходить в упадок', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1135, present: 'παρακολουθώ', future: 'θα παρακολουθήσω', aorist: 'παρακολούθησα', imperative: 'παρακολούθησε / παρακολουθήστε', translationEN: 'watch, follow, attend', translationRU: 'следить, посещать', lexicalCategory: ['lexicalSense','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1136, present: 'παραμελώ', future: 'θα παραμελήσω', aorist: 'παραμέλησα', imperative: 'παραμέλησε / παραμελήστε', translationEN: 'neglect', translationRU: 'запускать, пренебрегать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1137, present: 'παραμένω', future: 'θα παραμείνω', aorist: 'παρέμεινα', imperative: 'παράμεινε / παραμείνετε', translationEN: 'remain', translationRU: 'оставаться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1138, present: 'παραμερίζω', future: 'θα παραμερίσω', aorist: 'παραμέρισα', imperative: 'παραμέρισε / παραμερίστε', translationEN: 'step aside, push aside', translationRU: 'отодвигать, сторониться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1139, present: 'παραμορφώνω', future: 'θα παραμορφώσω', aorist: 'παραμόρφωσα', imperative: 'παραμόρφωσε / παραμορφώστε', translationEN: 'deform, distort', translationRU: 'искажать, деформировать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1140, present: 'παραπατώ', future: 'θα παραπατήσω', aorist: 'παραπάτησα', imperative: 'παραπάτησε / παραπατήστε', translationEN: 'stumble', translationRU: 'спотыкаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1141, present: 'παραπλανώ', future: 'θα παραπλανήσω', aorist: 'παραπλάνησα', imperative: 'παραπλάνησε / παραπλανήστε', translationEN: 'mislead', translationRU: 'вводить в заблуждение', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1142, present: 'παραπλέω', future: 'θα παραπλεύσω', aorist: 'παρέπλευσα', imperative: 'παράπλευσε / παραπλεύστε', translationEN: 'sail past', translationRU: 'проплывать мимо', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1143, present: 'παραποιώ', future: 'θα παραποιήσω', aorist: 'παραποίησα', imperative: 'παραποίησε / παραποιήστε', translationEN: 'falsify, distort', translationRU: 'подделывать, искажать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1144, present: 'παραπονιέμαι', future: 'θα παραπονεθώ', aorist: 'παραπονέθηκα', imperative: 'παραπονέσου / παραπονεθείτε', translationEN: 'complain', translationRU: 'жаловаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1145, present: 'παραστρατώ', future: 'θα παραστρατήσω', aorist: 'παραστράτησα', imperative: 'παραστράτησε / παραστρατήστε', translationEN: 'go astray', translationRU: 'сбиваться с пути', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1146, present: 'παρασύρομαι', future: 'θα παρασυρθώ', aorist: 'παρασύρθηκα', imperative: 'παρασύρσου / παρασυρθείτε', translationEN: 'get carried away', translationRU: 'увлекаться, поддаваться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1147, present: 'παρασύρω', future: null, aorist: 'παρέσυρα', imperative: 'παράσυρε / παρασύρετε', translationEN: 'sweep away, drag along', translationRU: 'увлекать, сносить', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1148, present: 'παρατείνομαι', future: 'θα παραταθώ', aorist: 'παρατάθηκα', imperative: 'παράτασου / παραταθείτε', translationEN: 'be prolonged', translationRU: 'продлеваться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1149, present: 'παρατείνω', future: 'θα παρατείνω', aorist: 'παρέτεινα', imperative: 'παράτεινε / παρατείνετε', translationEN: 'extend, prolong', translationRU: 'продлевать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1150, present: 'παρατηρώ', future: 'θα παρατηρήσω', aorist: 'παρατήρησα', imperative: 'παρατήρησε / παρατηρήστε', translationEN: 'observe, notice', translationRU: 'наблюдать, замечать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1151, present: 'παρατώ', future: 'θα παρατήσω', aorist: 'παράτησα', imperative: 'παράτησε / παρατήστε', translationEN: 'abandon, quit', translationRU: 'бросать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1152, present: 'παραφράζω', future: 'θα παραφράσω', aorist: 'παρέφρασα', imperative: 'παράφρασε / παραφράστε', translationEN: 'paraphrase', translationRU: 'перефразировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1153, present: 'παραχωρώ', future: 'θα παραχωρήσω', aorist: 'παραχώρησα', imperative: 'παραχώρησε / παραχωρήστε', translationEN: 'concede, give up', translationRU: 'уступать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1154, present: 'παρεκκλίνω', future: 'θα παρεκκλίνω', aorist: 'παρέκκλινα', imperative: 'παρέκκλινε / παρεκκλίνετε', translationEN: 'deviate', translationRU: 'отклоняться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1155, present: 'παρενοχλώ', future: 'θα παρενοχλήσω', aorist: 'παρενόχλησα', imperative: 'παρενόχλησε / παρενοχλήστε', translationEN: 'harass', translationRU: 'досаждать, домогаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1156, present: 'παρεξηγώ', future: 'θα παρεξηγήσω', aorist: 'παρεξήγησα', imperative: 'παρεξήγησε / παρεξηγήστε', translationEN: 'misunderstand', translationRU: 'неверно понимать, обижаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1157, present: 'παρευρίσκομαι', future: 'θα παρευρεθώ', aorist: 'παρευρέθηκα', imperative: 'παρευρέσου / παρευρεθείτε', translationEN: 'attend, be present', translationRU: 'присутствовать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1158, present: 'παρέχω', future: 'θα παράσχω', aorist: 'παρείχα', imperative: null, translationEN: 'provide', translationRU: 'предоставлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1159, present: 'παρηγορώ', future: 'θα παρηγορήσω', aorist: 'παρηγόρησα', imperative: 'παρηγόρησε / παρηγορήστε', translationEN: 'comfort', translationRU: 'утешать', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1160, present: 'παριστάνω', future: 'θα παραστήσω', aorist: 'παρέστησα', imperative: 'παράστησε / παραστήστε', translationEN: 'pretend to be, represent', translationRU: 'изображать, представлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1161, present: 'παρκάρω', future: 'θα παρκάρω', aorist: 'πάρκαρα', imperative: 'πάρκαρε / παρκάρετε', translationEN: 'park', translationRU: 'парковать', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1162, present: 'παροτρύνω', future: 'θα παροτρύνω', aorist: 'παρότρυνα', imperative: 'παρότρυνε / παροτρύνετε', translationEN: 'urge on, exhort', translationRU: 'подстрекать, призывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1163, present: 'παρουσιάζομαι', future: 'θα παρουσιαστώ', aorist: 'παρουσιάστηκα', imperative: 'παρουσιάσου / παρουσιαστείτε', translationEN: 'appear, report in', translationRU: 'являться, появляться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1164, present: 'παρουσιάζω', future: 'θα παρουσιάσω', aorist: 'παρουσίασα', imperative: 'παρουσίασε / παρουσιάστε', translationEN: 'present, introduce', translationRU: 'представлять, показывать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1165, present: 'πασαλείβω', future: 'θα πασαλείψω', aorist: 'πασάλειψα', imperative: 'πασάλειψε / πασαλείψτε', translationEN: 'smear', translationRU: 'мазать, пачкать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1166, present: 'πασάρω', future: 'θα πασάρω', aorist: 'πάσαρα', imperative: 'πάσαρε / πασάρετε', translationEN: 'pass (ball)', translationRU: 'передавать мяч', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1167, present: 'πασπατεύω', future: 'θα πασπατέψω', aorist: 'πασπάτεψα', imperative: 'πασπάτεψε / πασπατέψτε', translationEN: 'fumble, grope', translationRU: 'щупать, лапать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1168, present: 'πασχίζω', future: 'θα πασχίσω', aorist: 'πάσχισα', imperative: 'πάσχισε / πασχίστε', translationEN: 'strive', translationRU: 'стараться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1169, present: 'πατώ', future: 'θα πατήσω', aorist: 'πάτησα', imperative: 'πάτησε / πατήστε', translationEN: 'step on, press', translationRU: 'наступать, нажимать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1170, present: 'παύω', future: 'θα παύσω', aorist: 'έπαυσα', imperative: 'παύσε / παύστε', translationEN: 'cease, stop', translationRU: 'прекращать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1171, present: 'παχαίνω', future: 'θα παχύνω', aorist: 'πάχυνα', imperative: 'πάχυνε / παχύνετε', translationEN: 'gain weight', translationRU: 'толстеть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1172, present: 'πάω', future: null, aorist: 'πήγα', imperative: 'πήγαινε / πηγαίνετε', translationEN: 'go', translationRU: 'идти, ехать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2','grammarIrregular']},
{id: 1173, present: 'πεθαίνω', future: 'θα πεθάνω', aorist: 'πέθανα', imperative: 'πέθανε / πεθάνετε', translationEN: 'die', translationRU: 'умирать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1174, present: 'πειθαρχώ', future: 'θα πειθαρχήσω', aorist: 'πειθάρχησα', imperative: 'πειθάρχησε / πειθαρχήστε', translationEN: 'obey, be disciplined', translationRU: 'подчиняться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1175, present: 'πείθομαι', future: 'θα πεισθώ', aorist: 'πείστηκα', imperative: 'πείσου / πειστείτε', translationEN: 'be persuaded', translationRU: 'убеждаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1176, present: 'πείθω', future: 'θα πείσω', aorist: 'έπεισα', imperative: 'πείσε / πείστε', translationEN: 'convince', translationRU: 'убеждать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1177, present: 'πεινώ', future: 'θα πεινάσω', aorist: 'πείνασα', imperative: null, translationEN: 'be hungry', translationRU: 'хотеть есть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1178, present: 'πειράζω', future: 'θα πειράξω', aorist: 'πείραξα', imperative: 'πείραξε / πειράξτε', translationEN: 'bother, tease', translationRU: 'беспокоить, дразнить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1179, present: 'πειραματίζομαι', future: 'θα πειραματιστώ', aorist: 'πειραματίστηκα', imperative: 'πειραματίσου / πειραματιστείτε', translationEN: 'experiment', translationRU: 'экспериментировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1180, present: 'πεισματώνω', future: 'θα πεισματώσω', aorist: 'πεισμάτωσα', imperative: 'πεισμάτωσε / πεισματώστε', translationEN: 'dig in one\'s heels', translationRU: 'упрямиться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1181, present: 'πενθώ', future: 'θα πενθήσω', aorist: 'πένθησα', imperative: null, translationEN: 'mourn', translationRU: 'скорбеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1182, present: 'περηφανεύομαι', future: 'θα περηφανευτώ', aorist: 'περηφανεύτηκα', imperative: 'περηφανέψου / περηφανευτείτε', translationEN: 'take pride', translationRU: 'гордиться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1183, present: 'περιβάλλω', future: 'θα περιβάλω', aorist: 'περιέβαλα', imperative: 'περίβαλε / περιβάλετε', translationEN: 'surround', translationRU: 'окружать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1184, present: 'περιγελώ', future: 'θα περιγελάσω', aorist: 'περιγέλασα', imperative: 'περιγέλασε / περιγελάστε', translationEN: 'mock, laugh at', translationRU: 'высмеивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1185, present: 'περιγράφω', future: 'θα περιγράψω', aorist: 'περιέγραψα', imperative: 'περίγραψε / περιγράψτε', translationEN: 'describe', translationRU: 'описывать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1186, present: 'περιδιαβάζω', future: 'θα περιδιαβάσω', aorist: 'περιδιάβασα', imperative: 'περιδιάβασε / περιδιαβάστε', translationEN: 'stroll around', translationRU: 'прогуливаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1187, present: 'περιέχω', future: null, aorist: 'περιείχα', imperative: null, translationEN: 'contain', translationRU: 'содержать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1188, present: 'περικλείω', future: 'θα περικλείσω', aorist: 'περιέκλεισα', imperative: 'περίκλεισε / περικλείστε', translationEN: 'enclose', translationRU: 'заключать, окружать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1189, present: 'περιλαμβάνω', future: 'θα περιλάβω', aorist: 'περιέλαβα', imperative: 'περίλαβε / περιλάβετε', translationEN: 'include', translationRU: 'включать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1190, present: 'περιμένω', future: null, aorist: 'περίμενα', imperative: 'περίμενε / περιμένετε', translationEN: 'wait, expect', translationRU: 'ждать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1191, present: 'περιορίζω', future: 'θα περιορίσω', aorist: 'περιόρισα', imperative: 'περιόρισε / περιορίστε', translationEN: 'restrict', translationRU: 'ограничивать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1192, present: 'περιπίπτω', future: 'θα περιπέσω', aorist: 'περιέπεσα', imperative: 'περίπεσε / περιπέστε', translationEN: 'fall into', translationRU: 'впадать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1193, present: 'περιπλανιέμαι', future: 'θα περιπλανηθώ', aorist: 'περιπλανήθηκα', imperative: 'περιπλανήσου / περιπλανηθείτε', translationEN: 'wander', translationRU: 'бродить, скитаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1194, present: 'περιπλέκομαι', future: 'θα περιπλεχθώ', aorist: 'περιπλέχθηκα', imperative: 'περιπλέξου / περιπλεχθείτε', translationEN: 'get entangled', translationRU: 'запутываться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1195, present: 'περιπλέκω', future: 'θα περιπλέξω', aorist: 'περιέπλεξα', imperative: 'περίπλεξε / περιπλέξτε', translationEN: 'complicate', translationRU: 'усложнять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1196, present: 'περιποιούμαι', future: 'θα περιποιηθώ', aorist: 'περιποιήθηκα', imperative: 'περιποιήσου / περιποιηθείτε', translationEN: 'take care of, treat', translationRU: 'ухаживать, угощать', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 1197, present: 'περιπολώ', future: 'θα περιπολήσω', aorist: 'περιπόλησα', imperative: 'περιπόλησε / περιπολήστε', translationEN: 'patrol', translationRU: 'патрулировать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1198, present: 'περισσεύω', future: 'θα περισσέψω', aorist: 'περίσσεψα', imperative: null, translationEN: 'be left over', translationRU: 'оставаться, быть в избытке', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1199, present: 'περιστρέφω', future: 'θα περιστρέψω', aorist: 'περιέστρεψα', imperative: 'περίστρεψε / περιστρέψτε', translationEN: 'rotate', translationRU: 'вращать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1200, present: 'περιτρέχω', future: 'θα περιτρέξω', aorist: 'περιέτρεξα', imperative: 'περίτρεξε / περιτρέξτε', translationEN: 'run around', translationRU: 'обегать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1201, present: 'περιτριγυρίζω', future: 'θα περιτριγυρίσω', aorist: 'περιτριγύρισα', imperative: 'περιτριγύρισε / περιτριγυρίστε', translationEN: 'surround', translationRU: 'окружать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1202, present: 'περιτυλίγω', future: 'θα περιτυλίξω', aorist: 'περιτύλιξα', imperative: 'περιτύλιξε / περιτυλίξτε', translationEN: 'wrap around', translationRU: 'обёртывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1203, present: 'περιφέρομαι', future: 'θα περιφερθώ', aorist: 'περιφέρθηκα', imperative: 'περιφέρσου / περιφερθείτε', translationEN: 'wander around', translationRU: 'слоняться, бродить', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1204, present: 'περιφέρω', future: 'θα περιφέρω', aorist: 'περιέφερα', imperative: 'περίφερε / περιφέρετε', translationEN: 'carry around', translationRU: 'носить по кругу, возить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1205, present: 'περιφράζω', future: 'θα περιφράξω', aorist: 'περίφραξα', imperative: 'περίφραξε / περιφράξτε', translationEN: 'fence in', translationRU: 'огораживать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1206, present: 'περιφρονώ', future: 'θα περιφρονήσω', aorist: 'περιφρόνησα', imperative: 'περιφρόνησε / περιφρονήστε', translationEN: 'despise', translationRU: 'презирать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1207, present: 'περνώ', future: 'θα περάσω', aorist: 'πέρασα', imperative: 'πέρασε / περάστε', translationEN: 'pass, spend (time)', translationRU: 'проходить, проводить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1208, present: 'περπατώ', future: 'θα περπατήσω', aorist: 'περπάτησα', imperative: 'περπάτησε / περπατήστε', translationEN: 'walk', translationRU: 'ходить пешком', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1209, present: 'πετάγομαι', future: 'θα πεταχτώ', aorist: 'πετάχτηκα', imperative: 'πετάξου / πεταχτείτε', translationEN: 'jump up, dash', translationRU: 'вскакивать, выскакивать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1210, present: 'πετρώνω', future: 'θα πετρώσω', aorist: 'πέτρωσα', imperative: 'πέτρωσε / πετρώστε', translationEN: 'turn to stone, petrify', translationRU: 'каменеть', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1211, present: 'πετσοκόβω', future: 'θα πετσοκόψω', aorist: 'πετσόκοψα', imperative: 'πετσόκοψε / πετσοκόψτε', translationEN: 'hack to pieces', translationRU: 'кромсать, рубить на куски', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1212, present: 'πετυχαίνω', future: 'θα πετύχω', aorist: 'πέτυχα', imperative: 'πέτυχε / πετύχετε', translationEN: 'succeed, hit', translationRU: 'удаваться, попадать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1213, present: 'πετώ', future: 'θα πετάξω', aorist: 'πέταξα', imperative: 'πέταξε / πετάξτε', translationEN: 'throw, fly', translationRU: 'бросать, летать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1214, present: 'πέφτω', future: 'θα πέσω', aorist: 'έπεσα', imperative: 'πέσε / πέστε', translationEN: 'fall', translationRU: 'падать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1215, present: 'πηδώ', future: 'θα πηδήξω', aorist: 'πήδηξα', imperative: 'πήδηξε / πηδήξτε', translationEN: 'jump', translationRU: 'прыгать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1216, present: 'πήζω', future: 'θα πήξω', aorist: 'έπηξα', imperative: 'πήξε / πήξτε', translationEN: 'congeal, set', translationRU: 'застывать, свёртываться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1217, present: 'πιάνω', future: 'θα πιάσω', aorist: 'έπιασα', imperative: 'πιάσε / πιάστε', translationEN: 'catch, grab', translationRU: 'ловить, хватать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1218, present: 'πιέζω', future: 'θα πιέσω', aorist: 'έπιεσα', imperative: 'πίεσε / πιέστε', translationEN: 'press, pressure', translationRU: 'давить', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1219, present: 'πικραίνομαι', future: 'θα πικραθώ', aorist: 'πικράθηκα', imperative: 'πικράσου / πικραθείτε', translationEN: 'be saddened', translationRU: 'огорчаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1220, present: 'πικραίνω', future: 'θα πικράνω', aorist: 'πίκρανα', imperative: 'πίκρανε / πικράνετε', translationEN: 'embitter, sadden', translationRU: 'огорчать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1221, present: 'πίνω', future: 'θα πιω', aorist: 'ήπια', imperative: 'πιες / πιείτε', translationEN: 'drink', translationRU: 'пить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1222, present: 'πιστεύω', future: 'θα πιστέψω', aorist: 'πίστεψα', imperative: 'πίστεψε / πιστέψτε', translationEN: 'believe', translationRU: 'верить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1223, present: 'πιστοποιώ', future: 'θα πιστοποιήσω', aorist: 'πιστοποίησα', imperative: 'πιστοποίησε / πιστοποιήστε', translationEN: 'certify', translationRU: 'удостоверять, сертифицировать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1224, present: 'πιστώνω', future: 'θα πιστώσω', aorist: 'πίστωσα', imperative: 'πίστωσε / πιστώστε', translationEN: 'credit', translationRU: 'кредитовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1225, present: 'πιτσιλίζω', future: 'θα πιτσιλίσω', aorist: 'πιτσίλισα', imperative: 'πιτσίλισε / πιτσιλίστε', translationEN: 'splash', translationRU: 'брызгать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1226, present: 'πλαγιάζω', future: 'θα πλαγιάσω', aorist: 'πλάγιασα', imperative: 'πλάγιασε / πλαγιάστε', translationEN: 'lie down, go to bed', translationRU: 'ложиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1227, present: 'πλάθω', future: 'θα πλάσω', aorist: 'έπλασα', imperative: 'πλάσε / πλάστε', translationEN: 'mold, shape', translationRU: 'лепить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1228, present: 'πλακώνω', future: 'θα πλακώσω', aorist: 'πλάκωσα', imperative: 'πλάκωσε / πλακώστε', translationEN: 'crush, press down, descend upon', translationRU: 'придавливать, наваливаться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1229, present: 'πλαντάζω', future: 'θα πλαντάξω', aorist: 'πλάνταξα', imperative: 'πλάνταξε / πλαντάξτε', translationEN: 'burst (with laughter, rage)', translationRU: 'лопаться (от смеха, злости)', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1230, present: 'πλανώ', future: 'θα πλανήσω', aorist: 'πλάνησα', imperative: 'πλάνησε / πλανήστε', translationEN: 'deceive, mislead', translationRU: 'обманывать, вводить в заблуждение', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1231, present: 'πλαστογραφώ', future: 'θα πλαστογραφήσω', aorist: 'πλαστογράφησα', imperative: 'πλαστογράφησε / πλαστογραφήστε', translationEN: 'forge', translationRU: 'подделывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1232, present: 'πλαταίνω', future: 'θα πλατύνω', aorist: 'πλάτυνα', imperative: 'πλάτυνε / πλατύνετε', translationEN: 'widen', translationRU: 'расширять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1233, present: 'πλατσουρίζω', future: 'θα πλατσουρίσω', aorist: 'πλατσούρισα', imperative: 'πλατσούρισε / πλατσουρίστε', translationEN: 'splash about', translationRU: 'плескаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1234, present: 'πλειστηριάζω', future: 'θα πλειστηριάσω', aorist: 'πλειστηρίασα', imperative: 'πλειστηρίασε / πλειστηριάστε', translationEN: 'auction', translationRU: 'продавать с аукциона', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1235, present: 'πλέκω', future: 'θα πλέξω', aorist: 'έπλεξα', imperative: 'πλέξε / πλέξτε', translationEN: 'knit, weave', translationRU: 'вязать, плести', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1236, present: 'πλένω', future: 'θα πλύνω', aorist: 'έπλυνα', imperative: 'πλύνε / πλύνετε', translationEN: 'wash', translationRU: 'мыть, стирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1237, present: 'πλεονάζω', future: 'θα πλεονάσω', aorist: 'πλεόνασα', imperative: 'πλεόνασε / πλεονάστε', translationEN: 'be in excess', translationRU: 'быть в избытке', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1238, present: 'πλέω', future: 'θα πλεύσω', aorist: 'έπλευσα', imperative: 'πλεύσε / πλεύστε', translationEN: 'sail', translationRU: 'плыть (по морю)', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1239, present: 'πληγώνω', future: 'θα πληγώσω', aorist: 'πλήγωσα', imperative: 'πλήγωσε / πληγώστε', translationEN: 'wound, hurt', translationRU: 'ранить, обижать', lexicalCategory: ['lexicalHealth','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1240, present: 'πληθαίνω', future: 'θα πληθύνω', aorist: 'πλήθυνα', imperative: 'πλήθυνε / πληθύνετε', translationEN: 'multiply, increase', translationRU: 'умножаться, множиться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1241, present: 'πληκτρολογώ', future: 'θα πληκτρολογήσω', aorist: 'πληκτρολόγησα', imperative: 'πληκτρολόγησε / πληκτρολογήστε', translationEN: 'type (on a keyboard)', translationRU: 'набирать на клавиатуре', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1242, present: 'πλημμυρίζω', future: 'θα πλημμυρίσω', aorist: 'πλημμύρισα', imperative: 'πλημμύρισε / πλημμυρίστε', translationEN: 'flood', translationRU: 'затоплять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1243, present: 'πληροφορώ', future: 'θα πληροφορήσω', aorist: 'πληροφόρησα', imperative: 'πληροφόρησε / πληροφορήστε', translationEN: 'inform', translationRU: 'информировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1244, present: 'πληρώνω', future: 'θα πληρώσω', aorist: 'πλήρωσα', imperative: 'πλήρωσε / πληρώστε', translationEN: 'pay', translationRU: 'платить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1245, present: 'πλησιάζομαι', future: 'θα πλησιαστώ', aorist: 'πλησιάστηκα', imperative: 'πλησιάσου / πλησιαστείτε', translationEN: 'be approached', translationRU: 'подвергаться приближению', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1246, present: 'πλησιάζω', future: 'θα πλησιάσω', aorist: 'πλησίασα', imperative: 'πλησίασε / πλησιάστε', translationEN: 'approach', translationRU: 'приближаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1247, present: 'πλήττω', future: 'θα πλήξω', aorist: 'έπληξα', imperative: null, translationEN: 'strike, bore', translationRU: 'поражать, наскучивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1248, present: 'πλοηγούμαι', future: 'θα πλοηγηθώ', aorist: 'πλοηγήθηκα', imperative: 'πλοηγήσου / πλοηγηθείτε', translationEN: 'navigate', translationRU: 'ориентироваться, навигировать', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1249, present: 'πλουτίζω', future: 'θα πλουτίσω', aorist: 'πλούτισα', imperative: 'πλούτισε / πλουτίστε', translationEN: 'enrich, get rich', translationRU: 'обогащать, богатеть', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1250, present: 'πνίγομαι', future: 'θα πνιγώ', aorist: 'πνίγηκα', imperative: 'πνίξου / πνιγείτε', translationEN: 'drown, choke', translationRU: 'тонуть, задыхаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1251, present: 'πνίγω', future: 'θα πνίξω', aorist: 'έπνιξα', imperative: 'πνίξε / πνίξτε', translationEN: 'drown, choke', translationRU: 'топить, душить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1252, present: 'ποδηλατώ', future: 'θα ποδηλατήσω', aorist: 'ποδηλάτησα', imperative: 'ποδηλάτησε / ποδηλατήστε', translationEN: 'cycle, ride a bike', translationRU: 'ездить на велосипеде', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1253, present: 'ποδοπατώ', future: 'θα ποδοπατήσω', aorist: 'ποδοπάτησα', imperative: 'ποδοπάτησε / ποδοπατήστε', translationEN: 'trample', translationRU: 'топтать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1254, present: 'ποιώ', future: 'θα ποιήσω', aorist: 'ποίησα', imperative: 'ποίησε / ποιήστε', translationEN: 'create, make', translationRU: 'творить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1255, present: 'πολεμώ', future: 'θα πολεμήσω', aorist: 'πολέμησα', imperative: 'πολέμησε / πολεμήστε', translationEN: 'fight, wage war', translationRU: 'воевать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1256, present: 'πολιορκώ', future: 'θα πολιορκήσω', aorist: 'πολιόρκησα', imperative: 'πολιόρκησε / πολιορκήστε', translationEN: 'besiege', translationRU: 'осаждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1257, present: 'πολλαπλασιάζομαι', future: 'θα πολλαπλασιαστώ', aorist: 'πολλαπλασιάστηκα', imperative: 'πολλαπλασιάσου / πολλαπλασιαστείτε', translationEN: 'multiply', translationRU: 'умножаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1258, present: 'πολλαπλασιάζω', future: 'θα πολλαπλασιάσω', aorist: 'πολλαπλασίασα', imperative: 'πολλαπλασίασε / πολλαπλασιάστε', translationEN: 'multiply', translationRU: 'умножать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1259, present: 'ποντάρω', future: null, aorist: 'πόνταρα', imperative: 'πόνταρε / ποντάρετε', translationEN: 'bet', translationRU: 'ставить (на кого-л.)', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1260, present: 'πονώ', future: 'θα πονέσω', aorist: 'πόνεσα', imperative: 'πόνεσε / πονέστε', translationEN: 'hurt, ache', translationRU: 'болеть, причинять боль', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1261, present: 'πορεύομαι', future: 'θα πορευτώ', aorist: 'πορεύτηκα', imperative: 'πορεύσου / πορευτείτε', translationEN: 'proceed, travel', translationRU: 'идти, следовать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1262, present: 'ποτίζω', future: 'θα ποτίσω', aorist: 'πότισα', imperative: 'πότισε / ποτίστε', translationEN: 'water, give a drink', translationRU: 'поливать, поить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1263, present: 'πουλώ', future: 'θα πουλήσω', aorist: 'πούλησα', imperative: 'πούλησε / πουλήστε', translationEN: 'sell', translationRU: 'продавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1264, present: 'πραγματοποιώ', future: 'θα πραγματοποιήσω', aorist: 'πραγματοποίησα', imperative: 'πραγματοποίησε / πραγματοποιήστε', translationEN: 'carry out, realize', translationRU: 'осуществлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1265, present: 'πράττω', future: 'θα πράξω', aorist: 'έπραξα', imperative: 'πράξε / πράξτε', translationEN: 'act, do', translationRU: 'поступать, совершать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1266, present: 'πρέπει', future: null, aorist: 'έπρεπε', imperative: null, translationEN: 'must, it is necessary', translationRU: 'нужно, должен', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarIrregular']},
{id: 1267, present: 'πρήζομαι', future: 'θα πρηστώ', aorist: 'πρήστηκα', imperative: 'πρήσου / πρηστείτε', translationEN: 'swell up', translationRU: 'опухать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1268, present: 'πριονίζω', future: 'θα πριονίσω', aorist: 'πρίονισα', imperative: 'πρίονισε / πριονίστε', translationEN: 'saw', translationRU: 'пилить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1269, present: 'προάγω', future: 'θα προάξω', aorist: 'προήγαγα', imperative: 'προάγαγε / προαγάγετε', translationEN: 'promote', translationRU: 'продвигать, повышать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1270, present: 'προαισθάνομαι', future: 'θα προαισθανθώ', aorist: 'προαισθάνθηκα', imperative: 'προαισθάνσου / προαισθανθείτε', translationEN: 'have a premonition', translationRU: 'предчувствовать', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1271, present: 'προβάλλω', future: 'θα προβάλω', aorist: 'πρόβαλα', imperative: 'πρόβαλε / προβάλετε', translationEN: 'project, show, put forward', translationRU: 'проецировать, выдвигать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1272, present: 'προβιβάζω', future: 'θα προβιβάσω', aorist: 'προβίβασα', imperative: 'προβίβασε / προβιβάστε', translationEN: 'promote', translationRU: 'повышать (в должности)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1273, present: 'προβλέπω', future: 'θα προβλέψω', aorist: 'προέβλεψα', imperative: 'πρόβλεψε / προβλέψτε', translationEN: 'predict, foresee', translationRU: 'предсказывать, предусматривать', lexicalCategory: ['lexicalTime','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1274, present: 'προβληματίζω', future: 'θα προβληματίσω', aorist: 'προβλημάτισα', imperative: 'προβλημάτισε / προβληματίστε', translationEN: 'make (someone) think, worry', translationRU: 'заставлять задуматься', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1275, present: 'προβοδίζω', future: 'θα προβοδίσω', aorist: 'προβόδισα', imperative: 'προβόδισε / προβοδίστε', translationEN: 'see off', translationRU: 'провожать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1276, present: 'προγραμματίζω', future: 'θα προγραμματίσω', aorist: 'προγραμμάτισα', imperative: 'προγραμμάτισε / προγραμματίστε', translationEN: 'schedule, program', translationRU: 'планировать, программировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1277, present: 'προδίδω', future: 'θα προδώσω', aorist: 'πρόδωσα', imperative: 'πρόδωσε / προδώστε', translationEN: 'betray', translationRU: 'предавать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1278, present: 'προειδοποιώ', future: 'θα προειδοποιήσω', aorist: 'προειδοποίησα', imperative: 'προειδοποίησε / προειδοποιήστε', translationEN: 'warn', translationRU: 'предупреждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1279, present: 'προέρχομαι', future: 'θα προέλθω', aorist: 'προήλθα', imperative: null, translationEN: 'originate, come from', translationRU: 'происходить', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1280, present: 'προετοιμάζω', future: 'θα προετοιμάσω', aorist: 'προετοίμασα', imperative: 'προετοίμασε / προετοιμάστε', translationEN: 'prepare', translationRU: 'подготавливать', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1281, present: 'προηγούμαι', future: 'θα προηγηθώ', aorist: 'προηγήθηκα', imperative: 'προηγήσου / προηγηθείτε', translationEN: 'precede, lead', translationRU: 'предшествовать, лидировать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1282, present: 'προκαλώ', future: 'θα προκαλέσω', aorist: 'προκάλεσα', imperative: 'προκάλεσε / προκαλέστε', translationEN: 'provoke, cause', translationRU: 'вызывать, провоцировать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1283, present: 'προκύπτω', future: 'θα προκύψω', aorist: 'προέκυψα', imperative: null, translationEN: 'arise, result', translationRU: 'возникать, следовать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1284, present: 'προλαβαίνω', future: 'θα προλάβω', aorist: 'πρόλαβα', imperative: 'πρόλαβε / προλάβετε', translationEN: 'catch in time, manage', translationRU: 'успевать, предотвращать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1285, present: 'προμηθεύομαι', future: 'θα προμηθευτώ', aorist: 'προμηθεύτηκα', imperative: 'προμηθεύσου / προμηθευτείτε', translationEN: 'obtain, get hold of', translationRU: 'приобретать, запасаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1286, present: 'προμηθεύω', future: 'θα προμηθεύσω', aorist: 'προμήθευσα', imperative: 'προμήθευσε / προμηθεύστε', translationEN: 'supply', translationRU: 'снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1287, present: 'προοδεύω', future: 'θα προοδεύσω', aorist: 'προόδευσα', imperative: 'προόδευσε / προοδεύστε', translationEN: 'progress', translationRU: 'преуспевать, развиваться', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1288, present: 'προπληρώνω', future: 'θα προπληρώσω', aorist: 'προπλήρωσα', imperative: 'προπλήρωσε / προπληρώστε', translationEN: 'prepay', translationRU: 'оплачивать заранее', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1289, present: 'προπονούμαι', future: 'θα προπονηθώ', aorist: 'προπονήθηκα', imperative: 'προπονήσου / προπονηθείτε', translationEN: 'train', translationRU: 'тренироваться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1290, present: 'προπονώ', future: 'θα προπονήσω', aorist: 'προπόνησα', imperative: 'προπόνησε / προπονήστε', translationEN: 'coach', translationRU: 'тренировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1291, present: 'προσανατολίζομαι', future: 'θα προσανατολιστώ', aorist: 'προσανατολίστηκα', imperative: 'προσανατολίσου / προσανατολιστείτε', translationEN: 'find one\'s bearings', translationRU: 'ориентироваться', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1292, present: 'προσανατολίζω', future: 'θα προσανατολίσω', aorist: 'προσανατόλισα', imperative: 'προσανατόλισε / προσανατολίστε', translationEN: 'orient, direct', translationRU: 'ориентировать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1293, present: 'προσαρμόζω', future: 'θα προσαρμόσω', aorist: 'προσάρμοσα', imperative: 'προσάρμοσε / προσαρμόστε', translationEN: 'adapt, adjust', translationRU: 'приспосабливать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1294, present: 'προσβάλλω', future: 'θα προσβάλω', aorist: 'πρόσβαλα', imperative: null, translationEN: 'offend', translationRU: 'оскорблять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1295, present: 'προσγειώνομαι', future: 'θα προσγειωθώ', aorist: 'προσγειώθηκα', imperative: 'προσγειώσου / προσγειωθείτε', translationEN: 'land', translationRU: 'приземляться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1296, present: 'προσδιορίζω', future: 'θα προσδιορίσω', aorist: 'προσδιόρισα', imperative: 'προσδιόρισε / προσδιορίστε', translationEN: 'specify, determine', translationRU: 'определять, уточнять', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1297, present: 'προσδοκώ', future: 'θα προσδοκήσω', aorist: 'προσδόκησα', imperative: 'προσδόκησε / προσδοκήστε', translationEN: 'expect, anticipate', translationRU: 'ожидать, надеяться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1298, present: 'προσεγγίζω', future: 'θα προσεγγίσω', aorist: 'προσέγγισα', imperative: 'προσέγγισε / προσεγγίστε', translationEN: 'approach', translationRU: 'приближаться, подходить', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1299, present: 'προσεύχομαι', future: 'θα προσευχηθώ', aorist: 'προσευχήθηκα', imperative: 'προσευχήσου / προσευχηθείτε', translationEN: 'pray', translationRU: 'молиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1300, present: 'προσέχω', future: 'θα προσέξω', aorist: 'πρόσεξα', imperative: 'πρόσεξε / προσέξτε', translationEN: 'pay attention, be careful', translationRU: 'быть внимательным, беречься', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1301, present: 'προσθέτω', future: 'θα προσθέσω', aorist: 'πρόσθεσα', imperative: 'πρόσθεσε / προσθέστε', translationEN: 'add', translationRU: 'добавлять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1302, present: 'προσκαλώ', future: 'θα προσκαλέσω', aorist: 'προσκάλεσα', imperative: 'προσκάλεσε / προσκαλέστε', translationEN: 'invite', translationRU: 'приглашать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1303, present: 'προσκομίζω', future: 'θα προσκομίσω', aorist: 'προσκόμισα', imperative: 'προσκόμισε / προσκομίστε', translationEN: 'bring, submit', translationRU: 'предоставлять, приносить', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1304, present: 'προσκυνώ', future: 'θα προσκυνήσω', aorist: 'προσκύνησα', imperative: 'προσκύνησε / προσκυνήστε', translationEN: 'worship, bow', translationRU: 'поклоняться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1305, present: 'προσλαμβάνομαι', future: 'θα προσληφθώ', aorist: 'προσλήφθηκα', imperative: 'προσλήψου / προσληφθείτε', translationEN: 'be hired', translationRU: 'быть нанятым', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1306, present: 'προσλαμβάνω', future: 'θα προσλάβω', aorist: 'προσέλαβα', imperative: 'πρόσλαβε / προσλάβετε', translationEN: 'hire', translationRU: 'нанимать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1307, present: 'προσπαθώ', future: 'θα προσπαθήσω', aorist: 'προσπάθησα', imperative: 'προσπάθησε / προσπαθήστε', translationEN: 'try', translationRU: 'пытаться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1308, present: 'προσπερνώ', future: 'θα προσπεράσω', aorist: 'προσπέρασα', imperative: 'προσπέρασε / προσπεράστε', translationEN: 'overtake, pass', translationRU: 'обгонять, проходить мимо', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1309, present: 'προσπίπτω', future: 'θα προσπέσω', aorist: 'προσέπεσα', imperative: 'πρόσπεσε / προσπέστε', translationEN: 'fall at, assail', translationRU: 'припадать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1310, present: 'προσποιούμαι', future: 'θα προσποιηθώ', aorist: 'προσποιήθηκα', imperative: 'προσποιήσου / προσποιηθείτε', translationEN: 'pretend', translationRU: 'притворяться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1311, present: 'προστατεύω', future: 'θα προστατέψω', aorist: 'προστάτεψα', imperative: 'προστάτεψε / προστατέψτε', translationEN: 'protect', translationRU: 'защищать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1312, present: 'προσφέρομαι', future: 'θα προσφερθώ', aorist: 'προσφέρθηκα', imperative: 'προσφέρσου / προσφερθείτε', translationEN: 'offer one\'s services', translationRU: 'предлагать свои услуги', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1313, present: 'προσφέρω', future: null, aorist: 'πρόσφερα', imperative: 'πρόσφερε / προσφέρετε', translationEN: 'offer', translationRU: 'предлагать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1314, present: 'προτείνω', future: null, aorist: 'πρότεινα', imperative: 'πρότεινε / προτείνετε', translationEN: 'suggest, propose', translationRU: 'предлагать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1315, present: 'προτιμώ', future: 'θα προτιμήσω', aorist: 'προτίμησα', imperative: 'προτίμησε / προτιμήστε', translationEN: 'prefer', translationRU: 'предпочитать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1316, present: 'προτρέπω', future: 'θα προτρέψω', aorist: 'προέτρεψα', imperative: 'προτρέψε / προτρέψτε', translationEN: 'urge, encourage', translationRU: 'призывать, побуждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1317, present: 'προφέρω', future: null, aorist: 'πρόφερα', imperative: 'πρόφερε / προφέρετε', translationEN: 'pronounce', translationRU: 'произносить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1318, present: 'προφητεύω', future: 'θα προφητεύσω', aorist: 'προφήτευσα', imperative: 'προφήτευσε / προφητεύστε', translationEN: 'prophesy', translationRU: 'пророчествовать', lexicalCategory: ['lexicalTime','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1319, present: 'προφταίνω', future: 'θα προφτάσω', aorist: 'πρόφτασα', imperative: 'πρόφτασε / προφτάστε', translationEN: 'make it in time', translationRU: 'успевать', lexicalCategory: ['lexicalTime','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1320, present: 'προχωρώ', future: 'θα προχωρήσω', aorist: 'προχώρησα', imperative: 'προχώρησε / προχωρήστε', translationEN: 'proceed, advance', translationRU: 'продвигаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1321, present: 'προωθώ', future: 'θα προωθήσω', aorist: 'προώθησα', imperative: 'προώθησε / προωθήστε', translationEN: 'promote, forward', translationRU: 'продвигать, пересылать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1322, present: 'πρωταγωνιστώ', future: 'θα πρωταγωνιστήσω', aorist: 'πρωταγωνίστησα', imperative: 'πρωταγωνίστησε / πρωταγωνιστήστε', translationEN: 'play the lead', translationRU: 'играть главную роль', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1323, present: 'πρωτοπορώ', future: 'θα πρωτοπορήσω', aorist: 'πρωτοπόρησα', imperative: 'πρωτοπόρησε / πρωτοπορήστε', translationEN: 'pioneer', translationRU: 'быть новатором, идти впереди', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1324, present: 'πρωτοστατώ', future: 'θα πρωτοστατήσω', aorist: 'πρωτοστάτησα', imperative: 'πρωτοστάτησε / πρωτοστατήστε', translationEN: 'spearhead', translationRU: 'стоять во главе', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1325, present: 'πτωχεύω', future: 'θα πτωχεύσω', aorist: 'πτώχευσα', imperative: 'πτώχευσε / πτωχεύστε', translationEN: 'go bankrupt', translationRU: 'разоряться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1326, present: 'πυκνώνω', future: 'θα πυκνώσω', aorist: 'πύκνωσα', imperative: 'πύκνωσε / πυκνώστε', translationEN: 'thicken', translationRU: 'сгущать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1327, present: 'πυροβολώ', future: 'θα πυροβολήσω', aorist: 'πυροβόλησα', imperative: 'πυροβόλησε / πυροβολήστε', translationEN: 'shoot', translationRU: 'стрелять', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1328, present: 'πυροδοτώ', future: 'θα πυροδοτήσω', aorist: 'πυροδότησα', imperative: 'πυροδότησε / πυροδοτήστε', translationEN: 'trigger, ignite', translationRU: 'запускать, провоцировать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1329, present: 'πυρπολώ', future: 'θα πυρπολήσω', aorist: 'πυρπόλησα', imperative: 'πυρπόλησε / πυρπολήστε', translationEN: 'set on fire', translationRU: 'поджигать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1330, present: 'πυρώνω', future: 'θα πυρώσω', aorist: 'πύρωσα', imperative: 'πύρωσε / πυρώστε', translationEN: 'heat to red-hot', translationRU: 'раскалять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1331, present: 'πωλώ', future: 'θα πωλήσω', aorist: 'πώλησα', imperative: 'πώλησε / πωλήστε', translationEN: 'sell (formal)', translationRU: 'продавать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1332, present: 'ράβω', future: 'θα ράψω', aorist: 'έραψα', imperative: 'ράψε / ράψτε', translationEN: 'sew', translationRU: 'шить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1333, present: 'ραγίζω', future: 'θα ραγίσω', aorist: 'ράγισα', imperative: 'ράγισε / ραγίστε', translationEN: 'crack', translationRU: 'трескаться, давать трещину', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1334, present: 'ραντίζω', future: 'θα ραντίσω', aorist: 'ράντισα', imperative: 'ράντισε / ραντίστε', translationEN: 'sprinkle, spray', translationRU: 'опрыскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1335, present: 'ρεζιλεύω', future: 'θα ρεζιλέψω', aorist: 'ρεζίλεψα', imperative: 'ρεζίλεψε / ρεζιλέψτε', translationEN: 'humiliate, disgrace', translationRU: 'позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1336, present: 'ρευστοποιώ', future: 'θα ρευστοποιήσω', aorist: 'ρευστοποίησα', imperative: 'ρευστοποίησε / ρευστοποιήστε', translationEN: 'liquidate (assets)', translationRU: 'обращать в деньги', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1337, present: 'ρέω', future: 'θα ρεύσω', aorist: 'έρρευσα', imperative: null, translationEN: 'flow', translationRU: 'течь', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1338, present: 'ρισκάρω', future: null, aorist: 'ρίσκαρα', imperative: 'ρίσκαρε / ρισκάρετε', translationEN: 'risk', translationRU: 'рисковать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1339, present: 'ρίχνομαι', future: 'θα ριχτώ', aorist: 'ρίχτηκα', imperative: 'ρίξου / ριχτείτε', translationEN: 'throw oneself, rush', translationRU: 'бросаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1340, present: 'ρίχνω', future: 'θα ρίξω', aorist: 'έριξα', imperative: 'ρίξε / ρίξτε', translationEN: 'throw, drop', translationRU: 'бросать, ронять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1341, present: 'ροκανίζω', future: 'θα ροκανίσω', aorist: 'ρόκανισα', imperative: 'ροκάνισε / ροκανίστε', translationEN: 'gnaw', translationRU: 'грызть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1342, present: 'ρουφώ', future: 'θα ρουφήξω', aorist: 'ρούφηξα', imperative: 'ρούφηξε / ρουφήξτε', translationEN: 'suck, sip', translationRU: 'всасывать, втягивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1343, present: 'ροχαλίζω', future: 'θα ροχαλίσω', aorist: 'ρόχαλισα', imperative: 'ρόχαλισε / ροχαλίστε', translationEN: 'snore', translationRU: 'храпеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1344, present: 'ρυθμίζω', future: 'θα ρυθμίσω', aorist: 'ρύθμισα', imperative: 'ρύθμισε / ρυθμίστε', translationEN: 'adjust, regulate', translationRU: 'регулировать, настраивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1345, present: 'ρυμουλκώ', future: 'θα ρυμουλκήσω', aorist: 'ρυμούλκησα', imperative: 'ρυμούλκησε / ρυμουλκήστε', translationEN: 'tow', translationRU: 'буксировать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1346, present: 'ρυπαίνω', future: 'θα ρυπάνω', aorist: 'ρύπανα', imperative: 'ρύπανε / ρυπάνετε', translationEN: 'pollute', translationRU: 'загрязнять', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1347, present: 'ρωτώ', future: 'θα ρωτήσω', aorist: 'ρώτησα', imperative: 'ρώτησε / ρωτήστε', translationEN: 'ask', translationRU: 'спрашивать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1348, present: 'σαλπάρω', future: null, aorist: 'σάλπαρα', imperative: 'σάλπαρε / σαλπάρετε', translationEN: 'set sail', translationRU: 'отплывать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1349, present: 'σαπίζω', future: 'θα σαπίσω', aorist: 'σάπισα', imperative: null, translationEN: 'rot', translationRU: 'гнить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1350, present: 'σαπουνίζω', future: 'θα σαπουνίσω', aorist: 'σαπούνισα', imperative: 'σαπούνισε / σαπουνίστε', translationEN: 'soap up', translationRU: 'намыливать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1351, present: 'σαρώνω', future: 'θα σαρώσω', aorist: 'σάρωσα', imperative: 'σάρωσε / σαρώστε', translationEN: 'sweep, scan', translationRU: 'сметать, сканировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1352, present: 'σαστίζω', future: 'θα σαστίσω', aorist: 'σάστισα', imperative: null, translationEN: 'be bewildered', translationRU: 'смущаться, теряться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1353, present: 'σβήνω', future: 'θα σβήσω', aorist: 'έσβησα', imperative: 'σβήσε / σβήστε', translationEN: 'erase, extinguish', translationRU: 'стирать, гасить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1354, present: 'σέβομαι', future: 'θα σεβαστώ', aorist: 'σεβάστηκα', imperative: 'σεβάσου / σεβαστείτε', translationEN: 'respect', translationRU: 'уважать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1355, present: 'σερβίρω', future: null, aorist: 'σέρβιρα', imperative: 'σέρβιρε / σερβίρετε', translationEN: 'serve (food)', translationRU: 'подавать (на стол)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1356, present: 'σέρνομαι', future: 'θα συρθώ', aorist: 'σύρθηκα', imperative: 'σύρσου / συρθείτε', translationEN: 'crawl, drag oneself', translationRU: 'ползти, волочиться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1357, present: 'σέρνω', future: 'θα σύρω', aorist: 'έσυρα', imperative: 'σύρε / σύρτε', translationEN: 'drag, pull', translationRU: 'тащить, волочить', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1358, present: 'σηκώνομαι', future: 'θα σηκωθώ', aorist: 'σηκώθηκα', imperative: 'σήκω / σηκωθείτε', translationEN: 'get up, stand up', translationRU: 'вставать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1359, present: 'σηκώνω', future: 'θα σηκώσω', aorist: 'σήκωσα', imperative: 'σήκωσε / σηκώστε', translationEN: 'lift, raise', translationRU: 'поднимать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1360, present: 'σημαίνω', future: 'θα σημάνω', aorist: 'σήμανα', imperative: null, translationEN: 'mean, signify', translationRU: 'означать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1361, present: 'σημειώνω', future: 'θα σημειώσω', aorist: 'σημείωσα', imperative: 'σημείωσε / σημειώστε', translationEN: 'note, score', translationRU: 'отмечать, записывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1362, present: 'σιγοβράζω', future: 'θα σιγοβράσω', aorist: 'σιγόβρασα', imperative: 'σιγόβρασε / σιγοβράστε', translationEN: 'simmer', translationRU: 'томить, кипеть на медленном огне', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1363, present: 'σιγοτραγουδώ', future: 'θα σιγοτραγουδήσω', aorist: 'σιγοτραγούδησα', imperative: 'σιγοτραγούδησε / σιγοτραγουδήστε', translationEN: 'hum, sing softly', translationRU: 'напевать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1364, present: 'σιδερώνω', future: 'θα σιδερώσω', aorist: 'σιδέρωσα', imperative: 'σιδέρωσε / σιδερώστε', translationEN: 'iron', translationRU: 'гладить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1365, present: 'σιχαίνομαι', future: 'θα σιχαθώ', aorist: 'σιχάθηκα', imperative: 'σιχάσου / σιχαθείτε', translationEN: 'loathe', translationRU: 'брезговать, испытывать отвращение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1366, present: 'σιωπώ', future: 'θα σιωπήσω', aorist: 'σιώπησα', imperative: 'σιώπησε / σιωπήστε', translationEN: 'be silent', translationRU: 'молчать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1367, present: 'σκάβω', future: 'θα σκάψω', aorist: 'έσκαψα', imperative: 'σκάψε / σκάψτε', translationEN: 'dig', translationRU: 'копать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1368, present: 'σκαλίζω', future: 'θα σκαλίσω', aorist: 'σκάλισα', imperative: 'σκάλισε / σκαλίστε', translationEN: 'dig, carve', translationRU: 'ковырять, вырезать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1369, present: 'σκανδαλίζω', future: 'θα σκανδαλίσω', aorist: 'σκανδάλισα', imperative: 'σκανδάλισε / σκανδαλίστε', translationEN: 'scandalize, shock', translationRU: 'шокировать, соблазнять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1370, present: 'σκαρφαλώνω', future: 'θα σκαρφαλώσω', aorist: 'σκαρφάλωσα', imperative: 'σκαρφάλωσε / σκαρφαλώστε', translationEN: 'climb', translationRU: 'карабкаться, взбираться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1371, present: 'σκέφτομαι', future: 'θα σκεφτώ', aorist: 'σκέφτηκα', imperative: 'σκέψου / σκεφτείτε', translationEN: 'think', translationRU: 'думать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1372, present: 'σκηνοθετώ', future: 'θα σκηνοθετήσω', aorist: 'σκηνοθέτησα', imperative: 'σκηνοθέτησε / σκηνοθετήστε', translationEN: 'direct (film, play)', translationRU: 'ставить, режиссировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1373, present: 'σκιαγραφώ', future: 'θα σκιαγραφήσω', aorist: 'σκιαγράφησα', imperative: 'σκιαγράφησε / σκιαγραφήστε', translationEN: 'sketch, outline', translationRU: 'набрасывать, обрисовывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1374, present: 'σκιάζω', future: 'θα σκιάσω', aorist: 'σκίασα', imperative: 'σκίασε / σκιάστε', translationEN: 'shade, overshadow', translationRU: 'затенять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1375, present: 'σκίζω', future: 'θα σκίσω', aorist: 'έσκισα', imperative: 'σκίσε / σκίστε', translationEN: 'tear', translationRU: 'рвать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1376, present: 'σκληραίνω', future: 'θα σκληρύνω', aorist: 'σκλήρυνα', imperative: 'σκλήρυνε / σκληρύνετε', translationEN: 'harden', translationRU: 'твердеть, ожесточать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1377, present: 'σκοντάφτω', future: 'θα σκοντάψω', aorist: 'σκόνταψα', imperative: null, translationEN: 'stumble', translationRU: 'спотыкаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1378, present: 'σκοπεύω', future: 'θα σκοπεύσω', aorist: 'σκόπευσα', imperative: null, translationEN: 'intend, aim', translationRU: 'намереваться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1379, present: 'σκοράρω', future: 'θα σκοράρω', aorist: 'σκόραρα', imperative: 'σκοράρισε / σκοραρίστε', translationEN: 'score', translationRU: 'забивать гол', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1380, present: 'σκορπίζω', future: 'θα σκορπίσω', aorist: 'σκόρπισα', imperative: 'σκόρπισε / σκορπίστε', translationEN: 'scatter', translationRU: 'рассыпать, разбрасывать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1381, present: 'σκοτώνω', future: 'θα σκοτώσω', aorist: 'σκότωσα', imperative: 'σκότωσε / σκοτώστε', translationEN: 'kill', translationRU: 'убивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1382, present: 'σκουντώ', future: 'θα σκουντήσω', aorist: 'σκούντηξα', imperative: 'σκούντηξε / σκουντήξτε', translationEN: 'nudge, jostle', translationRU: 'толкать локтем', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1383, present: 'σκουπίζω', future: 'θα σκουπίσω', aorist: 'σκούπισα', imperative: 'σκούπισε / σκουπίστε', translationEN: 'wipe, sweep', translationRU: 'вытирать, подметать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1384, present: 'σκουραίνω', future: 'θα σκουρύνω', aorist: 'σκούρυνα', imperative: null, translationEN: 'darken', translationRU: 'темнеть', lexicalCategory: ['lexicalSense','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1385, present: 'σκουριάζω', future: 'θα σκουριάσω', aorist: 'σκούριασα', imperative: 'σκούριασε / σκουριάστε', translationEN: 'rust', translationRU: 'ржаветь', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1386, present: 'σκύβω', future: 'θα σκύψω', aorist: 'έσκυψα', imperative: 'σκύψε / σκύψτε', translationEN: 'bend over', translationRU: 'наклоняться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1387, present: 'σμίγω', future: 'θα σμίξω', aorist: 'έσμιξα', imperative: null, translationEN: 'unite, meet', translationRU: 'соединяться, встречаться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1388, present: 'σοβαρεύω', future: 'θα σοβαρέψω', aorist: 'σοβάρεψα', imperative: 'σοβάρεψε / σοβαρέψτε', translationEN: 'become serious', translationRU: 'становиться серьёзным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1389, present: 'σοκάρω', future: 'θα σοκάρω', aorist: 'σόκαρα', imperative: 'σόκαρε / σοκάρετε', translationEN: 'shock', translationRU: 'шокировать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1390, present: 'σουτάρω', future: 'θα σουτάρω', aorist: 'σούταρα', imperative: 'σούταρε / σουτάρετε', translationEN: 'shoot (sport)', translationRU: 'бить по воротам', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1391, present: 'σπάζω', future: 'θα σπάσω', aorist: 'έσπασα', imperative: 'σπάσε / σπάστε', translationEN: 'break', translationRU: 'ломать, разбивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1392, present: 'σπανίζω', future: 'θα σπανίσω', aorist: 'σπάνισα', imperative: 'σπάνισε / σπανίστε', translationEN: 'be scarce', translationRU: 'быть редкостью, не хватать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1393, present: 'σπαράζω', future: 'θα σπαράξω', aorist: 'σπάραξα', imperative: 'σπάραξε / σπαράξτε', translationEN: 'writhe, tear apart', translationRU: 'разрывать, содрогаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1394, present: 'σπαρταρώ', future: 'θα σπαρταρήσω', aorist: 'σπαρτάρησα', imperative: 'σπαρτάρησε / σπαρταρήστε', translationEN: 'writhe, flutter', translationRU: 'биться, трепетать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1395, present: 'σπαταλώ', future: 'θα σπαταλήσω', aorist: 'σπατάλησα', imperative: 'σπατάλησε / σπαταλήστε', translationEN: 'waste, squander', translationRU: 'тратить впустую', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1396, present: 'σπέρνω', future: 'θα σπείρω', aorist: 'έσπειρα', imperative: 'σπείρε / σπείρτε', translationEN: 'sow', translationRU: 'сеять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1397, present: 'σπουδάζω', future: 'θα σπουδάσω', aorist: 'σπούδασα', imperative: 'σπούδασε / σπουδάστε', translationEN: 'study (at university)', translationRU: 'учиться (в вузе)', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1398, present: 'σπρώχνω', future: 'θα σπρώξω', aorist: 'έσπρωξα', imperative: 'σπρώξε / σπρώξτε', translationEN: 'push', translationRU: 'толкать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1399, present: 'στάζω', future: 'θα στάξω', aorist: 'έσταξα', imperative: 'στάξε / στάξτε', translationEN: 'drip', translationRU: 'капать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1400, present: 'σταθεροποιώ', future: 'θα σταθεροποιήσω', aorist: 'σταθεροποίησα', imperative: 'σταθεροποίησε / σταθεροποιήστε', translationEN: 'stabilize', translationRU: 'стабилизировать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1401, present: 'σταθμεύω', future: 'θα σταθμεύσω', aorist: 'στάθμευσα', imperative: 'στάθμευσε / σταθμεύστε', translationEN: 'park', translationRU: 'парковаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1402, present: 'σταματώ', future: 'θα σταματήσω', aorist: 'σταμάτησα', imperative: 'σταμάτησε / σταματήστε', translationEN: 'stop', translationRU: 'останавливать, останавливаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1403, present: 'στεγάζω', future: 'θα στεγάσω', aorist: 'στέγασα', imperative: 'στέγασε / στεγάστε', translationEN: 'house, shelter', translationRU: 'размещать, давать приют', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1404, present: 'στεγνώνω', future: 'θα στεγνώσω', aorist: 'στέγνωσα', imperative: 'στέγνωσε / στεγνώστε', translationEN: 'dry', translationRU: 'сушить, сохнуть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1405, present: 'στέκομαι', future: 'θα σταθώ', aorist: 'στάθηκα', imperative: 'στάσου / σταθείτε', translationEN: 'stand', translationRU: 'стоять, останавливаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1406, present: 'στέλνω', future: 'θα στείλω', aorist: 'έστειλα', imperative: 'στείλε / στείλτε', translationEN: 'send', translationRU: 'отправлять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1407, present: 'στεναχωριέμαι', future: 'θα στεναχωρηθώ', aorist: 'στεναχωρήθηκα', imperative: null, translationEN: 'be upset', translationRU: 'огорчаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1408, present: 'στεναχωρώ', future: 'θα στεναχωρήσω', aorist: 'στεναχώρησα', imperative: 'στεναχώρησε / στεναχωρήστε', translationEN: 'upset', translationRU: 'огорчать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1409, present: 'στενεύω', future: 'θα στενέψω', aorist: 'στένεψα', imperative: 'στένεψε / στενέψτε', translationEN: 'narrow, tighten', translationRU: 'сужать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1410, present: 'στερεοποιώ', future: 'θα στερεοποιήσω', aorist: 'στερεοποίησα', imperative: 'στερεοποίησε / στερεοποιήστε', translationEN: 'solidify', translationRU: 'затвердевать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1411, present: 'στερεύω', future: 'θα στερέψω', aorist: 'στέρεψα', imperative: 'στέρεψε / στερέψτε', translationEN: 'dry up, run dry', translationRU: 'иссякать, высыхать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1412, present: 'στερούμαι', future: 'θα στερηθώ', aorist: 'στερήθηκα', imperative: null, translationEN: 'lack, be deprived of', translationRU: 'лишаться, испытывать недостаток', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1413, present: 'στερώ', future: 'θα στερήσω', aorist: 'στέρησα', imperative: 'στέρησε / στερήστε', translationEN: 'deprive', translationRU: 'лишать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1414, present: 'στεφανώνω', future: 'θα στεφανώσω', aorist: 'στεφάνωσα', imperative: 'στεφάνωσε / στεφανώστε', translationEN: 'crown, marry (ceremony)', translationRU: 'венчать, увенчивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1415, present: 'στηρίζω', future: 'θα στηρίξω', aorist: 'στήριξα', imperative: 'στήριξε / στηρίξτε', translationEN: 'support, prop', translationRU: 'поддерживать, опирать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1416, present: 'στιγματίζω', future: 'θα στιγματίσω', aorist: 'στιγμάτισα', imperative: 'στιγμάτισε / στιγματίστε', translationEN: 'stigmatize', translationRU: 'клеймить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1417, present: 'στίζω', future: 'θα στίξω', aorist: 'έστιξα', imperative: 'στίξε / στίξτε', translationEN: 'punctuate', translationRU: 'расставлять знаки препинания', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1418, present: 'στιλβώνω', future: 'θα στιλβώσω', aorist: 'στίλβωσα', imperative: 'στίλβωσε / στιλβώστε', translationEN: 'polish', translationRU: 'полировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1419, present: 'στιχουργώ', future: 'θα στιχουργήσω', aorist: 'στιχούργησα', imperative: 'στιχούργησε / στιχουργήστε', translationEN: 'write verses', translationRU: 'сочинять стихи', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1420, present: 'στολίζω', future: 'θα στολίσω', aorist: 'στόλισα', imperative: 'στόλισε / στολίστε', translationEN: 'decorate', translationRU: 'украшать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1421, present: 'στοχάζομαι', future: 'θα στοχαστώ', aorist: 'στοχάστηκα', imperative: 'στοχάσου / στοχαστείτε', translationEN: 'ponder', translationRU: 'размышлять, раздумывать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1422, present: 'στοχεύω', future: 'θα στοχεύσω', aorist: 'στόχευσα', imperative: 'στόχευσε / στοχεύστε', translationEN: 'aim', translationRU: 'целиться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1423, present: 'στραγγίζω', future: 'θα στραγγίσω', aorist: 'στράγγισα', imperative: 'στράγγισε / στραγγίστε', translationEN: 'drain, wring out', translationRU: 'сливать, отжимать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1424, present: 'στρατεύομαι', future: 'θα στρατευτώ', aorist: 'στρατεύτηκα', imperative: 'στρατεύσου / στρατευτείτε', translationEN: 'enlist, join the army', translationRU: 'вступать в армию', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1425, present: 'στρατολογώ', future: 'θα στρατολογήσω', aorist: 'στρατολόγησα', imperative: 'στρατολόγησε / στρατολογήστε', translationEN: 'recruit', translationRU: 'вербовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1426, present: 'στρέφω', future: 'θα στρέψω', aorist: 'έστρεψα', imperative: 'στρέψε / στρέψτε', translationEN: 'turn, direct', translationRU: 'поворачивать, направлять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1427, present: 'στρίβω', future: 'θα στρίψω', aorist: 'έστριψα', imperative: 'στρίψε / στρίψτε', translationEN: 'turn, twist', translationRU: 'поворачивать, крутить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1428, present: 'στριμώχνω', future: 'θα στριμώξω', aorist: 'στρίμωξα', imperative: 'στρίμωξε / στριμώξτε', translationEN: 'squeeze in, corner', translationRU: 'втискивать, загонять в угол', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1429, present: 'στριφογυρίζω', future: 'θα στριφογυρίσω', aorist: 'στριφογύρισα', imperative: 'στριφογύρισε / στριφογυρίστε', translationEN: 'spin around, toss', translationRU: 'вертеться, кружиться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1430, present: 'στρογγυλοποιώ', future: 'θα στρογγυλοποιήσω', aorist: 'στρογγυλοποίησα', imperative: 'στρογγυλοποίησε / στρογγυλοποιήστε', translationEN: 'round off', translationRU: 'округлять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1431, present: 'στρώνω', future: 'θα στρώσω', aorist: 'έστρωσα', imperative: 'στρώσε / στρώστε', translationEN: 'spread, make (bed), set (table)', translationRU: 'стелить, накрывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1432, present: 'συγγράφω', future: 'θα συγγράψω', aorist: 'συνέγραψα', imperative: 'σύγγραψε / συγγράψτε', translationEN: 'write (a book)', translationRU: 'сочинять, писать (книгу)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1433, present: 'συγκαλύπτω', future: 'θα συγκαλύψω', aorist: 'συγκάλυψα', imperative: 'συγκάλυψε / συγκαλύψτε', translationEN: 'cover up', translationRU: 'скрывать, покрывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1434, present: 'συγκεντρώνομαι', future: 'θα συγκεντρωθώ', aorist: 'συγκεντρώθηκα', imperative: 'συγκεντρώσου / συγκεντρωθείτε', translationEN: 'concentrate, gather', translationRU: 'сосредоточиваться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1435, present: 'συγκεντρώνω', future: 'θα συγκεντρώσω', aorist: 'συγκέντρωσα', imperative: 'συγκέντρωσε / συγκεντρώστε', translationEN: 'gather, concentrate', translationRU: 'собирать, сосредоточивать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1436, present: 'συγκινώ', future: 'θα συγκινήσω', aorist: 'συγκίνησα', imperative: 'συγκίνησε / συγκινήστε', translationEN: 'move (emotionally)', translationRU: 'трогать, волновать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1437, present: 'συγκλονίζω', future: 'θα συγκλονίσω', aorist: 'συγκλόνισα', imperative: 'συγκλόνισε / συγκλονίστε', translationEN: 'shake, shock', translationRU: 'потрясать', lexicalCategory: ['lexicalInfluence','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1438, present: 'συγκρατώ', future: 'θα συγκρατήσω', aorist: 'συγκράτησα', imperative: 'συγκράτησε / συγκρατήστε', translationEN: 'restrain, retain', translationRU: 'сдерживать, запоминать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1439, present: 'συγκρίνομαι', future: 'θα συγκριθώ', aorist: 'συγκρίθηκα', imperative: 'συγκρίσου / συγκριθείτε', translationEN: 'be compared', translationRU: 'сравниваться', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1440, present: 'συγκρίνω', future: null, aorist: 'σύγκρινα', imperative: 'σύγκρινε / συγκρίνετε', translationEN: 'compare', translationRU: 'сравнивать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1441, present: 'συγκρούομαι', future: 'θα συγκρουστώ', aorist: 'συγκρούστηκα', imperative: 'συγκρούσου / συγκρουστείτε', translationEN: 'collide, clash', translationRU: 'сталкиваться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1442, present: 'συγυρίζω', future: 'θα συγυρίσω', aorist: 'συγύρισα', imperative: 'συγύρισε / συγυρίστε', translationEN: 'tidy up', translationRU: 'прибирать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1443, present: 'συγχρονίζομαι', future: 'θα συγχρονιστώ', aorist: 'συγχρονίστηκα', imperative: 'συγχρονίσου / συγχρονιστείτε', translationEN: 'be in sync', translationRU: 'синхронизироваться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1444, present: 'συγχρονίζω', future: 'θα συγχρονίσω', aorist: 'συγχρόνισα', imperative: 'συγχρόνισε / συγχρονίστε', translationEN: 'synchronize', translationRU: 'синхронизировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1445, present: 'συγχωρώ', future: 'θα συγχωρήσω', aorist: 'συγχώρησα', imperative: 'συγχώρησε / συγχωρήστε', translationEN: 'forgive', translationRU: 'прощать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1446, present: 'συζητώ', future: 'θα συζητήσω', aorist: 'συζήτησα', imperative: 'συζήτησε / συζητήστε', translationEN: 'discuss', translationRU: 'обсуждать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1447, present: 'συκοφαντώ', future: 'θα συκοφαντήσω', aorist: 'συκοφάντησα', imperative: 'συκοφάντησε / συκοφαντήστε', translationEN: 'slander', translationRU: 'клеветать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1448, present: 'συλλαβίζω', future: 'θα συλλαβίσω', aorist: 'συλλάβισα', imperative: 'συλλάβισε / συλλαβίστε', translationEN: 'spell out, syllabify', translationRU: 'читать по слогам', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1449, present: 'συλλαμβάνω', future: 'θα συλλάβω', aorist: 'συνέλαβα', imperative: 'σύλλαβε / συλλάβετε', translationEN: 'arrest, conceive', translationRU: 'арестовывать, постигать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1450, present: 'συλλέγω', future: 'θα συλλέξω', aorist: 'συνέλεξα', imperative: 'σύλλεξε / συλλέξτε', translationEN: 'collect', translationRU: 'собирать, коллекционировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1451, present: 'συλλογίζομαι', future: 'θα συλλογιστώ', aorist: 'συλλογίστηκα', imperative: 'συλλογίσου / συλλογιστείτε', translationEN: 'ponder', translationRU: 'размышлять', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1452, present: 'συλλυπούμαι', future: 'θα συλλυπηθώ', aorist: 'συλλυπήθηκα', imperative: 'συλλυπήσου / συλλυπηθείτε', translationEN: 'offer condolences', translationRU: 'выражать соболезнования', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1453, present: 'συμβαίνω', future: 'θα συμβώ', aorist: 'συνέβη', imperative: null, translationEN: 'happen', translationRU: 'происходить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1454, present: 'συμβάλλω', future: 'θα συμβάλω', aorist: 'συνέβαλα', imperative: null, translationEN: 'contribute', translationRU: 'способствовать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1455, present: 'συμβουλεύομαι', future: 'θα συμβουλευτώ', aorist: 'συμβουλεύτηκα', imperative: 'συμβουλέψου / συμβουλευτείτε', translationEN: 'consult, seek advice', translationRU: 'советоваться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1456, present: 'συμβουλεύω', future: 'θα συμβουλέψω', aorist: 'συμβούλεψα', imperative: 'συμβούλεψε / συμβουλέψτε', translationEN: 'advise', translationRU: 'советовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1457, present: 'συμμετέχω', future: 'θα συμμετάσχω', aorist: 'συμμετείχα', imperative: null, translationEN: 'participate', translationRU: 'участвовать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1458, present: 'συμπαθώ', future: 'θα συμπαθήσω', aorist: 'συμπάθησα', imperative: 'συμπάθησε / συμπαθήστε', translationEN: 'like, sympathize', translationRU: 'симпатизировать, любить', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1459, present: 'συμπεραίνω', future: 'θα συμπεράνω', aorist: 'συμπέρανα', imperative: 'συμπέρανε / συμπεράνετε', translationEN: 'conclude', translationRU: 'делать вывод', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1460, present: 'συμπεριφέρομαι', future: 'θα συμπεριφερθώ', aorist: 'συμπεριφέρθηκα', imperative: 'συμπεριφέρσου / συμπεριφερθείτε', translationEN: 'behave', translationRU: 'вести себя', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1461, present: 'συμπιέζω', future: 'θα συμπιέσω', aorist: 'συμπίεσα', imperative: 'συμπίεσε / συμπιέστε', translationEN: 'compress', translationRU: 'сжимать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1462, present: 'συμπίπτω', future: 'θα συμπέσω', aorist: 'συνέπεσα', imperative: null, translationEN: 'coincide', translationRU: 'совпадать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1463, present: 'συμπληρώνομαι', future: 'θα συμπληρωθώ', aorist: 'συμπληρώθηκα', imperative: 'συμπληρώσου / συμπληρωθείτε', translationEN: 'be filled in, be completed', translationRU: 'заполняться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1464, present: 'συμπληρώνω', future: 'θα συμπληρώσω', aorist: 'συμπλήρωσα', imperative: 'συμπλήρωσε / συμπληρώστε', translationEN: 'complete, fill in', translationRU: 'заполнять, дополнять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1465, present: 'συμπονώ', future: 'θα συμπονέσω', aorist: 'συμπόνεσα', imperative: 'συμπόνεσε / συμπονέστε', translationEN: 'sympathize with', translationRU: 'сочувствовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1466, present: 'συμπυκνώνω', future: 'θα συμπυκνώσω', aorist: 'συμπύκνωσα', imperative: 'συμπύκνωσε / συμπυκνώστε', translationEN: 'condense, concentrate', translationRU: 'сгущать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1467, present: 'συμφιλιώνω', future: 'θα συμφιλιώσω', aorist: 'συμφίλιωσα', imperative: 'συμφίλιωσε / συμφιλιώστε', translationEN: 'reconcile', translationRU: 'примирять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1468, present: 'συμφωνώ', future: 'θα συμφωνήσω', aorist: 'συμφώνησα', imperative: 'συμφώνησε / συμφωνήστε', translationEN: 'agree', translationRU: 'соглашаться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1469, present: 'συναγωνίζομαι', future: 'θα συναγωνιστώ', aorist: 'συναγωνίστηκα', imperative: 'συναγωνίσου / συναγωνιστείτε', translationEN: 'compete', translationRU: 'конкурировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1470, present: 'συναινώ', future: 'θα συναινέσω', aorist: 'συναίνεσα', imperative: 'συναίνεσε / συναινέστε', translationEN: 'consent', translationRU: 'давать согласие', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1471, present: 'συναισθάνομαι', future: 'θα συναισθανθώ', aorist: 'συναισθάνθηκα', imperative: 'συναισθάνσου / συναισθανθείτε', translationEN: 'empathize', translationRU: 'сопереживать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1472, present: 'συναντιέμαι', future: 'θα συναντηθώ', aorist: 'συναντήθηκα', imperative: 'συναντήσου / συναντηθείτε', translationEN: 'meet (with each other)', translationRU: 'встречаться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1473, present: 'συναντώ', future: 'θα συναντήσω', aorist: 'συνάντησα', imperative: 'συνάντησε / συναντήστε', translationEN: 'meet, encounter', translationRU: 'встречать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1474, present: 'συναρμολογώ', future: 'θα συναρμολογήσω', aorist: 'συναρμολόγησα', imperative: 'συναρμολόγησε / συναρμολογήστε', translationEN: 'assemble', translationRU: 'собирать (механизм)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1475, present: 'συνδέομαι', future: 'θα συνδεθώ', aorist: 'συνδέθηκα', imperative: 'συνδέσου / συνδεθείτε', translationEN: 'log in, connect', translationRU: 'входить в систему, подключаться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1476, present: 'συνδέω', future: 'θα συνδέσω', aorist: 'σύνδεσα', imperative: 'σύνδεσε / συνδέστε', translationEN: 'connect', translationRU: 'соединять, подключать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1477, present: 'συνδυάζω', future: 'θα συνδυάσω', aorist: 'συνδύασα', imperative: 'συνδύασε / συνδυάστε', translationEN: 'combine', translationRU: 'сочетать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1478, present: 'συνειδητοποιώ', future: 'θα συνειδητοποιήσω', aorist: 'συνειδητοποίησα', imperative: 'συνειδητοποίησε / συνειδητοποιήστε', translationEN: 'realize', translationRU: 'осознавать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1479, present: 'συνεισφέρω', future: null, aorist: 'συνεισέφερα', imperative: 'συνεισέφερε / συνεισεφέρετε', translationEN: 'contribute', translationRU: 'вносить вклад', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1480, present: 'συνεννοούμαι', future: 'θα συνεννοηθώ', aorist: 'συνεννοήθηκα', imperative: 'συνεννοήσου / συνεννοηθείτε', translationEN: 'communicate, come to terms', translationRU: 'договариваться, понимать друг друга', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1481, present: 'συνεργάζομαι', future: 'θα συνεργαστώ', aorist: 'συνεργάστηκα', imperative: 'συνεργάσου / συνεργαστείτε', translationEN: 'cooperate', translationRU: 'сотрудничать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1482, present: 'συνεχίζω', future: 'θα συνεχίσω', aorist: 'συνέχισα', imperative: 'συνέχισε / συνεχίστε', translationEN: 'continue', translationRU: 'продолжать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1483, present: 'συνηθίζω', future: 'θα συνηθίσω', aorist: 'συνήθισα', imperative: 'συνήθισε / συνηθίστε', translationEN: 'get used to', translationRU: 'привыкать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1484, present: 'συνθέτω', future: 'θα συνθέσω', aorist: 'σύνθεσα', imperative: 'σύνθεσε / συνθέστε', translationEN: 'compose, synthesize', translationRU: 'сочинять, составлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1485, present: 'συνιστώ', future: 'θα συστήσω', aorist: 'σύστησα', imperative: 'σύστησε / συστήστε', translationEN: 'recommend', translationRU: 'рекомендовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1486, present: 'συνοδεύω', future: 'θα συνοδεύσω', aorist: 'συνόδευσα', imperative: 'συνόδευσε / συνοδεύστε', translationEN: 'accompany', translationRU: 'сопровождать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1487, present: 'συνομιλώ', future: 'θα συνομιλήσω', aorist: 'συνομίλησα', imperative: 'συνομίλησε / συνομιλήστε', translationEN: 'converse', translationRU: 'беседовать', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammar2']},
{id: 1488, present: 'συνοψίζω', future: 'θα συνοψίσω', aorist: 'συνόψισα', imperative: 'συνόψισε / συνοψίστε', translationEN: 'summarize', translationRU: 'резюмировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1489, present: 'συνταγογραφώ', future: 'θα συνταγογραφήσω', aorist: 'συνταγογράφησα', imperative: 'συνταγογράφησε / συνταγογραφήστε', translationEN: 'prescribe', translationRU: 'выписывать рецепт', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1490, present: 'συντάσσω', future: 'θα συντάξω', aorist: 'σύνταξα', imperative: 'σύνταξε / συντάξτε', translationEN: 'draw up, draft', translationRU: 'составлять (документ)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1491, present: 'συντηρώ', future: 'θα συντηρήσω', aorist: 'συντήρησα', imperative: 'συντήρησε / συντηρήστε', translationEN: 'maintain, support', translationRU: 'содержать, обслуживать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1492, present: 'συντομεύω', future: 'θα συντομεύσω', aorist: 'συντόμευσα', imperative: 'συντόμευσε / συντομεύστε', translationEN: 'shorten, hurry up', translationRU: 'сокращать, ускорять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1493, present: 'συντομογραφώ', future: 'θα συντομογραφήσω', aorist: 'συντομογράφησα', imperative: 'συντομογράφησε / συντομογραφήστε', translationEN: 'abbreviate', translationRU: 'сокращать (слово)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1494, present: 'συσκευάζω', future: 'θα συσκευάσω', aorist: 'συσκεύασα', imperative: 'συσκεύασε / συσκευάστε', translationEN: 'pack', translationRU: 'упаковывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1495, present: 'συσσωρεύω', future: 'θα συσσωρεύσω', aorist: 'συσσώρευσα', imperative: 'συσσώρευσε / συσσωρεύστε', translationEN: 'accumulate', translationRU: 'накапливать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1496, present: 'συστέλλω', future: 'θα συστείλω', aorist: 'συνέστειλα', imperative: 'συστείλε / συστείλετε', translationEN: 'contract, constrict', translationRU: 'сжимать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1497, present: 'συστήνομαι', future: 'θα συσταθώ', aorist: 'συστήθηκα', imperative: 'συστήσου / συστηθείτε', translationEN: 'introduce oneself', translationRU: 'представляться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1498, present: 'συστήνω', future: 'θα συστήσω', aorist: 'σύστησα', imperative: 'σύστησε / συστήστε', translationEN: 'introduce, recommend', translationRU: 'представлять, рекомендовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1499, present: 'συχνάζω', future: 'θα συχνάσω', aorist: 'σύχνασα', imperative: null, translationEN: 'frequent, hang out', translationRU: 'часто бывать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1500, present: 'σφάζω', future: 'θα σφάξω', aorist: 'έσφαξα', imperative: 'σφάξε / σφάξτε', translationEN: 'slaughter', translationRU: 'резать, забивать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1501, present: 'σφάλλω', future: null, aorist: 'έσφαλα', imperative: 'σφάλε / σφάλτε', translationEN: 'err, make a mistake', translationRU: 'ошибаться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1502, present: 'σφίγγομαι', future: 'θα σφιχτώ', aorist: 'σφίχτηκα', imperative: 'σφίξου / σφιχτείτε', translationEN: 'squeeze together, tighten', translationRU: 'сжиматься, теснее садиться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1503, present: 'σφίγγω', future: 'θα σφίξω', aorist: 'έσφιξα', imperative: 'σφίξε / σφίξτε', translationEN: 'squeeze, tighten', translationRU: 'сжимать, затягивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1504, present: 'σφουγγαρίζω', future: 'θα σφουγγαρίσω', aorist: 'σφουγγάρισα', imperative: 'σφουγγάρισε / σφουγγαρίστε', translationEN: 'mop', translationRU: 'мыть пол', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1505, present: 'σφραγίζω', future: 'θα σφραγίσω', aorist: 'σφράγισα', imperative: 'σφράγισε / σφραγίστε', translationEN: 'seal, stamp', translationRU: 'запечатывать, ставить печать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1506, present: 'σφυρηλατώ', future: 'θα σφυρηλατήσω', aorist: 'σφυρηλάτησα', imperative: 'σφυρηλάτησε / σφυρηλατήστε', translationEN: 'forge', translationRU: 'ковать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1507, present: 'σφυρίζω', future: 'θα σφυρίξω', aorist: 'σφύριξα', imperative: 'σφύριξε / σφυρίξτε', translationEN: 'whistle', translationRU: 'свистеть', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1508, present: 'σφυροκοπώ', future: 'θα σφυροκοπήσω', aorist: 'σφυροκόπησα', imperative: 'σφυροκόπησε / σφυροκοπήστε', translationEN: 'hammer', translationRU: 'колотить молотком', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1509, present: 'σχάζω', future: 'θα σχάσω', aorist: 'έσχασα', imperative: 'σχάσε / σχάστε', translationEN: 'split, burst', translationRU: 'раскалываться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1510, present: 'σχεδιάζω', future: 'θα σχεδιάσω', aorist: 'σχεδίασα', imperative: 'σχεδίασε / σχεδιάστε', translationEN: 'design, plan', translationRU: 'проектировать, планировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1511, present: 'σχετίζομαι', future: 'θα σχετιστώ', aorist: 'σχετίστηκα', imperative: 'σχετίσου / σχετιστείτε', translationEN: 'be related, associate', translationRU: 'быть связанным, общаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1512, present: 'σχηματίζω', future: 'θα σχηματίσω', aorist: 'σχημάτισα', imperative: 'σχημάτισε / σχηματίστε', translationEN: 'form', translationRU: 'образовывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1513, present: 'σχίζω', future: 'θα σχίσω', aorist: 'έσχισα', imperative: 'σχίσε / σχίστε', translationEN: 'tear, split', translationRU: 'рвать, раскалывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1514, present: 'σχολιάζω', future: 'θα σχολιάσω', aorist: 'σχολίασα', imperative: 'σχολίασε / σχολιάστε', translationEN: 'comment', translationRU: 'комментировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1515, present: 'σχολώ', future: 'θα σχολάσω', aorist: 'σχόλασα', imperative: 'σχόλασε / σχολάστε', translationEN: 'finish work/school', translationRU: 'заканчивать работу, занятия', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1516, present: 'σώζομαι', future: 'θα σωθώ', aorist: 'σώθηκα', imperative: 'σώσου / σωθείτε', translationEN: 'be saved, escape', translationRU: 'спасаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1517, present: 'σώζω', future: 'θα σώσω', aorist: 'έσωσα', imperative: 'σώσε / σώστε', translationEN: 'save, rescue', translationRU: 'спасать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1518, present: 'σωπαίνω', future: 'θα σωπάσω', aorist: 'σώπασα', imperative: 'σώπασε / σωπάστε', translationEN: 'fall silent', translationRU: 'умолкать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1519, present: 'σωριάζομαι', future: 'θα σωριαστώ', aorist: 'σωριάστηκα', imperative: 'σωριάσου / σωριαστείτε', translationEN: 'collapse, slump', translationRU: 'валиться, рухнуть', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1520, present: 'τάζω', future: 'θα τάξω', aorist: 'έταξα', imperative: 'τάξε / τάξτε', translationEN: 'vow, promise', translationRU: 'обещать (в дар), давать обет', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1521, present: 'ταΐζω', future: 'θα ταΐσω', aorist: 'τάισα', imperative: 'τάισε / ταΐστε', translationEN: 'feed', translationRU: 'кормить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1522, present: 'ταιριάζω', future: 'θα ταιριάξω', aorist: 'ταίριαξα', imperative: 'ταίριαξε / ταιριάξτε', translationEN: 'match, suit', translationRU: 'подходить, сочетаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1523, present: 'τακτοποιώ', future: 'θα τακτοποιήσω', aorist: 'τακτοποίησα', imperative: 'τακτοποίησε / τακτοποιήστε', translationEN: 'tidy up, arrange', translationRU: 'приводить в порядок', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1524, present: 'ταλαιπωρώ', future: 'θα ταλαιπωρήσω', aorist: 'ταλαιπώρησα', imperative: 'ταλαιπώρησε / ταλαιπωρήστε', translationEN: 'torment, put through hardship', translationRU: 'мучить, изводить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1525, present: 'ταλαντεύομαι', future: 'θα ταλαντευτώ', aorist: 'ταλαντεύτηκα', imperative: 'ταλαντέψου / ταλαντευτείτε', translationEN: 'sway, waver', translationRU: 'колебаться, качаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1526, present: 'ταλαντώνω', future: 'θα ταλαντώσω', aorist: 'ταλάντωσα', imperative: 'ταλάντωσε / ταλαντώστε', translationEN: 'oscillate, swing', translationRU: 'колебать, раскачивать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1527, present: 'ταξιδεύω', future: 'θα ταξιδέψω', aorist: 'ταξίδεψα', imperative: 'ταξίδεψε / ταξιδέψτε', translationEN: 'travel', translationRU: 'путешествовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1528, present: 'ταξινομώ', future: 'θα ταξινομήσω', aorist: 'ταξινόμησα', imperative: 'ταξινόμησε / ταξινομήστε', translationEN: 'classify, sort', translationRU: 'классифицировать, сортировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1529, present: 'ταπεινώνω', future: 'θα ταπεινώσω', aorist: 'ταπείνωσα', imperative: 'ταπείνωσε / ταπεινώστε', translationEN: 'humiliate', translationRU: 'унижать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1530, present: 'ταράζω', future: 'θα ταράξω', aorist: 'τάραξα', imperative: 'τάραξε / ταράξτε', translationEN: 'disturb, shake', translationRU: 'тревожить, потрясать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1531, present: 'ταυτίζω', future: 'θα ταυτίσω', aorist: 'ταύτισα', imperative: 'ταύτισε / ταυτίστε', translationEN: 'identify (with)', translationRU: 'отождествлять', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1532, present: 'ταχυδρομώ', future: 'θα ταχυδρομήσω', aorist: 'ταχυδρόμησα', imperative: 'ταχυδρόμησε / ταχυδρομήστε', translationEN: 'mail, post', translationRU: 'отправлять по почте', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1533, present: 'τεκνοποιώ', future: 'θα τεκνοποιήσω', aorist: 'τεκνοποίησα', imperative: 'τεκνοποίησε / τεκνοποιήστε', translationEN: 'have children', translationRU: 'рожать детей', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1534, present: 'τελειοποιώ', future: 'θα τελειοποιήσω', aorist: 'τελειοποίησα', imperative: 'τελειοποίησε / τελειοποιήστε', translationEN: 'perfect', translationRU: 'совершенствовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1535, present: 'τελειώνω', future: 'θα τελειώσω', aorist: 'τελείωσα', imperative: 'τελείωσε / τελειώστε', translationEN: 'finish', translationRU: 'заканчивать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1536, present: 'τεμαχίζω', future: 'θα τεμαχίσω', aorist: 'τεμάχισα', imperative: 'τεμάχισε / τεμαχίστε', translationEN: 'cut into pieces', translationRU: 'разделять на куски', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1537, present: 'τεντώνομαι', future: 'θα τεντωθώ', aorist: 'τεντώθηκα', imperative: 'τεντώσου / τεντωθείτε', translationEN: 'stretch', translationRU: 'потягиваться, натягиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1538, present: 'τεντώνω', future: 'θα τεντώσω', aorist: 'τέντωσα', imperative: 'τέντωσε / τεντώστε', translationEN: 'stretch', translationRU: 'растягивать, напрягать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1539, present: 'τερματίζω', future: 'θα τερματίσω', aorist: 'τερμάτισα', imperative: 'τερμάτισε / τερματίστε', translationEN: 'end, finish', translationRU: 'завершать, финишировать', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1540, present: 'τέρπω', future: 'θα τέρψω', aorist: 'έτερψα', imperative: 'τέρψε / τέρψτε', translationEN: 'delight', translationRU: 'услаждать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1541, present: 'τηγανίζω', future: 'θα τηγανίσω', aorist: 'τηγάνισα', imperative: 'τηγάνισε / τηγανίστε', translationEN: 'fry', translationRU: 'жарить на сковороде', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1542, present: 'τηλεφωνώ', future: 'θα τηλεφωνήσω', aorist: 'τηλεφώνησα', imperative: 'τηλεφώνησε / τηλεφωνήστε', translationEN: 'phone, call', translationRU: 'звонить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1543, present: 'τηρώ', future: 'θα τηρήσω', aorist: 'τήρησα', imperative: 'τήρησε / τηρήστε', translationEN: 'observe, comply with', translationRU: 'соблюдать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1544, present: 'τιμώ', future: 'θα τιμήσω', aorist: 'τίμησα', imperative: 'τίμησε / τιμήστε', translationEN: 'honor', translationRU: 'чтить, почитать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1545, present: 'τιμωρώ', future: 'θα τιμωρήσω', aorist: 'τιμώρησα', imperative: 'τιμώρησε / τιμωρήστε', translationEN: 'punish', translationRU: 'наказывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1546, present: 'τινάζομαι', future: 'θα τιναχτώ', aorist: 'τινάχτηκα', imperative: 'τινάξου / τιναχτείτε', translationEN: 'jump, start', translationRU: 'вздрагивать, подскакивать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1547, present: 'τινάζω', future: 'θα τινάξω', aorist: 'τίναξα', imperative: 'τίναξε / τινάξτε', translationEN: 'shake off', translationRU: 'стряхивать, встряхивать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1548, present: 'τιτιβίζω', future: 'θα τιτιβίσω', aorist: 'τιτίβισα', imperative: 'τιτίβισε / τιτιβίστε', translationEN: 'twitter, chirp', translationRU: 'чирикать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1549, present: 'τολμώ', future: 'θα τολμήσω', aorist: 'τόλμησα', imperative: 'τόλμησε / τολμήστε', translationEN: 'dare', translationRU: 'осмеливаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1550, present: 'τονίζομαι', future: 'θα τονιστώ', aorist: 'τονίστηκα', imperative: 'τονίσου / τονιστείτε', translationEN: 'be stressed (accented)', translationRU: 'получать ударение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1551, present: 'τονίζω', future: 'θα τονίσω', aorist: 'τόνισα', imperative: 'τόνισε / τονίστε', translationEN: 'stress, emphasize', translationRU: 'подчёркивать, ставить ударение', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1552, present: 'τοποθετώ', future: 'θα τοποθετήσω', aorist: 'τοποθέτησα', imperative: 'τοποθέτησε / τοποθετήστε', translationEN: 'place, position', translationRU: 'помещать, размещать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1553, present: 'τραβώ', future: 'θα τραβήξω', aorist: 'τράβηξα', imperative: 'τράβηξε / τραβήξτε', translationEN: 'pull, take (photo)', translationRU: 'тянуть, снимать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1554, present: 'τραγουδώ', future: 'θα τραγουδήσω', aorist: 'τραγούδησα', imperative: 'τραγούδησε / τραγουδήστε', translationEN: 'sing', translationRU: 'петь', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1555, present: 'τρακάρω', future: null, aorist: 'τράκαρα', imperative: null, translationEN: 'crash, collide', translationRU: 'врезаться, попасть в аварию', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1556, present: 'τραυλίζω', future: 'θα τραυλίσω', aorist: 'τραύλισα', imperative: 'τραύλισε / τραυλίστε', translationEN: 'stutter', translationRU: 'заикаться', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1557, present: 'τραυματίζω', future: 'θα τραυματίσω', aorist: 'τραυμάτισα', imperative: 'τραυμάτισε / τραυματίστε', translationEN: 'injure', translationRU: 'ранить, травмировать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1558, present: 'τρελαίνω', future: 'θα τρελάνω', aorist: 'τρέλανα', imperative: 'τρέλανε / τρελάνετε', translationEN: 'drive crazy', translationRU: 'сводить с ума', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1559, present: 'τρεμοπαίζω', future: 'θα τρεμοπαίξω', aorist: 'τρεμόπαιξα', imperative: 'τρεμόπαιξε / τρεμοπαίξτε', translationEN: 'flicker, blink', translationRU: 'мерцать, моргать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1560, present: 'τρέμω', future: null, aorist: 'έτρεμα', imperative: null, translationEN: 'tremble', translationRU: 'дрожать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1561, present: 'τρέπομαι', future: 'θα τραπώ', aorist: 'τράπηκα', imperative: 'τράπου / τραπείτε', translationEN: 'turn to, resort to', translationRU: 'обращаться, прибегать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1562, present: 'τρέφω', future: 'θα θρέψω', aorist: 'έθρεψα', imperative: 'θρέψε / θρέψτε', translationEN: 'feed, nourish', translationRU: 'кормить, питать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1563, present: 'τρέχω', future: 'θα τρέξω', aorist: 'έτρεξα', imperative: 'τρέξε / τρέξτε', translationEN: 'run', translationRU: 'бежать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1564, present: 'τρίβομαι', future: 'θα τριφτώ', aorist: 'τρίφτηκα', imperative: 'τρίψου / τριφτείτε', translationEN: 'rub oneself, wear away', translationRU: 'тереться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1565, present: 'τρίβω', future: 'θα τρίψω', aorist: 'έτριψα', imperative: 'τρίψε / τρίψτε', translationEN: 'rub, grate', translationRU: 'тереть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1566, present: 'τριγυρίζω', future: 'θα τριγυρίσω', aorist: 'τριγύρισα', imperative: 'τριγύρισε / τριγυρίστε', translationEN: 'wander around', translationRU: 'бродить, слоняться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1567, present: 'τρικλίζω', future: 'θα τρικλίσω', aorist: 'τρίκλισα', imperative: 'τρίκλισε / τρικλίστε', translationEN: 'stagger, totter', translationRU: 'шататься', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1568, present: 'τρομάζω', future: 'θα τρομάξω', aorist: 'τρόμαξα', imperative: 'τρόμαξε / τρομάξτε', translationEN: 'scare, get scared', translationRU: 'пугать, пугаться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1569, present: 'τρομοκρατώ', future: 'θα τρομοκρατήσω', aorist: 'τρομοκράτησα', imperative: 'τρομοκράτησε / τρομοκρατήστε', translationEN: 'terrorize', translationRU: 'терроризировать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1570, present: 'τροποποιώ', future: 'θα τροποποιήσω', aorist: 'τροποποίησα', imperative: 'τροποποίησε / τροποποιήστε', translationEN: 'modify', translationRU: 'изменять, видоизменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1571, present: 'τροφοδοτώ', future: 'θα τροφοδοτήσω', aorist: 'τροφοδότησα', imperative: 'τροφοδότησε / τροφοδοτήστε', translationEN: 'supply, feed', translationRU: 'снабжать, питать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1572, present: 'τροχίζω', future: 'θα τροχίσω', aorist: 'τρόχισα', imperative: 'τρόχισε / τροχίστε', translationEN: 'sharpen, grind', translationRU: 'точить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1573, present: 'τρυγώ', future: 'θα τρυγήσω', aorist: 'τρύγησα', imperative: 'τρύγησε / τρυγήστε', translationEN: 'harvest (grapes)', translationRU: 'собирать виноград', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1574, present: 'τρυπώ', future: 'θα τρυπήσω', aorist: 'τρύπησα', imperative: 'τρύπησε / τρυπήστε', translationEN: 'pierce, make a hole', translationRU: 'прокалывать, сверлить', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1575, present: 'τρώω', future: 'θα φάω', aorist: 'έφαγα', imperative: 'φάε / φάτε', translationEN: 'eat', translationRU: 'есть, кушать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1576, present: 'τσακίζομαι', future: 'θα τσακιστώ', aorist: 'τσακίστηκα', imperative: 'τσακίσου / τσακιστείτε', translationEN: 'break, hurry up', translationRU: 'ломаться, спешить', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1577, present: 'τσακίζω', future: 'θα τσακίσω', aorist: 'τσάκισα', imperative: 'τσάκισε / τσακίστε', translationEN: 'crush, break', translationRU: 'ломать, сокрушать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1578, present: 'τσακώνομαι', future: 'θα τσακωθώ', aorist: 'τσακώθηκα', imperative: 'τσακώσου / τσακωθείτε', translationEN: 'quarrel', translationRU: 'ссориться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1579, present: 'τσαλαβουτώ', future: 'θα τσαλαβουτήσω', aorist: 'τσαλαβούτησα', imperative: 'τσαλαβούτησε / τσαλαβουτήστε', translationEN: 'splash, paddle', translationRU: 'плескаться, барахтаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1580, present: 'τσαλακώνω', future: 'θα τσαλακώσω', aorist: 'τσαλάκωσα', imperative: 'τσαλάκωσε / τσαλακώστε', translationEN: 'crumple', translationRU: 'мять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1581, present: 'τσιγαρίζω', future: 'θα τσιγαρίσω', aorist: 'τσιγάρισα', imperative: 'τσιγάρισε / τσιγαρίστε', translationEN: 'sauté', translationRU: 'обжаривать, пассеровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1582, present: 'τσιμπολογώ', future: 'θα τσιμπολογήσω', aorist: 'τσιμπολόγησα', imperative: 'τσιμπολόγησε / τσιμπολογήστε', translationEN: 'nibble, peck', translationRU: 'клевать, перекусывать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1583, present: 'τσιμπώ', future: 'θα τσιμπήσω', aorist: 'τσίμπησα', imperative: 'τσίμπησε / τσιμπήστε', translationEN: 'pinch, sting', translationRU: 'щипать, кусать (о насекомых)', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1584, present: 'τσιρίζω', future: 'θα τσιρίξω', aorist: 'τσίριξα', imperative: 'τσίριξε / τσιρίξτε', translationEN: 'scream, shriek', translationRU: 'визжать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1585, present: 'τσουγκρίζω', future: 'θα τσουγκρίσω', aorist: 'τσούγκρισα', imperative: 'τσούγκρισε / τσουγκρίστε', translationEN: 'clink (glasses)', translationRU: 'чокаться', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1586, present: 'τυλίγομαι', future: 'θα τυλιχτώ', aorist: 'τυλίχτηκα', imperative: 'τυλίξου / τυλιχτείτε', translationEN: 'wrap oneself, curl up', translationRU: 'закутываться, свиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1587, present: 'τυλίγω', future: 'θα τυλίξω', aorist: 'τύλιξα', imperative: 'τύλιξε / τυλίξτε', translationEN: 'wrap', translationRU: 'заворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1588, present: 'τυπώνω', future: 'θα τυπώσω', aorist: 'τύπωσα', imperative: 'τύπωσε / τυπώστε', translationEN: 'print', translationRU: 'печатать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1589, present: 'τυραννώ', future: 'θα τυραννήσω', aorist: 'τυράννησα', imperative: 'τυράννησε / τυραννήστε', translationEN: 'torment, tyrannize', translationRU: 'мучить, тиранить', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1590, present: 'τυφλώνω', future: 'θα τυφλώσω', aorist: 'τύφλωσα', imperative: 'τύφλωσε / τυφλώστε', translationEN: 'blind', translationRU: 'ослеплять', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1591, present: 'τυχαίνω', future: 'θα τύχω', aorist: 'έτυχα', imperative: null, translationEN: 'happen (to be)', translationRU: 'случаться, оказываться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1592, present: 'υγραίνω', future: 'θα υγράνω', aorist: 'ύγρανα', imperative: 'ύγρανε / υγράνετε', translationEN: 'moisten', translationRU: 'увлажнять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1593, present: 'υγροποιώ', future: 'θα υγροποιήσω', aorist: 'υγροποίησα', imperative: 'υγροποίησε / υγροποιήστε', translationEN: 'liquefy', translationRU: 'сжижать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1594, present: 'υιοθετώ', future: 'θα υιοθετήσω', aorist: 'υιοθέτησα', imperative: 'υιοθέτησε / υιοθετήστε', translationEN: 'adopt', translationRU: 'усыновлять, принимать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1595, present: 'υπαγορεύω', future: 'θα υπαγορεύσω', aorist: 'υπαγόρευσα', imperative: 'υπαγόρευσε / υπαγορεύστε', translationEN: 'dictate', translationRU: 'диктовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1596, present: 'υπαινίσσομαι', future: 'θα υπαινιχθώ', aorist: 'υπαινίχθηκα', imperative: null, translationEN: 'hint, insinuate', translationRU: 'намекать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1597, present: 'υπακούω', future: 'θα υπακούσω', aorist: 'υπάκουσα', imperative: 'υπάκουσε / υπακούστε', translationEN: 'obey', translationRU: 'слушаться, повиноваться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1598, present: 'υπάρχω', future: 'θα υπάρξω', aorist: 'υπήρξα', imperative: null, translationEN: 'exist', translationRU: 'существовать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1599, present: 'υπενθυμίζω', future: 'θα υπενθυμίσω', aorist: 'υπενθύμισα', imperative: 'υπενθύμισε / υπενθυμίστε', translationEN: 'remind', translationRU: 'напоминать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1600, present: 'υπερασπίζομαι', future: 'θα υπερασπιστώ', aorist: 'υπερασπίστηκα', imperative: 'υπερασπίσου / υπερασπιστείτε', translationEN: 'defend', translationRU: 'защищать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1601, present: 'υπερβάλλω', future: 'θα υπερβάλω', aorist: 'υπερέβαλα', imperative: null, translationEN: 'exaggerate', translationRU: 'преувеличивать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1602, present: 'υπερεκτιμώ', future: 'θα υπερεκτιμήσω', aorist: 'υπερεκτίμησα', imperative: 'υπερεκτίμησε / υπερεκτιμήστε', translationEN: 'overestimate', translationRU: 'переоценивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1603, present: 'υπερκαλύπτω', future: 'θα υπερκαλύψω', aorist: 'υπερκάλυψα', imperative: 'υπερκάλυψε / υπερκαλύψτε', translationEN: 'oversubscribe, exceed', translationRU: 'перекрывать, превышать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1604, present: 'υπερτερώ', future: 'θα υπερτερήσω', aorist: 'υπερτέρησα', imperative: 'υπερτέρησε / υπερτερήστε', translationEN: 'surpass, outnumber', translationRU: 'превосходить', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1605, present: 'υπερτιμώ', future: 'θα υπερτιμήσω', aorist: 'υπερτίμησα', imperative: 'υπερτίμησε / υπερτιμήστε', translationEN: 'overrate', translationRU: 'переоценивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1606, present: 'υπηρετώ', future: 'θα υπηρετήσω', aorist: 'υπηρέτησα', imperative: 'υπηρέτησε / υπηρετήστε', translationEN: 'serve', translationRU: 'служить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1607, present: 'υποβάλλω', future: 'θα υποβάλω', aorist: 'υπέβαλα', imperative: 'υπόβαλε / υποβάλετε', translationEN: 'submit, subject', translationRU: 'подавать, подвергать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1608, present: 'υποβιβάζω', future: 'θα υποβιβάσω', aorist: 'υποβίβασα', imperative: 'υποβίβασε / υποβιβάστε', translationEN: 'demote', translationRU: 'понижать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1609, present: 'υπογραμμίζω', future: 'θα υπογραμμίσω', aorist: 'υπογράμμισα', imperative: 'υπογράμμισε / υπογραμμίστε', translationEN: 'underline, stress', translationRU: 'подчёркивать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1610, present: 'υπογράφω', future: 'θα υπογράψω', aorist: 'υπέγραψα', imperative: 'υπόγραψε / υπογράψτε', translationEN: 'sign', translationRU: 'подписывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1611, present: 'υποδέχομαι', future: 'θα υποδεχτώ', aorist: 'υποδέχτηκα', imperative: 'υποδέξου / υποδεχτείτε', translationEN: 'welcome, receive', translationRU: 'встречать, принимать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1612, present: 'υποδουλώνω', future: 'θα υποδουλώσω', aorist: 'υποδούλωσα', imperative: 'υποδούλωσε / υποδουλώστε', translationEN: 'enslave', translationRU: 'порабощать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1613, present: 'υποδύομαι', future: 'θα υποδυθώ', aorist: 'υποδύθηκα', imperative: 'υποδύσου / υποδυθείτε', translationEN: 'play (a role), impersonate', translationRU: 'играть роль, изображать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1614, present: 'υποεκτιμώ', future: 'θα υποεκτιμήσω', aorist: 'υποεκτίμησα', imperative: 'υποεκτίμησε / υποεκτιμήστε', translationEN: 'underestimate', translationRU: 'недооценивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1615, present: 'υποθέτω', future: 'θα υποθέσω', aorist: 'υπέθεσα', imperative: 'υπόθεσε / υποθέστε', translationEN: 'suppose', translationRU: 'предполагать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1616, present: 'υποκρίνομαι', future: 'θα υποκριθώ', aorist: 'υποκρίθηκα', imperative: 'υποκρίσου / υποκριθείτε', translationEN: 'feign, pretend', translationRU: 'лицемерить, притворяться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1617, present: 'υπολογίζομαι', future: 'θα υπολογιστώ', aorist: 'υπολογίστηκα', imperative: 'υπολογίσου / υπολογιστείτε', translationEN: 'be counted', translationRU: 'учитываться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1618, present: 'υπολογίζω', future: 'θα υπολογίσω', aorist: 'υπολόγισα', imperative: 'υπολόγισε / υπολογίστε', translationEN: 'calculate, count on', translationRU: 'вычислять, рассчитывать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1619, present: 'υπομένω', future: 'θα υπομείνω', aorist: 'υπέμεινα', imperative: 'υπόμεινε / υπομείνετε', translationEN: 'endure, bear', translationRU: 'терпеть, выдерживать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1620, present: 'υπονομεύω', future: 'θα υπονομεύσω', aorist: 'υπονόμευσα', imperative: 'υπονόμευσε / υπονομεύστε', translationEN: 'undermine', translationRU: 'подрывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1621, present: 'υπονοώ', future: 'θα υπονοήσω', aorist: 'υπονόησα', imperative: 'υπονόησε / υπονοήστε', translationEN: 'imply', translationRU: 'намекать, подразумевать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1622, present: 'υποστηρίζω', future: 'θα υποστηρίξω', aorist: 'υποστήριξα', imperative: 'υποστήριξε / υποστηρίξτε', translationEN: 'support, claim', translationRU: 'поддерживать, утверждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1623, present: 'υποσχόμαι', future: 'θα υποσχεθώ', aorist: 'υποσχέθηκα', imperative: 'υποσχέσου / υποσχεθείτε', translationEN: 'promise', translationRU: 'обещать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 1624, present: 'υποτιμώ', future: 'θα υποτιμήσω', aorist: 'υποτίμησα', imperative: 'υποτίμησε / υποτιμήστε', translationEN: 'underestimate', translationRU: 'недооценивать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1625, present: 'υποτιτλίζω', future: 'θα υποτιτλίσω', aorist: 'υπετίτλισα', imperative: 'υποτίτλισε / υποτιτλίστε', translationEN: 'subtitle', translationRU: 'делать субтитры', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1626, present: 'υποφέρω', future: null, aorist: 'υπέφερα', imperative: null, translationEN: 'suffer', translationRU: 'страдать, терпеть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1627, present: 'υποχρεώνομαι', future: 'θα υποχρεωθώ', aorist: 'υποχρεώθηκα', imperative: 'υποχρεώσου / υποχρεωθείτε', translationEN: 'be obliged', translationRU: 'быть обязанным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1628, present: 'υποχρεώνω', future: 'θα υποχρεώσω', aorist: 'υποχρέωσα', imperative: 'υποχρέωσε / υποχρεώστε', translationEN: 'oblige', translationRU: 'обязывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1629, present: 'υποχωρώ', future: 'θα υποχωρήσω', aorist: 'υποχώρησα', imperative: 'υποχώρησε / υποχωρήστε', translationEN: 'retreat, give in', translationRU: 'отступать, уступать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1630, present: 'υποψιάζομαι', future: 'θα υποψιαστώ', aorist: 'υποψιάστηκα', imperative: 'υποψιάσου / υποψιαστείτε', translationEN: 'suspect', translationRU: 'подозревать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1631, present: 'υστερώ', future: 'θα υστερήσω', aorist: 'υστέρησα', imperative: 'υστέρησε / υστερήστε', translationEN: 'lag behind, fall short', translationRU: 'отставать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1632, present: 'υφαίνω', future: 'θα υφάνω', aorist: 'ύφανα', imperative: 'ύφανε / υφάνετε', translationEN: 'weave', translationRU: 'ткать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1633, present: 'υψώνω', future: 'θα υψώσω', aorist: 'ύψωσα', imperative: 'ύψωσε / υψώστε', translationEN: 'raise, erect', translationRU: 'поднимать, воздвигать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1634, present: 'φαίνομαι', future: 'θα φανώ', aorist: 'φάνηκα', imperative: null, translationEN: 'seem, appear', translationRU: 'казаться, виднеться', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1635, present: 'φαντάζομαι', future: 'θα φανταστώ', aorist: 'φαντάστηκα', imperative: 'φαντάσου / φανταστείτε', translationEN: 'imagine', translationRU: 'воображать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1636, present: 'φέρνω', future: 'θα φέρω', aorist: 'έφερα', imperative: 'φέρε / φέρτε', translationEN: 'bring', translationRU: 'приносить, приводить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1637, present: 'φέρομαι', future: 'θα φερθώ', aorist: 'φέρθηκα', imperative: 'φέρσου / φερθείτε', translationEN: 'behave, treat', translationRU: 'вести себя, обращаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1638, present: 'φεύγω', future: 'θα φύγω', aorist: 'έφυγα', imperative: 'φύγε / φύγετε', translationEN: 'leave, go away', translationRU: 'уходить, уезжать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1639, present: 'φθάνω', future: 'θα φτάσω', aorist: 'έφτασα', imperative: 'φτάσε / φτάστε', translationEN: 'arrive, reach, suffice', translationRU: 'прибывать, достигать, хватать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1640, present: 'φθείρομαι', future: 'θα φθαρώ', aorist: 'φθάρηκα', imperative: 'φθείρου / φθαρείτε', translationEN: 'wear out', translationRU: 'изнашиваться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1641, present: 'φθείρω', future: 'θα φθείρω', aorist: 'έφθειρα', imperative: 'φθείρε / φθείρτε', translationEN: 'wear out, corrupt', translationRU: 'изнашивать, развращать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1642, present: 'φθονώ', future: 'θα φθονήσω', aorist: 'φθόνησα', imperative: null, translationEN: 'envy', translationRU: 'завидовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1643, present: 'φιλιώνω', future: 'θα φιλιώσω', aorist: 'φίλιωσα', imperative: 'φίλιωσε / φιλιώστε', translationEN: 'make friends again', translationRU: 'мириться, подружиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1644, present: 'φιλοδοξώ', future: 'θα φιλοδοξήσω', aorist: 'φιλοδόξησα', imperative: null, translationEN: 'aspire', translationRU: 'стремиться, питать амбиции', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1645, present: 'φιλοξενώ', future: 'θα φιλοξενήσω', aorist: 'φιλοξένησα', imperative: 'φιλοξένησε / φιλοξενήστε', translationEN: 'host, accommodate', translationRU: 'принимать гостей', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1646, present: 'φιλτράρω', future: 'θα φιλτράρω', aorist: 'φιλτράρισα', imperative: 'φιλτράρισε / φιλτραρίστε', translationEN: 'filter', translationRU: 'фильтровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1647, present: 'φιλώ', future: 'θα φιλήσω', aorist: 'φίλησα', imperative: 'φίλησε / φιλήστε', translationEN: 'kiss', translationRU: 'целовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1648, present: 'φλερτάρω', future: null, aorist: 'φλέρταρα', imperative: 'φλέρταρε / φλερτάρετε', translationEN: 'flirt', translationRU: 'флиртовать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1649, present: 'φλυαρώ', future: 'θα φλυαρήσω', aorist: 'φλυάρησα', imperative: 'φλυάρησε / φλυαρήστε', translationEN: 'chatter', translationRU: 'болтать, пустословить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1650, present: 'φοβάμαι', future: 'θα φοβηθώ', aorist: 'φοβήθηκα', imperative: 'φοβήσου / φοβηθείτε', translationEN: 'fear, be afraid', translationRU: 'бояться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1651, present: 'φοβίζω', future: 'θα φοβίσω', aorist: 'φόβισα', imperative: 'φόβισε / φοβίστε', translationEN: 'frighten', translationRU: 'пугать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1652, present: 'φοιτώ', future: 'θα φοιτήσω', aorist: 'φοίτησα', imperative: null, translationEN: 'attend (school)', translationRU: 'учиться, посещать (учебное заведение)', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1653, present: 'φονεύω', future: 'θα φονεύσω', aorist: 'φόνευσα', imperative: 'φόνευσε / φονεύστε', translationEN: 'murder', translationRU: 'убивать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1654, present: 'φοροδιαφεύγω', future: 'θα φοροδιαφύγω', aorist: 'φοροδιέφυγα', imperative: 'φοροδιάφυγε / φοροδιαφύγετε', translationEN: 'evade taxes', translationRU: 'уклоняться от налогов', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1655, present: 'φορολογώ', future: 'θα φορολογήσω', aorist: 'φορολόγησα', imperative: 'φορολόγησε / φορολογήστε', translationEN: 'tax', translationRU: 'облагать налогом', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1656, present: 'φορτίζω', future: 'θα φορτίσω', aorist: 'φόρτισα', imperative: 'φόρτισε / φορτίστε', translationEN: 'charge (battery)', translationRU: 'заряжать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1657, present: 'φορτώνω', future: 'θα φορτώσω', aorist: 'φόρτωσα', imperative: 'φόρτωσε / φορτώστε', translationEN: 'load', translationRU: 'грузить, нагружать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1658, present: 'φορώ', future: 'θα φορέσω', aorist: 'φόρεσα', imperative: 'φόρεσε / φορέστε', translationEN: 'wear, put on', translationRU: 'носить, надевать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1659, present: 'φουσκώνομαι', future: 'θα φουσκωθώ', aorist: 'φουσκώθηκα', imperative: 'φουσκώσου / φουσκωθείτε', translationEN: 'bloat, swell', translationRU: 'раздуваться, пухнуть', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 1660, present: 'φουσκώνω', future: 'θα φουσκώσω', aorist: 'φούσκωσα', imperative: 'φούσκωσε / φουσκώστε', translationEN: 'inflate, swell', translationRU: 'надувать, раздуваться', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1661, present: 'φράζω', future: 'θα φράξω', aorist: 'έφραξα', imperative: 'φράξε / φράξτε', translationEN: 'block, fence', translationRU: 'загораживать, закупоривать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1662, present: 'φρενάρω', future: null, aorist: 'φρέναρα', imperative: 'φρέναρε / φρενάρετε', translationEN: 'brake', translationRU: 'тормозить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1663, present: 'φρικιάζω', future: 'θα φρικιάσω', aorist: 'φρίκιασα', imperative: 'φρίκιασε / φρικιάστε', translationEN: 'shudder', translationRU: 'ужасаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1664, present: 'φροντίζομαι', future: 'θα φροντιστώ', aorist: 'φροντίστηκα', imperative: 'φροντίσου / φροντιστείτε', translationEN: 'be looked after', translationRU: 'быть под присмотром', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1665, present: 'φροντίζω', future: 'θα φροντίσω', aorist: 'φρόντισα', imperative: 'φρόντισε / φροντίστε', translationEN: 'take care of, see to', translationRU: 'заботиться, позаботиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1666, present: 'φρουρώ', future: 'θα φρουρήσω', aorist: 'φρούρησα', imperative: 'φρούρησε / φρουρήστε', translationEN: 'guard', translationRU: 'охранять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1667, present: 'φρυγανίζω', future: 'θα φρυγανίσω', aorist: 'φρυγάνισα', imperative: 'φρυγάνισε / φρυγανίστε', translationEN: 'toast', translationRU: 'поджаривать (хлеб)', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1668, present: 'φτάνω', future: 'θα φτάσω', aorist: 'έφτασα', imperative: 'φτάσε / φτάστε', translationEN: 'arrive, reach', translationRU: 'приезжать, достигать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1669, present: 'φτερνίζομαι', future: 'θα φτερνιστώ', aorist: 'φτερνίστηκα', imperative: null, translationEN: 'sneeze', translationRU: 'чихать', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 1670, present: 'φτιάχνω', future: 'θα φτιάξω', aorist: 'έφτιαξα', imperative: 'φτιάξε / φτιάξτε', translationEN: 'make, fix', translationRU: 'делать, чинить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1671, present: 'φτύνω', future: 'θα φτύσω', aorist: 'έφτυσα', imperative: 'φτύσε / φτύστε', translationEN: 'spit', translationRU: 'плевать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1672, present: 'φτωχαίνω', future: 'θα φτωχύνω', aorist: 'φτώχυνα', imperative: null, translationEN: 'become poor', translationRU: 'беднеть', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1673, present: 'φυλακίζομαι', future: 'θα φυλακιστώ', aorist: 'φυλακίστηκα', imperative: 'φυλακίσου / φυλακιστείτε', translationEN: 'be imprisoned', translationRU: 'попасть в тюрьму', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1674, present: 'φυλακίζω', future: 'θα φυλακίσω', aorist: 'φυλάκισα', imperative: 'φυλάκισε / φυλακίστε', translationEN: 'imprison', translationRU: 'сажать в тюрьму', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1675, present: 'φυλάω', future: 'θα φυλάξω', aorist: 'φύλαξα', imperative: 'φύλαξε / φυλάξτε', translationEN: 'guard, keep', translationRU: 'охранять, хранить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1676, present: 'φυσώ', future: 'θα φυσήξω', aorist: 'φύσηξα', imperative: 'φύσηξε / φυσήξτε', translationEN: 'blow', translationRU: 'дуть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1677, present: 'φυτεύω', future: 'θα φυτέψω', aorist: 'φύτεψα', imperative: 'φύτεψε / φυτέψτε', translationEN: 'plant', translationRU: 'сажать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1678, present: 'φυτρώνω', future: 'θα φυτρώσω', aorist: 'φύτρωσα', imperative: null, translationEN: 'sprout', translationRU: 'прорастать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1679, present: 'φωλιάζω', future: 'θα φωλιάσω', aorist: 'φώλιασα', imperative: 'φώλιασε / φωλιάστε', translationEN: 'nest, snuggle', translationRU: 'гнездиться, прижаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1680, present: 'φωνάζω', future: 'θα φωνάξω', aorist: 'φώναξα', imperative: 'φώναξε / φωνάξτε', translationEN: 'shout, call', translationRU: 'кричать, звать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1681, present: 'φωσφορίζω', future: 'θα φωσφορίσω', aorist: 'φωσφόρισα', imperative: 'φωσφόρισε / φωσφορίστε', translationEN: 'glow', translationRU: 'светиться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1682, present: 'φωτίζω', future: 'θα φωτίσω', aorist: 'φώτισα', imperative: 'φώτισε / φωτίστε', translationEN: 'illuminate', translationRU: 'освещать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1683, present: 'φωτογραφίζω', future: 'θα φωτογραφίσω', aorist: 'φωτογράφισα', imperative: 'φωτογράφισε / φωτογραφίστε', translationEN: 'photograph', translationRU: 'фотографировать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1684, present: 'φωτοτυπώ', future: 'θα φωτοτυπήσω', aorist: 'φωτοτύπησα', imperative: 'φωτοτύπησε / φωτοτυπήστε', translationEN: 'photocopy', translationRU: 'ксерокопировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1685, present: 'χαζεύω', future: 'θα χαζέψω', aorist: 'χάζεψα', imperative: 'χάζεψε / χαζέψτε', translationEN: 'gawk, gaze around', translationRU: 'глазеть, разглядывать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1686, present: 'χαϊδεύω', future: 'θα χαϊδέψω', aorist: 'χαΐδεψα', imperative: 'χαΐδεψε / χαϊδέψτε', translationEN: 'caress, pet', translationRU: 'ласкать, гладить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1687, present: 'χαϊδολογώ', future: 'θα χαϊδολογήσω', aorist: 'χαϊδολόγησα', imperative: 'χαϊδολόγησε / χαϊδολογήστε', translationEN: 'caress, fondle', translationRU: 'ласкать, нежничать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1688, present: 'χαιρετώ', future: 'θα χαιρετήσω', aorist: 'χαιρέτησα', imperative: 'χαιρέτησε / χαιρετήστε', translationEN: 'greet', translationRU: 'приветствовать, здороваться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1689, present: 'χαίρομαι', future: 'θα χαρώ', aorist: 'χάρηκα', imperative: 'χάρου / χαρείτε', translationEN: 'be glad', translationRU: 'радоваться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1690, present: 'χαλαρώνω', future: 'θα χαλαρώσω', aorist: 'χαλάρωσα', imperative: 'χαλάρωσε / χαλαρώστε', translationEN: 'relax, loosen', translationRU: 'расслабляться, ослаблять', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1691, present: 'χαλώ', future: 'θα χαλάσω', aorist: 'χάλασα', imperative: 'χάλασε / χαλάστε', translationEN: 'spoil, break', translationRU: 'портить, ломать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1692, present: 'χαμηλώνω', future: 'θα χαμηλώσω', aorist: 'χαμήλωσα', imperative: 'χαμήλωσε / χαμηλώστε', translationEN: 'lower', translationRU: 'понижать, убавлять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1693, present: 'χαμογελώ', future: 'θα χαμογελάσω', aorist: 'χαμογέλασα', imperative: 'χαμογέλασε / χαμογελάστε', translationEN: 'smile', translationRU: 'улыбаться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1694, present: 'χάνομαι', future: 'θα χαθώ', aorist: 'χάθηκα', imperative: 'χάσου / χαθείτε', translationEN: 'get lost, disappear', translationRU: 'теряться, пропадать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1695, present: 'χαντακώνω', future: 'θα χαντακώσω', aorist: 'χαντάκωσα', imperative: 'χαντάκωσε / χαντακώστε', translationEN: 'ruin, wreck', translationRU: 'губить, портить', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1696, present: 'χάνω', future: 'θα χάσω', aorist: 'έχασα', imperative: 'χάσε / χάστε', translationEN: 'lose, miss', translationRU: 'терять, пропускать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1697, present: 'χαράζω', future: 'θα χαράξω', aorist: 'χάραξα', imperative: 'χάραξε / χαράξτε', translationEN: 'engrave, draw (a line)', translationRU: 'гравировать, прочерчивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1698, present: 'χαρακτηρίζω', future: 'θα χαρακτηρίσω', aorist: 'χαρακτήρισα', imperative: 'χαρακτήρισε / χαρακτηρίστε', translationEN: 'characterize', translationRU: 'характеризовать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1699, present: 'χαρίζω', future: 'θα χαρίσω', aorist: 'χάρισα', imperative: 'χάρισε / χαρίστε', translationEN: 'give (as a gift), forgive', translationRU: 'дарить, прощать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1700, present: 'χαρτογραφώ', future: 'θα χαρτογραφήσω', aorist: 'χαρτογράφησα', imperative: 'χαρτογράφησε / χαρτογραφήστε', translationEN: 'map', translationRU: 'составлять карту', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1701, present: 'χασμουριέμαι', future: 'θα χασμουρηθώ', aorist: 'χασμουρήθηκα', imperative: 'χασμουρήσου / χασμουρηθείτε', translationEN: 'yawn', translationRU: 'зевать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1702, present: 'χασομερώ', future: 'θα χασομερήσω', aorist: 'χασομέρησα', imperative: 'χασομέρησε / χασομερήστε', translationEN: 'waste time', translationRU: 'зря терять время', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1703, present: 'χειραγωγώ', future: 'θα χειραγωγήσω', aorist: 'χειραγώγησα', imperative: 'χειραγώγησε / χειραγωγήστε', translationEN: 'manipulate, guide', translationRU: 'манипулировать, вести за руку', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1704, present: 'χειρίζομαι', future: 'θα χειριστώ', aorist: 'χειρίστηκα', imperative: 'χειρίσου / χειριστείτε', translationEN: 'handle, operate', translationRU: 'обращаться, управлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1705, present: 'χειροκροτώ', future: 'θα χειροκροτήσω', aorist: 'χειροκρότησα', imperative: 'χειροκρότησε / χειροκροτήστε', translationEN: 'applaud', translationRU: 'аплодировать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1706, present: 'χειροτερεύω', future: 'θα χειροτερέψω', aorist: 'χειροτέρεψα', imperative: null, translationEN: 'worsen', translationRU: 'ухудшаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1707, present: 'χειρουργώ', future: 'θα χειρουργήσω', aorist: 'χειρούργησα', imperative: 'χειρούργησε / χειρουργήστε', translationEN: 'operate on, perform surgery', translationRU: 'оперировать', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1708, present: 'χηρεύω', future: 'θα χηρέψω', aorist: 'χήρεψα', imperative: 'χήρεψε / χηρέψτε', translationEN: 'be widowed', translationRU: 'вдоветь', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1709, present: 'χιονίζω', future: 'θα χιονίσω', aorist: 'χιόνισα', imperative: null, translationEN: 'snow', translationRU: 'идти (о снеге)', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1710, present: 'χλευάζω', future: 'θα χλευάσω', aorist: 'χλεύασα', imperative: 'χλεύασε / χλευάστε', translationEN: 'mock', translationRU: 'высмеивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1711, present: 'χλωμιάζω', future: 'θα χλωμιάσω', aorist: 'χλώμιασα', imperative: null, translationEN: 'turn pale', translationRU: 'бледнеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1712, present: 'χοντραίνω', future: 'θα χοντρύνω', aorist: 'χόντρυνα', imperative: 'χόντρυνε / χοντρύνετε', translationEN: 'thicken', translationRU: 'утолщать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1713, present: 'χορεύω', future: 'θα χορέψω', aorist: 'χόρεψα', imperative: 'χόρεψε / χορέψτε', translationEN: 'dance', translationRU: 'танцевать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1714, present: 'χοροπηδώ', future: 'θα χοροπηδήσω', aorist: 'χοροπήδησα', imperative: 'χοροπήδησε / χοροπηδήστε', translationEN: 'skip, hop around', translationRU: 'подпрыгивать, скакать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1715, present: 'χορταίνω', future: 'θα χορτάσω', aorist: 'χόρτασα', imperative: 'χόρτασε / χορτάστε', translationEN: 'be full, satisfy hunger', translationRU: 'насыщаться, наедаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1716, present: 'χρειάζομαι', future: 'θα χρειαστώ', aorist: 'χρειάστηκα', imperative: null, translationEN: 'need', translationRU: 'нуждаться, быть нужным', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1717, present: 'χρεώνομαι', future: 'θα χρεωθώ', aorist: 'χρεώθηκα', imperative: 'χρεώσου / χρεωθείτε', translationEN: 'get into debt', translationRU: 'залезать в долги', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1718, present: 'χρεώνω', future: 'θα χρεώσω', aorist: 'χρέωσα', imperative: 'χρέωσε / χρεώστε', translationEN: 'charge, debit', translationRU: 'взимать плату, записывать в долг', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1719, present: 'χρηματοδοτώ', future: 'θα χρηματοδοτήσω', aorist: 'χρηματοδότησα', imperative: 'χρηματοδότησε / χρηματοδοτήστε', translationEN: 'finance, fund', translationRU: 'финансировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1720, present: 'χρησιμοποιώ', future: 'θα χρησιμοποιήσω', aorist: 'χρησιμοποίησα', imperative: 'χρησιμοποίησε / χρησιμοποιήστε', translationEN: 'use', translationRU: 'использовать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1721, present: 'χρωματίζω', future: 'θα χρωματίσω', aorist: 'χρωμάτισα', imperative: 'χρωμάτισε / χρωματίστε', translationEN: 'color', translationRU: 'раскрашивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1722, present: 'χτενίζομαι', future: 'θα χτενιστώ', aorist: 'χτενίστηκα', imperative: 'χτενίσου / χτενιστείτε', translationEN: 'comb one\'s hair', translationRU: 'расчёсываться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1723, present: 'χτενίζω', future: 'θα χτενίσω', aorist: 'χτένισα', imperative: 'χτένισε / χτενίστε', translationEN: 'comb', translationRU: 'причёсывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1724, present: 'χτίζω', future: 'θα χτίσω', aorist: 'έχτισα', imperative: 'χτίσε / χτίστε', translationEN: 'build', translationRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1725, present: 'χτυπιέμαι', future: 'θα χτυπηθώ', aorist: 'χτυπήθηκα', imperative: 'χτυπήσου / χτυπηθείτε', translationEN: 'get hit, hit oneself', translationRU: 'быть побитым, биться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1726, present: 'χτυπώ', future: 'θα χτυπήσω', aorist: 'χτύπησα', imperative: 'χτύπησε / χτυπήστε', translationEN: 'hit, ring, knock', translationRU: 'бить, звонить, стучать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1727, present: 'χύνω', future: 'θα χύσω', aorist: 'έχυσα', imperative: 'χύσε / χύστε', translationEN: 'pour, spill', translationRU: 'лить, проливать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1728, present: 'χωνεύω', future: 'θα χωνέψω', aorist: 'χώνεψα', imperative: 'χώνεψε / χωνέψτε', translationEN: 'digest, stand (someone)', translationRU: 'переваривать, терпеть (кого-л.)', lexicalCategory: ['lexicalHealth','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1729, present: 'χώνω', future: 'θα χώσω', aorist: 'έχωσα', imperative: 'χώσε / χώστε', translationEN: 'shove, stick in', translationRU: 'совать, засовывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1730, present: 'χωρίζω', future: 'θα χωρίσω', aorist: 'χώρισα', imperative: 'χώρισε / χωρίστε', translationEN: 'separate, divorce', translationRU: 'разделять, расставаться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1731, present: 'χωρώ', future: 'θα χωρέσω', aorist: 'χώρεσα', imperative: null, translationEN: 'fit, have room', translationRU: 'вмещаться, помещаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1732, present: 'ψαρεύω', future: 'θα ψαρέψω', aorist: 'ψάρεψα', imperative: 'ψάρεψε / ψαρέψτε', translationEN: 'fish', translationRU: 'ловить рыбу', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1733, present: 'ψάχνω', future: 'θα ψάξω', aorist: 'έψαξα', imperative: 'ψάξε / ψάξτε', translationEN: 'search, look for', translationRU: 'искать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1734, present: 'ψεκάζω', future: 'θα ψεκάσω', aorist: 'ψέκασα', imperative: 'ψέκασε / ψεκάστε', translationEN: 'spray', translationRU: 'опрыскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1735, present: 'ψελλίζω', future: 'θα ψελλίσω', aorist: 'ψέλλισα', imperative: 'ψέλλισε / ψελλίστε', translationEN: 'stammer, mumble', translationRU: 'бормотать, лепетать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1736, present: 'ψηλαφώ', future: 'θα ψηλαφήσω', aorist: 'ψηλάφησα', imperative: 'ψηλάφησε / ψηλαφήστε', translationEN: 'feel, grope', translationRU: 'ощупывать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1737, present: 'ψηλώνω', future: 'θα ψηλώσω', aorist: 'ψήλωσα', imperative: null, translationEN: 'grow tall', translationRU: 'вырастать, становиться выше', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1738, present: 'ψήνω', future: 'θα ψήσω', aorist: 'έψησα', imperative: 'ψήσε / ψήστε', translationEN: 'bake, roast, grill', translationRU: 'печь, жарить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1739, present: 'ψηφίζω', future: 'θα ψηφίσω', aorist: 'ψήφισα', imperative: 'ψήφισε / ψηφίστε', translationEN: 'vote', translationRU: 'голосовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1740, present: 'ψηφιοποιώ', future: 'θα ψηφιοποιήσω', aorist: 'ψηφιοποίησα', imperative: 'ψηφιοποίησε / ψηφιοποιήστε', translationEN: 'digitize', translationRU: 'оцифровывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1741, present: 'ψιθυρίζω', future: 'θα ψιθυρίσω', aorist: 'ψιθύρισα', imperative: 'ψιθύρισε / ψιθυρίστε', translationEN: 'whisper', translationRU: 'шептать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1742, present: 'ψιλοκόβω', future: 'θα ψιλοκόψω', aorist: 'ψιλόκοψα', imperative: 'ψιλόκοψε / ψιλοκόψτε', translationEN: 'chop finely', translationRU: 'мелко резать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1743, present: 'ψυχαγωγώ', future: 'θα ψυχαγωγήσω', aorist: 'ψυχαγώγησα', imperative: 'ψυχαγώγησε / ψυχαγωγήστε', translationEN: 'entertain', translationRU: 'развлекать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1744, present: 'ψύχω', future: 'θα ψύξω', aorist: 'έψυξα', imperative: 'ψύξε / ψύξτε', translationEN: 'cool, refrigerate', translationRU: 'охлаждать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1745, present: 'ψωνίζω', future: 'θα ψωνίσω', aorist: 'ψώνισα', imperative: 'ψώνισε / ψωνίστε', translationEN: 'shop', translationRU: 'делать покупки', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1746, present: 'ωθώ', future: 'θα ωθήσω', aorist: 'ώθησα', imperative: 'ώθησε / ωθήστε', translationEN: 'push, urge', translationRU: 'подталкивать, побуждать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1747, present: 'ωοτοκώ', future: 'θα ωοτοκήσω', aorist: 'ωοτόκησα', imperative: 'ωοτόκησε / ωοτοκήστε', translationEN: 'lay eggs', translationRU: 'откладывать яйца', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1748, present: 'ωριμάζω', future: 'θα ωριμάσω', aorist: 'ώριμασα', imperative: null, translationEN: 'ripen, mature', translationRU: 'созревать, взрослеть', lexicalCategory: ['lexicalTime','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1749, present: 'ωφελούμαι', future: 'θα ωφεληθώ', aorist: 'ωφελήθηκα', imperative: 'ωφελήσου / ωφεληθείτε', translationEN: 'benefit, profit', translationRU: 'получать пользу', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1750, present: 'ωφελώ', future: 'θα ωφελήσω', aorist: 'ωφέλησα', imperative: 'ωφέλησε / ωφελήστε', translationEN: 'benefit, be of use', translationRU: 'приносить пользу', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
]
const GRAMMATICAL_CATEGORY_COLORS = {
  grammar1: [
    { label: "BASIC", category: "lexicalBasic", background: "#E8B83F" },
    { label: "MOTION", category: "lexicalMotion", background: "#35AFA0" },
    { label: "ACTION", category: "lexicalAction", background: "#93BB3E" },
    { label: "SOCIAL", category: "lexicalSocial", background: "#D879A0" },
    { label: "SENSE", category: "lexicalSense", background: "#D96368" },
    { label: "HEALTH", category: "lexicalHealth", background: "#43A879" },
    { label: "WORK", category: "lexicalWork", background: "#9A864D" },
    { label: "STATE", category: "lexicalState", background: "#A77C48" },
    { label: "INFLUENCE", category: "lexicalInfluence", background: "#9369B5" },
    { label: "TIME", category: "lexicalTime", background: "#7185C9" },
  ],

  grammar2: [
    { label: "BASIC", category: "lexicalBasic", background: "#BE9734" },
    { label: "MOTION", category: "lexicalMotion", background: "#2C8F83" },
    { label: "ACTION", category: "lexicalAction", background: "#789932" },
    { label: "SOCIAL", category: "lexicalSocial", background: "#B26383" },
    { label: "SENSE", category: "lexicalSense", background: "#B25056" },
    { label: "HEALTH", category: "lexicalHealth", background: "#378963" },
    { label: "WORK", category: "lexicalWork", background: "#7E6E3F" },
    { label: "STATE", category: "lexicalState", background: "#89653B" },
    { label: "INFLUENCE", category: "lexicalInfluence", background: "#795695" },
    { label: "TIME", category: "lexicalTime", background: "#5D6DA5" },
  ],

  grammarIrregular: [
    { label: "BASIC", category: "lexicalBasic", background: "#EFFF00" },
    { label: "MOTION", category: "lexicalMotion", background: "#00FFD0" },
    { label: "ACTION", category: "lexicalAction", background: "#C6FF00" },
    { label: "SOCIAL", category: "lexicalSocial", background: "#FF00D4" },
    { label: "SENSE", category: "lexicalSense", background: "#FF1744" },
    { label: "HEALTH", category: "lexicalHealth", background: "#00FF73" },
    { label: "WORK", category: "lexicalWork", background: "#D7FF00" },
    { label: "STATE", category: "lexicalState", background: "#FFFF00" },
    { label: "INFLUENCE", category: "lexicalInfluence", background: "#C000FF" },
    { label: "TIME", category: "lexicalTime", background: "#7D00FF" },
  ],

  grammarMedial: [
    { label: "BASIC", category: "lexicalBasic", background: "#ECCA6F" },
    { label: "MOTION", category: "lexicalMotion", background: "#65C3B8" },
    { label: "ACTION", category: "lexicalAction", background: "#A9CA6E" },
    { label: "SOCIAL", category: "lexicalSocial", background: "#E196B3" },
    { label: "SENSE", category: "lexicalSense", background: "#E27C80" },
    { label: "HEALTH", category: "lexicalHealth", background: "#73BB98" },
    { label: "WORK", category: "lexicalWork", background: "#B09F7C" },
    { label: "STATE", category: "lexicalState", background: "#B99A74" },
    { label: "INFLUENCE", category: "lexicalInfluence", background: "#AA8CC6" },
    { label: "TIME", category: "lexicalTime", background: "#94A3D5" },
  ],
};

const LEXICAL_CATEGORIES = GRAMMATICAL_CATEGORY_COLORS.grammar1.map(
  ({ category, label }) => ({ category, label }),
);

const GRAMMATICAL_CATEGORIES = [
  { category: "grammar1", label: "GROUP I" },
  { category: "grammar2", label: "GROUP II" },
  { category: "grammarIrregular", label: "IRREGULAR" },
  { category: "grammarMedial", label: "MEDIAL" },
];

const CATEGORIES = [
  { value: "All", label: "ALL" },
  ...LEXICAL_CATEGORIES.map(({ category, label }) => ({
    value: `lexical:${category}`,
    label,
  })),
  ...GRAMMATICAL_CATEGORIES.map(({ category, label }) => ({
    value: `grammar:${category}`,
    label,
  })),
];

const LEXICAL_FILTERS = CATEGORIES.filter(
  ({ value }) => value === "All" || value.startsWith("lexical:"),
);

const GRAMMATICAL_FILTERS = CATEGORIES.filter(({ value }) =>
  value.startsWith("grammar:"),
);

function interpolateColor(...colors) {
  if (colors.length === 0) {
    throw new Error("Передайте хотя бы один цвет");
  }

  const toOKLab = (hex) => {
    let value = hex.replace("#", "");

    if (value.length === 3) {
      value = [...value].map((char) => char + char).join("");
    }

    if (!/^[0-9a-fA-F]{6}$/.test(value)) {
      throw new Error(`Некорректный HEX-цвет: ${hex}`);
    }

    const [r, g, b] = [0, 2, 4].map(
      (i) => parseInt(value.slice(i, i + 2), 16) / 255,
    );

    const linearize = (c) =>
      c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

    const R = linearize(r);
    const G = linearize(g);
    const B = linearize(b);

    const l = Math.cbrt(
      0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B,
    );
    const m = Math.cbrt(
      0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B,
    );
    const s = Math.cbrt(
      0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B,
    );

    return [
      0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ];
  };

  const toHex = (lab) => {
    const [L, a, b] = lab;

    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

    const linearRGB = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];

    const toSRGB = (c) => {
      c = Math.max(0, Math.min(1, c));
      return c <= 0.0031308
        ? 12.92 * c
        : 1.055 * c ** (1 / 2.4) - 0.055;
    };

    return (
      "#" +
      linearRGB
        .map((c) =>
          Math.round(toSRGB(c) * 255)
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")
        .toUpperCase()
    );
  };

  const labs = colors.map(toOKLab);
  const average = [0, 1, 2].map(
    (i) => labs.reduce((sum, lab) => sum + lab[i], 0) / labs.length,
  );

  return toHex(average);
}

function getCategoryBackground(
  lexicalCategories = [],
  grammaticalCategories = [],
) {
  const lexicalList = Array.isArray(lexicalCategories)
    ? lexicalCategories
    : [lexicalCategories];

  const grammaticalList = Array.isArray(grammaticalCategories)
    ? grammaticalCategories
    : [grammaticalCategories];

  const paletteResults = grammaticalList
    .map((grammaticalCategory) => {
      const palette = GRAMMATICAL_CATEGORY_COLORS[grammaticalCategory];
      if (!palette) return null;

      const colors = lexicalList
        .map(
          (category) =>
            palette.find((item) => item.category === category)?.background,
        )
        .filter(Boolean);

      return colors.length ? interpolateColor(...colors) : null;
    })
    .filter(Boolean);

  return paletteResults.length
    ? interpolateColor(...paletteResults)
    : "#FFFFFF";
}

function getReadableTextColor(backgroundColor) {
  const hex = backgroundColor.replace("#", "");
  const [r, g, b] = [0, 2, 4].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255,
  );

  const linearize = (value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;

  const luminance =
    0.2126 * linearize(r) +
    0.7152 * linearize(g) +
    0.0722 * linearize(b);

  return luminance > 0.42 ? "#222222" : "#FFFFFF";
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
}

function getRelativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(firstColor, secondColor) {
  const [lighter, darker] = [
    getRelativeLuminance(firstColor),
    getRelativeLuminance(secondColor),
  ].sort((a, b) => b - a);

  return (lighter + 0.05) / (darker + 0.05);
}

function getColorDistance(firstColor, secondColor) {
  const [r1, g1, b1] = hexToRgb(firstColor);
  const [r2, g2, b2] = hexToRgb(secondColor);
  const rMean = (r1 + r2) / 2;

  return Math.sqrt(
    (2 + rMean / 256) * (r1 - r2) ** 2 +
      4 * (g1 - g2) ** 2 +
      (2 + (255 - rMean) / 256) * (b1 - b2) ** 2,
  );
}

function getPermutations(items) {
  if (items.length <= 1) return [items];

  return items.flatMap((item, index) =>
    getPermutations([
      ...items.slice(0, index),
      ...items.slice(index + 1),
    ]).map((rest) => [item, ...rest]),
  );
}

// Все HEX-цвета лексической категории из всех четырёх палитр,
// выстроенные так, чтобы сумма переходов между соседними цветами была минимальной
function getLexicalColors(category) {
  const colors = Object.values(GRAMMATICAL_CATEGORY_COLORS)
    .map(
      (palette) =>
        palette.find((item) => item.category === category)?.background,
    )
    .filter(Boolean);

  let bestOrder = colors;
  let bestLength = Infinity;

  getPermutations(colors).forEach((order) => {
    const length = order
      .slice(1)
      .reduce(
        (sum, color, index) => sum + getColorDistance(order[index], color),
        0,
      );

    if (length < bestLength) {
      bestOrder = order;
      bestLength = length;
    }
  });

  return getRelativeLuminance(bestOrder[0]) <=
    getRelativeLuminance(bestOrder[bestOrder.length - 1])
    ? bestOrder
    : [...bestOrder].reverse();
}

// Градиент через все цвета категории + цвет текста,
// у которого наихудший контраст по всем цветам градиента максимален
function getLexicalButtonStyle(category) {
  const colors = getLexicalColors(category);

  const worstContrast = (textColor) =>
    Math.min(...colors.map((color) => getContrastRatio(color, textColor)));

  const textColor =
    worstContrast("#000000") >= worstContrast("#FFFFFF")
      ? "#000000"
      : "#FFFFFF";

  const halo = textColor === "#000000" ? "255, 255, 255" : "0, 0, 0";

  return {
    backgroundImage: `linear-gradient(100deg, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    color: textColor,
    textShadow: `0 0 3px rgba(${halo}, .55)`,
  };
}

const LEXICAL_BUTTON_STYLES = Object.fromEntries(
  LEXICAL_CATEGORIES.map(({ category }) => [
    category,
    getLexicalButtonStyle(category),
  ]),
);

const greekCollator = new Intl.Collator("el", { sensitivity: "base" });

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700&family=Russo+One&display=swap');

  * { box-sizing: border-box; }

  body {
    margin: 0;
    background: #0b1220;
    color: #f1f5f9;
    font-family: Arial, sans-serif;
  }

  button, input { font: inherit; }

  .app {
    min-height: 100vh;
    padding: 28px 20px;
    background: #0b1220;
    color: #f1f5f9;
  }

  .container { width: min(1152px, 100%); margin: 0 auto; }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 28px;
    padding-bottom: 24px;
    border-bottom: 1px solid #1e293b;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: #a78bfa;
    font: 11px Orbitron, sans-serif;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: #fff;
    font: 700 clamp(36px, 6vw, 52px) 'EB Garamond', serif;
    text-shadow: 0 0 14px rgba(124, 58, 237, .45);
  }

  .subtitle {
    margin: 8px 0 0;
    color: #94a3b8;
    font: 11px Orbitron, sans-serif;
    letter-spacing: 1px;
  }

  .search-wrap { position: relative; width: min(320px, 100%); flex-shrink: 0; }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 13px;
    color: #64748b;
    transform: translationY(-50%);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    height: 44px;
    padding: 0 40px;
    color: #e2e8f0;
    background: rgba(15, 23, 42, .8);
    border: 1px solid #334155;
    border-radius: 12px;
    outline: none;
  }

  .search-input:focus { border-color: #8b5cf6; }

  .clear-search {
    position: absolute;
    top: 50%;
    right: 12px;
    display: grid;
    padding: 3px;
    color: #94a3b8;
    background: none;
    border: 0;
    cursor: pointer;
    transform: translationY(-50%);
  }

  .filters {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 24px 0;
  }

  .filter-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .filter-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 8px;
    color: #94a3b8;
    font: 10px Orbitron, sans-serif;
    text-transform: uppercase;
  }

  .badge {
    padding: 8px 16px;
    color: #94a3b8;
    background: #1e293b;
    border: 0;
    border-radius: 999px;
    cursor: pointer;
    transition: .2s;
  }

  .badge:hover { color: #e2e8f0; background: #334155; }

  .badge.active {
    color: white;
    background: #7c3aed;
    box-shadow: 0 5px 18px rgba(76, 29, 149, .35);
  }

  .badge.lexical-badge {
    font-weight: 700;
    background-size: 300% 100%;
    animation: lexical-flow 9s ease-in-out infinite;
  }

  .badge.lexical-badge.active {
    box-shadow: 0 0 0 2px #fff, 0 0 18px rgba(255, 255, 255, .35);
  }

  @keyframes lexical-flow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .badge.lexical-badge {
      animation: none;
      background-size: 100% 100%;
    }
  }

  .table-card {
    overflow: hidden;
    background: rgba(17, 27, 46, .8);
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 18px;
    backdrop-filter: blur(12px);
  }

  .table-scroll { overflow-x: auto; }

  table {
    width: 100%;
    min-width: 760px;
    border-collapse: collapse;
    text-align: left;
  }

  thead { background: rgba(15, 23, 42, .45); }

  th {
    padding: 20px 24px;
    color: #a78bfa;
    border-bottom: 1px solid #1e293b;
    font: 10px Orbitron, sans-serif;
    letter-spacing: 2px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(30, 41, 59, .7);
  }

  tbody tr { transition: background .2s; }
  tbody tr:hover { filter: brightness(.94); }

  .greek { font-family: 'EB Garamond', serif; white-space: nowrap; }
  .present { font-size: 26px; }
  .form { font-size: 22px; }

  .translation-ru {
    font: 18px 'Russo One', sans-serif;
  }

  .translation-en {
    margin-top: 4px;
    font: 9px Orbitron, sans-serif;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .empty { height: 250px; color: #64748b; text-align: center; }

  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .empty-content p { font: 12px Orbitron, sans-serif; letter-spacing: 1px; }

  .reset-button {
    padding: 8px 12px;
    color: #a78bfa;
    background: transparent;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
  }

  .reset-button:hover { background: rgba(139, 92, 246, .12); }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-top: 22px;
    color: #64748b;
    font: 9px Orbitron, sans-serif;
  }

  .legend { display: flex; flex-wrap: wrap; gap: 16px; }
  .legend-item { display: flex; align-items: center; gap: 6px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; }
  .footer-note { letter-spacing: 1px; text-transform: uppercase; font-style: italic; }

  @media (max-width: 700px) {
    .app { padding: 20px 14px; }
    .header { align-items: stretch; flex-direction: column; }
    .search-wrap { width: 100%; }
    footer { align-items: flex-start; flex-direction: column; }
  }
`;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeGrammar, setActiveGrammar] = useState("All");

  const filteredVerbs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return VERB_DATA
      .filter((verb) => {
        const matchesSearch =
          (verb.present ?? "").toLowerCase().includes(query) ||
          (verb.translationRU ?? "").toLowerCase().includes(query) ||
          (verb.translationEN ?? "").toLowerCase().includes(query);

        let matchesCategory = true;

        if (activeCategory !== "All") {
          const categoryValue = activeCategory.split(":")[1];
          const categories = Array.isArray(verb.lexicalCategory)
            ? verb.lexicalCategory
            : [verb.lexicalCategory].filter(Boolean);

          matchesCategory = categories.includes(categoryValue);
        }

        if (matchesCategory && activeGrammar !== "All") {
          const grammarValue = activeGrammar.split(":")[1];
          const categories = Array.isArray(verb.grammaticalCategory)
            ? verb.grammaticalCategory
            : [verb.grammaticalCategory].filter(Boolean);

          matchesCategory = categories.includes(grammarValue);
        }

        return matchesSearch && matchesCategory;
      })
      .sort((firstVerb, secondVerb) =>
        greekCollator.compare(firstVerb.present ?? "", secondVerb.present ?? ""),
      );
  }, [searchQuery, activeCategory, activeGrammar]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveGrammar("All");
  };

  return (
    <>
      <style>{styles}</style>

      <main className="app">
        <div className="container">
          <header className="header">
            <div>
              <div className="brand">
                <Sparkles size={18} />
                <span>Language Oracle</span>
              </div>
              <h1>Ελληνικά Ρήματα</h1>
              <p className="subtitle">
                Modern Greek Verb Conjugation Master Reference
              </p>
            </div>

            <div className="search-wrap">
              <Search className="search-icon" size={18} />
              <input
                className="search-input"
                type="search"
                placeholder="Search verbs or translations..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Поиск глаголов и переводов"
              />
              {searchQuery && (
                <button
                  className="clear-search"
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Очистить поиск"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </header>

          <section className="filters" aria-label="Фильтр по категориям">
            <div className="filter-row">
              <div className="filter-label">
                <Filter size={15} />
                <span>Filter By:</span>
              </div>

              {LEXICAL_FILTERS.map((category, index) => {
                const isLexical = category.value !== "All";
                const lexicalKey = category.value.replace("lexical:", "");

                return (
                  <button
                    key={category.value}
                    type="button"
                    className={`badge ${isLexical ? "lexical-badge" : ""} ${
                      activeCategory === category.value ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.value)}
                    aria-pressed={activeCategory === category.value}
                    style={{
                      fontFamily: `Orbitron`,
                      ...(isLexical
                        ? {
                            ...LEXICAL_BUTTON_STYLES[lexicalKey],
                            animationDelay: `-${index * 0.9}s`,
                          }
                        : {}),
                    }}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="filter-row">
              {GRAMMATICAL_FILTERS.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={`badge ${
                    activeGrammar === category.value ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveGrammar((current) =>
                      current === category.value ? "All" : category.value,
                    )
                  }
                  aria-pressed={activeGrammar === category.value}
                  style={{fontFamily: `Orbitron`}}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </section>

          <section className="table-card">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Present</th>
                    <th>Future (θα+)</th>
                    <th>Aorist</th>
                    <th>Imperative</th>
                    <th>Translation</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVerbs.length > 0 ? (
                    filteredVerbs.map((verb) => (
                      <tr
                        key={verb.id}
                        style={{
                          backgroundColor: getCategoryBackground(verb.lexicalCategory,verb.grammaticalCategory),
                          color: getReadableTextColor(getCategoryBackground(verb.lexicalCategory,verb.grammaticalCategory))
                        }}
                      >
                        <td className="greek present">{verb.present}</td>
                        <td className="greek form">{verb.future ?? ""}</td>
                        <td className="greek form">{verb.aorist ?? ""}</td>
                        <td className="greek form">
                          <i>{verb.imperative ?? ""}</i>
                        </td>
                        <td>
                          <div className="translation-ru">
                            {verb.translationRU}
                          </div>
                          <div className="translation-en">
                            {verb.translationEN}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="empty" colSpan="5">
                        <div className="empty-content">
                          <BookOpen size={44} strokeWidth={1} />
                          <p>No verbs found in the archives</p>
                          <button
                            className="reset-button"
                            type="button"
                            onClick={resetFilters}
                          >
                            Reset Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <footer>
            <div className="footer-note">
              Visualizing the architecture of language
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
