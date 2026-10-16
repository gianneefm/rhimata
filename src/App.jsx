import { useMemo, useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, X } from 'lucide-react';


const VERB_DATA = [
  {id: 1, present: 'αγαλλιάζω', future: 'θα αγαλλιάσω', aorist: 'αγαλλίασα', imperative: 'αγαλλίασε / αγαλλιάστε', translateEN: 'rejoice', translateRU: 'ликовать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 2, present: 'αγανακτώ', future: 'θα αγανακτήσω', aorist: 'αγανάκτησα', imperative: 'αγανάκτησε / αγανακτήστε', translateEN: 'be indignant', translateRU: 'возмущаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 3, present: 'αγαπώ', future: 'θα αγαπήσω', aorist: 'αγάπησα', imperative: 'αγάπησε / αγαπήστε', translateEN: 'love', translateRU: 'любить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 4, present: 'αγγίζω', future: 'θα αγγίξω', aorist: 'άγγιξα', imperative: 'άγγιξε / αγγίξτε', translateEN: 'touch', translateRU: 'касаться, трогать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 5, present: 'αγιάζω', future: 'θα αγιάσω', aorist: 'αγίασα', imperative: 'αγίασε / αγιάστε', translateEN: 'sanctify', translateRU: 'освящать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 6, present: 'αγκαλιάζω', future: 'θα αγκαλιάσω', aorist: 'αγκάλιασα', imperative: 'αγκάλιασε / αγκαλιάστε', translateEN: 'hug', translateRU: 'обнимать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 7, present: 'αγκομαχώ', future: 'θα αγκομαχήσω', aorist: 'αγκομάχησα', imperative: 'αγκομάχησε / αγκομαχήστε', translateEN: 'pant, gasp', translateRU: 'пыхтеть, задыхаться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 8, present: 'αγκυροβολώ', future: 'θα αγκυροβολήσω', aorist: 'αγκυροβόλησα', imperative: 'αγκυροβόλησε / αγκυροβολήστε', translateEN: 'anchor, moor', translateRU: 'становиться на якорь', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 9, present: 'αγνοώ', future: 'θα αγνοήσω', aorist: 'αγνόησα', imperative: 'αγνόησε / αγνοήστε', translateEN: 'ignore', translateRU: 'игнорировать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 10, present: 'αγοράζω', future: 'θα αγοράσω', aorist: 'αγόρασα', imperative: 'αγόρασε / αγοράστε', translateEN: 'buy', translateRU: 'покупать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 11, present: 'αγοραπωλώ', future: 'θα αγοραπωλήσω', aorist: 'αγοραπώλησα', imperative: 'αγοραπώλησε / αγοραπωλήστε', translateEN: 'buy and sell', translateRU: 'торговать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 12, present: 'αγχώνομαι', future: 'θα αγχωθώ', aorist: 'αγχώθηκα', imperative: 'αγχώσου / αγχωθείτε', translateEN: 'get stressed', translateRU: 'тревожиться, нервничать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 13, present: 'αγωνίζομαι', future: 'θα αγωνιστώ', aorist: 'αγωνίστηκα', imperative: 'αγωνίσου / αγωνιστείτε', translateEN: 'fight, struggle', translateRU: 'бороться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 14, present: 'αγωνιώ', future: 'θα αγωνιάσω', aorist: 'αγωνίασα', imperative: 'αγωνίασε / αγωνιάστε', translateEN: 'be anxious, agonize', translateRU: 'тревожиться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 15, present: 'αδειάζω', future: 'θα αδειάσω', aorist: 'άδειασα', imperative: 'άδειασε / αδειάστε', translateEN: 'empty', translateRU: 'опустошать, освобождать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 16, present: 'αδικώ', future: 'θα αδικήσω', aorist: 'αδίκησα', imperative: 'αδίκησε / αδικήστε', translateEN: 'wrong, treat unfairly', translateRU: 'обижать, поступать несправедливо', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 17, present: 'αδυνατίζω', future: 'θα αδυνατίσω', aorist: 'αδυνάτισα', imperative: 'αδυνάτισε / αδυνατίστε', translateEN: 'lose weight', translateRU: 'худеть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 18, present: 'αερίζω', future: 'θα αερίσω', aorist: 'αέρισα', imperative: 'αέρισε / αερίστε', translateEN: 'ventilate, air', translateRU: 'проветривать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 19, present: 'αηδιάζω', future: 'θα αηδιάσω', aorist: 'αηδίασα', imperative: 'αηδίασε / αηδιάστε', translateEN: 'disgust', translateRU: 'вызывать отвращение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 20, present: 'αθετώ', future: 'θα αθετήσω', aorist: 'αθέτησα', imperative: 'αθέτησε / αθετήστε', translateEN: 'break (a promise)', translateRU: 'нарушать (обещание)', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 21, present: 'αθλούμαι', future: 'θα αθληθώ', aorist: 'αθλήθηκα', imperative: 'αθλήσου / αθληθείτε', translateEN: 'do sport', translateRU: 'заниматься спортом', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 22, present: 'αθροίζω', future: 'θα αθροίσω', aorist: 'άθροισα', imperative: 'άθροισε / αθροίστε', translateEN: 'add up', translateRU: 'складывать, суммировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 23, present: 'αθωώνω', future: 'θα αθωώσω', aorist: 'αθώωσα', imperative: 'αθώωσε / αθωώστε', translateEN: 'acquit', translateRU: 'оправдывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 24, present: 'αιμορραγώ', future: 'θα αιμορραγήσω', aorist: 'αιμορράγησα', imperative: 'αιμορράγησε / αιμορραγήστε', translateEN: 'bleed (haemorrhage)', translateRU: 'истекать кровью', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 25, present: 'αισθάνομαι', future: 'θα αισθανθώ', aorist: 'αισθάνθηκα', imperative: 'αισθάνσου / αισθανθείτε', translateEN: 'feel', translateRU: 'чувствовать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 26, present: 'αισιοδοξώ', future: 'θα αισιοδοξήσω', aorist: 'αισιοδόξησα', imperative: 'αισιοδόξησε / αισιοδοξήστε', translateEN: 'be optimistic', translateRU: 'быть оптимистом', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 27, present: 'αιχμαλωτίζω', future: 'θα αιχμαλωτίσω', aorist: 'αιχμαλώτισα', imperative: 'αιχμαλώτισε / αιχμαλωτίστε', translateEN: 'capture', translateRU: 'брать в плен, пленять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 28, present: 'ακινητοποιώ', future: 'θα ακινητοποιήσω', aorist: 'ακινητοποίησα', imperative: 'ακινητοποίησε / ακινητοποιήστε', translateEN: 'immobilize', translateRU: 'обездвиживать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 29, present: 'ακμάζω', future: 'θα ακμάσω', aorist: 'άκμασα', imperative: 'άκμασε / ακμάστε', translateEN: 'flourish', translateRU: 'расцветать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 30, present: 'ακολουθώ', future: 'θα ακολουθήσω', aorist: 'ακολούθησα', imperative: 'ακολούθησε / ακολουθήστε', translateEN: 'follow', translateRU: 'следовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 31, present: 'ακουμπώ', future: 'θα ακουμπήσω', aorist: 'ακούμπησα', imperative: 'ακούμπησε / ακουμπήστε', translateEN: 'lean, put down, touch', translateRU: 'прислонять, касаться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 32, present: 'ακούω', future: 'θα ακούσω', aorist: 'άκουσα', imperative: 'άκουσε / ακούστε', translateEN: 'hear, listen', translateRU: 'слышать, слушать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 33, present: 'ακτινοβολώ', future: 'θα ακτινοβολήσω', aorist: 'ακτινοβόλησα', imperative: 'ακτινοβόλησε / ακτινοβολήστε', translateEN: 'radiate', translateRU: 'излучать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 34, present: 'ακτινογραφώ', future: 'θα ακτινογραφήσω', aorist: 'ακτινογράφησα', imperative: 'ακτινογράφησε / ακτινογραφήστε', translateEN: 'X-ray', translateRU: 'делать рентген', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 35, present: 'ακυρώνω', future: 'θα ακυρώσω', aorist: 'ακύρωσα', imperative: 'ακύρωσε / ακυρώστε', translateEN: 'cancel', translateRU: 'отменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 36, present: 'αλατίζω', future: 'θα αλατίσω', aorist: 'αλάτισα', imperative: 'αλάτισε / αλατίστε', translateEN: 'salt', translateRU: 'солить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 37, present: 'αλέθω', future: 'θα αλέσω', aorist: 'άλεσα', imperative: 'άλεσε / αλέστε', translateEN: 'grind, mill', translateRU: 'молоть', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 38, present: 'αλείφομαι', future: 'θα αλειφτώ', aorist: 'αλείφτηκα', imperative: 'αλείψου / αλειφτείτε', translateEN: 'put on (cream)', translateRU: 'мазаться', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 39, present: 'αλείφω', future: 'θα αλείψω', aorist: 'άλειψα', imperative: 'άλειψε / αλείψτε', translateEN: 'spread, rub on', translateRU: 'намазывать, смазывать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 40, present: 'αλιεύω', future: 'θα αλιεύσω', aorist: 'αλίευσα', imperative: 'αλίευσε / αλιεύστε', translateEN: 'fish (professionally)', translateRU: 'промышлять рыбу', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 41, present: 'αλλάζω', future: 'θα αλλάξω', aorist: 'άλλαξα', imperative: 'άλλαξε / αλλάξτε', translateEN: 'change', translateRU: 'менять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 42, present: 'αλωνίζω', future: 'θα αλωνίσω', aorist: 'αλώνισα', imperative: 'αλώνισε / αλωνίστε', translateEN: 'thresh', translateRU: 'молотить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 43, present: 'αμηχανώ', future: 'θα αμηχανήσω', aorist: 'αμηχάνησα', imperative: 'αμηχάνησε / αμηχανήστε', translateEN: 'be embarrassed', translateRU: 'смущаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 44, present: 'αμύνομαι', future: 'θα αμυνθώ', aorist: 'αμύνθηκα', imperative: 'αμύνσου / αμυνθείτε', translateEN: 'defend oneself', translateRU: 'защищаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 45, present: 'αμφισβητώ', future: 'θα αμφισβητήσω', aorist: 'αμφισβήτησα', imperative: 'αμφισβήτησε / αμφισβητήστε', translateEN: 'challenge, dispute', translateRU: 'оспаривать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 46, present: 'αναβαθμίζω', future: 'θα αναβαθμίσω', aorist: 'αναβάθμισα', imperative: 'αναβάθμισε / αναβαθμίστε', translateEN: 'upgrade', translateRU: 'обновлять, повышать уровень', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 47, present: 'αναβάλλω', future: 'θα αναβάλω', aorist: 'ανέβαλα', imperative: 'ανάβαλε / αναβάλετε', translateEN: 'postpone', translateRU: 'откладывать', lexicalCategory: ['lexicalTime','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 48, present: 'αναβοσβήνω', future: 'θα αναβοσβήσω', aorist: 'αναβόσβησα', imperative: 'αναβόσβησε / αναβοσβήστε', translateEN: 'blink, flash on and off', translateRU: 'мигать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 49, present: 'ανάβω', future: 'θα ανάψω', aorist: 'άναψα', imperative: 'άναψε / ανάψτε', translateEN: 'light, turn on', translateRU: 'зажигать, включать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 50, present: 'αναγγέλλω', future: 'θα αναγγείλω', aorist: 'ανήγγειλα', imperative: 'ανάγγειλε / αναγγείλετε', translateEN: 'announce', translateRU: 'объявлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 51, present: 'αναγεννιέμαι', future: 'θα αναγεννηθώ', aorist: 'αναγεννήθηκα', imperative: 'αναγεννήσου / αναγεννηθείτε', translateEN: 'be reborn', translateRU: 'возрождаться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 52, present: 'αναγεννώ', future: 'θα αναγεννήσω', aorist: 'αναγέννησα', imperative: 'αναγέννησε / αναγεννήστε', translateEN: 'regenerate, revive', translateRU: 'возрождать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 53, present: 'αναγκάζομαι', future: 'θα αναγκαστώ', aorist: 'αναγκάστηκα', imperative: 'αναγκάσου / αναγκαστείτε', translateEN: 'be forced', translateRU: 'быть вынужденным', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 54, present: 'αναγκάζω', future: 'θα αναγκάσω', aorist: 'ανάγκασα', imperative: 'ανάγκασε / αναγκάστε', translateEN: 'force', translateRU: 'принуждать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 55, present: 'αναγνωρίζω', future: 'θα αναγνωρίσω', aorist: 'αναγνώρισα', imperative: 'αναγνώρισε / αναγνωρίστε', translateEN: 'recognize', translateRU: 'узнавать, признавать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 56, present: 'αναδημοσιεύω', future: 'θα αναδημοσιεύσω', aorist: 'αναδημοσίευσα', imperative: 'αναδημοσίευσε / αναδημοσιεύστε', translateEN: 'republish', translateRU: 'републиковать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 57, present: 'αναδύομαι', future: 'θα αναδυθώ', aorist: 'αναδύθηκα', imperative: 'αναδύσου / αναδυθείτε', translateEN: 'emerge', translateRU: 'всплывать, появляться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 58, present: 'αναζητώ', future: 'θα αναζητήσω', aorist: 'αναζήτησα', imperative: 'αναζήτησε / αναζητήστε', translateEN: 'search for', translateRU: 'искать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 59, present: 'αναζωογονώ', future: 'θα αναζωογονήσω', aorist: 'αναζωογόνησα', imperative: 'αναζωογόνησε / αναζωογονήστε', translateEN: 'revitalize', translateRU: 'оживлять, освежать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 60, present: 'αναζωπυρώνω', future: 'θα αναζωπυρώσω', aorist: 'αναζωπύρωσα', imperative: 'αναζωπύρωσε / αναζωπυρώστε', translateEN: 'rekindle', translateRU: 'разжигать вновь', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 61, present: 'αναθαρρώ', future: 'θα αναθαρρήσω', aorist: 'αναθάρρησα', imperative: 'αναθάρρησε / αναθαρρήστε', translateEN: 'take heart', translateRU: 'воспрянуть духом', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 62, present: 'αναθέτω', future: 'θα αναθέσω', aorist: 'ανέθεσα', imperative: 'ανάθεσε / αναθέστε', translateEN: 'assign', translateRU: 'поручать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 63, present: 'αναθεωρώ', future: 'θα αναθεωρήσω', aorist: 'αναθεώρησα', imperative: 'αναθεώρησε / αναθεωρήστε', translateEN: 'revise, review', translateRU: 'пересматривать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 64, present: 'αναθρέφω', future: 'θα αναθρέψω', aorist: 'ανέθρεψα', imperative: 'ανάθρεψε / αναθρέψτε', translateEN: 'bring up, raise', translateRU: 'воспитывать, растить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 65, present: 'ανακαινίζω', future: 'θα ανακαινίσω', aorist: 'ανακαίνισα', imperative: 'ανακαίνισε / ανακαινίστε', translateEN: 'renovate', translateRU: 'ремонтировать, обновлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 66, present: 'ανακαλύπτω', future: 'θα ανακαλύψω', aorist: 'ανακάλυψα', imperative: 'ανακάλυψε / ανακαλύψτε', translateEN: 'discover', translateRU: 'открывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 67, present: 'ανακαλώ', future: 'θα ανακαλέσω', aorist: 'ανακάλεσα', imperative: 'ανακάλεσε / ανακαλέστε', translateEN: 'recall, revoke', translateRU: 'отзывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 68, present: 'ανακατεύω', future: 'θα ανακατέψω', aorist: 'ανακάτεψα', imperative: 'ανακάτεψε / ανακατέψτε', translateEN: 'mix, stir', translateRU: 'смешивать, помешивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 69, present: 'ανακεφαλαιώνω', future: 'θα ανακεφαλαιώσω', aorist: 'ανακεφαλαίωσα', imperative: 'ανακεφαλαίωσε / ανακεφαλαιώστε', translateEN: 'sum up', translateRU: 'подводить итоги', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 70, present: 'ανακοινώνω', future: 'θα ανακοινώσω', aorist: 'ανακοίνωσα', imperative: 'ανακοίνωσε / ανακοινώστε', translateEN: 'announce', translateRU: 'объявлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 71, present: 'ανακουφίζομαι', future: 'θα ανακουφιστώ', aorist: 'ανακουφίστηκα', imperative: 'ανακουφίσου / ανακουφιστείτε', translateEN: 'feel relieved', translateRU: 'чувствовать облегчение', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 72, present: 'ανακουφίζω', future: 'θα ανακουφίσω', aorist: 'ανακούφισα', imperative: 'ανακούφισε / ανακουφίστε', translateEN: 'relieve', translateRU: 'облегчать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 73, present: 'ανακρίνω', future: 'θα ανακρίνω', aorist: 'ανέκρινα', imperative: 'ανάκρινε / ανακρίνετε', translateEN: 'interrogate', translateRU: 'допрашивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 74, present: 'ανακτώ', future: 'θα ανακτήσω', aorist: 'ανέκτησα', imperative: 'ανάκτησε / ανακτήστε', translateEN: 'recover, regain', translateRU: 'восстанавливать, возвращать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 75, present: 'ανακυκλώνω', future: 'θα ανακυκλώσω', aorist: 'ανακύκλωσα', imperative: 'ανακύκλωσε / ανακυκλώστε', translateEN: 'recycle', translateRU: 'перерабатывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 76, present: 'ανακύπτω', future: 'θα ανακύψω', aorist: 'ανέκυψα', imperative: 'ανάκυψε / ανακύψτε', translateEN: 'arise, emerge', translateRU: 'возникать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 77, present: 'αναλαμβάνω', future: 'θα αναλάβω', aorist: 'ανέλαβα', imperative: 'ανάλαβε / αναλάβετε', translateEN: 'undertake, take over', translateRU: 'брать на себя', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 78, present: 'αναλογίζομαι', future: 'θα αναλογιστώ', aorist: 'αναλογίστηκα', imperative: 'αναλογίσου / αναλογιστείτε', translateEN: 'consider, reflect on', translateRU: 'обдумывать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 79, present: 'αναλύω', future: 'θα αναλύσω', aorist: 'ανάλυσα', imperative: 'ανάλυσε / αναλύστε', translateEN: 'analyze', translateRU: 'анализировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 80, present: 'αναμασώ', future: 'θα αναμασήσω', aorist: 'αναμάσησα', imperative: 'αναμάσησε / αναμασήστε', translateEN: 'ruminate, chew over', translateRU: 'пережёвывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 81, present: 'αναμειγνύομαι', future: 'θα αναμειχθώ', aorist: 'αναμείχθηκα', imperative: 'αναμείξου / αναμειχθείτε', translateEN: 'get involved, mix', translateRU: 'вмешиваться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 82, present: 'αναμειγνύω', future: 'θα αναμείξω', aorist: 'ανέμειξα', imperative: 'ανάμειξε / αναμείξτε', translateEN: 'mix, blend', translateRU: 'смешивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 83, present: 'ανανεώνω', future: 'θα ανανεώσω', aorist: 'ανανέωσα', imperative: 'ανανέωσε / ανανεώστε', translateEN: 'renew', translateRU: 'обновлять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 84, present: 'αναπαράγομαι', future: 'θα αναπαραχθώ', aorist: 'αναπαράχθηκα', imperative: 'αναπαράξου / αναπαραχθείτε', translateEN: 'reproduce', translateRU: 'размножаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 85, present: 'αναπαράγω', future: 'θα αναπαράγω', aorist: 'αναπαρήγαγα', imperative: 'αναπαράγαγε / αναπαραγάγετε', translateEN: 'reproduce, replay', translateRU: 'воспроизводить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 86, present: 'αναπαριστώ', future: 'θα αναπαραστήσω', aorist: 'αναπαρέστησα', imperative: 'αναπαράστησε / αναπαραστήστε', translateEN: 'depict, reenact', translateRU: 'изображать, воспроизводить', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2','grammarIrregular']},
  {id: 87, present: 'αναπαύομαι', future: 'θα αναπαυθώ', aorist: 'αναπαύθηκα', imperative: 'αναπαύσου / αναπαυθείτε', translateEN: 'rest', translateRU: 'отдыхать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 88, present: 'αναπηδώ', future: 'θα αναπηδήσω', aorist: 'αναπήδησα', imperative: 'αναπήδησε / αναπηδήστε', translateEN: 'bounce, jump up', translateRU: 'подскакивать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 89, present: 'αναπνέω', future: 'θα αναπνεύσω', aorist: 'ανέπνευσα', imperative: 'ανάπνευσε / αναπνεύστε', translateEN: 'breathe', translateRU: 'дышать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 90, present: 'αναπολώ', future: 'θα αναπολήσω', aorist: 'αναπόλησα', imperative: 'αναπόλησε / αναπολήστε', translateEN: 'reminisce, recall fondly', translateRU: 'вспоминать с нежностью', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 91, present: 'αναπτερώνω', future: 'θα αναπτερώσω', aorist: 'αναπτέρωσα', imperative: 'αναπτέρωσε / αναπτερώστε', translateEN: 'boost, revive (hopes)', translateRU: 'воодушевлять', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 92, present: 'αναπτύσσομαι', future: 'θα αναπτυχθώ', aorist: 'αναπτύχθηκα', imperative: 'αναπτύξου / αναπτυχθείτε', translateEN: 'develop, grow', translateRU: 'развиваться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 93, present: 'αναπτύσσω', future: 'θα αναπτύξω', aorist: 'ανέπτυξα', imperative: 'ανάπτυξε / αναπτύξτε', translateEN: 'develop', translateRU: 'развивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 94, present: 'αναρριχώμαι', future: 'θα αναρριχηθώ', aorist: 'αναρριχήθηκα', imperative: 'αναρριχήσου / αναρριχηθείτε', translateEN: 'climb (mountaineering)', translateRU: 'взбираться, лазать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 95, present: 'αναρρώνω', future: 'θα αναρρώσω', aorist: 'ανάρρωσα', imperative: 'ανάρρωσε / αναρρώστε', translateEN: 'recover (from illness)', translateRU: 'выздоравливать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 96, present: 'αναρτώ', future: 'θα αναρτήσω', aorist: 'ανάρτησα', imperative: 'ανάρτησε / αναρτήστε', translateEN: 'post, upload', translateRU: 'размещать, публиковать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 97, present: 'αναρωτιέμαι', future: 'θα αναρωτηθώ', aorist: 'αναρωτήθηκα', imperative: 'αναρωτήσου / αναρωτηθείτε', translateEN: 'wonder', translateRU: 'задаваться вопросом', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 98, present: 'ανασαίνω', future: 'θα ανασάνω', aorist: 'ανάσανα', imperative: 'ανάσανε / ανασάνετε', translateEN: 'breathe, catch one\'s breath', translateRU: 'дышать, переводить дух', lexicalCategory: ['lexicalHealth','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 99, present: 'ανασηκώνομαι', future: 'θα ανασηκωθώ', aorist: 'ανασηκώθηκα', imperative: 'ανασηκώσου / ανασηκωθείτε', translateEN: 'raise oneself', translateRU: 'приподниматься', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 100, present: 'ανασηκώνω', future: 'θα ανασηκώσω', aorist: 'ανασήκωσα', imperative: 'ανασήκωσε / ανασηκώστε', translateEN: 'lift up, raise slightly', translateRU: 'приподнимать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 101, present: 'αναστατώνομαι', future: 'θα αναστατωθώ', aorist: 'αναστατώθηκα', imperative: 'αναστατώσου / αναστατωθείτε', translateEN: 'get upset', translateRU: 'волноваться, приходить в смятение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 102, present: 'αναστατώνω', future: 'θα αναστατώσω', aorist: 'αναστάτωσα', imperative: 'αναστάτωσε / αναστατώστε', translateEN: 'upset, disturb', translateRU: 'волновать, расстраивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 103, present: 'αναστέλλω', future: 'θα αναστείλω', aorist: 'ανέστειλα', imperative: 'ανάστειλε / αναστείλετε', translateEN: 'suspend, halt', translateRU: 'приостанавливать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 104, present: 'αναστενάζω', future: 'θα αναστενάξω', aorist: 'αναστέναξα', imperative: 'αναστέναξε / αναστενάξτε', translateEN: 'sigh', translateRU: 'вздыхать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 105, present: 'αναστηλώνω', future: 'θα αναστηλώσω', aorist: 'αναστήλωσα', imperative: 'αναστήλωσε / αναστηλώστε', translateEN: 'restore (monument)', translateRU: 'реставрировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 106, present: 'αναστήνω', future: 'θα αναστήσω', aorist: 'ανάστησα', imperative: 'ανάστησε / αναστήστε', translateEN: 'resurrect', translateRU: 'воскрешать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 107, present: 'ανασύρω', future: 'θα ανασύρω', aorist: 'ανέσυρα', imperative: 'ανάσυρε / ανασύρετε', translateEN: 'pull up, retrieve', translateRU: 'вытаскивать, извлекать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 108, present: 'ανατέλλω', future: 'θα ανατείλω', aorist: 'ανέτειλα', imperative: 'ανάτειλε / ανατείλετε', translateEN: 'rise (sun)', translateRU: 'восходить', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 109, present: 'ανατινάζω', future: 'θα ανατινάξω', aorist: 'ανατίναξα', imperative: 'ανατίναξε / ανατινάξτε', translateEN: 'blow up', translateRU: 'взрывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 110, present: 'ανατρέπομαι', future: 'θα ανατραπώ', aorist: 'ανατράπηκα', imperative: 'ανατρέψου / ανατραπείτε', translateEN: 'overturn, capsize', translateRU: 'опрокидываться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 111, present: 'ανατρέπω', future: 'θα ανατρέψω', aorist: 'ανέτρεψα', imperative: 'ανάτρεψε / ανατρέψτε', translateEN: 'overturn', translateRU: 'опрокидывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 112, present: 'ανατρέφω', future: 'θα ανατρέψω', aorist: 'ανέθρεψα', imperative: 'ανάτρεψε / ανατρέψτε', translateEN: 'raise (children)', translateRU: 'воспитывать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 113, present: 'ανατρέχω', future: 'θα ανατρέξω', aorist: 'ανέτρεξα', imperative: 'ανάτρεξε / ανατρέξτε', translateEN: 'refer to, look back', translateRU: 'обращаться к, возвращаться', lexicalCategory: ['lexicalInfluence','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 114, present: 'ανατριχιάζω', future: 'θα ανατριχιάσω', aorist: 'ανατρίχιασα', imperative: 'ανατρίχιασε / ανατριχιάστε', translateEN: 'shiver, get goosebumps', translateRU: 'содрогаться, покрываться мурашками', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 115, present: 'αναφέρομαι', future: 'θα αναφερθώ', aorist: 'αναφέρθηκα', imperative: 'αναφέρσου / αναφερθείτε', translateEN: 'refer to', translateRU: 'ссылаться, касаться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 116, present: 'αναφέρω', future: null, aorist: 'ανέφερα', imperative: 'ανέφερε / ανεφέρετε', translateEN: 'mention', translateRU: 'упоминать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 117, present: 'αναφωνώ', future: 'θα αναφωνήσω', aorist: 'αναφώνησα', imperative: 'αναφώνησε / αναφωνήστε', translateEN: 'exclaim', translateRU: 'восклицать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 118, present: 'αναχαιτίζω', future: 'θα αναχαιτίσω', aorist: 'αναχαίτισα', imperative: 'αναχαίτισε / αναχαιτίστε', translateEN: 'intercept, check', translateRU: 'перехватывать, сдерживать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 119, present: 'αναχωρώ', future: 'θα αναχωρήσω', aorist: 'αναχώρησα', imperative: 'αναχώρησε / αναχωρήστε', translateEN: 'depart', translateRU: 'отбывать', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammar2']},
  {id: 120, present: 'ανεβάζω', future: 'θα ανεβάσω', aorist: 'ανέβασα', imperative: 'ανέβασε / ανεβάστε', translateEN: 'raise, upload', translateRU: 'поднимать, загружать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 121, present: 'ανεβαίνω', future: 'θα ανέβω', aorist: 'ανέβηκα', imperative: 'ανέβα / ανεβείτε', translateEN: 'go up, climb', translateRU: 'подниматься', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 122, present: 'ανεμίζω', future: 'θα ανεμίσω', aorist: 'ανέμισα', imperative: 'ανέμισε / ανεμίστε', translateEN: 'wave, flutter', translateRU: 'развеваться, размахивать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 123, present: 'ανέρχομαι', future: 'θα ανέλθω', aorist: 'ανήλθα', imperative: 'άνελθε / ανέλθετε', translateEN: 'ascend, amount to', translateRU: 'подниматься, достигать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 124, present: 'ανεφοδιάζω', future: 'θα ανεφοδιάσω', aorist: 'ανεφοδίασα', imperative: 'ανεφοδίασε / ανεφοδιάστε', translateEN: 'refuel, resupply', translateRU: 'заправлять, снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 125, present: 'ανέχομαι', future: 'θα ανεχτώ', aorist: 'ανέχτηκα', imperative: 'ανέξου / ανεχτείτε', translateEN: 'tolerate', translateRU: 'терпеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 126, present: 'ανήκω', future: 'θα ανήκω', aorist: null, imperative: null, translateEN: 'belong', translateRU: 'принадлежать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 127, present: 'ανησυχώ', future: 'θα ανησυχήσω', aorist: 'ανησύχησα', imperative: 'ανησύχησε / ανησυχήστε', translateEN: 'worry', translateRU: 'беспокоиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 128, present: 'ανθίζω', future: 'θα ανθίσω', aorist: 'άνθισα', imperative: 'άνθισε / ανθίστε', translateEN: 'bloom', translateRU: 'цвести', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 129, present: 'ανιχνεύω', future: 'θα ανιχνεύσω', aorist: 'ανίχνευσα', imperative: 'ανίχνευσε / ανιχνεύστε', translateEN: 'detect, trace', translateRU: 'обнаруживать, выявлять', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 130, present: 'ανοίγομαι', future: 'θα ανοιχτώ', aorist: 'ανοίχτηκα', imperative: 'ανοίξου / ανοιχτείτε', translateEN: 'open up, confide', translateRU: 'раскрываться, открываться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 131, present: 'ανοίγω', future: 'θα ανοίξω', aorist: 'άνοιξα', imperative: 'άνοιξε / ανοίξτε', translateEN: 'open', translateRU: 'открывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 132, present: 'ανοικοδομώ', future: 'θα ανοικοδομήσω', aorist: 'ανοικοδόμησα', imperative: 'ανοικοδόμησε / ανοικοδομήστε', translateEN: 'rebuild', translateRU: 'восстанавливать, отстраивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 133, present: 'ανταγωνίζομαι', future: 'θα ανταγωνιστώ', aorist: 'ανταγωνίστηκα', imperative: 'ανταγωνίσου / ανταγωνιστείτε', translateEN: 'compete', translateRU: 'конкурировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 134, present: 'ανταλλάσσω', future: 'θα ανταλλάξω', aorist: 'αντάλλαξα', imperative: 'αντάλλαξε / ανταλλάξτε', translateEN: 'exchange', translateRU: 'обменивать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 135, present: 'αντανακλώ', future: 'θα αντανακλάσω', aorist: 'αντανάκλασα', imperative: 'αντανάκλασε / αντανακλάστε', translateEN: 'reflect', translateRU: 'отражать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 136, present: 'ανταποκρίνομαι', future: 'θα ανταποκριθώ', aorist: 'ανταποκρίθηκα', imperative: 'ανταποκρίσου / ανταποκριθείτε', translateEN: 'respond, meet (expectations)', translateRU: 'откликаться, соответствовать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 137, present: 'αντέχω', future: 'θα αντέξω', aorist: 'άντεξα', imperative: 'άντεξε / αντέξτε', translateEN: 'endure', translateRU: 'выдерживать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 138, present: 'αντιγράφω', future: 'θα αντιγράψω', aorist: 'αντέγραψα', imperative: 'αντίγραψε / αντιγράψτε', translateEN: 'copy', translateRU: 'копировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 139, present: 'αντιδρώ', future: 'θα αντιδράσω', aorist: 'αντέδρασα', imperative: 'αντίδρασε / αντιδράστε', translateEN: 'react', translateRU: 'реагировать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 140, present: 'αντικαθιστώ', future: 'θα αντικαταστήσω', aorist: 'αντικατέστησα', imperative: 'αντικατάστησε / αντικαταστήστε', translateEN: 'replace', translateRU: 'заменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 141, present: 'αντιλαμβάνομαι', future: 'θα αντιληφθώ', aorist: 'αντιλήφθηκα', imperative: null, translateEN: 'perceive, realize', translateRU: 'осознавать, замечать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 142, present: 'αντιμετωπίζω', future: 'θα αντιμετωπίσω', aorist: 'αντιμετώπισα', imperative: 'αντιμετώπισε / αντιμετωπίστε', translateEN: 'face, deal with', translateRU: 'сталкиваться, справляться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 143, present: 'αντιπαθώ', future: 'θα αντιπαθήσω', aorist: 'αντιπάθησα', imperative: null, translateEN: 'dislike', translateRU: 'не любить, питать антипатию', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 144, present: 'αντιπροσωπεύω', future: 'θα αντιπροσωπεύσω', aorist: 'αντιπροσώπευσα', imperative: 'αντιπροσώπευσε / αντιπροσωπεύστε', translateEN: 'represent', translateRU: 'представлять', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 145, present: 'αντιστέκομαι', future: 'θα αντισταθώ', aorist: 'αντιστάθηκα', imperative: 'αντιστάσου / αντισταθείτε', translateEN: 'resist', translateRU: 'сопротивляться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 146, present: 'ανυψώνω', future: 'θα ανυψώσω', aorist: 'ανύψωσα', imperative: 'ανύψωσε / ανυψώστε', translateEN: 'raise, elevate', translateRU: 'поднимать, возвышать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 147, present: 'αξίζω', future: null, aorist: 'άξιζα', imperative: null, translateEN: 'be worth, deserve', translateRU: 'стоить, заслуживать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 148, present: 'αξιολογώ', future: 'θα αξιολογήσω', aorist: 'αξιολόγησα', imperative: 'αξιολόγησε / αξιολογήστε', translateEN: 'evaluate', translateRU: 'оценивать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 149, present: 'απαγγέλλω', future: 'θα απαγγείλω', aorist: 'απήγγειλα', imperative: 'απάγγειλε / απαγγείλετε', translateEN: 'recite', translateRU: 'декламировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 150, present: 'απαγορεύω', future: 'θα απαγορεύσω', aorist: 'απαγόρευσα', imperative: 'απαγόρευσε / απαγορεύστε', translateEN: 'forbid', translateRU: 'запрещать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 151, present: 'απαισιοδοξώ', future: 'θα απαισιοδοξήσω', aorist: 'απαισιοδόξησα', imperative: 'απαισιοδόξησε / απαισιοδοξήστε', translateEN: 'be pessimistic', translateRU: 'быть пессимистом', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 152, present: 'απαιτώ', future: 'θα απαιτήσω', aorist: 'απαίτησα', imperative: 'απαίτησε / απαιτήστε', translateEN: 'demand', translateRU: 'требовать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 153, present: 'απαλλάσσω', future: 'θα απαλλάξω', aorist: 'απήλλαξα', imperative: 'απάλλαξε / απαλλάξτε', translateEN: 'relieve, exempt', translateRU: 'освобождать (от чего-л.)', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 154, present: 'απαντώ', future: 'θα απαντήσω', aorist: 'απάντησα', imperative: 'απάντησε / απαντήστε', translateEN: 'answer', translateRU: 'отвечать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 155, present: 'απασχολώ', future: 'θα απασχολήσω', aorist: 'απασχόλησα', imperative: 'απασχόλησε / απασχολήστε', translateEN: 'occupy, employ', translateRU: 'занимать, нанимать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 156, present: 'απειλώ', future: 'θα απειλήσω', aorist: 'απείλησα', imperative: 'απείλησε / απειλήστε', translateEN: 'threaten', translateRU: 'угрожать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 157, present: 'απελευθερώνω', future: 'θα απελευθερώσω', aorist: 'απελευθέρωσα', imperative: 'απελευθέρωσε / απελευθερώστε', translateEN: 'free, liberate', translateRU: 'освобождать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 158, present: 'απελπίζομαι', future: 'θα απελπιστώ', aorist: 'απελπίστηκα', imperative: 'απελπίσου / απελπιστείτε', translateEN: 'despair', translateRU: 'отчаиваться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 159, present: 'απενεργοποιώ', future: 'θα απενεργοποιήσω', aorist: 'απενεργοποίησα', imperative: 'απενεργοποίησε / απενεργοποιήστε', translateEN: 'deactivate, switch off', translateRU: 'отключать, деактивировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 160, present: 'απεργώ', future: 'θα απεργήσω', aorist: 'απέργησα', imperative: 'απέργησε / απεργήστε', translateEN: 'strike (labour)', translateRU: 'бастовать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 161, present: 'απευθύνομαι', future: 'θα απευθυνθώ', aorist: 'απευθύνθηκα', imperative: 'απευθύνσου / απευθυνθείτε', translateEN: 'address, turn to', translateRU: 'обращаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 162, present: 'απευθύνω', future: 'θα απευθύνω', aorist: 'απηύθυνα', imperative: 'απεύθυνε / απευθύνετε', translateEN: 'address, direct to', translateRU: 'адресовать, обращать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 163, present: 'απέχω', future: null, aorist: 'απείχα', imperative: null, translateEN: 'be far, abstain', translateRU: 'отстоять, воздерживаться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 164, present: 'απλοποιώ', future: 'θα απλοποιήσω', aorist: 'απλοποίησα', imperative: 'απλοποίησε / απλοποιήστε', translateEN: 'simplify', translateRU: 'упрощать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 165, present: 'απλώνομαι', future: 'θα απλωθώ', aorist: 'απλώθηκα', imperative: 'απλώσου / απλωθείτε', translateEN: 'spread out, stretch out', translateRU: 'растягиваться, разворачиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 166, present: 'απλώνω', future: 'θα απλώσω', aorist: 'άπλωσα', imperative: 'άπλωσε / απλώστε', translateEN: 'spread, hang out', translateRU: 'расстилать, развешивать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 167, present: 'αποβιβάζομαι', future: 'θα αποβιβαστώ', aorist: 'αποβιβάστηκα', imperative: 'αποβιβάσου / αποβιβαστείτε', translateEN: 'disembark, get off', translateRU: 'сходить (с транспорта)', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 168, present: 'απογειώνομαι', future: 'θα απογειωθώ', aorist: 'απογειώθηκα', imperative: 'απογειώσου / απογειωθείτε', translateEN: 'take off', translateRU: 'взлетать', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 169, present: 'απογοητεύομαι', future: 'θα απογοητευτώ', aorist: 'απογοητεύτηκα', imperative: 'απογοητεύσου / απογοητευτείτε', translateEN: 'be disappointed', translateRU: 'разочаровываться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 170, present: 'απογοητεύω', future: 'θα απογοητεύσω', aorist: 'απογοήτευσα', imperative: 'απογοήτευσε / απογοητεύστε', translateEN: 'disappoint', translateRU: 'разочаровывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 171, present: 'αποδεικνύω', future: 'θα αποδείξω', aorist: 'απέδειξα', imperative: 'απόδειξε / αποδείξτε', translateEN: 'prove', translateRU: 'доказывать', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 172, present: 'αποδέχομαι', future: 'θα αποδεχτώ', aorist: 'αποδέχτηκα', imperative: 'αποδέξου / αποδεχτείτε', translateEN: 'accept', translateRU: 'принимать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 173, present: 'αποδίδω', future: 'θα αποδώσω', aorist: 'απέδωσα', imperative: 'απόδωσε / αποδώστε', translateEN: 'attribute, render', translateRU: 'приписывать, отдавать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 174, present: 'αποδυναμώνω', future: 'θα αποδυναμώσω', aorist: 'αποδυνάμωσα', imperative: 'αποδυνάμωσε / αποδυναμώστε', translateEN: 'weaken', translateRU: 'ослаблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 175, present: 'αποζημιώνω', future: 'θα αποζημιώσω', aorist: 'αποζημίωσα', imperative: 'αποζημίωσε / αποζημιώστε', translateEN: 'compensate', translateRU: 'компенсировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 176, present: 'αποθαρρύνω', future: 'θα αποθαρρύνω', aorist: 'αποθάρρυνα', imperative: 'αποθάρρυνε / αποθαρρύνετε', translateEN: 'discourage', translateRU: 'обескураживать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 177, present: 'αποθηκεύω', future: 'θα αποθηκεύσω', aorist: 'αποθήκευσα', imperative: 'αποθήκευσε / αποθηκεύστε', translateEN: 'store, save', translateRU: 'хранить, сохранять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 178, present: 'αποκαθιστώ', future: 'θα αποκαταστήσω', aorist: 'αποκατέστησα', imperative: 'αποκατάστησε / αποκαταστήστε', translateEN: 'restore', translateRU: 'восстанавливать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 179, present: 'αποκαλύπτω', future: 'θα αποκαλύψω', aorist: 'αποκάλυψα', imperative: 'αποκάλυψε / αποκαλύψτε', translateEN: 'reveal, disclose', translateRU: 'раскрывать, обнаруживать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 180, present: 'αποκαλώ', future: 'θα αποκαλέσω', aorist: 'αποκάλεσα', imperative: 'αποκάλεσε / αποκαλέστε', translateEN: 'call, name', translateRU: 'называть', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 181, present: 'αποκεντρώνω', future: 'θα αποκεντρώσω', aorist: 'αποκέντρωσα', imperative: 'αποκέντρωσε / αποκεντρώστε', translateEN: 'decentralize', translateRU: 'децентрализовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 182, present: 'αποκλείω', future: 'θα αποκλείσω', aorist: 'απέκλεισα', imperative: 'απόκλεισε / αποκλείστε', translateEN: 'exclude', translateRU: 'исключать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 183, present: 'αποκοιμιέμαι', future: 'θα αποκοιμηθώ', aorist: 'αποκοιμήθηκα', imperative: 'αποκοιμήσου / αποκοιμηθείτε', translateEN: 'fall asleep', translateRU: 'засыпать', lexicalCategory: ['lexicalHealth','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 184, present: 'αποκρίνομαι', future: 'θα αποκριθώ', aorist: 'αποκρίθηκα', imperative: 'αποκρίσου / αποκριθείτε', translateEN: 'reply, respond', translateRU: 'отвечать, откликаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 185, present: 'αποκρυπτογραφώ', future: 'θα αποκρυπτογραφήσω', aorist: 'αποκρυπτογράφησα', imperative: 'αποκρυπτογράφησε / αποκρυπτογραφήστε', translateEN: 'decipher, decrypt', translateRU: 'расшифровывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 186, present: 'αποκτώ', future: 'θα αποκτήσω', aorist: 'απέκτησα', imperative: 'απόκτησε / αποκτήστε', translateEN: 'acquire, get', translateRU: 'приобретать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 187, present: 'απολαμβάνω', future: 'θα απολαύσω', aorist: 'απόλαυσα', imperative: 'απόλαυσε / απολαύστε', translateEN: 'enjoy', translateRU: 'наслаждаться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 188, present: 'απολογούμαι', future: 'θα απολογηθώ', aorist: 'απολογήθηκα', imperative: 'απολογήσου / απολογηθείτε', translateEN: 'apologize, defend oneself', translateRU: 'оправдываться, извиняться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 189, present: 'απολυμαίνω', future: 'θα απολυμάνω', aorist: 'απολύμανα', imperative: 'απολύμανε / απολυμάνετε', translateEN: 'disinfect', translateRU: 'дезинфицировать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 190, present: 'απολύομαι', future: 'θα απολυθώ', aorist: 'απολύθηκα', imperative: 'απολύσου / απολυθείτε', translateEN: 'be fired', translateRU: 'быть уволенным', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 191, present: 'απολυτηριάζω', future: 'θα απολυτηριάσω', aorist: 'απολυτηρίασα', imperative: 'απολυτηρίασε / απολυτηριάστε', translateEN: 'graduate (school)', translateRU: 'заканчивать школу', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 192, present: 'απολύω', future: 'θα απολύσω', aorist: 'απέλυσα', imperative: 'απόλυσε / απολύστε', translateEN: 'fire, dismiss', translateRU: 'увольнять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 193, present: 'απομακρύνομαι', future: 'θα απομακρυνθώ', aorist: 'απομακρύνθηκα', imperative: 'απομακρύνσου / απομακρυνθείτε', translateEN: 'move away', translateRU: 'отдаляться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 194, present: 'απομακρύνω', future: null, aorist: 'απομάκρυνα', imperative: 'απομάκρυνε / απομακρύνετε', translateEN: 'remove, move away', translateRU: 'удалять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 195, present: 'απομονώνομαι', future: 'θα απομονωθώ', aorist: 'απομονώθηκα', imperative: 'απομονώσου / απομονωθείτε', translateEN: 'isolate oneself', translateRU: 'уединяться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 196, present: 'απομονώνω', future: 'θα απομονώσω', aorist: 'απομόνωσα', imperative: 'απομόνωσε / απομονώστε', translateEN: 'isolate', translateRU: 'изолировать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 197, present: 'αποξηραίνω', future: 'θα αποξηράνω', aorist: 'αποξήρανα', imperative: 'αποξήρανε / αποξηράνετε', translateEN: 'drain, dry out', translateRU: 'осушать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 198, present: 'αποπλανώ', future: 'θα αποπλανήσω', aorist: 'αποπλάνησα', imperative: 'αποπλάνησε / αποπλανήστε', translateEN: 'seduce, mislead', translateRU: 'соблазнять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 199, present: 'αποπροσανατολίζω', future: 'θα αποπροσανατολίσω', aorist: 'αποπροσανατόλισα', imperative: 'αποπροσανατόλισε / αποπροσανατολίστε', translateEN: 'disorient', translateRU: 'дезориентировать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 200, present: 'απορρίπτομαι', future: 'θα απορριφθώ', aorist: 'απορρίφθηκα', imperative: 'απορρίψου / απορριφθείτε', translateEN: 'be rejected', translateRU: 'быть отвергнутым', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 201, present: 'απορρίπτω', future: 'θα απορρίψω', aorist: 'απέρριψα', imperative: 'απόρριψε / απορρίψτε', translateEN: 'reject', translateRU: 'отвергать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 202, present: 'απορροφώ', future: 'θα απορροφήσω', aorist: 'απορρόφησα', imperative: 'απορρόφησε / απορροφήστε', translateEN: 'absorb', translateRU: 'поглощать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 203, present: 'απορώ', future: 'θα απορήσω', aorist: 'απόρησα', imperative: null, translateEN: 'wonder, be surprised', translateRU: 'удивляться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 204, present: 'αποσαφηνίζω', future: 'θα αποσαφηνίσω', aorist: 'αποσαφήνισα', imperative: 'αποσαφήνισε / αποσαφηνίστε', translateEN: 'clarify', translateRU: 'проясниться, разъяснять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 205, present: 'αποσπώ', future: 'θα αποσπάσω', aorist: 'απέσπασα', imperative: 'απόσπασε / αποσπάστε', translateEN: 'detach, distract, extract', translateRU: 'отвлекать, отрывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 206, present: 'αποστάζω', future: 'θα αποστάξω', aorist: 'απέσταξα', imperative: 'απόσταξε / αποστάξτε', translateEN: 'distil', translateRU: 'перегонять, дистиллировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 207, present: 'αποσταθεροποιώ', future: 'θα αποσταθεροποιήσω', aorist: 'αποσταθεροποίησα', imperative: 'αποσταθεροποίησε / αποσταθεροποιήστε', translateEN: 'destabilize', translateRU: 'дестабилизировать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 208, present: 'αποστειρώνω', future: 'θα αποστειρώσω', aorist: 'αποστείρωσα', imperative: 'αποστείρωσε / αποστειρώστε', translateEN: 'sterilize', translateRU: 'стерилизовать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 209, present: 'αποστέλλω', future: 'θα αποστείλω', aorist: 'απέστειλα', imperative: 'απόστειλε / αποστείλετε', translateEN: 'send (formal)', translateRU: 'отправлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 210, present: 'αποστηθίζω', future: 'θα αποστηθίσω', aorist: 'αποστήθισα', imperative: 'αποστήθισε / αποστηθίστε', translateEN: 'memorize', translateRU: 'заучивать наизусть', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 211, present: 'αποσυμπιέζω', future: 'θα αποσυμπιέσω', aorist: 'αποσυμπίεσα', imperative: 'αποσυμπίεσε / αποσυμπιέστε', translateEN: 'decompress, unzip', translateRU: 'распаковывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 212, present: 'αποσυνδέομαι', future: 'θα αποσυνδεθώ', aorist: 'αποσυνδέθηκα', imperative: 'αποσυνδέσου / αποσυνδεθείτε', translateEN: 'log out, disconnect', translateRU: 'выходить из системы, отключаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 213, present: 'αποσύρω', future: null, aorist: 'απέσυρα', imperative: 'απόσυρε / αποσύρετε', translateEN: 'withdraw, pull back', translateRU: 'отзывать, снимать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 214, present: 'αποταμιεύω', future: 'θα αποταμιεύσω', aorist: 'αποταμίευσα', imperative: 'αποταμίευσε / αποταμιεύστε', translateEN: 'save (money)', translateRU: 'копить, сберегать', lexicalCategory: ['lexicalWork','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 215, present: 'αποτελώ', future: 'θα αποτελέσω', aorist: 'αποτέλεσα', imperative: null, translateEN: 'constitute', translateRU: 'составлять', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 216, present: 'αποτρέπω', future: 'θα αποτρέψω', aorist: 'απέτρεψα', imperative: 'απότρεψε / αποτρέψτε', translateEN: 'prevent', translateRU: 'предотвращать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 217, present: 'αποτυγχάνω', future: 'θα αποτύχω', aorist: 'απέτυχα', imperative: null, translateEN: 'fail', translateRU: 'терпеть неудачу', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 218, present: 'απουσιάζω', future: 'θα απουσιάσω', aorist: 'απουσίασα', imperative: 'απουσίασε / απουσιάστε', translateEN: 'be absent', translateRU: 'отсутствовать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 219, present: 'αποφασίζω', future: 'θα αποφασίσω', aorist: 'αποφάσισα', imperative: 'αποφάσισε / αποφασίστε', translateEN: 'decide', translateRU: 'решать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 220, present: 'αποφεύγω', future: 'θα αποφύγω', aorist: 'απέφυγα', imperative: 'απόφυγε / αποφύγετε', translateEN: 'avoid', translateRU: 'избегать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 221, present: 'αποφοιτώ', future: 'θα αποφοιτήσω', aorist: 'αποφοίτησα', imperative: 'αποφοίτησε / αποφοιτήστε', translateEN: 'graduate', translateRU: 'оканчивать (учебное заведение)', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 222, present: 'αποχαιρετώ', future: 'θα αποχαιρετήσω', aorist: 'αποχαιρέτησα', imperative: 'αποχαιρέτησε / αποχαιρετήστε', translateEN: 'bid farewell', translateRU: 'прощаться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 223, present: 'αποχωρώ', future: 'θα αποχωρήσω', aorist: 'αποχώρησα', imperative: 'αποχώρησε / αποχωρήστε', translateEN: 'withdraw, leave', translateRU: 'уходить, удаляться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 224, present: 'αραιώνω', future: 'θα αραιώσω', aorist: 'αραίωσα', imperative: 'αραίωσε / αραιώστε', translateEN: 'dilute, thin out', translateRU: 'разбавлять, разрежать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 225, present: 'αργώ', future: 'θα αργήσω', aorist: 'άργησα', imperative: 'άργησε / αργήστε', translateEN: 'be late, delay', translateRU: 'опаздывать, медлить', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 226, present: 'αρδεύω', future: 'θα αρδεύσω', aorist: 'άρδευσα', imperative: 'άρδευσε / αρδεύστε', translateEN: 'irrigate', translateRU: 'орошать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 227, present: 'αρέσω', future: null, aorist: 'άρεσα', imperative: null, translateEN: 'be liked, please', translateRU: 'нравиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 228, present: 'αρθρώνω', future: 'θα αρθρώσω', aorist: 'άρθρωσα', imperative: 'άρθρωσε / αρθρώστε', translateEN: 'articulate', translateRU: 'артикулировать, произносить чётко', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 229, present: 'αρκώ', future: 'θα αρκέσω', aorist: 'άρκεσα', imperative: null, translateEN: 'suffice, be enough', translateRU: 'хватать, быть достаточным', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 230, present: 'αρμέγω', future: 'θα αρμέξω', aorist: 'άρμεξα', imperative: 'άρμεξε / αρμέξτε', translateEN: 'milk', translateRU: 'доить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 231, present: 'αρνούμαι', future: 'θα αρνηθώ', aorist: 'αρνήθηκα', imperative: 'αρνήσου / αρνηθείτε', translateEN: 'refuse, deny', translateRU: 'отказываться, отрицать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 232, present: 'αρπάζω', future: 'θα αρπάξω', aorist: 'άρπαξα', imperative: 'άρπαξε / αρπάξτε', translateEN: 'grab', translateRU: 'хватать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 233, present: 'αρραβωνιάζομαι', future: 'θα αρραβωνιαστώ', aorist: 'αρραβωνιάστηκα', imperative: 'αρραβωνιάσου / αρραβωνιαστείτε', translateEN: 'get engaged', translateRU: 'обручаться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 234, present: 'αρρωσταίνω', future: 'θα αρρωστήσω', aorist: 'αρρώστησα', imperative: 'αρρώστησε / αρρωστήστε', translateEN: 'fall ill', translateRU: 'заболевать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 235, present: 'αρχειοθετώ', future: 'θα αρχειοθετήσω', aorist: 'αρχειοθέτησα', imperative: 'αρχειοθέτησε / αρχειοθετήστε', translateEN: 'file, archive', translateRU: 'архивировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 236, present: 'αρχίζω', future: 'θα αρχίσω', aorist: 'άρχισα', imperative: 'άρχισε / αρχίστε', translateEN: 'begin', translateRU: 'начинать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 237, present: 'ασκώ', future: 'θα ασκήσω', aorist: 'άσκησα', imperative: 'άσκησε / ασκήστε', translateEN: 'exercise, practise', translateRU: 'осуществлять, упражнять', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 238, present: 'ασπάζομαι', future: 'θα ασπαστώ', aorist: 'ασπάστηκα', imperative: 'ασπάσου / ασπαστείτε', translateEN: 'embrace (an idea), kiss', translateRU: 'принимать (идею), целовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 239, present: 'αστειεύομαι', future: 'θα αστειευτώ', aorist: 'αστειεύτηκα', imperative: 'αστειέψου / αστειευτείτε', translateEN: 'joke', translateRU: 'шутить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 240, present: 'αστράφτω', future: 'θα αστράψω', aorist: 'άστραψα', imperative: 'άστραψε / αστράψτε', translateEN: 'flash (lightning), flash with light', translateRU: 'сверкать, блистать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 241, present: 'ασφαλίζομαι', future: 'θα ασφαλιστώ', aorist: 'ασφαλίστηκα', imperative: 'ασφαλίσου / ασφαλιστείτε', translateEN: 'get insured', translateRU: 'страховаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 242, present: 'ασφαλίζω', future: 'θα ασφαλίσω', aorist: 'ασφάλισα', imperative: 'ασφάλισε / ασφαλίστε', translateEN: 'insure, secure', translateRU: 'страховать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 243, present: 'ασφυκτιώ', future: 'θα ασφυκτιάσω', aorist: 'ασφυκτίασα', imperative: 'ασφυκτίασε / ασφυκτιάστε', translateEN: 'suffocate', translateRU: 'задыхаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 244, present: 'ασχολούμαι', future: 'θα ασχοληθώ', aorist: 'ασχολήθηκα', imperative: 'ασχολήσου / ασχοληθείτε', translateEN: 'be occupied with, deal with', translateRU: 'заниматься', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 245, present: 'αυξάνω', future: 'θα αυξήσω', aorist: 'αύξησα', imperative: 'αύξησε / αυξήστε', translateEN: 'increase', translateRU: 'увеличивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 246, present: 'αυτοματοποιώ', future: 'θα αυτοματοποιήσω', aorist: 'αυτοματοποίησα', imperative: 'αυτοματοποίησε / αυτοματοποιήστε', translateEN: 'automate', translateRU: 'автоматизировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 247, present: 'αυτοσχεδιάζω', future: 'θα αυτοσχεδιάσω', aorist: 'αυτοσχεδίασα', imperative: 'αυτοσχεδίασε / αυτοσχεδιάστε', translateEN: 'improvise', translateRU: 'импровизировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 248, present: 'αφαιρούμαι', future: 'θα αφαιρεθώ', aorist: 'αφαιρέθηκα', imperative: 'αφαιρέσου / αφαιρεθείτε', translateEN: 'be subtracted, be absorbed', translateRU: 'вычитаться, отвлекаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 249, present: 'αφαιρώ', future: 'θα αφαιρέσω', aorist: 'αφαίρεσα', imperative: 'αφαίρεσε / αφαιρέστε', translateEN: 'remove, subtract', translateRU: 'удалять, вычитать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 250, present: 'αφηγούμαι', future: 'θα αφηγηθώ', aorist: 'αφηγήθηκα', imperative: 'αφηγήσου / αφηγηθείτε', translateEN: 'narrate, recount', translateRU: 'повествовать', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 251, present: 'αφήνω', future: 'θα αφήσω', aorist: 'άφησα', imperative: 'άφησε / αφήστε', translateEN: 'leave, let', translateRU: 'оставлять, позволять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 252, present: 'αφθονώ', future: 'θα αφθονήσω', aorist: 'αφθόνησα', imperative: 'αφθόνησε / αφθονήστε', translateEN: 'abound', translateRU: 'изобиловать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 253, present: 'αφιερώνομαι', future: 'θα αφιερωθώ', aorist: 'αφιερώθηκα', imperative: 'αφιερώσου / αφιερωθείτε', translateEN: 'devote oneself', translateRU: 'посвящать себя', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 254, present: 'αφιερώνω', future: 'θα αφιερώσω', aorist: 'αφιέρωσα', imperative: 'αφιέρωσε / αφιερώστε', translateEN: 'dedicate', translateRU: 'посвящать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 255, present: 'αφοπλίζω', future: 'θα αφοπλίσω', aorist: 'αφόπλισα', imperative: 'αφόπλισε / αφοπλίστε', translateEN: 'disarm', translateRU: 'разоружать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 256, present: 'βαδίζω', future: 'θα βαδίσω', aorist: 'βάδισα', imperative: 'βάδισε / βαδίστε', translateEN: 'walk, march', translateRU: 'шагать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 257, present: 'βάζω', future: 'θα βάλω', aorist: 'έβαλα', imperative: 'βάλε / βάλτε', translateEN: 'put', translateRU: 'класть, ставить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 258, present: 'βαθαίνω', future: 'θα βαθύνω', aorist: 'βάθυνα', imperative: 'βάθυνε / βαθύνετε', translateEN: 'deepen', translateRU: 'углублять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 259, present: 'βαθμολογώ', future: 'θα βαθμολογήσω', aorist: 'βαθμολόγησα', imperative: 'βαθμολόγησε / βαθμολογήστε', translateEN: 'grade, mark', translateRU: 'ставить оценку', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 260, present: 'βαπτίζω', future: 'θα βαπτίσω', aorist: 'βάπτισα', imperative: 'βάπτισε / βαπτίστε', translateEN: 'baptize', translateRU: 'крестить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 261, present: 'βαραίνω', future: 'θα βαρύνω', aorist: 'βάρυνα', imperative: 'βάρυνε / βαρύνετε', translateEN: 'weigh down, become heavy', translateRU: 'тяжелеть, отягощать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 262, present: 'βαριέμαι', future: 'θα βαρεθώ', aorist: 'βαρέθηκα', imperative: null, translateEN: 'be bored', translateRU: 'скучать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 263, present: 'βαρώ', future: 'θα βαρέσω', aorist: 'βάρεσα', imperative: 'βάρεσε / βαρέστε', translateEN: 'hit, strike', translateRU: 'бить, ударять', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar2']},
  {id: 264, present: 'βασανίζω', future: 'θα βασανίσω', aorist: 'βασάνισα', imperative: 'βασάνισε / βασανίστε', translateEN: 'torture', translateRU: 'мучить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 265, present: 'βασίζομαι', future: 'θα βασιστώ', aorist: 'βασίστηκα', imperative: 'βασίσου / βασιστείτε', translateEN: 'rely', translateRU: 'полагаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 266, present: 'βασιλεύω', future: 'θα βασιλέψω', aorist: 'βασίλεψα', imperative: 'βασίλεψε / βασιλέψτε', translateEN: 'reign', translateRU: 'царствовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 267, present: 'βαστώ', future: 'θα βαστάξω', aorist: 'βάσταξα', imperative: 'βάσταξε / βαστάξτε', translateEN: 'hold, bear', translateRU: 'держать, выдерживать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 268, present: 'βαφτίζω', future: 'θα βαφτίσω', aorist: 'βάφτισα', imperative: 'βάφτισε / βαφτίστε', translateEN: 'baptize', translateRU: 'крестить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 269, present: 'βάφω', future: 'θα βάψω', aorist: 'έβαψα', imperative: 'βάψε / βάψτε', translateEN: 'paint, dye', translateRU: 'красить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 270, present: 'βγάζω', future: 'θα βγάλω', aorist: 'έβγαλα', imperative: 'βγάλε / βγάλτε', translateEN: 'take out, remove', translateRU: 'вынимать, снимать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 271, present: 'βγαίνω', future: 'θα βγω', aorist: 'βγήκα', imperative: 'βγες / βγείτε', translateEN: 'go out', translateRU: 'выходить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 272, present: 'βεβαιώνω', future: 'θα βεβαιώσω', aorist: 'βεβαίωσα', imperative: 'βεβαίωσε / βεβαιώστε', translateEN: 'assure, confirm', translateRU: 'заверять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 273, present: 'βελάζω', future: 'θα βελάξω', aorist: 'βέλαξα', imperative: 'βέλαξε / βελάξτε', translateEN: 'bleat', translateRU: 'блеять', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 274, present: 'βελτιστοποιώ', future: 'θα βελτιστοποιήσω', aorist: 'βελτιστοποίησα', imperative: 'βελτιστοποίησε / βελτιστοποιήστε', translateEN: 'optimize', translateRU: 'оптимизировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 275, present: 'βελτιώνω', future: 'θα βελτιώσω', aorist: 'βελτίωσα', imperative: 'βελτίωσε / βελτιώστε', translateEN: 'improve', translateRU: 'улучшать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 276, present: 'βηματίζω', future: 'θα βηματίσω', aorist: 'βημάτισα', imperative: 'βημάτισε / βηματίστε', translateEN: 'pace, stride', translateRU: 'шагать, ходить взад-вперёд', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 277, present: 'βήχω', future: 'θα βήξω', aorist: 'έβηξα', imperative: 'βήξε / βήξτε', translateEN: 'cough', translateRU: 'кашлять', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 278, present: 'βιάζομαι', future: 'θα βιαστώ', aorist: 'βιάστηκα', imperative: 'βιάσου / βιαστείτε', translateEN: 'hurry', translateRU: 'спешить', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 279, present: 'βιδώνω', future: 'θα βιδώσω', aorist: 'βίδωσα', imperative: 'βίδωσε / βιδώστε', translateEN: 'screw in', translateRU: 'вкручивать, привинчивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 280, present: 'βλάπτω', future: 'θα βλάψω', aorist: 'έβλαψα', imperative: 'βλάψε / βλάψτε', translateEN: 'harm, damage', translateRU: 'вредить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 281, present: 'βλαστάνω', future: 'θα βλαστήσω', aorist: 'βλάστησα', imperative: 'βλάστησε / βλαστήστε', translateEN: 'sprout', translateRU: 'прорастать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 282, present: 'βλαστημώ', future: 'θα βλαστημήσω', aorist: 'βλαστήμησα', imperative: 'βλαστήμησε / βλαστημήστε', translateEN: 'swear, curse', translateRU: 'богохульствовать, ругаться', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 283, present: 'βλέπω', future: 'θα δω', aorist: 'είδα', imperative: 'δες / δείτε', translateEN: 'see', translateRU: 'видеть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 284, present: 'βογκώ', future: 'θα βογκήξω', aorist: 'βόγκηξα', imperative: null, translateEN: 'groan, moan', translateRU: 'стонать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 285, present: 'βοηθώ', future: 'θα βοηθήσω', aorist: 'βοήθησα', imperative: 'βοήθησε / βοηθήστε', translateEN: 'help', translateRU: 'помогать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 286, present: 'βολεύομαι', future: 'θα βολευτώ', aorist: 'βολεύτηκα', imperative: 'βολέψου / βολευτείτε', translateEN: 'make oneself comfortable', translateRU: 'устраиваться удобно', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 287, present: 'βολεύω', future: 'θα βολέψω', aorist: 'βόλεψα', imperative: 'βόλεψε / βολέψτε', translateEN: 'suit, arrange', translateRU: 'устраивать, подходить', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 288, present: 'βομβαρδίζω', future: 'θα βομβαρδίσω', aorist: 'βομβάρδισα', imperative: 'βομβάρδισε / βομβαρδίστε', translateEN: 'bomb', translateRU: 'бомбить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 289, present: 'βοσκώ', future: 'θα βοσκήσω', aorist: 'βόσκησα', imperative: 'βόσκησε / βοσκήστε', translateEN: 'graze, pasture', translateRU: 'пасти, пастись', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 290, present: 'βουίζω', future: 'θα βουίξω', aorist: 'βούιξα', imperative: 'βούιξε / βουίξτε', translateEN: 'buzz, hum', translateRU: 'жужжать, гудеть', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 291, present: 'βουλιάζω', future: 'θα βουλιάξω', aorist: 'βούλιαξα', imperative: 'βούλιαξε / βουλιάξτε', translateEN: 'sink', translateRU: 'тонуть', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 292, present: 'βουρκώνω', future: 'θα βουρκώσω', aorist: 'βούρκωσα', imperative: 'βούρκωσε / βουρκώστε', translateEN: 'well up with tears', translateRU: 'наворачиваются слёзы', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 293, present: 'βουτώ', future: 'θα βουτήξω', aorist: 'βούτηξα', imperative: 'βούτηξε / βουτήξτε', translateEN: 'dip, dive', translateRU: 'окунать, нырять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 294, present: 'βράζω', future: 'θα βράσω', aorist: 'έβρασα', imperative: 'βράσε / βράστε', translateEN: 'boil', translateRU: 'кипятить, варить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 295, present: 'βραχυκυκλώνω', future: 'θα βραχυκυκλώσω', aorist: 'βραχυκύκλωσα', imperative: 'βραχυκύκλωσε / βραχυκυκλώστε', translateEN: 'short-circuit', translateRU: 'замыкать накоротко', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 296, present: 'βρέχομαι', future: 'θα βραχώ', aorist: 'βράχηκα', imperative: 'βρέξου / βραχείτε', translateEN: 'get wet', translateRU: 'мокнуть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 297, present: 'βρέχω', future: 'θα βρέξω', aorist: 'έβρεξα', imperative: 'βρέξε / βρέξτε', translateEN: 'wet; rain', translateRU: 'мочить; идти (о дожде)', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 298, present: 'βρίζω', future: 'θα βρίσω', aorist: 'έβρισα', imperative: 'βρίσε / βρίστε', translateEN: 'swear at, insult', translateRU: 'ругать, оскорблять', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 299, present: 'βρίσκω', future: 'θα βρω', aorist: 'βρήκα', imperative: 'βρες / βρείτε', translateEN: 'find', translateRU: 'находить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 300, present: 'βροντώ', future: 'θα βροντήξω', aorist: 'βρόντηξα', imperative: 'βρόντηξε / βροντήξτε', translateEN: 'thunder, bang', translateRU: 'греметь', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 301, present: 'βρυχώμαι', future: 'θα βρυχηθώ', aorist: 'βρυχήθηκα', imperative: null, translateEN: 'roar', translateRU: 'рычать, рёвом реветь', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 302, present: 'βυθίζομαι', future: 'θα βυθιστώ', aorist: 'βυθίστηκα', imperative: 'βυθίσου / βυθιστείτε', translateEN: 'sink, plunge', translateRU: 'тонуть, погружаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 303, present: 'βυθίζω', future: 'θα βυθίσω', aorist: 'βύθισα', imperative: 'βύθισε / βυθίστε', translateEN: 'sink (transitive), immerse', translateRU: 'топить, погружать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 304, present: 'γαβγίζω', future: 'θα γαβγίσω', aorist: 'γάβγισα', imperative: 'γάβγισε / γαβγίστε', translateEN: 'bark', translateRU: 'лаять', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 305, present: 'γαργαλώ', future: 'θα γαργαλήσω', aorist: 'γαργάλησα', imperative: 'γαργάλησε / γαργαλήστε', translateEN: 'tickle', translateRU: 'щекотать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 306, present: 'γδέρνω', future: 'θα γδάρω', aorist: 'έγδαρα', imperative: 'γδάρε / γδάρτε', translateEN: 'scrape, skin', translateRU: 'сдирать, обдирать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 307, present: 'γδύνω', future: 'θα γδύσω', aorist: 'έγδυσα', imperative: 'γδύσε / γδύστε', translateEN: 'undress (someone)', translateRU: 'раздевать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 308, present: 'γειώνω', future: 'θα γειώσω', aorist: 'γείωσα', imperative: 'γείωσε / γειώστε', translateEN: 'ground (electrical)', translateRU: 'заземлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 309, present: 'γελιέμαι', future: 'θα γελαστώ', aorist: 'γελάστηκα', imperative: null, translateEN: 'be mistaken', translateRU: 'ошибаться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 310, present: 'γελοιοποιώ', future: 'θα γελοιοποιήσω', aorist: 'γελοιοποίησα', imperative: 'γελοιοποίησε / γελοιοποιήστε', translateEN: 'ridicule', translateRU: 'выставлять на посмешище', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 311, present: 'γελώ', future: 'θα γελάσω', aorist: 'γέλασα', imperative: 'γέλασε / γελάστε', translateEN: 'laugh', translateRU: 'смеяться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 312, present: 'γεμίζω', future: 'θα γεμίσω', aorist: 'γέμισα', imperative: 'γέμισε / γεμίστε', translateEN: 'fill', translateRU: 'наполнять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 313, present: 'γεννιέμαι', future: 'θα γεννηθώ', aorist: 'γεννήθηκα', imperative: null, translateEN: 'be born', translateRU: 'рождаться', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 314, present: 'γεννοβολώ', future: 'θα γεννοβολήσω', aorist: 'γεννοβόλησα', imperative: 'γεννοβόλησε / γεννοβολήστε', translateEN: 'breed, bear young', translateRU: 'плодиться, приносить потомство', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 315, present: 'γεννώ', future: 'θα γεννήσω', aorist: 'γέννησα', imperative: 'γέννησε / γεννήστε', translateEN: 'give birth', translateRU: 'рожать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 316, present: 'γερνώ', future: 'θα γεράσω', aorist: 'γέρασα', imperative: null, translateEN: 'grow old', translateRU: 'стареть', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 317, present: 'γέρνω', future: 'θα γείρω', aorist: 'έγειρα', imperative: 'γείρε / γείρτε', translateEN: 'lean, tilt', translateRU: 'наклоняться, клониться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 318, present: 'γεύομαι', future: 'θα γευτώ', aorist: 'γεύτηκα', imperative: 'γεύσου / γευτείτε', translateEN: 'taste', translateRU: 'пробовать на вкус', lexicalCategory: ['lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 319, present: 'γιατρεύω', future: 'θα γιατρέψω', aorist: 'γιάτρεψα', imperative: 'γιάτρεψε / γιατρέψτε', translateEN: 'cure', translateRU: 'лечить', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 320, present: 'γίνομαι', future: 'θα γίνω', aorist: 'έγινα', imperative: 'γίνε / γίνετε', translateEN: 'become', translateRU: 'становиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 321, present: 'γιορτάζω', future: 'θα γιορτάσω', aorist: 'γιόρτασα', imperative: 'γιόρτασε / γιορτάστε', translateEN: 'celebrate', translateRU: 'праздновать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 322, present: 'γκρεμίζω', future: 'θα γκρεμίσω', aorist: 'γκρέμισα', imperative: 'γκρέμισε / γκρεμίστε', translateEN: 'demolish', translateRU: 'разрушать, сносить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 323, present: 'γκρινιάζω', future: 'θα γκρινιάξω', aorist: 'γκρίνιαξα', imperative: 'γκρίνιαξε / γκρινιάξτε', translateEN: 'grumble', translateRU: 'ныть, ворчать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 324, present: 'γλείφω', future: 'θα γλείψω', aorist: 'έγλειψα', imperative: 'γλείψε / γλείψτε', translateEN: 'lick', translateRU: 'лизать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 325, present: 'γλεντώ', future: 'θα γλεντήσω', aorist: 'γλέντησα', imperative: 'γλέντησε / γλεντήστε', translateEN: 'party, enjoy oneself', translateRU: 'веселиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 326, present: 'γλιστρώ', future: 'θα γλιστρήσω', aorist: 'γλίστρησα', imperative: 'γλίστρησε / γλιστρήστε', translateEN: 'slip', translateRU: 'скользить', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 327, present: 'γλιτώνω', future: 'θα γλιτώσω', aorist: 'γλίτωσα', imperative: 'γλίτωσε / γλιτώστε', translateEN: 'escape, save, get rid of', translateRU: 'спасаться, избавляться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 328, present: 'γλυκαίνω', future: 'θα γλυκάνω', aorist: 'γλύκανα', imperative: 'γλύκανε / γλυκάνετε', translateEN: 'sweeten', translateRU: 'подслащивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 329, present: 'γλυτώνω', future: 'θα γλυτώσω', aorist: 'γλύτωσα', imperative: 'γλύτωσε / γλυτώστε', translateEN: 'escape, save', translateRU: 'спасаться, избавляться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 330, present: 'γνωρίζω', future: 'θα γνωρίσω', aorist: 'γνώρισα', imperative: 'γνώρισε / γνωρίστε', translateEN: 'know, introduce', translateRU: 'знать, знакомить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 331, present: 'γογγύζω', future: 'θα γογγύσω', aorist: 'γόγγυσα', imperative: null, translateEN: 'grumble, murmur', translateRU: 'ворчать, роптать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 332, present: 'γοητεύομαι', future: 'θα γοητευτώ', aorist: 'γοητεύτηκα', imperative: 'γοητεύσου / γοητευτείτε', translateEN: 'be charmed', translateRU: 'очаровываться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 333, present: 'γοητεύω', future: 'θα γοητεύσω', aorist: 'γοήτευσα', imperative: 'γοήτευσε / γοητεύστε', translateEN: 'charm', translateRU: 'очаровывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 334, present: 'γονατίζω', future: 'θα γονατίσω', aorist: 'γονάτισα', imperative: 'γονάτισε / γονατίστε', translateEN: 'kneel', translateRU: 'становиться на колени', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 335, present: 'γονιμοποιώ', future: 'θα γονιμοποιήσω', aorist: 'γονιμοποίησα', imperative: 'γονιμοποίησε / γονιμοποιήστε', translateEN: 'fertilize', translateRU: 'оплодотворять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 336, present: 'γρατζουνώ', future: 'θα γρατζουνίσω', aorist: 'γρατζούνισα', imperative: 'γρατζούνισε / γρατζουνίστε', translateEN: 'scratch', translateRU: 'царапать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 337, present: 'γράφω', future: 'θα γράψω', aorist: 'έγραψα', imperative: 'γράψε / γράψτε', translateEN: 'write', translateRU: 'писать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 338, present: 'γρυλίζω', future: 'θα γρυλίσω', aorist: 'γρύλισα', imperative: 'γρύλισε / γρυλίστε', translateEN: 'growl', translateRU: 'рычать (о животных), хрюкать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 339, present: 'γυαλίζω', future: 'θα γυαλίσω', aorist: 'γύαλισα', imperative: 'γύαλισε / γυαλίστε', translateEN: 'polish', translateRU: 'полировать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 340, present: 'γυμνάζομαι', future: 'θα γυμναστώ', aorist: 'γυμνάστηκα', imperative: 'γυμνάσου / γυμναστείτε', translateEN: 'exercise', translateRU: 'заниматься спортом, тренироваться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 341, present: 'γυμνάζω', future: 'θα γυμνάσω', aorist: 'γύμνασα', imperative: 'γύμνασε / γυμνάστε', translateEN: 'train, exercise (someone)', translateRU: 'тренировать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 342, present: 'γυρεύω', future: 'θα γυρέψω', aorist: 'γύρεψα', imperative: 'γύρεψε / γυρέψτε', translateEN: 'seek, look for', translateRU: 'искать, добиваться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 343, present: 'γυρίζω', future: 'θα γυρίσω', aorist: 'γύρισα', imperative: 'γύρισε / γυρίστε', translateEN: 'turn, return', translateRU: 'поворачивать, возвращаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 344, present: 'δαγκώνω', future: 'θα δαγκώσω', aorist: 'δάγκωσα', imperative: 'δάγκωσε / δαγκώστε', translateEN: 'bite', translateRU: 'кусать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 345, present: 'δακρύζω', future: 'θα δακρύσω', aorist: 'δάκρυσα', imperative: null, translateEN: 'shed tears', translateRU: 'наворачиваться слезам', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 346, present: 'δακτυλογραφώ', future: 'θα δακτυλογραφήσω', aorist: 'δακτυλογράφησα', imperative: 'δακτυλογράφησε / δακτυλογραφήστε', translateEN: 'type', translateRU: 'печатать на машинке', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 347, present: 'δαμάζω', future: 'θα δαμάσω', aorist: 'δάμασα', imperative: 'δάμασε / δαμάστε', translateEN: 'tame, subdue', translateRU: 'укрощать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 348, present: 'δανείζομαι', future: 'θα δανειστώ', aorist: 'δανείστηκα', imperative: 'δανείσου / δανειστείτε', translateEN: 'borrow', translateRU: 'занимать (у кого-л.)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 349, present: 'δανείζω', future: 'θα δανείσω', aorist: 'δάνεισα', imperative: 'δάνεισε / δανείστε', translateEN: 'lend', translateRU: 'одалживать (кому-л.)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 350, present: 'δειλιάζω', future: 'θα δειλιάσω', aorist: 'δείλιασα', imperative: 'δείλιασε / δειλιάστε', translateEN: 'lose courage', translateRU: 'трусить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 351, present: 'δειπνώ', future: 'θα δειπνήσω', aorist: 'δείπνησα', imperative: 'δείπνησε / δειπνήστε', translateEN: 'dine', translateRU: 'ужинать', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 352, present: 'δείχνω', future: 'θα δείξω', aorist: 'έδειξα', imperative: 'δείξε / δείξτε', translateEN: 'show', translateRU: 'показывать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 353, present: 'δένομαι', future: 'θα δεθώ', aorist: 'δέθηκα', imperative: 'δέσου / δεθείτε', translateEN: 'be tied, become attached', translateRU: 'привязываться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 354, present: 'δένω', future: 'θα δέσω', aorist: 'έδεσα', imperative: 'δέσε / δέστε', translateEN: 'tie', translateRU: 'завязывать, привязывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 355, present: 'δέρνω', future: 'θα δείρω', aorist: 'έδειρα', imperative: 'δείρε / δείρτε', translateEN: 'beat', translateRU: 'бить', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 356, present: 'δεσμεύω', future: 'θα δεσμεύσω', aorist: 'δέσμευσα', imperative: 'δέσμευσε / δεσμεύστε', translateEN: 'bind, commit', translateRU: 'связывать, обязывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 357, present: 'δεσπόζω', future: 'θα δεσπόσω', aorist: 'δέσποσα', imperative: 'δέσποσε / δεσπόστε', translateEN: 'dominate, tower over', translateRU: 'возвышаться, господствовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 358, present: 'δέχομαι', future: 'θα δεχτώ', aorist: 'δέχτηκα', imperative: 'δέξου / δεχτείτε', translateEN: 'accept, receive', translateRU: 'принимать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 359, present: 'δηλώνω', future: 'θα δηλώσω', aorist: 'δήλωσα', imperative: 'δήλωσε / δηλώστε', translateEN: 'declare', translateRU: 'заявлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 360, present: 'δημιουργώ', future: 'θα δημιουργήσω', aorist: 'δημιούργησα', imperative: 'δημιούργησε / δημιουργήστε', translateEN: 'create', translateRU: 'создавать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 361, present: 'δημοπρατώ', future: 'θα δημοπρατήσω', aorist: 'δημοπράτησα', imperative: 'δημοπράτησε / δημοπρατήστε', translateEN: 'auction off', translateRU: 'выставлять на торги', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 362, present: 'δημοσιεύω', future: 'θα δημοσιεύσω', aorist: 'δημοσίευσα', imperative: 'δημοσίευσε / δημοσιεύστε', translateEN: 'publish', translateRU: 'публиковать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 363, present: 'διαβάζω', future: 'θα διαβάσω', aorist: 'διάβασα', imperative: 'διάβασε / διαβάστε', translateEN: 'read, study', translateRU: 'читать, учить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 364, present: 'διαβεβαιώνω', future: 'θα διαβεβαιώσω', aorist: 'διαβεβαίωσα', imperative: 'διαβεβαίωσε / διαβεβαιώστε', translateEN: 'assure', translateRU: 'заверять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 365, present: 'διαβρέχω', future: 'θα διαβρέξω', aorist: 'διέβρεξα', imperative: 'διάβρεξε / διαβρέξτε', translateEN: 'soak, drench', translateRU: 'смачивать, промачивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 366, present: 'διαβρώνω', future: 'θα διαβρώσω', aorist: 'διάβρωσα', imperative: 'διάβρωσε / διαβρώστε', translateEN: 'erode, corrode', translateRU: 'разъедать, подтачивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 367, present: 'διαγράφω', future: 'θα διαγράψω', aorist: 'διέγραψα', imperative: 'διάγραψε / διαγράψτε', translateEN: 'delete', translateRU: 'удалять, стирать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 368, present: 'διαγωνίζομαι', future: 'θα διαγωνιστώ', aorist: 'διαγωνίστηκα', imperative: 'διαγωνίσου / διαγωνιστείτε', translateEN: 'compete', translateRU: 'соревноваться', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 369, present: 'διαδηλώνω', future: 'θα διαδηλώσω', aorist: 'διαδήλωσα', imperative: 'διαδήλωσε / διαδηλώστε', translateEN: 'demonstrate, protest', translateRU: 'участвовать в демонстрации', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 370, present: 'διαδίδομαι', future: 'θα διαδοθώ', aorist: 'διαδόθηκα', imperative: 'διαδόσου / διαδοθείτε', translateEN: 'spread (news)', translateRU: 'распространяться (о слухах)', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 371, present: 'διαδίδω', future: 'θα διαδώσω', aorist: 'διέδωσα', imperative: 'διάδωσε / διαδώστε', translateEN: 'spread (news)', translateRU: 'распространять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 372, present: 'διαζεύγομαι', future: 'θα διαζευχθώ', aorist: 'διαζεύχθηκα', imperative: 'διαζεύξου / διαζευχθείτε', translateEN: 'get divorced', translateRU: 'разводиться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 373, present: 'διαθέτω', future: 'θα διαθέσω', aorist: 'διέθεσα', imperative: 'διάθεσε / διαθέστε', translateEN: 'have at one\'s disposal', translateRU: 'располагать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 374, present: 'διαθλώ', future: 'θα διαθλάσω', aorist: 'διέθλασα', imperative: 'διάθλασε / διαθλάστε', translateEN: 'refract', translateRU: 'преломлять', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 375, present: 'διαιρώ', future: 'θα διαιρέσω', aorist: 'διαίρεσα', imperative: 'διαίρεσε / διαιρέστε', translateEN: 'divide', translateRU: 'делить (мат.)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 376, present: 'διαισθάνομαι', future: 'θα διαισθανθώ', aorist: 'διαισθάνθηκα', imperative: 'διαισθάνσου / διαισθανθείτε', translateEN: 'sense, intuit', translateRU: 'чувствовать интуитивно', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 377, present: 'διαιτητεύω', future: 'θα διαιτητεύσω', aorist: 'διαιτήτευσα', imperative: 'διαιτήτευσε / διαιτητεύστε', translateEN: 'referee', translateRU: 'судить (матч)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 378, present: 'διακηρύσσω', future: 'θα διακηρύξω', aorist: 'διακήρυξα', imperative: 'διακήρυξε / διακηρύξτε', translateEN: 'proclaim', translateRU: 'провозглашать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 379, present: 'διακινώ', future: 'θα διακινήσω', aorist: 'διακίνησα', imperative: 'διακίνησε / διακινήστε', translateEN: 'distribute, traffic', translateRU: 'перевозить, распространять', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 380, present: 'διακομίζω', future: 'θα διακομίσω', aorist: 'διακόμισα', imperative: 'διακόμισε / διακομίστε', translateEN: 'transport, convey', translateRU: 'перевозить, доставлять', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 381, present: 'διακόπτω', future: 'θα διακόψω', aorist: 'διέκοψα', imperative: 'διάκοψε / διακόψτε', translateEN: 'interrupt', translateRU: 'прерывать', lexicalCategory: ['lexicalTime','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 382, present: 'διακοσμώ', future: 'θα διακοσμήσω', aorist: 'διακόσμησα', imperative: 'διακόσμησε / διακοσμήστε', translateEN: 'decorate', translateRU: 'украшать, декорировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 383, present: 'διακρίνομαι', future: 'θα διακριθώ', aorist: 'διακρίθηκα', imperative: 'διακρίσου / διακριθείτε', translateEN: 'distinguish oneself, excel', translateRU: 'отличаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 384, present: 'διακρίνω', future: null, aorist: 'διέκρινα', imperative: 'διάκρινε / διακρίνετε', translateEN: 'distinguish', translateRU: 'различать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 385, present: 'διαλέγω', future: 'θα διαλέξω', aorist: 'διάλεξα', imperative: 'διάλεξε / διαλέξτε', translateEN: 'choose', translateRU: 'выбирать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 386, present: 'διαλύομαι', future: 'θα διαλυθώ', aorist: 'διαλύθηκα', imperative: 'διαλύσου / διαλυθείτε', translateEN: 'dissolve, fall apart', translateRU: 'растворяться, распадаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 387, present: 'διαλύω', future: 'θα διαλύσω', aorist: 'διέλυσα', imperative: 'διάλυσε / διαλύστε', translateEN: 'dissolve, break up', translateRU: 'растворять, распускать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 388, present: 'διαμαρτύρομαι', future: 'θα διαμαρτυρηθώ', aorist: 'διαμαρτυρήθηκα', imperative: 'διαμαρτυρήσου / διαμαρτυρηθείτε', translateEN: 'protest, complain', translateRU: 'протестовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 389, present: 'διαμοιράζω', future: 'θα διαμοιράσω', aorist: 'διαμοίρασα', imperative: 'διαμοίρασε / διαμοιράστε', translateEN: 'distribute, share out', translateRU: 'раздавать, распределять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 390, present: 'διαμορφώνω', future: 'θα διαμορφώσω', aorist: 'διαμόρφωσα', imperative: 'διαμόρφωσε / διαμορφώστε', translateEN: 'shape, configure', translateRU: 'формировать, настраивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 391, present: 'διανέμω', future: 'θα διανείμω', aorist: 'διένειμα', imperative: 'διάνειμε / διανείμετε', translateEN: 'distribute', translateRU: 'распределять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 392, present: 'διαπαιδαγωγώ', future: 'θα διαπαιδαγωγήσω', aorist: 'διαπαιδαγώγησα', imperative: 'διαπαιδαγώγησε / διαπαιδαγωγήστε', translateEN: 'educate, bring up', translateRU: 'воспитывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 393, present: 'διαπερνώ', future: 'θα διαπεράσω', aorist: 'διαπέρασα', imperative: 'διαπέρασε / διαπεράστε', translateEN: 'pass through, penetrate', translateRU: 'пронзать, проходить насквозь', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 394, present: 'διαπιστώνω', future: 'θα διαπιστώσω', aorist: 'διαπίστωσα', imperative: 'διαπίστωσε / διαπιστώστε', translateEN: 'ascertain', translateRU: 'констатировать', lexicalCategory: ['lexicalSense','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 395, present: 'διαποτίζω', future: 'θα διαποτίσω', aorist: 'διαπότισα', imperative: 'διαπότισε / διαποτίστε', translateEN: 'saturate, permeate', translateRU: 'пропитывать, насыщать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 396, present: 'διαπραγματεύομαι', future: 'θα διαπραγματευτώ', aorist: 'διαπραγματεύτηκα', imperative: 'διαπραγματεύσου / διαπραγματευτείτε', translateEN: 'negotiate', translateRU: 'вести переговоры', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 397, present: 'διαπρέπω', future: 'θα διαπρέψω', aorist: 'διέπρεψα', imperative: 'διάπρεψε / διαπρέψτε', translateEN: 'excel', translateRU: 'выдаваться, блистать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 398, present: 'διαρκώ', future: 'θα διαρκέσω', aorist: 'διήρκεσα', imperative: null, translateEN: 'last', translateRU: 'длиться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 399, present: 'διαρρέω', future: 'θα διαρρεύσω', aorist: 'διέρρευσα', imperative: 'διάρρευσε / διαρρεύστε', translateEN: 'leak', translateRU: 'протекать, просачиваться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 400, present: 'διασκεδάζω', future: 'θα διασκεδάσω', aorist: 'διασκέδασα', imperative: 'διασκέδασε / διασκεδάστε', translateEN: 'have fun, entertain', translateRU: 'развлекаться, развлекать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 401, present: 'διασπώ', future: 'θα διασπάσω', aorist: 'διέσπασα', imperative: 'διάσπασε / διασπάστε', translateEN: 'split, divide', translateRU: 'расщеплять, раскалывать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 402, present: 'διασταυρώνω', future: 'θα διασταυρώσω', aorist: 'διασταύρωσα', imperative: 'διασταύρωσε / διασταυρώστε', translateEN: 'cross, intersect', translateRU: 'скрещивать, пересекать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 403, present: 'διαστέλλω', future: 'θα διαστείλω', aorist: 'διέστειλα', imperative: 'διάστειλε / διαστείλετε', translateEN: 'expand, dilate', translateRU: 'расширять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 404, present: 'διασύρω', future: 'θα διασύρω', aorist: 'διέσυρα', imperative: 'διάσυρε / διασύρετε', translateEN: 'disparage, discredit', translateRU: 'порочить, позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 405, present: 'διασχίζω', future: 'θα διασχίσω', aorist: 'διέσχισα', imperative: 'διάσχισε / διασχίστε', translateEN: 'cross', translateRU: 'пересекать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 406, present: 'διατάζω', future: 'θα διατάξω', aorist: 'διέταξα', imperative: 'διάταξε / διατάξτε', translateEN: 'order, command', translateRU: 'приказывать', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 407, present: 'διατηρώ', future: 'θα διατηρήσω', aorist: 'διατήρησα', imperative: 'διατήρησε / διατηρήστε', translateEN: 'maintain, preserve', translateRU: 'сохранять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 408, present: 'διατρέχω', future: 'θα διατρέξω', aorist: 'διέτρεξα', imperative: 'διάτρεξε / διατρέξτε', translateEN: 'run through, risk', translateRU: 'пробегать, подвергаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 409, present: 'διατυμπανίζω', future: 'θα διατυμπανίσω', aorist: 'διατυμπάνισα', imperative: 'διατυμπάνισε / διατυμπανίστε', translateEN: 'trumpet, proclaim loudly', translateRU: 'трубить, раструбить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 410, present: 'διατυπώνω', future: 'θα διατυπώσω', aorist: 'διατύπωσα', imperative: 'διατύπωσε / διατυπώστε', translateEN: 'formulate', translateRU: 'формулировать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 411, present: 'διαφέρω', future: null, aorist: 'διέφερα', imperative: null, translateEN: 'differ', translateRU: 'отличаться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 412, present: 'διαφημίζω', future: 'θα διαφημίσω', aorist: 'διαφήμισα', imperative: 'διαφήμισε / διαφημίστε', translateEN: 'advertise', translateRU: 'рекламировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 413, present: 'διαφωνώ', future: 'θα διαφωνήσω', aorist: 'διαφώνησα', imperative: 'διαφώνησε / διαφωνήστε', translateEN: 'disagree', translateRU: 'не соглашаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 414, present: 'διαχειρίζομαι', future: 'θα διαχειριστώ', aorist: 'διαχειρίστηκα', imperative: 'διαχειρίσου / διαχειριστείτε', translateEN: 'manage', translateRU: 'управлять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 415, present: 'διαχέομαι', future: 'θα διαχυθώ', aorist: 'διαχύθηκα', imperative: 'διαχύσου / διαχυθείτε', translateEN: 'spread, diffuse', translateRU: 'растекаться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 416, present: 'διαχέω', future: 'θα διαχύσω', aorist: 'διέχυσα', imperative: 'διάχυσε / διαχύστε', translateEN: 'diffuse', translateRU: 'рассеивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 417, present: 'διαχωρίζω', future: 'θα διαχωρίσω', aorist: 'διαχώρισα', imperative: 'διαχώρισε / διαχωρίστε', translateEN: 'separate', translateRU: 'разделять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 418, present: 'διαψεύδω', future: 'θα διαψεύσω', aorist: 'διέψευσα', imperative: 'διάψευσε / διαψεύστε', translateEN: 'deny, disprove', translateRU: 'опровергать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 419, present: 'διδάσκω', future: 'θα διδάξω', aorist: 'δίδαξα', imperative: 'δίδαξε / διδάξτε', translateEN: 'teach', translateRU: 'преподавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 420, present: 'διεισδύω', future: 'θα διεισδύσω', aorist: 'διείσδυσα', imperative: 'διείσδυσε / διεισδύστε', translateEN: 'penetrate', translateRU: 'проникать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 421, present: 'διεκδικώ', future: 'θα διεκδικήσω', aorist: 'διεκδίκησα', imperative: 'διεκδίκησε / διεκδικήστε', translateEN: 'claim, demand', translateRU: 'требовать, добиваться', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 422, present: 'διέρχομαι', future: 'θα διέλθω', aorist: 'διήλθα', imperative: 'δίελθε / διέλθετε', translateEN: 'pass through', translateRU: 'проходить через', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 423, present: 'διερωτώμαι', future: 'θα διερωτηθώ', aorist: 'διερωτήθηκα', imperative: 'διερωτήσου / διερωτηθείτε', translateEN: 'wonder', translateRU: 'задаваться вопросом', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 424, present: 'διευθετώ', future: 'θα διευθετήσω', aorist: 'διευθέτησα', imperative: 'διευθέτησε / διευθετήστε', translateEN: 'arrange, settle', translateRU: 'улаживать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 425, present: 'διευθύνω', future: null, aorist: 'διεύθυνα', imperative: 'διεύθυνε / διευθύνετε', translateEN: 'direct, manage', translateRU: 'руководить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 426, present: 'διευκολύνω', future: 'θα διευκολύνω', aorist: 'διευκόλυνα', imperative: 'διευκόλυνε / διευκολύνετε', translateEN: 'facilitate, make easier', translateRU: 'облегчать, содействовать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 427, present: 'διευκρινίζω', future: 'θα διευκρινίσω', aorist: 'διευκρίνισα', imperative: 'διευκρίνισε / διευκρινίστε', translateEN: 'clarify', translateRU: 'уточнять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 428, present: 'διηγούμαι', future: 'θα διηγηθώ', aorist: 'διηγήθηκα', imperative: 'διηγήσου / διηγηθείτε', translateEN: 'narrate, tell', translateRU: 'рассказывать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 429, present: 'δικάζομαι', future: 'θα δικαστώ', aorist: 'δικάστηκα', imperative: 'δικάσου / δικαστείτε', translateEN: 'stand trial', translateRU: 'быть под судом', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 430, present: 'δικάζω', future: 'θα δικάσω', aorist: 'δίκασα', imperative: 'δίκασε / δικάστε', translateEN: 'judge, try', translateRU: 'судить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 431, present: 'δικαιολογώ', future: 'θα δικαιολογήσω', aorist: 'δικαιολόγησα', imperative: 'δικαιολόγησε / δικαιολογήστε', translateEN: 'justify, excuse', translateRU: 'оправдывать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 432, present: 'δίνω', future: 'θα δώσω', aorist: 'έδωσα', imperative: 'δώσε / δώστε', translateEN: 'give', translateRU: 'давать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 433, present: 'διορθώνω', future: 'θα διορθώσω', aorist: 'διόρθωσα', imperative: 'διόρθωσε / διορθώστε', translateEN: 'correct, fix', translateRU: 'исправлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 434, present: 'διορίζω', future: 'θα διορίσω', aorist: 'διόρισα', imperative: 'διόρισε / διορίστε', translateEN: 'appoint', translateRU: 'назначать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 435, present: 'διπλώνω', future: 'θα διπλώσω', aorist: 'δίπλωσα', imperative: 'δίπλωσε / διπλώστε', translateEN: 'fold', translateRU: 'складывать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 436, present: 'διστάζω', future: 'θα διστάσω', aorist: 'δίστασα', imperative: 'δίστασε / διστάστε', translateEN: 'hesitate', translateRU: 'колебаться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 437, present: 'διυλίζω', future: 'θα διυλίσω', aorist: 'διύλισα', imperative: 'διύλισε / διυλίστε', translateEN: 'filter, refine', translateRU: 'фильтровать, очищать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 438, present: 'διψώ', future: 'θα διψάσω', aorist: 'δίψασα', imperative: null, translateEN: 'be thirsty', translateRU: 'хотеть пить', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 439, present: 'διώχνω', future: 'θα διώξω', aorist: 'έδιωξα', imperative: 'δίωξε / διώξτε', translateEN: 'chase away, fire', translateRU: 'прогонять, увольнять', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 440, present: 'δοκιμάζω', future: 'θα δοκιμάσω', aorist: 'δοκίμασα', imperative: 'δοκίμασε / δοκιμάστε', translateEN: 'try, taste', translateRU: 'пробовать, примерять', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 441, present: 'δοξάζω', future: 'θα δοξάσω', aorist: 'δόξασα', imperative: 'δόξασε / δοξάστε', translateEN: 'glorify', translateRU: 'прославлять', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 442, present: 'δουλεύω', future: 'θα δουλέψω', aorist: 'δούλεψα', imperative: 'δούλεψε / δουλέψτε', translateEN: 'work', translateRU: 'работать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 443, present: 'δραπετεύω', future: 'θα δραπετεύσω', aorist: 'δραπέτευσα', imperative: 'δραπέτευσε / δραπετεύστε', translateEN: 'escape', translateRU: 'сбегать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 444, present: 'δρέπω', future: 'θα δρέψω', aorist: 'έδρεψα', imperative: 'δρέψε / δρέψτε', translateEN: 'reap, pluck', translateRU: 'пожинать, срывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 445, present: 'δρομολογώ', future: 'θα δρομολογήσω', aorist: 'δρομολόγησα', imperative: 'δρομολόγησε / δρομολογήστε', translateEN: 'route, schedule', translateRU: 'маршрутизировать, запускать', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 446, present: 'δροσίζομαι', future: 'θα δροσιστώ', aorist: 'δροσίστηκα', imperative: 'δροσίσου / δροσιστείτε', translateEN: 'cool down, refresh oneself', translateRU: 'освежаться, охлаждаться', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 447, present: 'δροσίζω', future: 'θα δροσίσω', aorist: 'δρόσισα', imperative: 'δρόσισε / δροσίστε', translateEN: 'cool, refresh', translateRU: 'освежать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 448, present: 'δυναμώνω', future: 'θα δυναμώσω', aorist: 'δυνάμωσα', imperative: 'δυνάμωσε / δυναμώστε', translateEN: 'strengthen', translateRU: 'усиливать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 449, present: 'δυσανασχετώ', future: 'θα δυσανασχετήσω', aorist: 'δυσανασχέτησα', imperative: 'δυσανασχέτησε / δυσανασχετήστε', translateEN: 'be displeased', translateRU: 'быть недовольным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 450, present: 'δυσκολεύομαι', future: 'θα δυσκολευτώ', aorist: 'δυσκολεύτηκα', imperative: 'δυσκολέψου / δυσκολευτείτε', translateEN: 'have difficulty', translateRU: 'затрудняться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 451, present: 'δυσκολεύω', future: 'θα δυσκολέψω', aorist: 'δυσκόλεψα', imperative: 'δυσκόλεψε / δυσκολέψτε', translateEN: 'make difficult', translateRU: 'затруднять', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 452, present: 'δυστυχώ', future: 'θα δυστυχήσω', aorist: 'δυστύχησα', imperative: 'δυστύχησε / δυστυχήστε', translateEN: 'be unhappy', translateRU: 'быть несчастным', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 453, present: 'δύω', future: 'θα δύσω', aorist: 'έδυσα', imperative: 'δύσε / δύστε', translateEN: 'set (sun)', translateRU: 'заходить (о солнце)', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 454, present: 'δωρεοδοτώ', future: 'θα δωρεοδοτήσω', aorist: 'δωρεοδότησα', imperative: 'δωρεοδότησε / δωρεοδοτήστε', translateEN: 'donate', translateRU: 'жертвовать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 455, present: 'δωρίζω', future: 'θα δωρίσω', aorist: 'δώρισα', imperative: 'δώρισε / δωρίστε', translateEN: 'donate, gift', translateRU: 'дарить, жертвовать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 456, present: 'δωροδοκώ', future: 'θα δωροδοκήσω', aorist: 'δωροδόκησα', imperative: 'δωροδόκησε / δωροδοκήστε', translateEN: 'bribe', translateRU: 'подкупать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 457, present: 'εγγράφομαι', future: 'θα εγγραφώ', aorist: 'εγγράφηκα', imperative: 'εγγράψου / εγγραφείτε', translateEN: 'enroll, register', translateRU: 'записываться, регистрироваться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 458, present: 'εγγράφω', future: 'θα εγγράψω', aorist: 'ενέγραψα', imperative: 'εγγράψε / εγγράψτε', translateEN: 'register, enter', translateRU: 'вносить в список', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 459, present: 'εγγυώμαι', future: 'θα εγγυηθώ', aorist: 'εγγυήθηκα', imperative: 'εγγυήσου / εγγυηθείτε', translateEN: 'guarantee', translateRU: 'гарантировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 460, present: 'εγκαθιστώ', future: 'θα εγκαταστήσω', aorist: 'εγκατέστησα', imperative: 'εγκατάστησε / εγκαταστήστε', translateEN: 'install, settle', translateRU: 'устанавливать, поселять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 461, present: 'εγκαταλείπω', future: 'θα εγκαταλείψω', aorist: 'εγκατέλειψα', imperative: 'εγκατάλειψε / εγκαταλείψτε', translateEN: 'abandon', translateRU: 'бросать, покидать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 462, present: 'εγκρίνω', future: null, aorist: 'ενέκρινα', imperative: 'έγκρινε / εγκρίνετε', translateEN: 'approve', translateRU: 'одобрять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 463, present: 'ειδοποιώ', future: 'θα ειδοποιήσω', aorist: 'ειδοποίησα', imperative: 'ειδοποίησε / ειδοποιήστε', translateEN: 'notify', translateRU: 'уведомлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 464, present: 'είμαι', future: null, aorist: 'ήμουν', imperative: null, translateEN: 'be', translateRU: 'быть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarIrregular']},
  {id: 465, present: 'εισάγω', future: 'θα εισαγάγω', aorist: 'εισήγαγα', imperative: null, translateEN: 'import, introduce', translateRU: 'импортировать, вводить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 466, present: 'εισβάλλω', future: 'θα εισβάλω', aorist: 'εισέβαλα', imperative: 'εισέβαλε / εισεβάλετε', translateEN: 'invade', translateRU: 'вторгаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 467, present: 'εισέρχομαι', future: 'θα εισέλθω', aorist: 'εισήλθα', imperative: 'είσελθε / εισέλθετε', translateEN: 'enter', translateRU: 'входить', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 468, present: 'εισηγούμαι', future: 'θα εισηγηθώ', aorist: 'εισηγήθηκα', imperative: 'εισηγήσου / εισηγηθείτε', translateEN: 'propose, recommend', translateRU: 'предлагать, докладывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 469, present: 'εισπράττω', future: 'θα εισπράξω', aorist: 'εισέπραξα', imperative: 'είσπραξε / εισπράξτε', translateEN: 'collect (money)', translateRU: 'получать (деньги)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 470, present: 'εισχωρώ', future: 'θα εισχωρήσω', aorist: 'εισχώρησα', imperative: 'εισχώρησε / εισχωρήστε', translateEN: 'penetrate', translateRU: 'проникать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 471, present: 'εκβιάζω', future: 'θα εκβιάσω', aorist: 'εκβίασα', imperative: 'εκβίασε / εκβιάστε', translateEN: 'blackmail', translateRU: 'шантажировать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 472, present: 'εκδηλώνω', future: 'θα εκδηλώσω', aorist: 'εκδήλωσα', imperative: 'εκδήλωσε / εκδηλώστε', translateEN: 'express, manifest', translateRU: 'проявлять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 473, present: 'εκδίδω', future: 'θα εκδώσω', aorist: 'εξέδωσα', imperative: 'έκδωσε / εκδώστε', translateEN: 'publish, issue', translateRU: 'издавать, выдавать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 474, present: 'εκδικούμαι', future: 'θα εκδικηθώ', aorist: 'εκδικήθηκα', imperative: 'εκδικήσου / εκδικηθείτε', translateEN: 'take revenge', translateRU: 'мстить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 475, present: 'εκθειάζω', future: 'θα εκθειάσω', aorist: 'εκθείασα', imperative: 'εκθείασε / εκθειάστε', translateEN: 'extol, praise', translateRU: 'превозносить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 476, present: 'εκθέτω', future: 'θα εκθέσω', aorist: 'έκθεσα', imperative: 'έκθεσε / εκθέστε', translateEN: 'expose, exhibit', translateRU: 'выставлять, подвергать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 477, present: 'εκκινώ', future: 'θα εκκινήσω', aorist: 'εκκίνησα', imperative: 'εκκίνησε / εκκινήστε', translateEN: 'start, launch', translateRU: 'запускать, стартовать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 478, present: 'εκκολάπτω', future: 'θα εκκολάψω', aorist: 'εξέκολαψα', imperative: 'εκκόλαψε / εκκολάψτε', translateEN: 'hatch', translateRU: 'высиживать, выводить', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 479, present: 'εκλέγομαι', future: 'θα εκλεγώ', aorist: 'εκλέχθηκα', imperative: 'εκλέξου / εκλεχθείτε', translateEN: 'be elected', translateRU: 'избираться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 480, present: 'εκλέγω', future: 'θα εκλέξω', aorist: 'εξέλεξα', imperative: null, translateEN: 'elect', translateRU: 'избирать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 481, present: 'εκλιπαρώ', future: 'θα εκλιπαρήσω', aorist: 'εκλιπάρησα', imperative: 'εκλιπάρησε / εκλιπαρήστε', translateEN: 'beg, implore', translateRU: 'умолять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 482, present: 'εκμεταλλεύομαι', future: 'θα εκμεταλλευτώ', aorist: 'εκμεταλλεύτηκα', imperative: 'εκμεταλλεύσου / εκμεταλλευτείτε', translateEN: 'exploit, take advantage of', translateRU: 'использовать, эксплуатировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 483, present: 'εκνευρίζομαι', future: 'θα εκνευριστώ', aorist: 'εκνευρίστηκα', imperative: 'εκνευρίσου / εκνευριστείτε', translateEN: 'get annoyed', translateRU: 'раздражаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 484, present: 'εκνευρίζω', future: 'θα εκνευρίσω', aorist: 'εκνεύρισα', imperative: 'εκνεύρισε / εκνευρίστε', translateEN: 'irritate', translateRU: 'раздражать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 485, present: 'εκπαιδεύομαι', future: 'θα εκπαιδευτώ', aorist: 'εκπαιδεύτηκα', imperative: 'εκπαιδεύσου / εκπαιδευτείτε', translateEN: 'be trained, train', translateRU: 'обучаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 486, present: 'εκπαιδεύω', future: 'θα εκπαιδεύσω', aorist: 'εκπαίδευσα', imperative: 'εκπαίδευσε / εκπαιδεύστε', translateEN: 'train, educate', translateRU: 'обучать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 487, present: 'εκπέμπω', future: 'θα εκπέμψω', aorist: 'εξέπεμψα', imperative: 'εκπέμψε / εκπέμψτε', translateEN: 'emit, broadcast', translateRU: 'излучать, передавать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 488, present: 'εκπληρώνω', future: 'θα εκπληρώσω', aorist: 'εκπλήρωσα', imperative: 'εκπλήρωσε / εκπληρώστε', translateEN: 'fulfill', translateRU: 'исполнять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 489, present: 'εκπλήσσομαι', future: 'θα εκπλαγώ', aorist: 'εκπλάγηκα', imperative: 'εκπλήξου / εκπλαγείτε', translateEN: 'be surprised', translateRU: 'удивляться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 490, present: 'εκπλήσσω', future: 'θα εκπλήξω', aorist: 'εξέπληξα', imperative: 'έκπληξε / εκπλήξτε', translateEN: 'surprise', translateRU: 'удивлять', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 491, present: 'εκριζώνω', future: 'θα εκριζώσω', aorist: 'εκρίζωσα', imperative: 'εκρίζωσε / εκριζώστε', translateEN: 'uproot, eradicate', translateRU: 'вырывать с корнем, искоренять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 492, present: 'εκστομίζω', future: 'θα εκστομίσω', aorist: 'εξέστομισα', imperative: 'εκστόμισε / εκστομίστε', translateEN: 'utter', translateRU: 'изрекать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 493, present: 'εκσυγχρονίζω', future: 'θα εκσυγχρονίσω', aorist: 'εκσυγχρόνισα', imperative: 'εκσυγχρόνισε / εκσυγχρονίστε', translateEN: 'modernize', translateRU: 'модернизировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 494, present: 'εκτείνομαι', future: 'θα εκταθώ', aorist: 'εκτάθηκα', imperative: 'εκτάσου / εκταθείτε', translateEN: 'extend, stretch out', translateRU: 'простираться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 495, present: 'εκτείνω', future: 'θα εκτείνω', aorist: 'εξέτεινα', imperative: 'έκτεινε / εκτείνετε', translateEN: 'extend, stretch', translateRU: 'простирать, вытягивать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 496, present: 'εκτελώ', future: 'θα εκτελέσω', aorist: 'εκτέλεσα', imperative: 'εκτέλεσε / εκτελέστε', translateEN: 'execute, carry out', translateRU: 'выполнять, казнить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 497, present: 'εκτιμώ', future: 'θα εκτιμήσω', aorist: 'εκτίμησα', imperative: 'εκτίμησε / εκτιμήστε', translateEN: 'appreciate, estimate', translateRU: 'ценить, оценивать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 498, present: 'εκτοξεύω', future: 'θα εκτοξεύσω', aorist: 'εκτόξευσα', imperative: 'εκτόξευσε / εκτοξεύστε', translateEN: 'launch, hurl', translateRU: 'запускать, метать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 499, present: 'εκτροχιάζομαι', future: 'θα εκτροχιαστώ', aorist: 'εκτροχιάστηκα', imperative: 'εκτροχιάσου / εκτροχιαστείτε', translateEN: 'derail', translateRU: 'сходить с рельсов', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 500, present: 'εκτυπώνω', future: 'θα εκτυπώσω', aorist: 'εκτύπωσα', imperative: 'εκτύπωσε / εκτυπώστε', translateEN: 'print out', translateRU: 'распечатывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 501, present: 'εκφέρω', future: 'θα εκφέρω', aorist: 'εξέφερα', imperative: 'εκφέρε / εκφέρετε', translateEN: 'utter, express', translateRU: 'произносить, выражать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 502, present: 'εκφοβίζω', future: 'θα εκφοβίσω', aorist: 'εκφόβισα', imperative: 'εκφόβισε / εκφοβίστε', translateEN: 'intimidate', translateRU: 'запугивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 503, present: 'εκφορτώνω', future: 'θα εκφορτώσω', aorist: 'εκφόρτωσα', imperative: 'εκφόρτωσε / εκφορτώστε', translateEN: 'unload', translateRU: 'разгружать', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 504, present: 'εκφράζω', future: 'θα εκφράσω', aorist: 'εξέφρασα', imperative: 'έκφρασε / εκφράστε', translateEN: 'express', translateRU: 'выражать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 505, present: 'εκφωνώ', future: 'θα εκφωνήσω', aorist: 'εκφώνησα', imperative: 'εκφώνησε / εκφωνήστε', translateEN: 'deliver (a speech), announce', translateRU: 'произносить (речь)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 506, present: 'ελαττώνω', future: 'θα ελαττώσω', aorist: 'ελάττωσα', imperative: 'ελάττωσε / ελαττώστε', translateEN: 'reduce', translateRU: 'уменьшать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 507, present: 'ελαφρύνω', future: 'θα ελαφρύνω', aorist: 'ελάφρυνα', imperative: 'ελάφρυνε / ελαφρύνετε', translateEN: 'lighten, relieve', translateRU: 'облегчать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 508, present: 'ελέγχω', future: 'θα ελέγξω', aorist: 'έλεγξα', imperative: 'έλεγξε / ελέγξτε', translateEN: 'check, control', translateRU: 'проверять, контролировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 509, present: 'ελευθερώνω', future: 'θα ελευθερώσω', aorist: 'ελευθέρωσα', imperative: 'ελευθέρωσε / ελευθερώστε', translateEN: 'free', translateRU: 'освобождать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 510, present: 'ελπίζω', future: 'θα ελπίσω', aorist: 'έλπισα', imperative: 'έλπισε / ελπίστε', translateEN: 'hope', translateRU: 'надеяться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 511, present: 'εμβολιάζω', future: 'θα εμβολιάσω', aorist: 'εμβολίασα', imperative: 'εμβολίασε / εμβολιάστε', translateEN: 'vaccinate', translateRU: 'делать прививку', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 512, present: 'εμπίπτω', future: 'θα εμπέσω', aorist: 'ενέπεσα', imperative: 'έμπεσε / εμπέστε', translateEN: 'fall within', translateRU: 'подпадать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 513, present: 'εμπιστεύομαι', future: 'θα εμπιστευτώ', aorist: 'εμπιστεύτηκα', imperative: 'εμπιστεύσου / εμπιστευτείτε', translateEN: 'trust', translateRU: 'доверять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 514, present: 'εμπλέκω', future: 'θα εμπλέξω', aorist: 'ενέπλεξα', imperative: null, translateEN: 'involve, entangle', translateRU: 'вовлекать, запутывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 515, present: 'εμπνέω', future: 'θα εμπνεύσω', aorist: 'ενέπνευσα', imperative: 'έμπνευσε / εμπνεύστε', translateEN: 'inspire', translateRU: 'вдохновлять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 516, present: 'εμποδίζω', future: 'θα εμποδίσω', aorist: 'εμπόδισα', imperative: 'εμπόδισε / εμποδίστε', translateEN: 'prevent, hinder', translateRU: 'мешать, препятствовать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 517, present: 'εμπορεύομαι', future: 'θα εμπορευτώ', aorist: 'εμπορεύτηκα', imperative: null, translateEN: 'trade', translateRU: 'торговать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 518, present: 'εμποτίζω', future: 'θα εμποτίσω', aorist: 'εμπότισα', imperative: 'εμπότισε / εμποτίστε', translateEN: 'soak, impregnate', translateRU: 'пропитывать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 519, present: 'εμφανίζομαι', future: 'θα εμφανιστώ', aorist: 'εμφανίστηκα', imperative: 'εμφανίσου / εμφανιστείτε', translateEN: 'appear', translateRU: 'появляться', lexicalCategory: ['lexicalSense','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
  {id: 520, present: 'εμφανίζω', future: 'θα εμφανίσω', aorist: 'εμφάνισα', imperative: 'εμφάνισε / εμφανίστε', translateEN: 'show, develop (photos)', translateRU: 'показывать, проявлять', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 521, present: 'ενδιαφέρομαι', future: 'θα ενδιαφερθώ', aorist: 'ενδιαφέρθηκα', imperative: 'ενδιαφέρσου / ενδιαφερθείτε', translateEN: 'be interested', translateRU: 'интересоваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 522, present: 'ενδυναμώνω', future: 'θα ενδυναμώσω', aorist: 'ενδυνάμωσα', imperative: 'ενδυνάμωσε / ενδυναμώστε', translateEN: 'strengthen', translateRU: 'укреплять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 523, present: 'ενεργοποιώ', future: 'θα ενεργοποιήσω', aorist: 'ενεργοποίησα', imperative: 'ενεργοποίησε / ενεργοποιήστε', translateEN: 'activate', translateRU: 'активировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 524, present: 'ενεργώ', future: 'θα ενεργήσω', aorist: 'ενήργησα', imperative: 'ενέργησε / ενεργήστε', translateEN: 'act', translateRU: 'действовать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 525, present: 'ενημερώνω', future: 'θα ενημερώσω', aorist: 'ενημέρωσα', imperative: 'ενημέρωσε / ενημερώστε', translateEN: 'inform, update', translateRU: 'информировать, обновлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 526, present: 'ενθαρρύνω', future: null, aorist: 'ενθάρρυνα', imperative: 'ενθάρρυνε / ενθαρρύνετε', translateEN: 'encourage', translateRU: 'поощрять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 527, present: 'ενθουσιάζομαι', future: 'θα ενθουσιαστώ', aorist: 'ενθουσιάστηκα', imperative: 'ενθουσιάσου / ενθουσιαστείτε', translateEN: 'get excited', translateRU: 'восторгаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 528, present: 'ενθουσιάζω', future: 'θα ενθουσιάσω', aorist: 'ενθουσίασα', imperative: 'ενθουσίασε / ενθουσιάστε', translateEN: 'excite, thrill', translateRU: 'восхищать, воодушевлять', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 529, present: 'ενισχύω', future: 'θα ενισχύσω', aorist: 'ενίσχυσα', imperative: 'ενίσχυσε / ενισχύστε', translateEN: 'reinforce, support', translateRU: 'усиливать, поддерживать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 530, present: 'εννοώ', future: 'θα εννοήσω', aorist: 'εννόησα', imperative: 'εννόησε / εννοήστε', translateEN: 'mean', translateRU: 'подразумевать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 531, present: 'ενοικιάζω', future: 'θα ενοικιάσω', aorist: 'ενοικίασα', imperative: 'ενοικίασε / ενοικιάστε', translateEN: 'rent out, rent', translateRU: 'сдавать, арендовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 532, present: 'ενορχηστρώνω', future: 'θα ενορχηστρώσω', aorist: 'ενορχήστρωσα', imperative: 'ενορχήστρωσε / ενορχηστρώστε', translateEN: 'orchestrate', translateRU: 'оркестровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 533, present: 'ενοχλώ', future: 'θα ενοχλήσω', aorist: 'ενόχλησα', imperative: 'ενόχλησε / ενοχλήστε', translateEN: 'bother, disturb', translateRU: 'беспокоить, мешать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 534, present: 'ενσωματώνω', future: 'θα ενσωματώσω', aorist: 'ενσωμάτωσα', imperative: 'ενσωμάτωσε / ενσωματώστε', translateEN: 'integrate, embed', translateRU: 'встраивать, интегрировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 535, present: 'ενταφιάζω', future: 'θα ενταφιάσω', aorist: 'ενταφίασα', imperative: 'ενταφίασε / ενταφιάστε', translateEN: 'inter, bury', translateRU: 'погребать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 536, present: 'ενώνω', future: 'θα ενώσω', aorist: 'ένωσα', imperative: 'ένωσε / ενώστε', translateEN: 'unite, connect', translateRU: 'соединять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 537, present: 'εξαγοράζω', future: 'θα εξαγοράσω', aorist: 'εξαγόρασα', imperative: 'εξαγόρασε / εξαγοράστε', translateEN: 'buy out, bribe', translateRU: 'выкупать, подкупать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 538, present: 'εξάγω', future: 'θα εξάγω', aorist: 'εξήγαγα', imperative: 'εξάγαγε / εξαγάγετε', translateEN: 'export, extract', translateRU: 'экспортировать, извлекать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 539, present: 'εξαερώνω', future: 'θα εξαερώσω', aorist: 'εξαέρωσα', imperative: 'εξαέρωσε / εξαερώστε', translateEN: 'vaporize', translateRU: 'испарять, газифицировать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 540, present: 'εξαιρώ', future: 'θα εξαιρέσω', aorist: 'εξαίρεσα', imperative: 'εξαίρεσε / εξαιρέστε', translateEN: 'exclude, exempt', translateRU: 'исключать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 541, present: 'εξακολουθώ', future: 'θα εξακολουθήσω', aorist: 'εξακολούθησα', imperative: 'εξακολούθησε / εξακολουθήστε', translateEN: 'continue', translateRU: 'продолжать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 542, present: 'εξακριβώνω', future: 'θα εξακριβώσω', aorist: 'εξακρίβωσα', imperative: 'εξακρίβωσε / εξακριβώστε', translateEN: 'ascertain, verify', translateRU: 'удостоверяться, выяснять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 543, present: 'εξαλείφω', future: 'θα εξαλείψω', aorist: 'εξάλειψα', imperative: 'εξάλειψε / εξαλείψτε', translateEN: 'eradicate, erase', translateRU: 'стирать, искоренять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 544, present: 'εξαντλούμαι', future: 'θα εξαντληθώ', aorist: 'εξαντλήθηκα', imperative: 'εξαντλήσου / εξαντληθείτε', translateEN: 'be exhausted', translateRU: 'истощаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 545, present: 'εξαντλώ', future: 'θα εξαντλήσω', aorist: 'εξάντλησα', imperative: 'εξάντλησε / εξαντλήστε', translateEN: 'exhaust', translateRU: 'истощать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 546, present: 'εξαπατώ', future: 'θα εξαπατήσω', aorist: 'εξαπάτησα', imperative: 'εξαπάτησε / εξαπατήστε', translateEN: 'deceive, cheat', translateRU: 'обманывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 547, present: 'εξαπλώνομαι', future: 'θα εξαπλωθώ', aorist: 'εξαπλώθηκα', imperative: 'εξαπλώσου / εξαπλωθείτε', translateEN: 'spread, sprawl', translateRU: 'распространяться, развалиться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
  {id: 548, present: 'εξαπλώνω', future: 'θα εξαπλώσω', aorist: 'εξάπλωσα', imperative: 'εξάπλωσε / εξαπλώστε', translateEN: 'spread out', translateRU: 'распространять, расстилать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 549, present: 'εξαρτώμαι', future: 'θα εξαρτηθώ', aorist: 'εξαρτήθηκα', imperative: null, translateEN: 'depend', translateRU: 'зависеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 550, present: 'εξασκούμαι', future: 'θα εξασκηθώ', aorist: 'εξασκήθηκα', imperative: 'εξασκήσου / εξασκηθείτε', translateEN: 'practice', translateRU: 'упражняться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 551, present: 'εξασκώ', future: 'θα εξασκήσω', aorist: 'εξάσκησα', imperative: 'εξάσκησε / εξασκήστε', translateEN: 'train, exercise', translateRU: 'упражнять, тренировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 552, present: 'εξασφαλίζω', future: 'θα εξασφαλίσω', aorist: 'εξασφάλισα', imperative: 'εξασφάλισε / εξασφαλίστε', translateEN: 'secure, ensure', translateRU: 'обеспечивать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 553, present: 'εξατμίζομαι', future: 'θα εξατμιστώ', aorist: 'εξατμίστηκα', imperative: 'εξατμίσου / εξατμιστείτε', translateEN: 'evaporate', translateRU: 'испаряться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 554, present: 'εξαφανίζομαι', future: 'θα εξαφανιστώ', aorist: 'εξαφανίστηκα', imperative: 'εξαφανίσου / εξαφανιστείτε', translateEN: 'disappear', translateRU: 'исчезать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 555, present: 'εξαφανίζω', future: 'θα εξαφανίσω', aorist: 'εξαφάνισα', imperative: 'εξαφάνισε / εξαφανίστε', translateEN: 'make disappear', translateRU: 'уничтожать, прятать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 556, present: 'εξεγείρομαι', future: 'θα εξεγερθώ', aorist: 'εξεγέρθηκα', imperative: 'εξεγέρσου / εξεγερθείτε', translateEN: 'rebel, rise up', translateRU: 'восставать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 557, present: 'εξελίσσομαι', future: 'θα εξελιχθώ', aorist: 'εξελίχθηκα', imperative: null, translateEN: 'evolve', translateRU: 'развиваться, эволюционировать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 558, present: 'εξέρχομαι', future: 'θα εξέλθω', aorist: 'εξήλθα', imperative: 'έξελθε / εξέλθετε', translateEN: 'exit, go out', translateRU: 'выходить', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 559, present: 'εξετάζομαι', future: 'θα εξεταστώ', aorist: 'εξετάστηκα', imperative: 'εξετάσου / εξεταστείτε', translateEN: 'take an exam', translateRU: 'сдавать экзамен', lexicalCategory: ['lexicalWork','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
  {id: 560, present: 'εξετάζω', future: 'θα εξετάσω', aorist: 'εξέτασα', imperative: 'εξέτασε / εξετάστε', translateEN: 'examine', translateRU: 'исследовать, экзаменовать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 561, present: 'εξευτελίζω', future: 'θα εξευτελίσω', aorist: 'εξευτέλισα', imperative: 'εξευτέλισε / εξευτελίστε', translateEN: 'humiliate, degrade', translateRU: 'унижать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 562, present: 'εξηγώ', future: 'θα εξηγήσω', aorist: 'εξήγησα', imperative: 'εξήγησε / εξηγήστε', translateEN: 'explain', translateRU: 'объяснять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 563, present: 'εξημερώνω', future: 'θα εξημερώσω', aorist: 'εξημέρωσα', imperative: 'εξημέρωσε / εξημερώστε', translateEN: 'tame, domesticate', translateRU: 'приручать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 564, present: 'εξισώνω', future: 'θα εξισώσω', aorist: 'εξίσωσα', imperative: 'εξίσωσε / εξισώστε', translateEN: 'equalize, level', translateRU: 'уравнивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 565, present: 'εξοικονομώ', future: 'θα εξοικονομήσω', aorist: 'εξοικονόμησα', imperative: 'εξοικονόμησε / εξοικονομήστε', translateEN: 'save (money, time)', translateRU: 'экономить', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 566, present: 'εξολοθρεύω', future: 'θα εξολοθρεύσω', aorist: 'εξολόθρευσα', imperative: 'εξολόθρευσε / εξολοθρεύστε', translateEN: 'wipe out', translateRU: 'истреблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 567, present: 'εξομαλύνω', future: 'θα εξομαλύνω', aorist: 'εξόμαλυνα', imperative: 'εξόμαλυνε / εξομαλύνετε', translateEN: 'smooth out', translateRU: 'сглаживать, налаживать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 568, present: 'εξομολογούμαι', future: 'θα εξομολογηθώ', aorist: 'εξομολογήθηκα', imperative: 'εξομολογήσου / εξομολογηθείτε', translateEN: 'confess', translateRU: 'исповедоваться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 569, present: 'εξοντώνω', future: 'θα εξοντώσω', aorist: 'εξόντωσα', imperative: 'εξόντωσε / εξοντώστε', translateEN: 'exterminate', translateRU: 'уничтожать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 570, present: 'εξοργίζω', future: 'θα εξοργίσω', aorist: 'εξόργισα', imperative: 'εξόργισε / εξοργίστε', translateEN: 'enrage', translateRU: 'приводить в ярость', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 571, present: 'εξουδετερώνω', future: 'θα εξουδετερώσω', aorist: 'εξουδετέρωσα', imperative: 'εξουδετέρωσε / εξουδετερώστε', translateEN: 'neutralize', translateRU: 'нейтрализовать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 572, present: 'εξουσιάζω', future: 'θα εξουσιάσω', aorist: 'εξουσίασα', imperative: 'εξουσίασε / εξουσιάστε', translateEN: 'rule over', translateRU: 'властвовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 573, present: 'εξοφλώ', future: 'θα εξοφλήσω', aorist: 'εξόφλησα', imperative: 'εξόφλησε / εξοφλήστε', translateEN: 'pay off, settle', translateRU: 'погашать, оплачивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 574, present: 'εξυπηρετώ', future: 'θα εξυπηρετήσω', aorist: 'εξυπηρέτησα', imperative: 'εξυπηρέτησε / εξυπηρετήστε', translateEN: 'serve, help', translateRU: 'обслуживать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 575, present: 'επαινώ', future: 'θα επαινέσω', aorist: 'επαίνεσα', imperative: 'επαίνεσε / επαινέστε', translateEN: 'praise', translateRU: 'хвалить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 576, present: 'επακολουθώ', future: 'θα επακολουθήσω', aorist: 'επακολούθησα', imperative: 'επακολούθησε / επακολουθήστε', translateEN: 'follow, ensue', translateRU: 'следовать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 577, present: 'επαληθεύω', future: 'θα επαληθεύσω', aorist: 'επαλήθευσα', imperative: 'επαλήθευσε / επαληθεύστε', translateEN: 'verify', translateRU: 'проверять, подтверждать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 578, present: 'επαναλαμβάνω', future: 'θα επαναλάβω', aorist: 'επανέλαβα', imperative: 'επανάλαβε / επαναλάβετε', translateEN: 'repeat', translateRU: 'повторять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 579, present: 'επαναστατώ', future: 'θα επαναστατήσω', aorist: 'επαναστάτησα', imperative: 'επαναστάτησε / επαναστατήστε', translateEN: 'rebel', translateRU: 'бунтовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 580, present: 'επαναφέρω', future: 'θα επαναφέρω', aorist: 'επανέφερα', imperative: 'επανάφερε / επαναφέρετε', translateEN: 'restore, bring back', translateRU: 'возвращать, восстанавливать', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 581, present: 'επαναφορτίζω', future: 'θα επαναφορτίσω', aorist: 'επαναφόρτισα', imperative: 'επαναφόρτισε / επαναφορτίστε', translateEN: 'recharge', translateRU: 'перезаряжать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 582, present: 'επανεκκινώ', future: 'θα επανεκκινήσω', aorist: 'επανεκκίνησα', imperative: 'επανεκκίνησε / επανεκκινήστε', translateEN: 'restart', translateRU: 'перезапускать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 583, present: 'επανεμφανίζομαι', future: 'θα επανεμφανιστώ', aorist: 'επανεμφανίστηκα', imperative: 'επανεμφανίσου / επανεμφανιστείτε', translateEN: 'reappear', translateRU: 'появляться снова', lexicalCategory: ['lexicalMotion','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 584, present: 'επανέρχομαι', future: 'θα επανέλθω', aorist: 'επανήλθα', imperative: 'επάνελθε / επανέλθετε', translateEN: 'return, recur', translateRU: 'возвращаться', lexicalCategory: ['lexicalMotion','lexicalTime'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 585, present: 'επεκτείνω', future: null, aorist: 'επέκτεινα', imperative: 'επέκτεινε / επεκτείνετε', translateEN: 'extend', translateRU: 'расширять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 586, present: 'επενδύομαι', future: 'θα επενδυθώ', aorist: 'επενδύθηκα', imperative: 'επενδύσου / επενδυθείτε', translateEN: 'be invested', translateRU: 'быть вложенным', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 587, present: 'επενδύω', future: 'θα επενδύσω', aorist: 'επένδυσα', imperative: 'επένδυσε / επενδύστε', translateEN: 'invest', translateRU: 'инвестировать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 588, present: 'επεξεργάζομαι', future: 'θα επεξεργαστώ', aorist: 'επεξεργάστηκα', imperative: 'επεξεργάσου / επεξεργαστείτε', translateEN: 'process, edit', translateRU: 'обрабатывать, редактировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 589, present: 'επηρεάζω', future: 'θα επηρεάσω', aorist: 'επηρέασα', imperative: 'επηρέασε / επηρεάστε', translateEN: 'affect, influence', translateRU: 'влиять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 590, present: 'επιβάλλω', future: 'θα επιβάλω', aorist: 'επέβαλα', imperative: 'επίβαλε / επιβάλετε', translateEN: 'impose', translateRU: 'навязывать, налагать', lexicalCategory: ['lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 591, present: 'επιβεβαιώνω', future: 'θα επιβεβαιώσω', aorist: 'επιβεβαίωσα', imperative: 'επιβεβαίωσε / επιβεβαιώστε', translateEN: 'confirm', translateRU: 'подтверждать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 592, present: 'επιβιβάζομαι', future: 'θα επιβιβαστώ', aorist: 'επιβιβάστηκα', imperative: 'επιβιβάσου / επιβιβαστείτε', translateEN: 'board, get on', translateRU: 'садиться (на транспорт)', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 593, present: 'επιβιβάζω', future: 'θα επιβιβάσω', aorist: 'επιβίβασα', imperative: 'επιβίβασε / επιβιβάστε', translateEN: 'put on board', translateRU: 'сажать на борт', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 594, present: 'επιβιώνω', future: 'θα επιβιώσω', aorist: 'επιβίωσα', imperative: null, translateEN: 'survive', translateRU: 'выживать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 595, present: 'επιβλέπω', future: 'θα επιβλέψω', aorist: 'επέβλεψα', imperative: 'επίβλεψε / επιβλέψτε', translateEN: 'oversee', translateRU: 'наблюдать, руководить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 596, present: 'επιβραδύνω', future: 'θα επιβραδύνω', aorist: 'επιβράδυνα', imperative: 'επιβράδυνε / επιβραδύνετε', translateEN: 'slow down', translateRU: 'замедлять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 597, present: 'επιδεικνύω', future: 'θα επιδείξω', aorist: 'επέδειξα', imperative: 'επίδειξε / επιδείξτε', translateEN: 'show off, display', translateRU: 'демонстрировать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 598, present: 'επιδεινώνω', future: 'θα επιδεινώσω', aorist: 'επιδείνωσα', imperative: 'επιδείνωσε / επιδεινώστε', translateEN: 'worsen', translateRU: 'ухудшать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 599, present: 'επιδιορθώνω', future: 'θα επιδιορθώσω', aorist: 'επιδιόρθωσα', imperative: 'επιδιόρθωσε / επιδιορθώστε', translateEN: 'repair, fix', translateRU: 'ремонтировать, чинить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 600, present: 'επιδιώκω', future: 'θα επιδιώξω', aorist: 'επιδίωξα', imperative: 'επιδίωξε / επιδιώξτε', translateEN: 'seek, pursue', translateRU: 'стремиться, добиваться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 601, present: 'επιδοτώ', future: 'θα επιδοτήσω', aorist: 'επιδότησα', imperative: 'επιδότησε / επιδοτήστε', translateEN: 'subsidize', translateRU: 'субсидировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 602, present: 'επιθυμώ', future: 'θα επιθυμήσω', aorist: 'επιθύμησα', imperative: null, translateEN: 'desire', translateRU: 'желать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 603, present: 'επικοινωνώ', future: 'θα επικοινωνήσω', aorist: 'επικοινώνησα', imperative: 'επικοινώνησε / επικοινωνήστε', translateEN: 'communicate, contact', translateRU: 'общаться, связываться', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 604, present: 'επικολλώ', future: 'θα επικολλήσω', aorist: 'επικόλλησα', imperative: 'επικόλλησε / επικολλήστε', translateEN: 'paste', translateRU: 'вставлять (скопированное)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 605, present: 'επικονιάζω', future: 'θα επικονιάσω', aorist: 'επικονίασα', imperative: 'επικονίασε / επικονιάστε', translateEN: 'pollinate', translateRU: 'опылять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 606, present: 'επικρατώ', future: 'θα επικρατήσω', aorist: 'επικράτησα', imperative: 'επικράτησε / επικρατήστε', translateEN: 'prevail', translateRU: 'преобладать, торжествовать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 607, present: 'επιλέγω', future: 'θα επιλέξω', aorist: 'επέλεξα', imperative: 'επίλεξε / επιλέξτε', translateEN: 'select', translateRU: 'выбирать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 608, present: 'επιλύω', future: 'θα επιλύσω', aorist: 'επέλυσα', imperative: 'επίλυσε / επιλύστε', translateEN: 'resolve, solve', translateRU: 'разрешать (проблему)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 609, present: 'επιμελούμαι', future: 'θα επιμεληθώ', aorist: 'επιμελήθηκα', imperative: 'επιμελήσου / επιμεληθείτε', translateEN: 'edit, take care of', translateRU: 'редактировать, заботиться', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 610, present: 'επιμένω', future: 'θα επιμείνω', aorist: 'επέμεινα', imperative: 'επίμεινε / επιμείνετε', translateEN: 'insist', translateRU: 'настаивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 611, present: 'επιπίπτω', future: 'θα επιπέσω', aorist: 'επέπεσα', imperative: 'επίπεσε / επιπέστε', translateEN: 'fall upon', translateRU: 'нападать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 612, present: 'επιπλέω', future: 'θα επιπλεύσω', aorist: 'επέπλευσα', imperative: 'επίπλευσε / επιπλεύστε', translateEN: 'float', translateRU: 'плавать на поверхности', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 613, present: 'επιπλήττω', future: 'θα επιπλήξω', aorist: 'επέπληξα', imperative: 'επίπληξε / επιπλήξτε', translateEN: 'reprimand', translateRU: 'делать выговор, порицать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 614, present: 'επιπλώνω', future: 'θα επιπλώσω', aorist: 'επίπλωσα', imperative: 'επίπλωσε / επιπλώστε', translateEN: 'furnish', translateRU: 'обставлять мебелью', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 615, present: 'επισκέπτομαι', future: 'θα επισκεφτώ', aorist: 'επισκέφτηκα', imperative: 'επισκέψου / επισκεφτείτε', translateEN: 'visit', translateRU: 'посещать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 616, present: 'επισκευάζω', future: 'θα επισκευάσω', aorist: 'επισκεύασα', imperative: 'επισκεύασε / επισκευάστε', translateEN: 'repair', translateRU: 'ремонтировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 617, present: 'επισπεύδω', future: 'θα επισπεύσω', aorist: 'επέσπευσα', imperative: 'επίσπευσε / επισπεύστε', translateEN: 'speed up', translateRU: 'ускорять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 618, present: 'επιστρατεύω', future: 'θα επιστρατεύσω', aorist: 'επιστράτευσα', imperative: 'επιστράτευσε / επιστρατεύστε', translateEN: 'mobilize, enlist', translateRU: 'мобилизовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 619, present: 'επιστρέφω', future: 'θα επιστρέψω', aorist: 'επέστρεψα', imperative: 'επίστρεψε / επιστρέψτε', translateEN: 'return', translateRU: 'возвращаться, возвращать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
  {id: 620, present: 'επιταχύνω', future: null, aorist: 'επιτάχυνα', imperative: 'επιτάχυνε / επιταχύνετε', translateEN: 'accelerate', translateRU: 'ускорять', lexicalCategory: ['lexicalMotion','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 621, present: 'επιτηρώ', future: 'θα επιτηρήσω', aorist: 'επιτήρησα', imperative: 'επιτήρησε / επιτηρήστε', translateEN: 'supervise, invigilate', translateRU: 'надзирать, следить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 622, present: 'επιτίθεμαι', future: 'θα επιτεθώ', aorist: 'επιτέθηκα', imperative: null, translateEN: 'attack', translateRU: 'нападать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 623, present: 'επιτρέπω', future: 'θα επιτρέψω', aorist: 'επέτρεψα', imperative: 'επίτρεψε / επιτρέψτε', translateEN: 'allow', translateRU: 'разрешать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 624, present: 'επιτυγχάνω', future: 'θα επιτύχω', aorist: 'επέτυχα', imperative: 'επίτυχε / επιτύχετε', translateEN: 'achieve, succeed', translateRU: 'достигать, добиваться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 625, present: 'επιχειρώ', future: 'θα επιχειρήσω', aorist: 'επιχείρησα', imperative: 'επιχείρησε / επιχειρήστε', translateEN: 'attempt', translateRU: 'пытаться, предпринимать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
  {id: 626, present: 'επιχορηγώ', future: 'θα επιχορηγήσω', aorist: 'επιχορήγησα', imperative: 'επιχορήγησε / επιχορηγήστε', translateEN: 'grant funds to', translateRU: 'субсидировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 627, present: 'εποπτεύω', future: 'θα εποπτεύσω', aorist: 'επόπτευσα', imperative: 'επόπτευσε / εποπτεύστε', translateEN: 'supervise', translateRU: 'надзирать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 628, present: 'επουλώνω', future: 'θα επουλώσω', aorist: 'επούλωσα', imperative: 'επούλωσε / επουλώστε', translateEN: 'heal (a wound)', translateRU: 'заживлять', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 629, present: 'εργάζομαι', future: 'θα εργαστώ', aorist: 'εργάστηκα', imperative: 'εργάσου / εργαστείτε', translateEN: 'work', translateRU: 'работать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammarMedial']},
  {id: 630, present: 'εργοδοτώ', future: 'θα εργοδοτήσω', aorist: 'εργοδότησα', imperative: 'εργοδότησε / εργοδοτήστε', translateEN: 'employ', translateRU: 'нанимать, давать работу', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 631, present: 'ερεθίζω', future: 'θα ερεθίσω', aorist: 'ερέθισα', imperative: 'ερέθισε / ερεθίστε', translateEN: 'irritate, arouse', translateRU: 'раздражать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 632, present: 'ερευνώ', future: 'θα ερευνήσω', aorist: 'ερεύνησα', imperative: 'ερεύνησε / ερευνήστε', translateEN: 'investigate, research', translateRU: 'исследовать, расследовать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 633, present: 'ερμηνεύω', future: 'θα ερμηνεύσω', aorist: 'ερμήνευσα', imperative: 'ερμήνευσε / ερμηνεύστε', translateEN: 'interpret', translateRU: 'толковать, исполнять', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 634, present: 'έρχομαι', future: 'θα έρθω', aorist: 'ήρθα', imperative: 'έλα / ελάτε', translateEN: 'come', translateRU: 'приходить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 635, present: 'ερωτεύομαι', future: 'θα ερωτευτώ', aorist: 'ερωτεύτηκα', imperative: 'ερωτεύσου / ερωτευτείτε', translateEN: 'fall in love', translateRU: 'влюбляться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 636, present: 'ερωτώ', future: 'θα ερωτήσω', aorist: 'ερώτησα', imperative: 'ερώτησε / ερωτήστε', translateEN: 'ask', translateRU: 'спрашивать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 637, present: 'ετοιμάζομαι', future: 'θα ετοιμαστώ', aorist: 'ετοιμάστηκα', imperative: 'ετοιμάσου / ετοιμαστείτε', translateEN: 'get ready', translateRU: 'готовиться', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 638, present: 'ετοιμάζω', future: 'θα ετοιμάσω', aorist: 'ετοίμασα', imperative: 'ετοίμασε / ετοιμάστε', translateEN: 'prepare', translateRU: 'готовить, подготавливать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 639, present: 'ευδοκιμώ', future: 'θα ευδοκιμήσω', aorist: 'ευδοκίμησα', imperative: 'ευδοκίμησε / ευδοκιμήστε', translateEN: 'thrive, flourish', translateRU: 'процветать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 640, present: 'ευημερώ', future: 'θα ευημερήσω', aorist: 'ευημέρησα', imperative: 'ευημέρησε / ευημερήστε', translateEN: 'prosper', translateRU: 'благоденствовать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
  {id: 641, present: 'ευλογούμαι', future: 'θα ευλογηθώ', aorist: 'ευλογήθηκα', imperative: 'ευλογήσου / ευλογηθείτε', translateEN: 'be blessed', translateRU: 'быть благословлённым', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 642, present: 'ευλογώ', future: 'θα ευλογήσω', aorist: 'ευλόγησα', imperative: 'ευλόγησε / ευλογήστε', translateEN: 'bless', translateRU: 'благословлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 643, present: 'ευτυχώ', future: 'θα ευτυχήσω', aorist: 'ευτύχησα', imperative: 'ευτύχησε / ευτυχήστε', translateEN: 'be happy, be fortunate', translateRU: 'быть счастливым', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 644, present: 'ευφραίνω', future: 'θα ευφράνω', aorist: 'εύφρανα', imperative: 'εύφρανε / ευφράνετε', translateEN: 'delight, gladden', translateRU: 'радовать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 645, present: 'ευχαριστιέμαι', future: 'θα ευχαριστηθώ', aorist: 'ευχαριστήθηκα', imperative: null, translateEN: 'enjoy, take pleasure', translateRU: 'получать удовольствие', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 646, present: 'ευχαριστώ', future: 'θα ευχαριστήσω', aorist: 'ευχαρίστησα', imperative: 'ευχαρίστησε / ευχαριστήστε', translateEN: 'thank, please', translateRU: 'благодарить, радовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 647, present: 'εύχομαι', future: 'θα ευχηθώ', aorist: 'ευχήθηκα', imperative: 'ευχήσου / ευχηθείτε', translateEN: 'wish', translateRU: 'желать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 648, present: 'εφαρμόζω', future: 'θα εφαρμόσω', aorist: 'εφάρμοσα', imperative: 'εφάρμοσε / εφαρμόστε', translateEN: 'apply, fit', translateRU: 'применять, подходить по размеру', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 649, present: 'εφευρίσκω', future: 'θα εφεύρω', aorist: 'εφηύρα', imperative: null, translateEN: 'invent', translateRU: 'изобретать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 650, present: 'εφοδιάζω', future: 'θα εφοδιάσω', aorist: 'εφοδίασα', imperative: 'εφοδίασε / εφοδιάστε', translateEN: 'supply', translateRU: 'снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 651, present: 'έχω', future: null, aorist: 'είχα', imperative: 'έχε / έχετε', translateEN: 'have', translateRU: 'иметь', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 652, present: 'ζαλίζω', future: 'θα ζαλίσω', aorist: 'ζάλισα', imperative: 'ζάλισε / ζαλίστε', translateEN: 'make dizzy', translateRU: 'кружить голову', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 653, present: 'ζαρώνω', future: 'θα ζαρώσω', aorist: 'ζάρωσα', imperative: 'ζάρωσε / ζαρώστε', translateEN: 'wrinkle, shrivel', translateRU: 'морщиться, съёживаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 654, present: 'ζεματίζω', future: 'θα ζεματίσω', aorist: 'ζέματισα', imperative: 'ζέματισε / ζεματίστε', translateEN: 'scald', translateRU: 'ошпаривать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 655, present: 'ζεσταίνομαι', future: 'θα ζεσταθώ', aorist: 'ζεστάθηκα', imperative: 'ζεστάσου / ζεσταθείτε', translateEN: 'get warm', translateRU: 'согреваться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 656, present: 'ζεσταίνω', future: 'θα ζεστάνω', aorist: 'ζέστανα', imperative: 'ζέστανε / ζεστάνετε', translateEN: 'warm up', translateRU: 'греть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 657, present: 'ζευγαρώνω', future: 'θα ζευγαρώσω', aorist: 'ζευγάρωσα', imperative: 'ζευγάρωσε / ζευγαρώστε', translateEN: 'mate, pair up', translateRU: 'спариваться, сочетать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 658, present: 'ζηλεύομαι', future: 'θα ζηλευτώ', aorist: 'ζηλεύτηκα', imperative: 'ζηλέψου / ζηλευτείτε', translateEN: 'be envied', translateRU: 'вызывать зависть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 659, present: 'ζηλεύω', future: 'θα ζηλέψω', aorist: 'ζήλεψα', imperative: 'ζήλεψε / ζηλέψτε', translateEN: 'be jealous, envy', translateRU: 'ревновать, завидовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 660, present: 'ζηλοτυπώ', future: 'θα ζηλοτυπήσω', aorist: 'ζηλοτύπησα', imperative: 'ζηλοτύπησε / ζηλοτυπήστε', translateEN: 'be jealous', translateRU: 'ревновать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 661, present: 'ζητώ', future: 'θα ζητήσω', aorist: 'ζήτησα', imperative: 'ζήτησε / ζητήστε', translateEN: 'ask for, request', translateRU: 'просить, требовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 662, present: 'ζητωκραυγάζω', future: 'θα ζητωκραυγάσω', aorist: 'ζητωκραύγασα', imperative: 'ζητωκραύγασε / ζητωκραυγάστε', translateEN: 'cheer, acclaim', translateRU: 'приветствовать криками', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 663, present: 'ζορίζω', future: 'θα ζορίσω', aorist: 'ζόρισα', imperative: 'ζόρισε / ζορίστε', translateEN: 'strain, pressure', translateRU: 'давить, напрягать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 664, present: 'ζουλώ', future: 'θα ζουλήξω', aorist: 'ζούληξα', imperative: 'ζούληξε / ζουλήξτε', translateEN: 'squeeze', translateRU: 'давить, сжимать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 665, present: 'ζυγίζω', future: 'θα ζυγίσω', aorist: 'ζύγισα', imperative: 'ζύγισε / ζυγίστε', translateEN: 'weigh', translateRU: 'взвешивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 666, present: 'ζυμώνω', future: 'θα ζυμώσω', aorist: 'ζύμωσα', imperative: 'ζύμωσε / ζυμώστε', translateEN: 'knead', translateRU: 'месить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 667, present: 'ζω', future: 'θα ζήσω', aorist: 'έζησα', imperative: 'ζήσε / ζήστε', translateEN: 'live', translateRU: 'жить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 668, present: 'ζωγραφίζω', future: 'θα ζωγραφίσω', aorist: 'ζωγράφισα', imperative: 'ζωγράφισε / ζωγραφίστε', translateEN: 'paint, draw', translateRU: 'рисовать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 669, present: 'ζώνομαι', future: 'θα ζωστώ', aorist: 'ζώστηκα', imperative: 'ζώσου / ζωστείτε', translateEN: 'fasten one\'s belt', translateRU: 'опоясываться, пристёгиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 670, present: 'ζωντανεύω', future: 'θα ζωντανέψω', aorist: 'ζωντάνεψα', imperative: 'ζωντάνεψε / ζωντανέψτε', translateEN: 'come alive, revive', translateRU: 'оживать, оживлять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 671, present: 'ζώνω', future: 'θα ζώσω', aorist: 'έζωσα', imperative: 'ζώσε / ζώστε', translateEN: 'gird, belt', translateRU: 'опоясывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 672, present: 'ηγούμαι', future: 'θα ηγηθώ', aorist: 'ηγήθηκα', imperative: 'ηγήσου / ηγηθείτε', translateEN: 'lead', translateRU: 'возглавлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 673, present: 'ηλεκτρίζω', future: 'θα ηλεκτρίσω', aorist: 'ηλέκτρισα', imperative: 'ηλέκτρισε / ηλεκτρίστε', translateEN: 'electrify', translateRU: 'электризовать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 674, present: 'ηλεκτροδοτώ', future: 'θα ηλεκτροδοτήσω', aorist: 'ηλεκτροδότησα', imperative: 'ηλεκτροδότησε / ηλεκτροδοτήστε', translateEN: 'supply with electricity', translateRU: 'подавать электричество', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 675, present: 'ηρεμώ', future: 'θα ηρεμήσω', aorist: 'ηρέμησα', imperative: 'ηρέμησε / ηρεμήστε', translateEN: 'calm down', translateRU: 'успокаиваться', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar2']},
  {id: 676, present: 'ησυχάζω', future: 'θα ησυχάσω', aorist: 'ησύχασα', imperative: 'ησύχασε / ησυχάστε', translateEN: 'quiet down', translateRU: 'затихать, успокаиваться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 677, present: 'ηχογραφώ', future: 'θα ηχογραφήσω', aorist: 'ηχογράφησα', imperative: 'ηχογράφησε / ηχογραφήστε', translateEN: 'record (sound)', translateRU: 'записывать звук', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2']},
  {id: 678, present: 'ηχώ', future: 'θα ηχήσω', aorist: 'ήχησα', imperative: null, translateEN: 'sound, resound', translateRU: 'звучать, раздаваться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 679, present: 'θάβω', future: 'θα θάψω', aorist: 'έθαψα', imperative: 'θάψε / θάψτε', translateEN: 'bury', translateRU: 'хоронить, зарывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 680, present: 'θαμπώνομαι', future: 'θα θαμπωθώ', aorist: 'θαμπώθηκα', imperative: 'θαμπώσου / θαμπωθείτε', translateEN: 'be dazzled', translateRU: 'быть ослеплённым', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
  {id: 681, present: 'θαμπώνω', future: 'θα θαμπώσω', aorist: 'θάμπωσα', imperative: 'θάμπωσε / θαμπώστε', translateEN: 'dazzle, blur', translateRU: 'слепить, затуманивать', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 682, present: 'θαρρώ', future: 'θα θαρρέψω', aorist: 'θάρρεψα', imperative: null, translateEN: 'think, believe', translateRU: 'полагать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 683, present: 'θαυμάζομαι', future: 'θα θαυμαστώ', aorist: 'θαυμάστηκα', imperative: 'θαυμάσου / θαυμαστείτε', translateEN: 'be admired', translateRU: 'вызывать восхищение', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
  {id: 684, present: 'θαυμάζω', future: 'θα θαυμάσω', aorist: 'θαύμασα', imperative: 'θαύμασε / θαυμάστε', translateEN: 'admire', translateRU: 'восхищаться', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 685, present: 'θέλω', future: 'θα θελήσω', aorist: 'θέλησα', imperative: null, translateEN: 'want', translateRU: 'хотеть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 686, present: 'θεμελιώνω', future: 'θα θεμελιώσω', aorist: 'θεμελίωσα', imperative: 'θεμελίωσε / θεμελιώστε', translateEN: 'found, establish', translateRU: 'закладывать, обосновывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 687, present: 'θεραπεύομαι', future: 'θα θεραπευτώ', aorist: 'θεραπεύτηκα', imperative: 'θεραπεύσου / θεραπευτείτε', translateEN: 'be cured, undergo treatment', translateRU: 'лечиться', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammarMedial']},
  {id: 688, present: 'θεραπεύω', future: 'θα θεραπεύσω', aorist: 'θεράπευσα', imperative: 'θεράπευσε / θεραπεύστε', translateEN: 'cure, treat', translateRU: 'лечить', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 689, present: 'θερίζω', future: 'θα θερίσω', aorist: 'θέρισα', imperative: 'θέρισε / θερίστε', translateEN: 'reap', translateRU: 'жать, косить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 690, present: 'θερμαίνω', future: 'θα θερμάνω', aorist: 'θέρμανα', imperative: 'θέρμανε / θερμάνετε', translateEN: 'heat', translateRU: 'нагревать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 691, present: 'θεσπίζω', future: 'θα θεσπίσω', aorist: 'θέσπισα', imperative: 'θέσπισε / θεσπίστε', translateEN: 'enact', translateRU: 'устанавливать (закон)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 692, present: 'θέτω', future: 'θα θέσω', aorist: 'έθεσα', imperative: 'θέσε / θέστε', translateEN: 'put, set, pose', translateRU: 'ставить, полагать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 693, present: 'θεωρώ', future: 'θα θεωρήσω', aorist: 'θεώρησα', imperative: 'θεώρησε / θεωρήστε', translateEN: 'consider', translateRU: 'считать, рассматривать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 694, present: 'θηλάζω', future: 'θα θηλάσω', aorist: 'θήλασα', imperative: 'θήλασε / θηλάστε', translateEN: 'breastfeed', translateRU: 'кормить грудью', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 695, present: 'θίγω', future: 'θα θίξω', aorist: 'έθιξα', imperative: 'θίξε / θίξτε', translateEN: 'touch upon, offend', translateRU: 'затрагивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 696, present: 'θλίβομαι', future: 'θα θλιβώ', aorist: 'θλίφτηκα', imperative: 'θλίψου / θλιφτείτε', translateEN: 'be sad', translateRU: 'грустить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 697, present: 'θλίβω', future: 'θα θλίψω', aorist: 'έθλιψα', imperative: 'θλίψε / θλίψτε', translateEN: 'grieve, sadden', translateRU: 'печалить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 698, present: 'θρέφω', future: 'θα θρέψω', aorist: 'έθρεψα', imperative: 'θρέψε / θρέψτε', translateEN: 'feed, nourish', translateRU: 'кормить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 699, present: 'θρηνώ', future: 'θα θρηνήσω', aorist: 'θρήνησα', imperative: 'θρήνησε / θρηνήστε', translateEN: 'mourn', translateRU: 'оплакивать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 700, present: 'θρυμματίζομαι', future: 'θα θρυμματιστώ', aorist: 'θρυμματίστηκα', imperative: 'θρυμματίσου / θρυμματιστείτε', translateEN: 'shatter', translateRU: 'разбиваться вдребезги', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
  {id: 701, present: 'θρυμματίζω', future: 'θα θρυμματίσω', aorist: 'θρυμμάτισα', imperative: 'θρυμμάτισε / θρυμματίστε', translateEN: 'shatter, crumble', translateRU: 'крошить, дробить', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 702, present: 'θυμάμαι', future: 'θα θυμηθώ', aorist: 'θυμήθηκα', imperative: 'θυμήσου / θυμηθείτε', translateEN: 'remember', translateRU: 'помнить, вспоминать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammarMedial']},
  {id: 703, present: 'θυμίζω', future: 'θα θυμίσω', aorist: 'θύμισα', imperative: 'θύμισε / θυμίστε', translateEN: 'remind', translateRU: 'напоминать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 704, present: 'θυμώνω', future: 'θα θυμώσω', aorist: 'θύμωσα', imperative: 'θύμωσε / θυμώστε', translateEN: 'anger; get angry', translateRU: 'сердить; сердиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 705, present: 'θυσιάζω', future: 'θα θυσιάσω', aorist: 'θυσίασα', imperative: 'θυσίασε / θυσιάστε', translateEN: 'sacrifice', translateRU: 'жертвовать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 706, present: 'ιδρύω', future: 'θα ιδρύσω', aorist: 'ίδρυσα', imperative: 'ίδρυσε / ιδρύστε', translateEN: 'found', translateRU: 'основывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 707, present: 'ιδρώνω', future: 'θα ιδρώσω', aorist: 'ίδρωσα', imperative: null, translateEN: 'sweat', translateRU: 'потеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 708, present: 'ιεραρχώ', future: 'θα ιεραρχήσω', aorist: 'ιεράρχησα', imperative: 'ιεράρχησε / ιεραρχήστε', translateEN: 'prioritize, rank', translateRU: 'выстраивать иерархию', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 709, present: 'ικανοποιώ', future: 'θα ικανοποιήσω', aorist: 'ικανοποίησα', imperative: 'ικανοποίησε / ικανοποιήστε', translateEN: 'satisfy', translateRU: 'удовлетворять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 710, present: 'ικετεύω', future: 'θα ικετεύσω', aorist: 'ικέτευσα', imperative: 'ικέτευσε / ικετεύστε', translateEN: 'beg, plead', translateRU: 'умолять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 711, present: 'ιονίζω', future: 'θα ιονίσω', aorist: 'ιόνισα', imperative: 'ιόνισε / ιονίστε', translateEN: 'ionize', translateRU: 'ионизировать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 712, present: 'ισοπεδώνω', future: 'θα ισοπεδώσω', aorist: 'ισοπέδωσα', imperative: 'ισοπέδωσε / ισοπεδώστε', translateEN: 'level, raze', translateRU: 'выравнивать, сравнивать с землёй', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 713, present: 'ισορροπώ', future: 'θα ισορροπήσω', aorist: 'ισορρόπησα', imperative: 'ισορρόπησε / ισορροπήστε', translateEN: 'balance', translateRU: 'балансировать, уравновешивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 714, present: 'ισοφαρίζω', future: 'θα ισοφαρίσω', aorist: 'ισοφάρισα', imperative: 'ισοφάρισε / ισοφαρίστε', translateEN: 'equalize', translateRU: 'сравнивать счёт', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
  {id: 715, present: 'ιστιοπλοώ', future: 'θα ιστιοπλοήσω', aorist: 'ιστιοπλόησα', imperative: 'ιστιοπλόησε / ιστιοπλοήστε', translateEN: 'sail (sport)', translateRU: 'ходить под парусом', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 716, present: 'ισχύω', future: 'θα ισχύσω', aorist: 'ίσχυσα', imperative: null, translateEN: 'be valid', translateRU: 'действовать, быть в силе', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 717, present: 'καβουρδίζω', future: 'θα καβουρδίσω', aorist: 'καβούρδισα', imperative: 'καβούρδισε / καβουρδίστε', translateEN: 'roast (coffee, nuts)', translateRU: 'обжаривать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 718, present: 'καθαρίζω', future: 'θα καθαρίσω', aorist: 'καθάρισα', imperative: 'καθάρισε / καθαρίστε', translateEN: 'clean', translateRU: 'чистить, убирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 719, present: 'καθησυχάζω', future: 'θα καθησυχάσω', aorist: 'καθησύχασα', imperative: 'καθησύχασε / καθησυχάστε', translateEN: 'reassure, calm', translateRU: 'успокаивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 720, present: 'καθίζω', future: 'θα καθίσω', aorist: 'κάθισα', imperative: 'κάθισε / καθίστε', translateEN: 'seat, sit down (someone)', translateRU: 'усаживать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
  {id: 721, present: 'καθιστώ', future: 'θα καταστήσω', aorist: 'κατέστησα', imperative: 'κατάστησε / καταστήστε', translateEN: 'render, make', translateRU: 'делать (каким-л.)', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
  {id: 722, present: 'καθοδηγώ', future: 'θα καθοδηγήσω', aorist: 'καθοδήγησα', imperative: 'καθοδήγησε / καθοδηγήστε', translateEN: 'guide, mentor', translateRU: 'наставлять, направлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 723, present: 'κάθομαι', future: 'θα κάτσω', aorist: 'κάθισα', imperative: 'κάτσε / κάτσετε', translateEN: 'sit', translateRU: 'сидеть, садиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 724, present: 'καθορίζω', future: 'θα καθορίσω', aorist: 'καθόρισα', imperative: 'καθόρισε / καθορίστε', translateEN: 'determine, set', translateRU: 'определять, устанавливать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 725, present: 'καθυστερούμαι', future: 'θα καθυστερηθώ', aorist: 'καθυστερήθηκα', imperative: 'καθυστερήσου / καθυστερηθείτε', translateEN: 'be delayed', translateRU: 'задерживаться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
  {id: 726, present: 'καθυστερώ', future: 'θα καθυστερήσω', aorist: 'καθυστέρησα', imperative: 'καθυστέρησε / καθυστερήστε', translateEN: 'delay', translateRU: 'задерживать, опаздывать', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar2']},
  {id: 727, present: 'καίγομαι', future: 'θα καώ', aorist: 'κάηκα', imperative: 'κάψου / καείτε', translateEN: 'burn oneself', translateRU: 'обжигаться, гореть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
  {id: 728, present: 'καίω', future: 'θα κάψω', aorist: 'έκαψα', imperative: 'κάψε / κάψτε', translateEN: 'burn', translateRU: 'жечь', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 729, present: 'κακολογώ', future: 'θα κακολογήσω', aorist: 'κακολόγησα', imperative: 'κακολόγησε / κακολογήστε', translateEN: 'speak ill of', translateRU: 'злословить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
  {id: 730, present: 'κακομαθαίνω', future: 'θα κακομάθω', aorist: 'κακόμαθα', imperative: 'κακόμαθε / κακομάθετε', translateEN: 'spoil', translateRU: 'баловать, портить воспитанием', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 731, present: 'καλημερίζω', future: 'θα καλημερίσω', aorist: 'καλημέρισα', imperative: 'καλημέρισε / καλημερίστε', translateEN: 'say good morning', translateRU: 'желать доброго утра', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 732, present: 'καλλιεργώ', future: 'θα καλλιεργήσω', aorist: 'καλλιέργησα', imperative: 'καλλιέργησε / καλλιεργήστε', translateEN: 'cultivate', translateRU: 'выращивать, культивировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
  {id: 733, present: 'καλμάρω', future: 'θα καλμάρω', aorist: 'κάλμαρα', imperative: 'κάλμαρε / καλμάρετε', translateEN: 'calm down', translateRU: 'успокаиваться, стихать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
  {id: 734, present: 'καλύπτω', future: 'θα καλύψω', aorist: 'κάλυψα', imperative: 'κάλυψε / καλύψτε', translateEN: 'cover', translateRU: 'покрывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 735, present: 'καλώ', future: 'θα καλέσω', aorist: 'κάλεσα', imperative: 'κάλεσε / καλέστε', translateEN: 'call, invite', translateRU: 'звать, приглашать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
  {id: 736, present: 'καλωσορίζω', future: 'θα καλωσορίσω', aorist: 'καλωσόρισα', imperative: 'καλωσόρισε / καλωσορίστε', translateEN: 'welcome', translateRU: 'приветствовать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 737, present: 'καμαρώνω', future: 'θα καμαρώσω', aorist: 'καμάρωσα', imperative: 'καμάρωσε / καμαρώστε', translateEN: 'be proud, admire', translateRU: 'гордиться, любоваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
  {id: 738, present: 'κάμπτω', future: 'θα κάμψω', aorist: 'έκαμψα', imperative: 'κάμψε / κάμψτε', translateEN: 'bend, bow, break (resistance)', translateRU: 'сгибать, ломать (сопротивление)', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
  {id: 739, present: 'καμώνομαι', future: 'θα καμωθώ', aorist: 'καμώθηκα', imperative: 'καμώσου / καμωθείτε', translateEN: 'pretend', translateRU: 'притворяться, делать вид', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
  {id: 740, present: 'κανονίζω', future: 'θα κανονίσω', aorist: 'κανόνισα', imperative: 'κανόνισε / κανονίστε', translateEN: 'arrange', translateRU: 'устраивать, улаживать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
  {id: 741, present: 'κάνω', future: null, aorist: 'έκανα', imperative: 'κάνε / κάντε', translateEN: 'do, make', translateRU: 'делать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
  {id: 742, present: 'καπνίζω', future: 'θα καπνίσω', aorist: 'κάπνισα', imperative: 'κάπνισε / καπνίστε', translateEN: 'smoke', translateRU: 'курить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 743, present: 'καρπίζω', future: 'θα καρπίσω', aorist: 'κάρπισα', imperative: 'κάρπισε / καρπίστε', translateEN: 'bear fruit', translateRU: 'плодоносить', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 744, present: 'καρφώνω', future: 'θα καρφώσω', aorist: 'κάρφωσα', imperative: 'κάρφωσε / καρφώστε', translateEN: 'nail', translateRU: 'забивать (гвоздь)', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 745, present: 'καταβροχθίζω', future: 'θα καταβροχθίσω', aorist: 'καταβρόχθισα', imperative: 'καταβρόχθισε / καταβροχθίστε', translateEN: 'devour, gobble up', translateRU: 'пожирать, проглатывать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
  {id: 746, present: 'καταγγέλλω', future: 'θα καταγγείλω', aorist: 'κατήγγειλα', imperative: 'κατάγγειλε / καταγγείλετε', translateEN: 'report, denounce', translateRU: 'заявлять, обвинять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
  {id: 747, present: 'καταγράφω', future: 'θα καταγράψω', aorist: 'κατέγραψα', imperative: 'κατάγραψε / καταγράψτε', translateEN: 'record, list', translateRU: 'записывать, регистрировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
  {id: 748, present: 'καταδίδω', future: 'θα καταδώσω', aorist: 'κατέδωσα', imperative: 'κατάδωσε / καταδώστε', translateEN: 'inform on, betray', translateRU: 'доносить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 749, present: 'καταδικάζομαι', future: 'θα καταδικαστώ', aorist: 'καταδικάστηκα', imperative: 'καταδικάσου / καταδικαστείτε', translateEN: 'be sentenced', translateRU: 'быть осуждённым', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 750, present: 'καταδικάζω', future: 'θα καταδικάσω', aorist: 'καταδίκασα', imperative: 'καταδίκασε / καταδικάστε', translateEN: 'condemn, sentence', translateRU: 'осуждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 751, present: 'καταδύομαι', future: 'θα καταδυθώ', aorist: 'καταδύθηκα', imperative: 'καταδύσου / καταδυθείτε', translateEN: 'dive, submerge', translateRU: 'погружаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 752, present: 'καταθέτω', future: 'θα καταθέσω', aorist: 'κατέθεσα', imperative: 'κατάθεσε / καταθέστε', translateEN: 'deposit, testify', translateRU: 'вносить, давать показания', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 753, present: 'καταιγίζω', future: 'θα καταιγίσω', aorist: 'καταίγισα', imperative: 'καταίγισε / καταιγίστε', translateEN: 'storm, rage', translateRU: 'бушевать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 754, present: 'κατακερματίζω', future: 'θα κατακερματίσω', aorist: 'κατακερμάτισα', imperative: 'κατακερμάτισε / κατακερματίστε', translateEN: 'fragment', translateRU: 'дробить', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 755, present: 'κατακρίνω', future: null, aorist: 'κατέκρινα', imperative: 'κατάκρινε / κατακρίνετε', translateEN: 'criticize, condemn', translateRU: 'осуждать, критиковать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 756, present: 'κατακτώ', future: 'θα κατακτήσω', aorist: 'κατέκτησα', imperative: 'κατάκτησε / κατακτήστε', translateEN: 'conquer', translateRU: 'завоёвывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 757, present: 'καταλαβαίνω', future: 'θα καταλάβω', aorist: 'κατάλαβα', imperative: 'κατάλαβε / καταλάβετε', translateEN: 'understand', translateRU: 'понимать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 758, present: 'καταλαγιάζω', future: 'θα καταλαγιάσω', aorist: 'καταλάγιασα', imperative: 'καταλάγιασε / καταλαγιάστε', translateEN: 'subside, abate', translateRU: 'утихать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 759, present: 'καταλαμβάνω', future: 'θα καταλάβω', aorist: 'κατέλαβα', imperative: 'κατάλαβε / καταλάβετε', translateEN: 'occupy, seize', translateRU: 'занимать, захватывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 760, present: 'καταλήγω', future: 'θα καταλήξω', aorist: 'κατέληξα', imperative: 'κατάληξε / καταλήξτε', translateEN: 'end up', translateRU: 'заканчиваться, приходить к', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 761, present: 'καταλύω', future: 'θα καταλύσω', aorist: 'κατέλυσα', imperative: 'κατάλυσε / καταλύστε', translateEN: 'catalyze, abolish', translateRU: 'катализировать, упразднять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 762, present: 'καταναλώνω', future: 'θα καταναλώσω', aorist: 'κατανάλωσα', imperative: 'κατανάλωσε / καταναλώστε', translateEN: 'consume', translateRU: 'потреблять', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 763, present: 'καταπιέζω', future: 'θα καταπιέσω', aorist: 'καταπίεσα', imperative: 'καταπίεσε / καταπιέστε', translateEN: 'oppress', translateRU: 'угнетать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 764, present: 'καταπίνω', future: 'θα καταπιώ', aorist: 'κατάπια', imperative: 'κατάπιε / καταπιείτε', translateEN: 'swallow', translateRU: 'глотать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 765, present: 'καταπολεμώ', future: 'θα καταπολεμήσω', aorist: 'καταπολέμησα', imperative: 'καταπολέμησε / καταπολεμήστε', translateEN: 'combat', translateRU: 'бороться с', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 766, present: 'καταπονώ', future: 'θα καταπονήσω', aorist: 'καταπόνησα', imperative: 'καταπόνησε / καταπονήστε', translateEN: 'exhaust, strain', translateRU: 'изнурять', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 767, present: 'καταργώ', future: 'θα καταργήσω', aorist: 'κατήργησα', imperative: 'κατάργησε / καταργήστε', translateEN: 'abolish', translateRU: 'отменять, упразднять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 768, present: 'καταριέμαι', future: 'θα καταραστώ', aorist: 'καταράστηκα', imperative: 'καταράσου / καταραστείτε', translateEN: 'curse', translateRU: 'проклинать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 769, present: 'καταρρέω', future: 'θα καταρρεύσω', aorist: 'κατέρρευσα', imperative: 'κατάρρευσε / καταρρεύστε', translateEN: 'collapse', translateRU: 'рушиться, терпеть крах', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 770, present: 'κατασκευάζω', future: 'θα κατασκευάσω', aorist: 'κατασκεύασα', imperative: 'κατασκεύασε / κατασκευάστε', translateEN: 'build, construct', translateRU: 'строить, изготавливать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 771, present: 'κατασκοπεύω', future: 'θα κατασκοπεύσω', aorist: 'κατασκόπευσα', imperative: 'κατασκόπευσε / κατασκοπεύστε', translateEN: 'spy on', translateRU: 'шпионить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 772, present: 'καταστρέφω', future: 'θα καταστρέψω', aorist: 'κατέστρεψα', imperative: 'κατάστρεψε / καταστρέψτε', translateEN: 'destroy', translateRU: 'разрушать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 773, present: 'καταφέρνω', future: 'θα καταφέρω', aorist: 'κατάφερα', imperative: 'κατάφερε / καταφέρετε', translateEN: 'manage, succeed', translateRU: 'суметь, добиться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 774, present: 'καταφεύγω', future: 'θα καταφύγω', aorist: 'κατέφυγα', imperative: null, translateEN: 'take refuge, resort', translateRU: 'прибегать, укрываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 775, present: 'καταχωρώ', future: 'θα καταχωρήσω', aorist: 'καταχώρησα', imperative: 'καταχώρησε / καταχωρήστε', translateEN: 'register, enter', translateRU: 'регистрировать, заносить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 776, present: 'κατεβάζω', future: 'θα κατεβάσω', aorist: 'κατέβασα', imperative: 'κατέβασε / κατεβάστε', translateEN: 'take down, download', translateRU: 'снимать, скачивать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 777, present: 'κατεβαίνω', future: 'θα κατέβω', aorist: 'κατέβηκα', imperative: 'κατέβα / κατεβείτε', translateEN: 'go down', translateRU: 'спускаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 778, present: 'κατεδαφίζω', future: 'θα κατεδαφίσω', aorist: 'κατεδάφισα', imperative: 'κατεδάφισε / κατεδαφίστε', translateEN: 'demolish', translateRU: 'сносить, разрушать (здание)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 779, present: 'κατευθύνομαι', future: 'θα κατευθυνθώ', aorist: 'κατευθύνθηκα', imperative: 'κατευθύνσου / κατευθυνθείτε', translateEN: 'head towards', translateRU: 'направляться', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammarMedial']},
{id: 780, present: 'κατευθύνω', future: 'θα κατευθύνω', aorist: 'κατεύθυνα', imperative: 'κατεύθυνε / κατευθύνετε', translateEN: 'direct, steer', translateRU: 'направлять', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 781, present: 'κατέχω', future: null, aorist: 'κατείχα', imperative: null, translateEN: 'possess, know well', translateRU: 'владеть, разбираться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 782, present: 'κατηγοριοποιώ', future: 'θα κατηγοριοποιήσω', aorist: 'κατηγοριοποίησα', imperative: 'κατηγοριοποίησε / κατηγοριοποιήστε', translateEN: 'categorize', translateRU: 'распределять по категориям', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 783, present: 'κατηγορώ', future: 'θα κατηγορήσω', aorist: 'κατηγόρησα', imperative: 'κατηγόρησε / κατηγορήστε', translateEN: 'accuse', translateRU: 'обвинять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 784, present: 'κατοικώ', future: 'θα κατοικήσω', aorist: 'κατοίκησα', imperative: null, translateEN: 'reside', translateRU: 'проживать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 785, present: 'κατοχυρώνω', future: 'θα κατοχυρώσω', aorist: 'κατοχύρωσα', imperative: 'κατοχύρωσε / κατοχυρώστε', translateEN: 'secure, patent', translateRU: 'закреплять, патентовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 786, present: 'καυχιέμαι', future: 'θα καυχηθώ', aorist: 'καυχήθηκα', imperative: 'καυχήσου / καυχηθείτε', translateEN: 'boast', translateRU: 'хвастаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 787, present: 'κελαηδώ', future: 'θα κελαηδήσω', aorist: 'κελάηδησα', imperative: 'κελάηδησε / κελαηδήστε', translateEN: 'chirp, warble', translateRU: 'щебетать, петь (о птицах)', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 788, present: 'κεντώ', future: 'θα κεντήσω', aorist: 'κέντησα', imperative: 'κέντησε / κεντήστε', translateEN: 'embroider, sting', translateRU: 'вышивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 789, present: 'κερδίζω', future: 'θα κερδίσω', aorist: 'κέρδισα', imperative: 'κέρδισε / κερδίστε', translateEN: 'win, earn', translateRU: 'выигрывать, зарабатывать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 790, present: 'κερνώ', future: 'θα κεράσω', aorist: 'κέρασα', imperative: 'κέρασε / κεράστε', translateEN: 'treat, offer', translateRU: 'угощать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 791, present: 'κηδεύω', future: 'θα κηδέψω', aorist: 'κήδεψα', imperative: 'κήδεψε / κηδέψτε', translateEN: 'bury, hold a funeral', translateRU: 'хоронить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 792, present: 'κηρύσσω', future: 'θα κηρύξω', aorist: 'κήρυξα', imperative: 'κήρυξε / κηρύξτε', translateEN: 'declare, preach', translateRU: 'провозглашать, проповедовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 793, present: 'κινδυνεύω', future: 'θα κινδυνεύσω', aorist: 'κινδύνεψα', imperative: 'κινδύνεψε / κινδυνέψτε', translateEN: 'be in danger, risk', translateRU: 'рисковать, находиться в опасности', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 794, present: 'κινηματογραφώ', future: 'θα κινηματογραφήσω', aorist: 'κινηματογράφησα', imperative: 'κινηματογράφησε / κινηματογραφήστε', translateEN: 'film', translateRU: 'снимать фильм', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 795, present: 'κινούμαι', future: 'θα κινηθώ', aorist: 'κινήθηκα', imperative: 'κινήσου / κινηθείτε', translateEN: 'move', translateRU: 'двигаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 796, present: 'κινώ', future: 'θα κινήσω', aorist: 'κίνησα', imperative: 'κίνησε / κινήστε', translateEN: 'set in motion', translateRU: 'приводить в движение', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 797, present: 'κλαδεύω', future: 'θα κλαδέψω', aorist: 'κλάδεψα', imperative: 'κλάδεψε / κλαδέψτε', translateEN: 'prune', translateRU: 'обрезать ветки', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 798, present: 'κλαίγομαι', future: 'θα κλαφτώ', aorist: 'κλάφτηκα', imperative: 'κλάψου / κλαφτείτε', translateEN: 'complain, lament', translateRU: 'жаловаться, плакаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 799, present: 'κλαίω', future: 'θα κλάψω', aorist: 'έκλαψα', imperative: 'κλάψε / κλάψτε', translateEN: 'cry', translateRU: 'плакать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 800, present: 'κλαψουρίζω', future: 'θα κλαψουρίσω', aorist: 'κλαψούρισα', imperative: 'κλαψούρισε / κλαψουρίστε', translateEN: 'whine', translateRU: 'ныть, скулить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 801, present: 'κλέβω', future: 'θα κλέψω', aorist: 'έκλεψα', imperative: 'κλέψε / κλέψτε', translateEN: 'steal', translateRU: 'красть', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 802, present: 'κλειδώνω', future: 'θα κλειδώσω', aorist: 'κλείδωσα', imperative: 'κλείδωσε / κλειδώστε', translateEN: 'lock', translateRU: 'запирать на ключ', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 803, present: 'κλείνομαι', future: 'θα κλειστώ', aorist: 'κλείστηκα', imperative: 'κλείσου / κλειστείτε', translateEN: 'shut oneself in', translateRU: 'запираться, замыкаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 804, present: 'κλείνω', future: 'θα κλείσω', aorist: 'έκλεισα', imperative: 'κλείσε / κλείστε', translateEN: 'close, book', translateRU: 'закрывать, бронировать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 805, present: 'κληρονομούμαι', future: 'θα κληρονομηθώ', aorist: 'κληρονομήθηκα', imperative: 'κληρονομήσου / κληρονομηθείτε', translateEN: 'be inherited', translateRU: 'передаваться по наследству', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 806, present: 'κληρονομώ', future: 'θα κληρονομήσω', aorist: 'κληρονόμησα', imperative: 'κληρονόμησε / κληρονομήστε', translateEN: 'inherit', translateRU: 'наследовать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 807, present: 'κλίνω', future: 'θα κλίνω', aorist: 'έκλινα', imperative: 'κλίνε / κλίνετε', translateEN: 'lean, incline, decline (grammar)', translateRU: 'наклонять, склонять', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 808, present: 'κλωνοποιώ', future: 'θα κλωνοποιήσω', aorist: 'κλωνοποίησα', imperative: 'κλωνοποίησε / κλωνοποιήστε', translateEN: 'clone', translateRU: 'клонировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 809, present: 'κλωτσώ', future: 'θα κλωτσήσω', aorist: 'κλώτσησα', imperative: 'κλώτσησε / κλωτσήστε', translateEN: 'kick', translateRU: 'пинать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 810, present: 'κόβω', future: 'θα κόψω', aorist: 'έκοψα', imperative: 'κόψε / κόψτε', translateEN: 'cut', translateRU: 'резать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 811, present: 'κοιμάμαι', future: 'θα κοιμηθώ', aorist: 'κοιμήθηκα', imperative: 'κοιμήσου / κοιμηθείτε', translateEN: 'sleep', translateRU: 'спать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 812, present: 'κοινοποιώ', future: 'θα κοινοποιήσω', aorist: 'κοινοποίησα', imperative: 'κοινοποίησε / κοινοποιήστε', translateEN: 'notify, share', translateRU: 'уведомлять, делиться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 813, present: 'κοιτάζω', future: 'θα κοιτάξω', aorist: 'κοίταξα', imperative: 'κοίταξε / κοιτάξτε', translateEN: 'look', translateRU: 'смотреть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 814, present: 'κοκκινίζω', future: 'θα κοκκινίσω', aorist: 'κοκκίνισα', imperative: 'κοκκίνισε / κοκκινίστε', translateEN: 'redden, blush', translateRU: 'краснеть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 815, present: 'κολακεύω', future: 'θα κολακέψω', aorist: 'κολάκεψα', imperative: 'κολάκεψε / κολακέψτε', translateEN: 'flatter', translateRU: 'льстить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 816, present: 'κολλώ', future: 'θα κολλήσω', aorist: 'κόλλησα', imperative: 'κόλλησε / κολλήστε', translateEN: 'stick, glue', translateRU: 'клеить, прилипать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 817, present: 'κολυμπώ', future: 'θα κολυμπήσω', aorist: 'κολύμπησα', imperative: 'κολύμπησε / κολυμπήστε', translateEN: 'swim', translateRU: 'плавать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 818, present: 'κομίζω', future: 'θα κομίσω', aorist: 'κόμισα', imperative: 'κόμισε / κομίστε', translateEN: 'bring, carry', translateRU: 'приносить, доставлять', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 819, present: 'κομματιάζω', future: 'θα κομματιάσω', aorist: 'κομμάτιασα', imperative: 'κομμάτιασε / κομματιάστε', translateEN: 'tear to pieces', translateRU: 'рвать на куски', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 820, present: 'κομπάζω', future: 'θα κομπάσω', aorist: 'κόμπασα', imperative: 'κόμπασε / κομπάστε', translateEN: 'brag', translateRU: 'хвастаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 821, present: 'κοντεύω', future: 'θα κοντέψω', aorist: 'κόντεψα', imperative: null, translateEN: 'be about to, approach', translateRU: 'почти, приближаться', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 822, present: 'κοντύνω', future: 'θα κοντύνω', aorist: 'κόντυνα', imperative: 'κόντυνε / κοντύνετε', translateEN: 'shorten', translateRU: 'укорачивать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 823, present: 'κοπιάζω', future: 'θα κοπιάσω', aorist: 'κόπιασα', imperative: 'κόπιασε / κοπιάστε', translateEN: 'toil; (polite) come', translateRU: 'трудиться; пожалуйте', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 824, present: 'κοπρίζω', future: 'θα κοπρίσω', aorist: 'κόπρισα', imperative: 'κόπρισε / κοπρίστε', translateEN: 'manure', translateRU: 'удобрять навозом', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 825, present: 'κοροϊδεύω', future: 'θα κοροϊδέψω', aorist: 'κορόιδεψα', imperative: 'κορόιδεψε / κοροϊδέψτε', translateEN: 'mock, fool', translateRU: 'дразнить, обманывать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 826, present: 'κοστίζω', future: 'θα κοστίσω', aorist: 'κόστισα', imperative: null, translateEN: 'cost', translateRU: 'стоить', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 827, present: 'κουβαλώ', future: 'θα κουβαλήσω', aorist: 'κουβάλησα', imperative: 'κουβάλησε / κουβαλήστε', translateEN: 'carry', translateRU: 'таскать, носить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 828, present: 'κουβεντιάζω', future: 'θα κουβεντιάσω', aorist: 'κουβέντιασα', imperative: 'κουβέντιασε / κουβεντιάστε', translateEN: 'chat', translateRU: 'беседовать, болтать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 829, present: 'κουμπώνω', future: 'θα κουμπώσω', aorist: 'κούμπωσα', imperative: 'κούμπωσε / κουμπώστε', translateEN: 'button up', translateRU: 'застёгивать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 830, present: 'κουνιέμαι', future: 'θα κουνηθώ', aorist: 'κουνήθηκα', imperative: 'κουνήσου / κουνηθείτε', translateEN: 'move, stir', translateRU: 'двигаться, шевелиться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 831, present: 'κουνώ', future: 'θα κουνήσω', aorist: 'κούνησα', imperative: 'κούνησε / κουνήστε', translateEN: 'shake, move', translateRU: 'трясти, двигать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 832, present: 'κουράζομαι', future: 'θα κουραστώ', aorist: 'κουράστηκα', imperative: 'κουράσου / κουραστείτε', translateEN: 'get tired', translateRU: 'уставать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 833, present: 'κουράζω', future: 'θα κουράσω', aorist: 'κούρασα', imperative: 'κούρασε / κουράστε', translateEN: 'tire', translateRU: 'утомлять', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 834, present: 'κουρδίζω', future: 'θα κουρδίσω', aorist: 'κούρδισα', imperative: 'κούρδισε / κουρδίστε', translateEN: 'wind up, tune', translateRU: 'заводить, настраивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 835, present: 'κουρεύω', future: 'θα κουρέψω', aorist: 'κούρεψα', imperative: 'κούρεψε / κουρέψτε', translateEN: 'cut hair, mow', translateRU: 'стричь', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 836, present: 'κουρνιάζω', future: 'θα κουρνιάσω', aorist: 'κούρνιασα', imperative: 'κούρνιασε / κουρνιάστε', translateEN: 'perch, roost', translateRU: 'устраиваться на насесте, ютиться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 837, present: 'κουτσαίνω', future: 'θα κουτσάνω', aorist: 'κούτσανα', imperative: 'κούτσανε / κουτσάνετε', translateEN: 'limp', translateRU: 'хромать', lexicalCategory: ['lexicalHealth','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 838, present: 'κρατιέμαι', future: 'θα κρατηθώ', aorist: 'κρατήθηκα', imperative: 'κρατήσου / κρατηθείτε', translateEN: 'hold on, restrain oneself', translateRU: 'держаться, сдерживаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 839, present: 'κρατώ', future: 'θα κρατήσω', aorist: 'κράτησα', imperative: 'κράτησε / κρατήστε', translateEN: 'hold, keep', translateRU: 'держать, хранить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 840, present: 'κραυγάζω', future: 'θα κραυγάσω', aorist: 'κραύγασα', imperative: 'κραύγασε / κραυγάστε', translateEN: 'shout', translateRU: 'кричать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 841, present: 'κρεμώ', future: 'θα κρεμάσω', aorist: 'κρέμασα', imperative: 'κρέμασε / κρεμάστε', translateEN: 'hang', translateRU: 'вешать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 842, present: 'κρίνω', future: null, aorist: 'έκρινα', imperative: 'κρίνε / κρίνετε', translateEN: 'judge', translateRU: 'судить, оценивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 843, present: 'κριτικάρω', future: null, aorist: 'κριτίκαρα', imperative: 'κριτίκαρε / κριτικάρετε', translateEN: 'criticize', translateRU: 'критиковать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 844, present: 'κρύβομαι', future: 'θα κρυφτώ', aorist: 'κρύφτηκα', imperative: 'κρύψου / κρυφτείτε', translateEN: 'hide (oneself)', translateRU: 'прятаться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 845, present: 'κρύβω', future: 'θα κρύψω', aorist: 'έκρυψα', imperative: 'κρύψε / κρύψτε', translateEN: 'hide', translateRU: 'прятать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 846, present: 'κρυπτογραφώ', future: 'θα κρυπτογραφήσω', aorist: 'κρυπτογράφησα', imperative: 'κρυπτογράφησε / κρυπτογραφήστε', translateEN: 'encrypt', translateRU: 'шифровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 847, present: 'κρυώνω', future: 'θα κρυώσω', aorist: 'κρύωσα', imperative: null, translateEN: 'be cold, catch cold', translateRU: 'мёрзнуть, простужаться', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 848, present: 'κτίζω', future: 'θα κτίσω', aorist: 'έκτισα', imperative: 'κτίσε / κτίστε', translateEN: 'build', translateRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 849, present: 'κυβερνώ', future: 'θα κυβερνήσω', aorist: 'κυβέρνησα', imperative: 'κυβέρνησε / κυβερνήστε', translateEN: 'govern', translateRU: 'управлять, править', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 850, present: 'κυκλοφορώ', future: 'θα κυκλοφορήσω', aorist: 'κυκλοφόρησα', imperative: 'κυκλοφόρησε / κυκλοφορήστε', translateEN: 'circulate, release', translateRU: 'циркулировать, выпускать', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 851, present: 'κυλιέμαι', future: 'θα κυλιστώ', aorist: 'κυλίστηκα', imperative: 'κυλίσου / κυλιστείτε', translateEN: 'roll about, wallow', translateRU: 'кататься, валяться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 852, present: 'κυλώ', future: 'θα κυλήσω', aorist: 'κύλησα', imperative: 'κύλησε / κυλήστε', translateEN: 'roll', translateRU: 'катить, катиться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 853, present: 'κυνηγώ', future: 'θα κυνηγήσω', aorist: 'κυνήγησα', imperative: 'κυνήγησε / κυνηγήστε', translateEN: 'hunt, chase', translateRU: 'охотиться, преследовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 854, present: 'κυοφορώ', future: 'θα κυοφορήσω', aorist: 'κυοφόρησα', imperative: 'κυοφόρησε / κυοφορήστε', translateEN: 'carry (a pregnancy)', translateRU: 'вынашивать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 855, present: 'κυριαρχώ', future: 'θα κυριαρχήσω', aorist: 'κυριάρχησα', imperative: 'κυριάρχησε / κυριαρχήστε', translateEN: 'dominate', translateRU: 'господствовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 856, present: 'κωδικοποιώ', future: 'θα κωδικοποιήσω', aorist: 'κωδικοποίησα', imperative: 'κωδικοποίησε / κωδικοποιήστε', translateEN: 'encode, codify', translateRU: 'кодировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 857, present: 'κωπηλατώ', future: 'θα κωπηλατήσω', aorist: 'κωπηλάτησα', imperative: 'κωπηλάτησε / κωπηλατήστε', translateEN: 'row', translateRU: 'грести', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 858, present: 'λαδώνω', future: 'θα λαδώσω', aorist: 'λάδωσα', imperative: 'λάδωσε / λαδώστε', translateEN: 'grease, bribe', translateRU: 'смазывать, подкупать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 859, present: 'λαλώ', future: 'θα λαλήσω', aorist: 'λάλησα', imperative: 'λάλησε / λαλήστε', translateEN: 'crow, sing (birds)', translateRU: 'петь (о птицах), кричать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 860, present: 'λαμβάνω', future: 'θα λάβω', aorist: 'έλαβα', imperative: 'λάβε / λάβετε', translateEN: 'receive, take', translateRU: 'получать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 861, present: 'λαμπυρίζω', future: 'θα λαμπυρίσω', aorist: 'λαμπύρισα', imperative: 'λαμπύρισε / λαμπυρίστε', translateEN: 'glitter, sparkle', translateRU: 'сверкать, мерцать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 862, present: 'λάμπω', future: 'θα λάμψω', aorist: 'έλαμψα', imperative: 'λάμψε / λάμψτε', translateEN: 'shine', translateRU: 'сиять, блестеть', lexicalCategory: ['lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 863, present: 'λασκάρω', future: 'θα λασκάρω', aorist: 'λάσκαρα', imperative: 'λάσκαρε / λασκάρετε', translateEN: 'slacken, loosen', translateRU: 'ослаблять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 864, present: 'λατρεύομαι', future: 'θα λατρευτώ', aorist: 'λατρεύτηκα', imperative: 'λατρέψου / λατρευτείτε', translateEN: 'be adored', translateRU: 'быть обожаемым', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 865, present: 'λατρεύω', future: 'θα λατρέψω', aorist: 'λάτρεψα', imperative: 'λάτρεψε / λατρέψτε', translateEN: 'adore', translateRU: 'обожать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 866, present: 'λαχανιάζω', future: 'θα λαχανιάσω', aorist: 'λαχάνιασα', imperative: 'λαχάνιασε / λαχανιάστε', translateEN: 'pant, be out of breath', translateRU: 'запыхаться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 867, present: 'λαχταρώ', future: 'θα λαχταρήσω', aorist: 'λαχτάρησα', imperative: null, translateEN: 'long for', translateRU: 'страстно желать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
{id: 868, present: 'λειαίνω', future: 'θα λειάνω', aorist: 'λείανα', imperative: 'λείανε / λειάνετε', translateEN: 'smooth, polish', translateRU: 'шлифовать, сглаживать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 869, present: 'λείπω', future: 'θα λείψω', aorist: 'έλειψα', imperative: null, translateEN: 'be absent, be missing', translateRU: 'отсутствовать, не хватать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 870, present: 'λειτουργώ', future: 'θα λειτουργήσω', aorist: 'λειτούργησα', imperative: 'λειτούργησε / λειτουργήστε', translateEN: 'operate, function', translateRU: 'работать, функционировать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 871, present: 'λεπταίνω', future: 'θα λεπτύνω', aorist: 'λέπτυνα', imperative: 'λέπτυνε / λεπτύνετε', translateEN: 'thin out', translateRU: 'утончать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 872, present: 'λερώνω', future: 'θα λερώσω', aorist: 'λέρωσα', imperative: 'λέρωσε / λερώστε', translateEN: 'dirty', translateRU: 'пачкать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 873, present: 'λευκαίνω', future: 'θα λευκάνω', aorist: 'λεύκανα', imperative: 'λεύκανε / λευκάνετε', translateEN: 'whiten', translateRU: 'отбеливать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 874, present: 'λέω', future: 'θα πω', aorist: 'είπα', imperative: 'πες / πείτε', translateEN: 'say, tell', translateRU: 'говорить, сказать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 875, present: 'λησμονώ', future: 'θα λησμονήσω', aorist: 'λησμόνησα', imperative: 'λησμόνησε / λησμονήστε', translateEN: 'forget', translateRU: 'забывать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
{id: 876, present: 'λιγοστεύω', future: 'θα λιγοστέψω', aorist: 'λιγόστεψα', imperative: 'λιγόστεψε / λιγοστέψτε', translateEN: 'diminish', translateRU: 'убавлять, убывать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 877, present: 'λιγώνω', future: 'θα λιγώσω', aorist: 'λίγωσα', imperative: null, translateEN: 'make faint, make queasy', translateRU: 'вызывать слабость, тошноту', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 878, present: 'λικνίζομαι', future: 'θα λικνιστώ', aorist: 'λικνίστηκα', imperative: 'λικνίσου / λικνιστείτε', translateEN: 'sway, rock', translateRU: 'покачиваться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 879, present: 'λιπαίνω', future: 'θα λιπάνω', aorist: 'λίπανα', imperative: 'λίπανε / λιπάνετε', translateEN: 'fertilize', translateRU: 'удобрять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 880, present: 'λιποθυμώ', future: 'θα λιποθυμήσω', aorist: 'λιποθύμησα', imperative: null, translateEN: 'faint', translateRU: 'падать в обморок', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 881, present: 'λιχνίζω', future: 'θα λιχνίσω', aorist: 'λίχνισα', imperative: 'λίχνισε / λιχνίστε', translateEN: 'winnow', translateRU: 'веять зерно', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 882, present: 'λιώνω', future: 'θα λιώσω', aorist: 'έλιωσα', imperative: 'λιώσε / λιώστε', translateEN: 'melt, crush', translateRU: 'таять, растирать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 883, present: 'λογαριάζω', future: 'θα λογαριάσω', aorist: 'λογάριασα', imperative: 'λογάριασε / λογαριάστε', translateEN: 'calculate, reckon', translateRU: 'считать, учитывать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 884, present: 'λούζομαι', future: 'θα λουστώ', aorist: 'λούστηκα', imperative: 'λούσου / λουστείτε', translateEN: 'wash one\'s hair', translateRU: 'мыть голову', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 885, present: 'λούζω', future: 'θα λούσω', aorist: 'έλουσα', imperative: 'λούσε / λούστε', translateEN: 'wash (hair)', translateRU: 'мыть (голову)', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 886, present: 'λυγίζω', future: 'θα λυγίσω', aorist: 'λύγισα', imperative: 'λύγισε / λυγίστε', translateEN: 'bend', translateRU: 'гнуть, сгибаться', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 887, present: 'λύνω', future: 'θα λύσω', aorist: 'έλυσα', imperative: 'λύσε / λύστε', translateEN: 'solve, untie', translateRU: 'решать, развязывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 888, present: 'λυπάμαι', future: 'θα λυπηθώ', aorist: 'λυπήθηκα', imperative: 'λυπήσου / λυπηθείτε', translateEN: 'be sorry, pity', translateRU: 'сожалеть, жалеть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 889, present: 'λυπώ', future: 'θα λυπήσω', aorist: 'λύπησα', imperative: 'λύπησε / λυπήστε', translateEN: 'sadden', translateRU: 'огорчать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 890, present: 'λυτρώνω', future: 'θα λυτρώσω', aorist: 'λύτρωσα', imperative: 'λύτρωσε / λυτρώστε', translateEN: 'redeem, deliver', translateRU: 'избавлять, спасать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 891, present: 'μαγειρεύω', future: 'θα μαγειρέψω', aorist: 'μαγείρεψα', imperative: 'μαγείρεψε / μαγειρέψτε', translateEN: 'cook', translateRU: 'готовить (еду)', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 892, present: 'μαγεύομαι', future: 'θα μαγευτώ', aorist: 'μαγεύτηκα', imperative: 'μαγέψου / μαγευτείτε', translateEN: 'be enchanted', translateRU: 'быть очарованным', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 893, present: 'μαγεύω', future: 'θα μαγέψω', aorist: 'μάγεψα', imperative: 'μάγεψε / μαγέψτε', translateEN: 'bewitch', translateRU: 'очаровывать', lexicalCategory: ['lexicalInfluence','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 894, present: 'μαζεύομαι', future: 'θα μαζευτώ', aorist: 'μαζεύτηκα', imperative: 'μαζέψου / μαζευτείτε', translateEN: 'gather, huddle', translateRU: 'собираться, сжиматься', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 895, present: 'μαζεύω', future: 'θα μαζέψω', aorist: 'μάζεψα', imperative: 'μάζεψε / μαζέψτε', translateEN: 'gather, collect', translateRU: 'собирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 896, present: 'μαθαίνω', future: 'θα μάθω', aorist: 'έμαθα', imperative: 'μάθε / μάθετε', translateEN: 'learn, teach', translateRU: 'учить, узнавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 897, present: 'μακραίνω', future: 'θα μακρύνω', aorist: 'μάκρυνα', imperative: 'μάκρυνε / μακρύνετε', translateEN: 'lengthen', translateRU: 'удлинять', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 898, present: 'μαλακώνω', future: 'θα μαλακώσω', aorist: 'μαλάκωσα', imperative: 'μαλάκωσε / μαλακώστε', translateEN: 'soften', translateRU: 'смягчать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 899, present: 'μαλώνω', future: 'θα μαλώσω', aorist: 'μάλωσα', imperative: 'μάλωσε / μαλώστε', translateEN: 'scold, quarrel', translateRU: 'ругать, ссориться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 900, present: 'μαντεύω', future: 'θα μαντέψω', aorist: 'μάντεψα', imperative: 'μάντεψε / μαντέψτε', translateEN: 'guess', translateRU: 'угадывать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 901, present: 'μαντρώνω', future: 'θα μαντρώσω', aorist: 'μάντρωσα', imperative: 'μάντρωσε / μαντρώστε', translateEN: 'pen, corral', translateRU: 'загонять в загон', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 902, present: 'μαραίνομαι', future: 'θα μαρανθώ', aorist: 'μαράθηκα', imperative: 'μαράσου / μαραθείτε', translateEN: 'wither', translateRU: 'вянуть', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 903, present: 'μαρτυρώ', future: 'θα μαρτυρήσω', aorist: 'μαρτύρησα', imperative: 'μαρτύρησε / μαρτυρήστε', translateEN: 'testify, betray', translateRU: 'свидетельствовать, выдавать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 904, present: 'μασκαρεύομαι', future: 'θα μασκαρευτώ', aorist: 'μασκαρεύτηκα', imperative: 'μασκαρέψου / μασκαρευτείτε', translateEN: 'dress up in costume', translateRU: 'наряжаться в маскарадный костюм', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 905, present: 'μασκαρεύω', future: 'θα μασκαρέψω', aorist: 'μασκάρεψα', imperative: 'μασκάρεψε / μασκαρέψτε', translateEN: 'dress in costume', translateRU: 'наряжать в маскарадный костюм', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 906, present: 'μασουλώ', future: 'θα μασουλήσω', aorist: 'μασούλησα', imperative: 'μασούλησε / μασουλήστε', translateEN: 'nibble, munch', translateRU: 'жевать, грызть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 907, present: 'μασώ', future: 'θα μασήσω', aorist: 'μάσησα', imperative: 'μάσησε / μασήστε', translateEN: 'chew', translateRU: 'жевать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 908, present: 'ματαιώνω', future: 'θα ματαιώσω', aorist: 'ματαίωσα', imperative: 'ματαίωσε / ματαιώστε', translateEN: 'frustrate, call off', translateRU: 'срывать, отменять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 909, present: 'ματώνω', future: 'θα ματώσω', aorist: 'μάτωσα', imperative: 'μάτωσε / ματώστε', translateEN: 'bleed, draw blood', translateRU: 'кровоточить, ранить до крови', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 910, present: 'μαυρίζω', future: 'θα μαυρίσω', aorist: 'μαύρισα', imperative: 'μαύρισε / μαυρίστε', translateEN: 'blacken, tan', translateRU: 'чернить, загорать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 911, present: 'μάχομαι', future: 'θα μαχηθώ', aorist: 'μαχήθηκα', imperative: 'μαχήσου / μαχηθείτε', translateEN: 'fight', translateRU: 'сражаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 912, present: 'μεγαλώνω', future: 'θα μεγαλώσω', aorist: 'μεγάλωσα', imperative: 'μεγάλωσε / μεγαλώστε', translateEN: 'grow, raise', translateRU: 'расти, растить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 913, present: 'μεθύσκω', future: 'θα μεθύσω', aorist: 'μέθυσα', imperative: 'μέθυσε / μεθύστε', translateEN: 'make drunk', translateRU: 'опьянять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 914, present: 'μεθώ', future: 'θα μεθύσω', aorist: 'μέθυσα', imperative: null, translateEN: 'get drunk', translateRU: 'напиваться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 915, present: 'μειώνω', future: 'θα μειώσω', aorist: 'μείωσα', imperative: 'μείωσε / μειώστε', translateEN: 'reduce', translateRU: 'уменьшать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 916, present: 'μελετώ', future: 'θα μελετήσω', aorist: 'μελέτησα', imperative: 'μελέτησε / μελετήστε', translateEN: 'study', translateRU: 'изучать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 917, present: 'μελοποιώ', future: 'θα μελοποιήσω', aorist: 'μελοποίησα', imperative: 'μελοποίησε / μελοποιήστε', translateEN: 'set to music', translateRU: 'класть на музыку', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 918, present: 'μένω', future: 'θα μείνω', aorist: 'έμεινα', imperative: 'μείνε / μείνετε', translateEN: 'stay, live', translateRU: 'оставаться, жить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 919, present: 'μεριμνώ', future: 'θα μεριμνήσω', aorist: 'μερίμνησα', imperative: 'μερίμνησε / μεριμνήστε', translateEN: 'take care of, see to', translateRU: 'заботиться, позаботиться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 920, present: 'μεταβάλλω', future: 'θα μεταβάλω', aorist: 'μετέβαλα', imperative: 'μετάβαλε / μεταβάλετε', translateEN: 'change, alter', translateRU: 'изменять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 921, present: 'μεταγλωττίζω', future: 'θα μεταγλωττίσω', aorist: 'μεταγλώττισα', imperative: 'μεταγλώττισε / μεταγλωττίστε', translateEN: 'dub', translateRU: 'дублировать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 922, present: 'μεταγράφω', future: 'θα μεταγράψω', aorist: 'μετέγραψα', imperative: 'μετάγραψε / μεταγράψτε', translateEN: 'transcribe', translateRU: 'транскрибировать, переписывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 923, present: 'μεταδίδω', future: 'θα μεταδώσω', aorist: 'μετέδωσα', imperative: 'μετάδωσε / μεταδώστε', translateEN: 'transmit, broadcast', translateRU: 'передавать, транслировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 924, present: 'μετακινούμαι', future: 'θα μετακινηθώ', aorist: 'μετακινήθηκα', imperative: 'μετακινήσου / μετακινηθείτε', translateEN: 'move around, travel', translateRU: 'перемещаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 925, present: 'μετακινώ', future: 'θα μετακινήσω', aorist: 'μετακίνησα', imperative: 'μετακίνησε / μετακινήστε', translateEN: 'move, shift', translateRU: 'перемещать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 926, present: 'μεταλαβαίνω', future: 'θα μεταλάβω', aorist: 'μετέλαβα', imperative: 'μετάλαβε / μεταλάβετε', translateEN: 'take communion', translateRU: 'причащаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 927, present: 'μεταλλάσσω', future: 'θα μεταλλάξω', aorist: 'μετάλλαξα', imperative: 'μετάλλαξε / μεταλλάξτε', translateEN: 'mutate, alter', translateRU: 'видоизменять, мутировать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 928, present: 'μεταμορφώνομαι', future: 'θα μεταμορφωθώ', aorist: 'μεταμορφώθηκα', imperative: 'μεταμορφώσου / μεταμορφωθείτε', translateEN: 'transform, be transformed', translateRU: 'преображаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 929, present: 'μεταμορφώνω', future: 'θα μεταμορφώσω', aorist: 'μεταμόρφωσα', imperative: 'μεταμόρφωσε / μεταμορφώστε', translateEN: 'transform', translateRU: 'преображать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 930, present: 'μεταμοσχεύω', future: 'θα μεταμοσχεύσω', aorist: 'μεταμόσχευσα', imperative: 'μεταμόσχευσε / μεταμοσχεύστε', translateEN: 'transplant', translateRU: 'пересаживать', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 931, present: 'μεταμφιέζομαι', future: 'θα μεταμφιεστώ', aorist: 'μεταμφιέστηκα', imperative: 'μεταμφιέσου / μεταμφιεστείτε', translateEN: 'dress up, disguise oneself', translateRU: 'переодеваться, маскироваться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 932, present: 'μεταμφιέζω', future: 'θα μεταμφιέσω', aorist: 'μεταμφίεσα', imperative: 'μεταμφίεσε / μεταμφιέστε', translateEN: 'disguise', translateRU: 'переодевать, маскировать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 933, present: 'μεταναστεύω', future: 'θα μεταναστεύσω', aorist: 'μετανάστευσα', imperative: 'μετανάστευσε / μεταναστεύστε', translateEN: 'emigrate', translateRU: 'эмигрировать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 934, present: 'μετανιώνω', future: 'θα μετανιώσω', aorist: 'μετάνιωσα', imperative: 'μετάνιωσε / μετανιώστε', translateEN: 'regret', translateRU: 'сожалеть, раскаиваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 935, present: 'μετανοώ', future: 'θα μετανοήσω', aorist: 'μετανόησα', imperative: 'μετανόησε / μετανοήστε', translateEN: 'repent', translateRU: 'каяться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 936, present: 'μετατρέπω', future: 'θα μετατρέψω', aorist: 'μετέτρεψα', imperative: 'μετάτρεψε / μετατρέψτε', translateEN: 'convert', translateRU: 'превращать, преобразовывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 937, present: 'μεταφέρω', future: null, aorist: 'μετέφερα', imperative: 'μετάφερε / μεταφέρετε', translateEN: 'transport, carry', translateRU: 'перевозить, переносить', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 938, present: 'μεταφορτώνω', future: 'θα μεταφορτώσω', aorist: 'μεταφόρτωσα', imperative: 'μεταφόρτωσε / μεταφορτώστε', translateEN: 'upload', translateRU: 'загружать на сервер', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 939, present: 'μεταφράζω', future: 'θα μεταφράσω', aorist: 'μετέφρασα', imperative: 'μετάφρασε / μεταφράστε', translateEN: 'translate', translateRU: 'переводить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 940, present: 'μεταχειρίζομαι', future: 'θα μεταχειριστώ', aorist: 'μεταχειρίστηκα', imperative: 'μεταχειρίσου / μεταχειριστείτε', translateEN: 'use, treat', translateRU: 'использовать, обращаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 941, present: 'μετριάζω', future: 'θα μετριάσω', aorist: 'μετρίασα', imperative: 'μετρίασε / μετριάστε', translateEN: 'moderate, mitigate', translateRU: 'смягчать, умерять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 942, present: 'μετρώ', future: 'θα μετρήσω', aorist: 'μέτρησα', imperative: 'μέτρησε / μετρήστε', translateEN: 'count, measure', translateRU: 'считать, измерять', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 943, present: 'μηνύω', future: 'θα μηνύσω', aorist: 'μήνυσα', imperative: 'μήνυσε / μηνύστε', translateEN: 'sue', translateRU: 'подавать в суд', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 944, present: 'μιλώ', future: 'θα μιλήσω', aorist: 'μίλησα', imperative: 'μίλησε / μιλήστε', translateEN: 'speak', translateRU: 'говорить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 945, present: 'μιμούμαι', future: 'θα μιμηθώ', aorist: 'μιμήθηκα', imperative: 'μιμήσου / μιμηθείτε', translateEN: 'imitate', translateRU: 'подражать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 946, present: 'μισθώνω', future: 'θα μισθώσω', aorist: 'μίσθωσα', imperative: 'μίσθωσε / μισθώστε', translateEN: 'rent, hire', translateRU: 'арендовать, нанимать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 947, present: 'μισώ', future: 'θα μισήσω', aorist: 'μίσησα', imperative: 'μίσησε / μισήστε', translateEN: 'hate', translateRU: 'ненавидеть', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 948, present: 'μοιάζω', future: 'θα μοιάσω', aorist: 'μοίασα', imperative: null, translateEN: 'resemble', translateRU: 'быть похожим', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 949, present: 'μοιράζομαι', future: 'θα μοιραστώ', aorist: 'μοιράστηκα', imperative: 'μοιράσου / μοιραστείτε', translateEN: 'share', translateRU: 'делиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 950, present: 'μοιράζω', future: 'θα μοιράσω', aorist: 'μοίρασα', imperative: 'μοίρασε / μοιράστε', translateEN: 'distribute, deal', translateRU: 'раздавать, делить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 951, present: 'μολύνω', future: null, aorist: 'μόλυνα', imperative: 'μόλυνε / μολύνετε', translateEN: 'contaminate, infect', translateRU: 'загрязнять, заражать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 952, present: 'μονολογώ', future: 'θα μονολογήσω', aorist: 'μονολόγησα', imperative: 'μονολόγησε / μονολογήστε', translateEN: 'talk to oneself', translateRU: 'говорить с собой', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 953, present: 'μορφοποιώ', future: 'θα μορφοποιήσω', aorist: 'μορφοποίησα', imperative: 'μορφοποίησε / μορφοποιήστε', translateEN: 'format', translateRU: 'форматировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 954, present: 'μουγκρίζω', future: 'θα μουγκρίσω', aorist: 'μούγκρισα', imperative: 'μούγκρισε / μουγκρίστε', translateEN: 'roar, moo', translateRU: 'мычать, рычать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 955, present: 'μουδιάζω', future: 'θα μουδιάσω', aorist: 'μούδιασα', imperative: 'μούδιασε / μουδιάστε', translateEN: 'go numb', translateRU: 'неметь, затекать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 956, present: 'μουρμουρίζω', future: 'θα μουρμουρίσω', aorist: 'μουρμούρισα', imperative: 'μουρμούρισε / μουρμουρίστε', translateEN: 'mutter, hum', translateRU: 'бормотать, напевать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 957, present: 'μουσκεύω', future: 'θα μουσκέψω', aorist: 'μούσκεψα', imperative: 'μούσκεψε / μουσκέψτε', translateEN: 'soak', translateRU: 'мочить, вымачивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 958, present: 'μουχλιάζω', future: 'θα μουχλιάσω', aorist: 'μούχλιασα', imperative: 'μούχλιασε / μουχλιάστε', translateEN: 'go mouldy', translateRU: 'плесневеть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 959, present: 'μοχθώ', future: 'θα μοχθήσω', aorist: 'μόχθησα', imperative: 'μόχθησε / μοχθήστε', translateEN: 'toil, labor', translateRU: 'трудиться, маяться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 960, present: 'μπαίνω', future: 'θα μπω', aorist: 'μπήκα', imperative: 'μπες / μπείτε', translateEN: 'enter', translateRU: 'входить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 961, present: 'μπερδεύω', future: 'θα μπερδέψω', aorist: 'μπέρδεψα', imperative: 'μπέρδεψε / μπερδέψτε', translateEN: 'confuse, mix up', translateRU: 'путать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 962, present: 'μπλέκω', future: 'θα μπλέξω', aorist: 'έμπλεξα', imperative: 'μπλέξε / μπλέξτε', translateEN: 'get tangled, involve', translateRU: 'запутывать, впутываться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 963, present: 'μπλοκάρω', future: 'θα μπλοκάρω', aorist: 'μπλόκαρα', imperative: 'μπλόκαρε / μπλοκάρετε', translateEN: 'block', translateRU: 'блокировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 964, present: 'μπογιατίζω', future: 'θα μπογιατίσω', aorist: 'μπογιάτισα', imperative: 'μπογιάτισε / μπογιατίστε', translateEN: 'paint (walls)', translateRU: 'красить, красить стены', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 965, present: 'μπολιάζω', future: 'θα μπολιάσω', aorist: 'μπόλιασα', imperative: 'μπόλιασε / μπολιάστε', translateEN: 'graft, inoculate', translateRU: 'прививать (растение)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 966, present: 'μπορώ', future: 'θα μπορέσω', aorist: 'μπόρεσα', imperative: null, translateEN: 'can, be able', translateRU: 'мочь, уметь', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 967, present: 'μυρίζω', future: 'θα μυρίσω', aorist: 'μύρισα', imperative: 'μύρισε / μυρίστε', translateEN: 'smell', translateRU: 'пахнуть, нюхать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 968, present: 'νανουρίζω', future: 'θα νανουρίσω', aorist: 'νανούρισα', imperative: 'νανούρισε / νανουρίστε', translateEN: 'lull', translateRU: 'убаюкивать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 969, present: 'ναυαγώ', future: 'θα ναυαγήσω', aorist: 'ναυάγησα', imperative: 'ναυάγησε / ναυαγήστε', translateEN: 'be shipwrecked', translateRU: 'терпеть кораблекрушение', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 970, present: 'ναυλώνω', future: 'θα ναυλώσω', aorist: 'ναύλωσα', imperative: 'ναύλωσε / ναυλώστε', translateEN: 'charter', translateRU: 'фрахтовать', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 971, present: 'νερώνω', future: 'θα νερώσω', aorist: 'νέρωσα', imperative: 'νέρωσε / νερώστε', translateEN: 'dilute', translateRU: 'разбавлять', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 972, present: 'νευριάζω', future: 'θα νευριάσω', aorist: 'νεύριασα', imperative: 'νεύριασε / νευριάστε', translateEN: 'get annoyed, irritate', translateRU: 'злиться, раздражать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 973, present: 'νεύω', future: 'θα νεύσω', aorist: 'ένευσα', imperative: null, translateEN: 'nod, beckon', translateRU: 'кивать, делать знак', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 974, present: 'νηστεύω', future: 'θα νηστέψω', aorist: 'νήστεψα', imperative: null, translateEN: 'fast', translateRU: 'поститься', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 975, present: 'νιαουρίζω', future: 'θα νιαουρίσω', aorist: 'νιαούρισα', imperative: 'νιαούρισε / νιαουρίστε', translateEN: 'meow', translateRU: 'мяукать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 976, present: 'νικώ', future: 'θα νικήσω', aorist: 'νίκησα', imperative: 'νίκησε / νικήστε', translateEN: 'win, defeat', translateRU: 'побеждать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 977, present: 'νιώθω', future: 'θα νιώσω', aorist: 'ένιωσα', imperative: 'νιώσε / νιώστε', translateEN: 'feel', translateRU: 'чувствовать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 978, present: 'νοιάζομαι', future: 'θα νοιαστώ', aorist: 'νοιάστηκα', imperative: 'νοιάσου / νοιαστείτε', translateEN: 'care', translateRU: 'заботиться, переживать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 979, present: 'νοικιάζω', future: 'θα νοικιάσω', aorist: 'νοίκιασα', imperative: 'νοίκιασε / νοικιάστε', translateEN: 'rent', translateRU: 'арендовать, снимать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 980, present: 'νομίζω', future: 'θα νομίσω', aorist: 'νόμισα', imperative: null, translateEN: 'think, suppose', translateRU: 'думать, полагать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 981, present: 'νομιμοποιώ', future: 'θα νομιμοποιήσω', aorist: 'νομιμοποίησα', imperative: 'νομιμοποίησε / νομιμοποιήστε', translateEN: 'legalize', translateRU: 'легализовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 982, present: 'νομοθετώ', future: 'θα νομοθετήσω', aorist: 'νομοθέτησα', imperative: 'νομοθέτησε / νομοθετήστε', translateEN: 'legislate', translateRU: 'принимать законы', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 983, present: 'νοσηλεύω', future: 'θα νοσηλεύσω', aorist: 'νοσήλευσα', imperative: 'νοσήλευσε / νοσηλεύστε', translateEN: 'nurse, treat', translateRU: 'лечить, ухаживать за больным', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 984, present: 'νοσταλγώ', future: 'θα νοσταλγήσω', aorist: 'νοστάλγησα', imperative: null, translateEN: 'miss, long for', translateRU: 'тосковать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 985, present: 'ντρέπομαι', future: 'θα ντραπώ', aorist: 'ντράπηκα', imperative: 'ντρέψου / ντραπείτε', translateEN: 'be ashamed', translateRU: 'стыдиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 986, present: 'ντροπιάζω', future: 'θα ντροπιάσω', aorist: 'ντροπίασα', imperative: 'ντροπίασε / ντροπιάστε', translateEN: 'shame, disgrace', translateRU: 'позорить, стыдить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 987, present: 'ντύνομαι', future: 'θα ντυθώ', aorist: 'ντύθηκα', imperative: 'ντύσου / ντυθείτε', translateEN: 'get dressed', translateRU: 'одеваться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 988, present: 'ντύνω', future: 'θα ντύσω', aorist: 'έντυσα', imperative: 'ντύσε / ντύστε', translateEN: 'dress (someone)', translateRU: 'одевать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 989, present: 'νυστάζω', future: 'θα νυστάξω', aorist: 'νύσταξα', imperative: null, translateEN: 'be sleepy', translateRU: 'хотеть спать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 990, present: 'νυχτώνω', future: 'θα νυχτώσω', aorist: 'νύχτωσα', imperative: null, translateEN: 'get dark (night falls)', translateRU: 'темнеть, наступать (о ночи)', lexicalCategory: ['lexicalTime','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 991, present: 'ξαγρυπνώ', future: 'θα ξαγρυπνήσω', aorist: 'ξαγρύπνησα', imperative: 'ξαγρύπνησε / ξαγρυπνήστε', translateEN: 'stay awake, keep vigil', translateRU: 'бодрствовать, не спать', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 992, present: 'ξαναβάζω', future: 'θα ξαναβάλω', aorist: 'ξαναέβαλα', imperative: 'ξαναβάλε / ξαναβάλτε', translateEN: 'put again', translateRU: 'класть снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 993, present: 'ξαναβλέπω', future: 'θα ξαναδώ', aorist: 'ξαναείδα', imperative: 'ξαναδές / ξαναδείτε', translateEN: 'see again', translateRU: 'видеть снова', lexicalCategory: ['lexicalSense','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 994, present: 'ξαναβρίσκω', future: 'θα ξαναβρώ', aorist: 'ξαναβρήκα', imperative: 'ξαναβρές / ξαναβρείτε', translateEN: 'find again', translateRU: 'находить снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 995, present: 'ξαναγεννιέμαι', future: 'θα ξαναγεννηθώ', aorist: 'ξαναγεννήθηκα', imperative: 'ξαναγεννήσου / ξαναγεννηθείτε', translateEN: 'be reborn', translateRU: 'рождаться заново', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 996, present: 'ξαναγίνομαι', future: 'θα ξαναγίνω', aorist: 'ξαναέγινα', imperative: 'ξαναγίνε / ξαναγίνετε', translateEN: 'become again', translateRU: 'становиться снова', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 997, present: 'ξαναγράφω', future: 'θα ξαναγράψω', aorist: 'ξαναέγραψα', imperative: 'ξαναγράψε / ξαναγράψτε', translateEN: 'rewrite', translateRU: 'переписывать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 998, present: 'ξαναδένω', future: 'θα ξαναδέσω', aorist: 'ξανάδεσα', imperative: 'ξαναδέσε / ξαναδέστε', translateEN: 'retie', translateRU: 'завязывать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 999, present: 'ξαναδιαβάζω', future: 'θα ξαναδιαβάσω', aorist: 'ξαναδιάβασα', imperative: 'ξαναδιάβασε / ξαναδιαβάστε', translateEN: 'reread', translateRU: 'перечитывать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1000, present: 'ξαναδοκιμάζω', future: 'θα ξαναδοκιμάσω', aorist: 'ξαναδοκίμασα', imperative: 'ξαναδοκίμασε / ξαναδοκιμάστε', translateEN: 'try again', translateRU: 'пробовать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1001, present: 'ξανακάνω', future: 'θα ξανακάνω', aorist: 'ξανάκανα', imperative: 'ξανακάνε / ξανακάντε', translateEN: 'do again', translateRU: 'делать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1002, present: 'ξαναλέω', future: 'θα ξαναπώ', aorist: 'ξαναείπα', imperative: 'ξαναπές / ξαναπείτε', translateEN: 'say again', translateRU: 'говорить снова', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1003, present: 'ξαναπαίρνω', future: 'θα ξαναπάρω', aorist: 'ξαναπήρα', imperative: 'ξαναπάρε / ξαναπάρτε', translateEN: 'take again', translateRU: 'брать снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1004, present: 'ξαναπαντρεύομαι', future: 'θα ξαναπαντρευτώ', aorist: 'ξαναπαντρεύτηκα', imperative: 'ξαναπαντρέψου / ξαναπαντρευτείτε', translateEN: 'remarry', translateRU: 'жениться снова', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 1005, present: 'ξαναπλένω', future: 'θα ξαναπλύνω', aorist: 'ξαναέπλυνα', imperative: 'ξαναπλύνε / ξαναπλύνετε', translateEN: 'wash again', translateRU: 'мыть снова', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1006, present: 'ξαναρχίζω', future: 'θα ξαναρχίσω', aorist: 'ξανάρχισα', imperative: 'ξανάρχισε / ξαναρχίστε', translateEN: 'start again', translateRU: 'начинать снова', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1007, present: 'ξαναρωτώ', future: 'θα ξαναρωτήσω', aorist: 'ξαναρώτησα', imperative: 'ξαναρώτησε / ξαναρωτήστε', translateEN: 'ask again', translateRU: 'спрашивать снова', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1008, present: 'ξανασκέφτομαι', future: 'θα ξανασκεφτώ', aorist: 'ξανασκέφτηκα', imperative: 'ξανασκέψου / ξανασκεφτείτε', translateEN: 'reconsider', translateRU: 'обдумывать заново', lexicalCategory: ['lexicalInfluence','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 1009, present: 'ξαναφτιάχνω', future: 'θα ξαναφτιάξω', aorist: 'ξαναέφτιαξα', imperative: 'ξαναφτιάξε / ξαναφτιάξτε', translateEN: 'remake', translateRU: 'переделывать', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1010, present: 'ξανοίγω', future: 'θα ξανοίξω', aorist: 'ξάνοιξα', imperative: 'ξάνοιξε / ξανοίξτε', translateEN: 'open again, clear up', translateRU: 'раскрывать, проясняться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1011, present: 'ξαπλώνω', future: 'θα ξαπλώσω', aorist: 'ξάπλωσα', imperative: 'ξάπλωσε / ξαπλώστε', translateEN: 'lie down', translateRU: 'ложиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1012, present: 'ξεβάφω', future: 'θα ξεβάψω', aorist: 'ξέβαψα', imperative: 'ξέβαψε / ξεβάψτε', translateEN: 'fade, lose colour', translateRU: 'линять, обесцвечивать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1013, present: 'ξεβγάζω', future: 'θα ξεβγάλω', aorist: 'ξέβγαλα', imperative: 'ξέβγαλε / ξεβγάλτε', translateEN: 'rinse, see off', translateRU: 'ополаскивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1014, present: 'ξεβιδώνω', future: 'θα ξεβιδώσω', aorist: 'ξεβίδωσα', imperative: 'ξεβίδωσε / ξεβιδώστε', translateEN: 'unscrew', translateRU: 'выкручивать, отвинчивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1015, present: 'ξεβράζω', future: 'θα ξεβράσω', aorist: 'ξέβρασα', imperative: 'ξέβρασε / ξεβράστε', translateEN: 'wash ashore, cast up', translateRU: 'выбрасывать на берег', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1016, present: 'ξεγελώ', future: 'θα ξεγελάσω', aorist: 'ξεγέλασα', imperative: 'ξεγέλασε / ξεγελάστε', translateEN: 'deceive, trick', translateRU: 'обманывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1017, present: 'ξεγυμνώνω', future: 'θα ξεγυμνώσω', aorist: 'ξεγύμνωσα', imperative: 'ξεγύμνωσε / ξεγυμνώστε', translateEN: 'strip bare', translateRU: 'обнажать, раздевать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1018, present: 'ξεδιαλύνω', future: 'θα ξεδιαλύνω', aorist: 'ξεδιάλυνα', imperative: 'ξεδιάλυνε / ξεδιαλύνετε', translateEN: 'sort out, clear up', translateRU: 'разбирать, прояснять', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1019, present: 'ξεδίνω', future: 'θα ξεδώσω', aorist: 'ξέδωσα', imperative: 'ξέδωσε / ξεδώστε', translateEN: 'unwind, let off steam', translateRU: 'расслабляться, отвести душу', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1020, present: 'ξεδιπλώνω', future: 'θα ξεδιπλώσω', aorist: 'ξεδίπλωσα', imperative: 'ξεδίπλωσε / ξεδιπλώστε', translateEN: 'unfold', translateRU: 'разворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1021, present: 'ξεδιψώ', future: 'θα ξεδιψάσω', aorist: 'ξεδίψασα', imperative: null, translateEN: 'quench thirst', translateRU: 'утолять жажду', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1022, present: 'ξεζώνω', future: 'θα ξεζώσω', aorist: 'ξέζωσα', imperative: 'ξέζωσε / ξεζώστε', translateEN: 'ungird, unbelt', translateRU: 'расстёгивать пояс', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1023, present: 'ξεθάβω', future: 'θα ξεθάψω', aorist: 'ξέθαψα', imperative: 'ξέθαψε / ξεθάψτε', translateEN: 'dig up, exhume', translateRU: 'выкапывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1024, present: 'ξεθαρρεύω', future: 'θα ξεθαρρέψω', aorist: 'ξεθάρρεψα', imperative: 'ξεθάρρεψε / ξεθαρρέψτε', translateEN: 'become bold', translateRU: 'осмеливаться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1025, present: 'ξεθυμαίνω', future: 'θα ξεθυμάνω', aorist: 'ξεθύμανα', imperative: 'ξεθύμανε / ξεθυμάνετε', translateEN: 'lose fizz, calm down', translateRU: 'выдыхаться, остывать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1026, present: 'ξεθωριάζω', future: 'θα ξεθωριάσω', aorist: 'ξεθώριασα', imperative: null, translateEN: 'fade', translateRU: 'выцветать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1027, present: 'ξεκαθαρίζω', future: 'θα ξεκαθαρίσω', aorist: 'ξεκαθάρισα', imperative: 'ξεκαθάρισε / ξεκαθαρίστε', translateEN: 'clarify, sort out', translateRU: 'прояснять, улаживать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1028, present: 'ξεκάνω', future: 'θα ξεκάνω', aorist: 'ξέκανα', imperative: 'ξέκανε / ξεκάνετε', translateEN: 'finish off, kill', translateRU: 'прикончить, разделаться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1029, present: 'ξεκαρδίζομαι', future: 'θα ξεκαρδιστώ', aorist: 'ξεκαρδίστηκα', imperative: 'ξεκαρδίσου / ξεκαρδιστείτε', translateEN: 'burst out laughing', translateRU: 'покатываться со смеху', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1030, present: 'ξεκινώ', future: 'θα ξεκινήσω', aorist: 'ξεκίνησα', imperative: 'ξεκίνησε / ξεκινήστε', translateEN: 'start, set off', translateRU: 'начинать, отправляться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1031, present: 'ξεκλειδώνω', future: 'θα ξεκλειδώσω', aorist: 'ξεκλείδωσα', imperative: 'ξεκλείδωσε / ξεκλειδώστε', translateEN: 'unlock', translateRU: 'отпирать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1032, present: 'ξεκληρίζω', future: 'θα ξεκληρίσω', aorist: 'ξεκλήρισα', imperative: 'ξεκλήρισε / ξεκληρίστε', translateEN: 'wipe out', translateRU: 'истреблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1033, present: 'ξεκοιλιάζω', future: 'θα ξεκοιλιάσω', aorist: 'ξεκοίλιασα', imperative: 'ξεκοίλιασε / ξεκοιλιάστε', translateEN: 'disembowel', translateRU: 'потрошить', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1034, present: 'ξεκοκαλίζω', future: 'θα ξεκοκαλίσω', aorist: 'ξεκοκάλισα', imperative: 'ξεκοκάλισε / ξεκοκαλίστε', translateEN: 'pick clean', translateRU: 'обгладывать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1035, present: 'ξεκολλώ', future: 'θα ξεκολλήσω', aorist: 'ξεκόλλησα', imperative: 'ξεκόλλησε / ξεκολλήστε', translateEN: 'unstick, detach', translateRU: 'отклеивать, отлипать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1036, present: 'ξεκουμπίζομαι', future: 'θα ξεκουμπιστώ', aorist: 'ξεκουμπίστηκα', imperative: 'ξεκουμπίσου / ξεκουμπιστείτε', translateEN: 'clear off, get lost', translateRU: 'убираться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1037, present: 'ξεκουμπώνω', future: 'θα ξεκουμπώσω', aorist: 'ξεκούμπωσα', imperative: 'ξεκούμπωσε / ξεκουμπώστε', translateEN: 'unbutton', translateRU: 'расстёгивать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1038, present: 'ξεκουράζομαι', future: 'θα ξεκουραστώ', aorist: 'ξεκουράστηκα', imperative: 'ξεκουράσου / ξεκουραστείτε', translateEN: 'rest', translateRU: 'отдыхать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1039, present: 'ξεκουφαίνω', future: 'θα ξεκουφάνω', aorist: 'ξεκούφανα', imperative: 'ξεκούφανε / ξεκουφάνετε', translateEN: 'deafen', translateRU: 'оглушать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1040, present: 'ξελογιάζω', future: 'θα ξελογιάσω', aorist: 'ξελόγιασα', imperative: 'ξελόγιασε / ξελογιάστε', translateEN: 'lure, bewitch', translateRU: 'соблазнять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1041, present: 'ξεμακραίνω', future: 'θα ξεμακρύνω', aorist: 'ξεμάκρυνα', imperative: 'ξεμάκρυνε / ξεμακρύνετε', translateEN: 'move far away', translateRU: 'удаляться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1042, present: 'ξεμαλλιάζω', future: 'θα ξεμαλλιάσω', aorist: 'ξεμάλλιασα', imperative: 'ξεμάλλιασε / ξεμαλλιάστε', translateEN: 'dishevel, pull hair out', translateRU: 'растрёпывать, таскать за волосы', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1043, present: 'ξεμένω', future: 'θα ξεμείνω', aorist: 'ξέμεινα', imperative: null, translateEN: 'run out of, be stranded', translateRU: 'остаться без, застрять', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1044, present: 'ξεμπερδεύω', future: 'θα ξεμπερδέψω', aorist: 'ξεμπέρδεψα', imperative: 'ξεμπέρδεψε / ξεμπερδέψτε', translateEN: 'untangle, sort out', translateRU: 'распутывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1045, present: 'ξεμπλέκω', future: 'θα ξεμπλέξω', aorist: 'ξέμπλεξα', imperative: 'ξέμπλεξε / ξεμπλέξτε', translateEN: 'disentangle', translateRU: 'выпутываться, распутывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1046, present: 'ξεμπροστιάζω', future: 'θα ξεμπροστιάσω', aorist: 'ξεμπρόστιασα', imperative: 'ξεμπρόστιασε / ξεμπροστιάστε', translateEN: 'expose, shame', translateRU: 'разоблачать, позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1047, present: 'ξεμυαλίζω', future: 'θα ξεμυαλίσω', aorist: 'ξεμυάλισα', imperative: 'ξεμυάλισε / ξεμυαλίστε', translateEN: 'turn someone\'s head', translateRU: 'кружить голову', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1048, present: 'ξεμυτίζω', future: 'θα ξεμυτίσω', aorist: 'ξεμύτισα', imperative: 'ξεμύτισε / ξεμυτίστε', translateEN: 'venture out', translateRU: 'высовываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1049, present: 'ξεπαγώνω', future: 'θα ξεπαγώσω', aorist: 'ξεπάγωσα', imperative: 'ξεπάγωσε / ξεπαγώστε', translateEN: 'defrost, thaw', translateRU: 'размораживать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1050, present: 'ξεπαστρεύω', future: 'θα ξεπαστρέψω', aorist: 'ξεπάστρεψα', imperative: 'ξεπάστρεψε / ξεπαστρέψτε', translateEN: 'exterminate', translateRU: 'истреблять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1051, present: 'ξεπερνώ', future: 'θα ξεπεράσω', aorist: 'ξεπέρασα', imperative: 'ξεπέρασε / ξεπεράστε', translateEN: 'surpass, overcome', translateRU: 'превосходить, преодолевать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1052, present: 'ξεπέφτω', future: 'θα ξεπέσω', aorist: 'ξέπεσα', imperative: 'ξέπεσε / ξεπέστε', translateEN: 'decline, fall low', translateRU: 'опускаться, приходить в упадок', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1053, present: 'ξεπλένω', future: 'θα ξεπλύνω', aorist: 'ξέπλυνα', imperative: 'ξέπλυνε / ξεπλύνετε', translateEN: 'rinse', translateRU: 'полоскать, ополаскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1054, present: 'ξεπουλώ', future: 'θα ξεπουλήσω', aorist: 'ξεπούλησα', imperative: 'ξεπούλησε / ξεπουλήστε', translateEN: 'sell off', translateRU: 'распродавать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1055, present: 'ξεπροβάλλω', future: 'θα ξεπροβάλω', aorist: 'ξεπρόβαλα', imperative: 'ξεπρόβαλε / ξεπροβάλετε', translateEN: 'appear, emerge', translateRU: 'появляться, выглядывать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1056, present: 'ξεπροβοδίζω', future: 'θα ξεπροβοδίσω', aorist: 'ξεπροβόδισα', imperative: 'ξεπροβόδισε / ξεπροβοδίστε', translateEN: 'see off', translateRU: 'провожать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1057, present: 'ξεραίνω', future: 'θα ξεράνω', aorist: 'ξέρανα', imperative: 'ξέρανε / ξεράνετε', translateEN: 'dry up, wither', translateRU: 'сушить, иссушать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1058, present: 'ξεριζώνω', future: 'θα ξεριζώσω', aorist: 'ξερίζωσα', imperative: 'ξερίζωσε / ξεριζώστε', translateEN: 'uproot', translateRU: 'вырывать с корнем', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1059, present: 'ξερνώ', future: 'θα ξεράσω', aorist: 'ξέρασα', imperative: 'ξέρασε / ξεράστε', translateEN: 'vomit', translateRU: 'рвать (тошнить)', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1060, present: 'ξεροκαταπίνω', future: 'θα ξεροκαταπιώ', aorist: 'ξεροκατάπια', imperative: 'ξεροκατάπιε / ξεροκαταπιείτε', translateEN: 'gulp, swallow hard', translateRU: 'глотать всухую', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1061, present: 'ξέρω', future: null, aorist: 'ήξερα', imperative: null, translateEN: 'know', translateRU: 'знать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1062, present: 'ξεσηκώνομαι', future: 'θα ξεσηκωθώ', aorist: 'ξεσηκώθηκα', imperative: 'ξεσηκώσου / ξεσηκωθείτε', translateEN: 'rise up, rebel', translateRU: 'подниматься, восставать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1063, present: 'ξεσηκώνω', future: 'θα ξεσηκώσω', aorist: 'ξεσήκωσα', imperative: 'ξεσήκωσε / ξεσηκώστε', translateEN: 'rouse, incite', translateRU: 'поднимать, подстрекать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1064, present: 'ξεσκεπάζω', future: 'θα ξεσκεπάσω', aorist: 'ξεσκέπασα', imperative: 'ξεσκέπασε / ξεσκεπάστε', translateEN: 'uncover', translateRU: 'раскрывать, снимать покров', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1065, present: 'ξεσκίζω', future: 'θα ξεσκίσω', aorist: 'ξέσκισα', imperative: 'ξέσκισε / ξεσκίστε', translateEN: 'tear up', translateRU: 'разрывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1066, present: 'ξεσκονίζω', future: 'θα ξεσκονίσω', aorist: 'ξεσκόνισα', imperative: 'ξεσκόνισε / ξεσκονίστε', translateEN: 'dust', translateRU: 'вытирать пыль', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1067, present: 'ξεσπώ', future: 'θα ξεσπάσω', aorist: 'ξέσπασα', imperative: 'ξέσπασε / ξεσπάστε', translateEN: 'burst out', translateRU: 'вспыхивать, срываться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1068, present: 'ξεστομίζω', future: 'θα ξεστομίσω', aorist: 'ξεστόμισα', imperative: 'ξεστόμισε / ξεστομίστε', translateEN: 'utter, blurt out', translateRU: 'выпаливать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1069, present: 'ξεστρατίζω', future: 'θα ξεστρατίσω', aorist: 'ξεστράτισα', imperative: 'ξεστράτισε / ξεστρατίστε', translateEN: 'go astray', translateRU: 'сбиваться с пути', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1070, present: 'ξετρελαίνω', future: 'θα ξετρελάνω', aorist: 'ξετρέλανα', imperative: 'ξετρέλανε / ξετρελάνετε', translateEN: 'drive crazy', translateRU: 'сводить с ума', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1071, present: 'ξετυλίγω', future: 'θα ξετυλίξω', aorist: 'ξετύλιξα', imperative: 'ξετύλιξε / ξετυλίξτε', translateEN: 'unwrap, unroll', translateRU: 'разворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1072, present: 'ξεφεύγω', future: 'θα ξεφύγω', aorist: 'ξέφυγα', imperative: 'ξέφυγε / ξεφύγετε', translateEN: 'escape, slip away', translateRU: 'ускользать, вырываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1073, present: 'ξεφλουδίζω', future: 'θα ξεφλουδίσω', aorist: 'ξεφλούδισα', imperative: 'ξεφλούδισε / ξεφλουδίστε', translateEN: 'peel', translateRU: 'чистить (от кожуры)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1074, present: 'ξεφορτίζομαι', future: 'θα ξεφορτιστώ', aorist: 'ξεφορτίστηκα', imperative: 'ξεφορτίσου / ξεφορτιστείτε', translateEN: 'run out of charge', translateRU: 'разряжаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1075, present: 'ξεφορτώνω', future: 'θα ξεφορτώσω', aorist: 'ξεφόρτωσα', imperative: 'ξεφόρτωσε / ξεφορτώστε', translateEN: 'unload, get rid of', translateRU: 'разгружать, избавляться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1076, present: 'ξεφουσκώνω', future: 'θα ξεφουσκώσω', aorist: 'ξεφούσκωσα', imperative: 'ξεφούσκωσε / ξεφουσκώστε', translateEN: 'deflate', translateRU: 'сдувать, сдуваться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1077, present: 'ξεφτίζω', future: 'θα ξεφτίσω', aorist: 'ξέφτισα', imperative: 'ξέφτισε / ξεφτίστε', translateEN: 'fray', translateRU: 'истрепаться, обтрепаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1078, present: 'ξεφτιλίζω', future: 'θα ξεφτιλίσω', aorist: 'ξεφτίλισα', imperative: 'ξεφτίλισε / ξεφτιλίστε', translateEN: 'disgrace, humiliate', translateRU: 'позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1079, present: 'ξεφυλλίζω', future: 'θα ξεφυλλίσω', aorist: 'ξεφύλλισα', imperative: 'ξεφύλλισε / ξεφυλλίστε', translateEN: 'leaf through', translateRU: 'листать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1080, present: 'ξεφωνίζω', future: 'θα ξεφωνίσω', aorist: 'ξεφώνισα', imperative: 'ξεφώνισε / ξεφωνίστε', translateEN: 'shout out', translateRU: 'выкрикивать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1081, present: 'ξεχαρβαλώνω', future: 'θα ξεχαρβαλώσω', aorist: 'ξεχαρβάλωσα', imperative: 'ξεχαρβάλωσε / ξεχαρβαλώστε', translateEN: 'wreck, dismantle', translateRU: 'разбалтывать, ломать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1082, present: 'ξεχειλίζω', future: 'θα ξεχειλίσω', aorist: 'ξεχείλισα', imperative: null, translateEN: 'overflow', translateRU: 'переливаться через край', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1083, present: 'ξεχνώ', future: 'θα ξεχάσω', aorist: 'ξέχασα', imperative: 'ξέχασε / ξεχάστε', translateEN: 'forget', translateRU: 'забывать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1084, present: 'ξεχορταριάζω', future: 'θα ξεχορταριάσω', aorist: 'ξεχορτάριασα', imperative: 'ξεχορτάριασε / ξεχορταριάστε', translateEN: 'weed', translateRU: 'полоть', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1085, present: 'ξεχωρίζω', future: 'θα ξεχωρίσω', aorist: 'ξεχώρισα', imperative: 'ξεχώρισε / ξεχωρίστε', translateEN: 'separate, stand out', translateRU: 'отделять, выделяться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1086, present: 'ξεψυχώ', future: 'θα ξεψυχήσω', aorist: 'ξεψύχησα', imperative: 'ξεψύχησε / ξεψυχήστε', translateEN: 'breathe one\'s last', translateRU: 'испускать дух', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1087, present: 'ξημερώνω', future: 'θα ξημερώσω', aorist: 'ξημέρωσα', imperative: null, translateEN: 'dawn', translateRU: 'рассветать', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1088, present: 'ξινίζω', future: 'θα ξινίσω', aorist: 'ξίνισα', imperative: 'ξίνισε / ξινίστε', translateEN: 'turn sour', translateRU: 'киснуть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1089, present: 'ξοδεύω', future: 'θα ξοδέψω', aorist: 'ξόδεψα', imperative: 'ξόδεψε / ξοδέψτε', translateEN: 'spend', translateRU: 'тратить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1090, present: 'ξορκίζω', future: 'θα ξορκίσω', aorist: 'ξόρκισα', imperative: 'ξόρκισε / ξορκίστε', translateEN: 'exorcise', translateRU: 'изгонять (бесов)', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1091, present: 'ξύνω', future: 'θα ξύσω', aorist: 'έξυσα', imperative: 'ξύσε / ξύστε', translateEN: 'scratch', translateRU: 'чесать, скрести', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1092, present: 'ξυπνώ', future: 'θα ξυπνήσω', aorist: 'ξύπνησα', imperative: 'ξύπνησε / ξυπνήστε', translateEN: 'wake up', translateRU: 'просыпаться, будить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1093, present: 'ξυρίζομαι', future: 'θα ξυριστώ', aorist: 'ξυρίστηκα', imperative: 'ξυρίσου / ξυριστείτε', translateEN: 'shave (oneself)', translateRU: 'бриться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1094, present: 'ξυρίζω', future: 'θα ξυρίσω', aorist: 'ξύρισα', imperative: 'ξύρισε / ξυρίστε', translateEN: 'shave', translateRU: 'брить', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1095, present: 'οδηγώ', future: 'θα οδηγήσω', aorist: 'οδήγησα', imperative: 'οδήγησε / οδηγήστε', translateEN: 'drive, lead', translateRU: 'водить, вести', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1096, present: 'οικοδομώ', future: 'θα οικοδομήσω', aorist: 'οικοδόμησα', imperative: 'οικοδόμησε / οικοδομήστε', translateEN: 'build', translateRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1097, present: 'ολισθαίνω', future: 'θα ολισθήσω', aorist: 'ολίσθησα', imperative: 'ολίσθησε / ολισθήστε', translateEN: 'slide, slip', translateRU: 'скользить', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1098, present: 'ολοκληρώνω', future: 'θα ολοκληρώσω', aorist: 'ολοκλήρωσα', imperative: 'ολοκλήρωσε / ολοκληρώστε', translateEN: 'complete', translateRU: 'завершать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1099, present: 'ομολογώ', future: 'θα ομολογήσω', aorist: 'ομολόγησα', imperative: 'ομολόγησε / ομολογήστε', translateEN: 'confess', translateRU: 'признавать, признаваться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1100, present: 'ομορφαίνω', future: 'θα ομορφύνω', aorist: 'ομόρφυνα', imperative: 'ομόρφυνε / ομορφύνετε', translateEN: 'beautify', translateRU: 'украшать, хорошеть', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1101, present: 'ονειρεύομαι', future: 'θα ονειρευτώ', aorist: 'ονειρεύτηκα', imperative: 'ονειρέψου / ονειρευτείτε', translateEN: 'dream', translateRU: 'мечтать, видеть сны', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1102, present: 'ονομάζομαι', future: 'θα ονομαστώ', aorist: 'ονομάστηκα', imperative: 'ονομάσου / ονομαστείτε', translateEN: 'be called', translateRU: 'называться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1103, present: 'ονομάζω', future: 'θα ονομάσω', aorist: 'ονόμασα', imperative: 'ονόμασε / ονομάστε', translateEN: 'name', translateRU: 'называть', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1104, present: 'οξειδώνω', future: 'θα οξειδώσω', aorist: 'οξείδωσα', imperative: 'οξείδωσε / οξειδώστε', translateEN: 'oxidize', translateRU: 'окислять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1105, present: 'οπισθοχωρώ', future: 'θα οπισθοχωρήσω', aorist: 'οπισθοχώρησα', imperative: 'οπισθοχώρησε / οπισθοχωρήστε', translateEN: 'retreat', translateRU: 'отступать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1106, present: 'οπλίζω', future: 'θα οπλίσω', aorist: 'όπλισα', imperative: 'όπλισε / οπλίστε', translateEN: 'arm', translateRU: 'вооружать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1107, present: 'οργανώνω', future: 'θα οργανώσω', aorist: 'οργάνωσα', imperative: 'οργάνωσε / οργανώστε', translateEN: 'organize', translateRU: 'организовывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1108, present: 'οργίζομαι', future: 'θα οργιστώ', aorist: 'οργίστηκα', imperative: 'οργίσου / οργιστείτε', translateEN: 'get angry', translateRU: 'гневаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1109, present: 'οργώνω', future: 'θα οργώσω', aorist: 'όργωσα', imperative: 'όργωσε / οργώστε', translateEN: 'plough', translateRU: 'пахать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1110, present: 'ορθογραφώ', future: 'θα ορθογραφήσω', aorist: 'ορθογράφησα', imperative: 'ορθογράφησε / ορθογραφήστε', translateEN: 'spell correctly', translateRU: 'писать грамотно', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1111, present: 'ορίζω', future: 'θα ορίσω', aorist: 'όρισα', imperative: 'όρισε / ορίστε', translateEN: 'define, set', translateRU: 'определять, назначать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1112, present: 'ορκίζομαι', future: 'θα ορκιστώ', aorist: 'ορκίστηκα', imperative: 'ορκίσου / ορκιστείτε', translateEN: 'swear', translateRU: 'клясться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1113, present: 'ορμώ', future: 'θα ορμήσω', aorist: 'όρμησα', imperative: 'όρμησε / ορμήστε', translateEN: 'rush, charge', translateRU: 'бросаться, устремляться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1114, present: 'ουρλιάζω', future: 'θα ουρλιάξω', aorist: 'ούρλιαξα', imperative: 'ούρλιαξε / ουρλιάξτε', translateEN: 'howl, scream', translateRU: 'выть, вопить', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1115, present: 'οφείλω', future: null, aorist: 'όφειλα', imperative: null, translateEN: 'owe, ought', translateRU: 'быть должным', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1116, present: 'οχυρώνω', future: 'θα οχυρώσω', aorist: 'οχύρωσα', imperative: 'οχύρωσε / οχυρώστε', translateEN: 'fortify', translateRU: 'укреплять', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1117, present: 'παγιδεύομαι', future: 'θα παγιδευτώ', aorist: 'παγιδεύτηκα', imperative: 'παγιδέψου / παγιδευτείτε', translateEN: 'get trapped', translateRU: 'попадаться в ловушку', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1118, present: 'παγιδεύω', future: 'θα παγιδεύσω', aorist: 'παγίδευσα', imperative: 'παγίδευσε / παγιδεύστε', translateEN: 'trap', translateRU: 'ловить в ловушку', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1119, present: 'παγώνω', future: 'θα παγώσω', aorist: 'πάγωσα', imperative: 'πάγωσε / παγώστε', translateEN: 'freeze', translateRU: 'замерзать, замораживать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1120, present: 'παζαρεύω', future: 'θα παζαρέψω', aorist: 'παζάρεψα', imperative: 'παζάρεψε / παζαρέψτε', translateEN: 'haggle', translateRU: 'торговаться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1121, present: 'παθαίνω', future: 'θα πάθω', aorist: 'έπαθα', imperative: 'πάθε / πάθετε', translateEN: 'suffer, undergo', translateRU: 'страдать, претерпевать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1122, present: 'παίζω', future: 'θα παίξω', aorist: 'έπαιξα', imperative: 'παίξε / παίξτε', translateEN: 'play', translateRU: 'играть', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1123, present: 'παίρνω', future: 'θα πάρω', aorist: 'πήρα', imperative: 'πάρε / πάρτε', translateEN: 'take', translateRU: 'брать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1124, present: 'παλεύω', future: 'θα παλέψω', aorist: 'πάλεψα', imperative: 'πάλεψε / παλέψτε', translateEN: 'wrestle, fight', translateRU: 'бороться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1125, present: 'παντρεύομαι', future: 'θα παντρευτώ', aorist: 'παντρεύτηκα', imperative: 'παντρέψου / παντρευτείτε', translateEN: 'get married', translateRU: 'жениться, выходить замуж', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1126, present: 'παραγγέλνω', future: 'θα παραγγείλω', aorist: 'παρήγγειλα', imperative: 'παράγγειλε / παραγγείλετε', translateEN: 'order', translateRU: 'заказывать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1127, present: 'παράγω', future: null, aorist: 'παρήγαγα', imperative: null, translateEN: 'produce', translateRU: 'производить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1128, present: 'παραδέχομαι', future: 'θα παραδεχτώ', aorist: 'παραδέχτηκα', imperative: 'παραδέξου / παραδεχτείτε', translateEN: 'admit', translateRU: 'признавать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1129, present: 'παραδίδω', future: 'θα παραδώσω', aorist: 'παρέδωσα', imperative: 'παράδωσε / παραδώστε', translateEN: 'hand over, deliver', translateRU: 'сдавать, передавать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1130, present: 'παραθέτω', future: 'θα παραθέσω', aorist: 'παρέθεσα', imperative: 'παράθεσε / παραθέστε', translateEN: 'quote, cite', translateRU: 'цитировать, приводить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1131, present: 'παραιτούμαι', future: 'θα παραιτηθώ', aorist: 'παραιτήθηκα', imperative: 'παραιτήσου / παραιτηθείτε', translateEN: 'resign', translateRU: 'уходить в отставку, отказываться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1132, present: 'παρακαλώ', future: 'θα παρακαλέσω', aorist: 'παρακάλεσα', imperative: 'παρακάλεσε / παρακαλέστε', translateEN: 'beg, request', translateRU: 'просить, умолять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1133, present: 'παρακινώ', future: 'θα παρακινήσω', aorist: 'παρακίνησα', imperative: 'παρακίνησε / παρακινήστε', translateEN: 'urge, motivate', translateRU: 'побуждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1134, present: 'παρακμάζω', future: 'θα παρακμάσω', aorist: 'παρήκμασα', imperative: null, translateEN: 'decline', translateRU: 'приходить в упадок', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1135, present: 'παρακολουθώ', future: 'θα παρακολουθήσω', aorist: 'παρακολούθησα', imperative: 'παρακολούθησε / παρακολουθήστε', translateEN: 'watch, follow, attend', translateRU: 'следить, посещать', lexicalCategory: ['lexicalSense','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1136, present: 'παραμελώ', future: 'θα παραμελήσω', aorist: 'παραμέλησα', imperative: 'παραμέλησε / παραμελήστε', translateEN: 'neglect', translateRU: 'запускать, пренебрегать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1137, present: 'παραμένω', future: 'θα παραμείνω', aorist: 'παρέμεινα', imperative: 'παράμεινε / παραμείνετε', translateEN: 'remain', translateRU: 'оставаться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1138, present: 'παραμερίζω', future: 'θα παραμερίσω', aorist: 'παραμέρισα', imperative: 'παραμέρισε / παραμερίστε', translateEN: 'step aside, push aside', translateRU: 'отодвигать, сторониться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1139, present: 'παραμορφώνω', future: 'θα παραμορφώσω', aorist: 'παραμόρφωσα', imperative: 'παραμόρφωσε / παραμορφώστε', translateEN: 'deform, distort', translateRU: 'искажать, деформировать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1140, present: 'παραπατώ', future: 'θα παραπατήσω', aorist: 'παραπάτησα', imperative: 'παραπάτησε / παραπατήστε', translateEN: 'stumble', translateRU: 'спотыкаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1141, present: 'παραπλανώ', future: 'θα παραπλανήσω', aorist: 'παραπλάνησα', imperative: 'παραπλάνησε / παραπλανήστε', translateEN: 'mislead', translateRU: 'вводить в заблуждение', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1142, present: 'παραπλέω', future: 'θα παραπλεύσω', aorist: 'παρέπλευσα', imperative: 'παράπλευσε / παραπλεύστε', translateEN: 'sail past', translateRU: 'проплывать мимо', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1143, present: 'παραποιώ', future: 'θα παραποιήσω', aorist: 'παραποίησα', imperative: 'παραποίησε / παραποιήστε', translateEN: 'falsify, distort', translateRU: 'подделывать, искажать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1144, present: 'παραπονιέμαι', future: 'θα παραπονεθώ', aorist: 'παραπονέθηκα', imperative: 'παραπονέσου / παραπονεθείτε', translateEN: 'complain', translateRU: 'жаловаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1145, present: 'παραστρατώ', future: 'θα παραστρατήσω', aorist: 'παραστράτησα', imperative: 'παραστράτησε / παραστρατήστε', translateEN: 'go astray', translateRU: 'сбиваться с пути', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1146, present: 'παρασύρομαι', future: 'θα παρασυρθώ', aorist: 'παρασύρθηκα', imperative: 'παρασύρσου / παρασυρθείτε', translateEN: 'get carried away', translateRU: 'увлекаться, поддаваться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1147, present: 'παρασύρω', future: null, aorist: 'παρέσυρα', imperative: 'παράσυρε / παρασύρετε', translateEN: 'sweep away, drag along', translateRU: 'увлекать, сносить', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1148, present: 'παρατείνομαι', future: 'θα παραταθώ', aorist: 'παρατάθηκα', imperative: 'παράτασου / παραταθείτε', translateEN: 'be prolonged', translateRU: 'продлеваться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1149, present: 'παρατείνω', future: 'θα παρατείνω', aorist: 'παρέτεινα', imperative: 'παράτεινε / παρατείνετε', translateEN: 'extend, prolong', translateRU: 'продлевать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1150, present: 'παρατηρώ', future: 'θα παρατηρήσω', aorist: 'παρατήρησα', imperative: 'παρατήρησε / παρατηρήστε', translateEN: 'observe, notice', translateRU: 'наблюдать, замечать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1151, present: 'παρατώ', future: 'θα παρατήσω', aorist: 'παράτησα', imperative: 'παράτησε / παρατήστε', translateEN: 'abandon, quit', translateRU: 'бросать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1152, present: 'παραφράζω', future: 'θα παραφράσω', aorist: 'παρέφρασα', imperative: 'παράφρασε / παραφράστε', translateEN: 'paraphrase', translateRU: 'перефразировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1153, present: 'παραχωρώ', future: 'θα παραχωρήσω', aorist: 'παραχώρησα', imperative: 'παραχώρησε / παραχωρήστε', translateEN: 'concede, give up', translateRU: 'уступать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1154, present: 'παρεκκλίνω', future: 'θα παρεκκλίνω', aorist: 'παρέκκλινα', imperative: 'παρέκκλινε / παρεκκλίνετε', translateEN: 'deviate', translateRU: 'отклоняться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1155, present: 'παρενοχλώ', future: 'θα παρενοχλήσω', aorist: 'παρενόχλησα', imperative: 'παρενόχλησε / παρενοχλήστε', translateEN: 'harass', translateRU: 'досаждать, домогаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1156, present: 'παρεξηγώ', future: 'θα παρεξηγήσω', aorist: 'παρεξήγησα', imperative: 'παρεξήγησε / παρεξηγήστε', translateEN: 'misunderstand', translateRU: 'неверно понимать, обижаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1157, present: 'παρευρίσκομαι', future: 'θα παρευρεθώ', aorist: 'παρευρέθηκα', imperative: 'παρευρέσου / παρευρεθείτε', translateEN: 'attend, be present', translateRU: 'присутствовать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1158, present: 'παρέχω', future: 'θα παράσχω', aorist: 'παρείχα', imperative: null, translateEN: 'provide', translateRU: 'предоставлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1159, present: 'παρηγορώ', future: 'θα παρηγορήσω', aorist: 'παρηγόρησα', imperative: 'παρηγόρησε / παρηγορήστε', translateEN: 'comfort', translateRU: 'утешать', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1160, present: 'παριστάνω', future: 'θα παραστήσω', aorist: 'παρέστησα', imperative: 'παράστησε / παραστήστε', translateEN: 'pretend to be, represent', translateRU: 'изображать, представлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1161, present: 'παρκάρω', future: 'θα παρκάρω', aorist: 'πάρκαρα', imperative: 'πάρκαρε / παρκάρετε', translateEN: 'park', translateRU: 'парковать', lexicalCategory: ['lexicalMotion','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1162, present: 'παροτρύνω', future: 'θα παροτρύνω', aorist: 'παρότρυνα', imperative: 'παρότρυνε / παροτρύνετε', translateEN: 'urge on, exhort', translateRU: 'подстрекать, призывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1163, present: 'παρουσιάζομαι', future: 'θα παρουσιαστώ', aorist: 'παρουσιάστηκα', imperative: 'παρουσιάσου / παρουσιαστείτε', translateEN: 'appear, report in', translateRU: 'являться, появляться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1164, present: 'παρουσιάζω', future: 'θα παρουσιάσω', aorist: 'παρουσίασα', imperative: 'παρουσίασε / παρουσιάστε', translateEN: 'present, introduce', translateRU: 'представлять, показывать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1165, present: 'πασαλείβω', future: 'θα πασαλείψω', aorist: 'πασάλειψα', imperative: 'πασάλειψε / πασαλείψτε', translateEN: 'smear', translateRU: 'мазать, пачкать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1166, present: 'πασάρω', future: 'θα πασάρω', aorist: 'πάσαρα', imperative: 'πάσαρε / πασάρετε', translateEN: 'pass (ball)', translateRU: 'передавать мяч', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1167, present: 'πασπατεύω', future: 'θα πασπατέψω', aorist: 'πασπάτεψα', imperative: 'πασπάτεψε / πασπατέψτε', translateEN: 'fumble, grope', translateRU: 'щупать, лапать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1168, present: 'πασχίζω', future: 'θα πασχίσω', aorist: 'πάσχισα', imperative: 'πάσχισε / πασχίστε', translateEN: 'strive', translateRU: 'стараться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1169, present: 'πατώ', future: 'θα πατήσω', aorist: 'πάτησα', imperative: 'πάτησε / πατήστε', translateEN: 'step on, press', translateRU: 'наступать, нажимать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1170, present: 'παύω', future: 'θα παύσω', aorist: 'έπαυσα', imperative: 'παύσε / παύστε', translateEN: 'cease, stop', translateRU: 'прекращать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1171, present: 'παχαίνω', future: 'θα παχύνω', aorist: 'πάχυνα', imperative: 'πάχυνε / παχύνετε', translateEN: 'gain weight', translateRU: 'толстеть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1172, present: 'πάω', future: null, aorist: 'πήγα', imperative: 'πήγαινε / πηγαίνετε', translateEN: 'go', translateRU: 'идти, ехать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2','grammarIrregular']},
{id: 1173, present: 'πεθαίνω', future: 'θα πεθάνω', aorist: 'πέθανα', imperative: 'πέθανε / πεθάνετε', translateEN: 'die', translateRU: 'умирать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1174, present: 'πειθαρχώ', future: 'θα πειθαρχήσω', aorist: 'πειθάρχησα', imperative: 'πειθάρχησε / πειθαρχήστε', translateEN: 'obey, be disciplined', translateRU: 'подчиняться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1175, present: 'πείθομαι', future: 'θα πεισθώ', aorist: 'πείστηκα', imperative: 'πείσου / πειστείτε', translateEN: 'be persuaded', translateRU: 'убеждаться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1176, present: 'πείθω', future: 'θα πείσω', aorist: 'έπεισα', imperative: 'πείσε / πείστε', translateEN: 'convince', translateRU: 'убеждать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1177, present: 'πεινώ', future: 'θα πεινάσω', aorist: 'πείνασα', imperative: null, translateEN: 'be hungry', translateRU: 'хотеть есть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1178, present: 'πειράζω', future: 'θα πειράξω', aorist: 'πείραξα', imperative: 'πείραξε / πειράξτε', translateEN: 'bother, tease', translateRU: 'беспокоить, дразнить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1179, present: 'πειραματίζομαι', future: 'θα πειραματιστώ', aorist: 'πειραματίστηκα', imperative: 'πειραματίσου / πειραματιστείτε', translateEN: 'experiment', translateRU: 'экспериментировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1180, present: 'πεισματώνω', future: 'θα πεισματώσω', aorist: 'πεισμάτωσα', imperative: 'πεισμάτωσε / πεισματώστε', translateEN: 'dig in one\'s heels', translateRU: 'упрямиться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1181, present: 'πενθώ', future: 'θα πενθήσω', aorist: 'πένθησα', imperative: null, translateEN: 'mourn', translateRU: 'скорбеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1182, present: 'περηφανεύομαι', future: 'θα περηφανευτώ', aorist: 'περηφανεύτηκα', imperative: 'περηφανέψου / περηφανευτείτε', translateEN: 'take pride', translateRU: 'гордиться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1183, present: 'περιβάλλω', future: 'θα περιβάλω', aorist: 'περιέβαλα', imperative: 'περίβαλε / περιβάλετε', translateEN: 'surround', translateRU: 'окружать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1184, present: 'περιγελώ', future: 'θα περιγελάσω', aorist: 'περιγέλασα', imperative: 'περιγέλασε / περιγελάστε', translateEN: 'mock, laugh at', translateRU: 'высмеивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1185, present: 'περιγράφω', future: 'θα περιγράψω', aorist: 'περιέγραψα', imperative: 'περίγραψε / περιγράψτε', translateEN: 'describe', translateRU: 'описывать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1186, present: 'περιδιαβάζω', future: 'θα περιδιαβάσω', aorist: 'περιδιάβασα', imperative: 'περιδιάβασε / περιδιαβάστε', translateEN: 'stroll around', translateRU: 'прогуливаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1187, present: 'περιέχω', future: null, aorist: 'περιείχα', imperative: null, translateEN: 'contain', translateRU: 'содержать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1188, present: 'περικλείω', future: 'θα περικλείσω', aorist: 'περιέκλεισα', imperative: 'περίκλεισε / περικλείστε', translateEN: 'enclose', translateRU: 'заключать, окружать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1189, present: 'περιλαμβάνω', future: 'θα περιλάβω', aorist: 'περιέλαβα', imperative: 'περίλαβε / περιλάβετε', translateEN: 'include', translateRU: 'включать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1190, present: 'περιμένω', future: null, aorist: 'περίμενα', imperative: 'περίμενε / περιμένετε', translateEN: 'wait, expect', translateRU: 'ждать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1191, present: 'περιορίζω', future: 'θα περιορίσω', aorist: 'περιόρισα', imperative: 'περιόρισε / περιορίστε', translateEN: 'restrict', translateRU: 'ограничивать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1192, present: 'περιπίπτω', future: 'θα περιπέσω', aorist: 'περιέπεσα', imperative: 'περίπεσε / περιπέστε', translateEN: 'fall into', translateRU: 'впадать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1193, present: 'περιπλανιέμαι', future: 'θα περιπλανηθώ', aorist: 'περιπλανήθηκα', imperative: 'περιπλανήσου / περιπλανηθείτε', translateEN: 'wander', translateRU: 'бродить, скитаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1194, present: 'περιπλέκομαι', future: 'θα περιπλεχθώ', aorist: 'περιπλέχθηκα', imperative: 'περιπλέξου / περιπλεχθείτε', translateEN: 'get entangled', translateRU: 'запутываться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1195, present: 'περιπλέκω', future: 'θα περιπλέξω', aorist: 'περιέπλεξα', imperative: 'περίπλεξε / περιπλέξτε', translateEN: 'complicate', translateRU: 'усложнять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1196, present: 'περιποιούμαι', future: 'θα περιποιηθώ', aorist: 'περιποιήθηκα', imperative: 'περιποιήσου / περιποιηθείτε', translateEN: 'take care of, treat', translateRU: 'ухаживать, угощать', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 1197, present: 'περιπολώ', future: 'θα περιπολήσω', aorist: 'περιπόλησα', imperative: 'περιπόλησε / περιπολήστε', translateEN: 'patrol', translateRU: 'патрулировать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1198, present: 'περισσεύω', future: 'θα περισσέψω', aorist: 'περίσσεψα', imperative: null, translateEN: 'be left over', translateRU: 'оставаться, быть в избытке', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1199, present: 'περιστρέφω', future: 'θα περιστρέψω', aorist: 'περιέστρεψα', imperative: 'περίστρεψε / περιστρέψτε', translateEN: 'rotate', translateRU: 'вращать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1200, present: 'περιτρέχω', future: 'θα περιτρέξω', aorist: 'περιέτρεξα', imperative: 'περίτρεξε / περιτρέξτε', translateEN: 'run around', translateRU: 'обегать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1201, present: 'περιτριγυρίζω', future: 'θα περιτριγυρίσω', aorist: 'περιτριγύρισα', imperative: 'περιτριγύρισε / περιτριγυρίστε', translateEN: 'surround', translateRU: 'окружать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1202, present: 'περιτυλίγω', future: 'θα περιτυλίξω', aorist: 'περιτύλιξα', imperative: 'περιτύλιξε / περιτυλίξτε', translateEN: 'wrap around', translateRU: 'обёртывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1203, present: 'περιφέρομαι', future: 'θα περιφερθώ', aorist: 'περιφέρθηκα', imperative: 'περιφέρσου / περιφερθείτε', translateEN: 'wander around', translateRU: 'слоняться, бродить', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1204, present: 'περιφέρω', future: 'θα περιφέρω', aorist: 'περιέφερα', imperative: 'περίφερε / περιφέρετε', translateEN: 'carry around', translateRU: 'носить по кругу, возить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1205, present: 'περιφράζω', future: 'θα περιφράξω', aorist: 'περίφραξα', imperative: 'περίφραξε / περιφράξτε', translateEN: 'fence in', translateRU: 'огораживать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1206, present: 'περιφρονώ', future: 'θα περιφρονήσω', aorist: 'περιφρόνησα', imperative: 'περιφρόνησε / περιφρονήστε', translateEN: 'despise', translateRU: 'презирать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1207, present: 'περνώ', future: 'θα περάσω', aorist: 'πέρασα', imperative: 'πέρασε / περάστε', translateEN: 'pass, spend (time)', translateRU: 'проходить, проводить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1208, present: 'περπατώ', future: 'θα περπατήσω', aorist: 'περπάτησα', imperative: 'περπάτησε / περπατήστε', translateEN: 'walk', translateRU: 'ходить пешком', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1209, present: 'πετάγομαι', future: 'θα πεταχτώ', aorist: 'πετάχτηκα', imperative: 'πετάξου / πεταχτείτε', translateEN: 'jump up, dash', translateRU: 'вскакивать, выскакивать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1210, present: 'πετρώνω', future: 'θα πετρώσω', aorist: 'πέτρωσα', imperative: 'πέτρωσε / πετρώστε', translateEN: 'turn to stone, petrify', translateRU: 'каменеть', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1211, present: 'πετσοκόβω', future: 'θα πετσοκόψω', aorist: 'πετσόκοψα', imperative: 'πετσόκοψε / πετσοκόψτε', translateEN: 'hack to pieces', translateRU: 'кромсать, рубить на куски', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1212, present: 'πετυχαίνω', future: 'θα πετύχω', aorist: 'πέτυχα', imperative: 'πέτυχε / πετύχετε', translateEN: 'succeed, hit', translateRU: 'удаваться, попадать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1213, present: 'πετώ', future: 'θα πετάξω', aorist: 'πέταξα', imperative: 'πέταξε / πετάξτε', translateEN: 'throw, fly', translateRU: 'бросать, летать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1214, present: 'πέφτω', future: 'θα πέσω', aorist: 'έπεσα', imperative: 'πέσε / πέστε', translateEN: 'fall', translateRU: 'падать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1215, present: 'πηδώ', future: 'θα πηδήξω', aorist: 'πήδηξα', imperative: 'πήδηξε / πηδήξτε', translateEN: 'jump', translateRU: 'прыгать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1216, present: 'πήζω', future: 'θα πήξω', aorist: 'έπηξα', imperative: 'πήξε / πήξτε', translateEN: 'congeal, set', translateRU: 'застывать, свёртываться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1217, present: 'πιάνω', future: 'θα πιάσω', aorist: 'έπιασα', imperative: 'πιάσε / πιάστε', translateEN: 'catch, grab', translateRU: 'ловить, хватать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1218, present: 'πιέζω', future: 'θα πιέσω', aorist: 'έπιεσα', imperative: 'πίεσε / πιέστε', translateEN: 'press, pressure', translateRU: 'давить', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1219, present: 'πικραίνομαι', future: 'θα πικραθώ', aorist: 'πικράθηκα', imperative: 'πικράσου / πικραθείτε', translateEN: 'be saddened', translateRU: 'огорчаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1220, present: 'πικραίνω', future: 'θα πικράνω', aorist: 'πίκρανα', imperative: 'πίκρανε / πικράνετε', translateEN: 'embitter, sadden', translateRU: 'огорчать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1221, present: 'πίνω', future: 'θα πιω', aorist: 'ήπια', imperative: 'πιες / πιείτε', translateEN: 'drink', translateRU: 'пить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1222, present: 'πιστεύω', future: 'θα πιστέψω', aorist: 'πίστεψα', imperative: 'πίστεψε / πιστέψτε', translateEN: 'believe', translateRU: 'верить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1223, present: 'πιστοποιώ', future: 'θα πιστοποιήσω', aorist: 'πιστοποίησα', imperative: 'πιστοποίησε / πιστοποιήστε', translateEN: 'certify', translateRU: 'удостоверять, сертифицировать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1224, present: 'πιστώνω', future: 'θα πιστώσω', aorist: 'πίστωσα', imperative: 'πίστωσε / πιστώστε', translateEN: 'credit', translateRU: 'кредитовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1225, present: 'πιτσιλίζω', future: 'θα πιτσιλίσω', aorist: 'πιτσίλισα', imperative: 'πιτσίλισε / πιτσιλίστε', translateEN: 'splash', translateRU: 'брызгать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1226, present: 'πλαγιάζω', future: 'θα πλαγιάσω', aorist: 'πλάγιασα', imperative: 'πλάγιασε / πλαγιάστε', translateEN: 'lie down, go to bed', translateRU: 'ложиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1227, present: 'πλάθω', future: 'θα πλάσω', aorist: 'έπλασα', imperative: 'πλάσε / πλάστε', translateEN: 'mold, shape', translateRU: 'лепить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1228, present: 'πλακώνω', future: 'θα πλακώσω', aorist: 'πλάκωσα', imperative: 'πλάκωσε / πλακώστε', translateEN: 'crush, press down, descend upon', translateRU: 'придавливать, наваливаться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1229, present: 'πλαντάζω', future: 'θα πλαντάξω', aorist: 'πλάνταξα', imperative: 'πλάνταξε / πλαντάξτε', translateEN: 'burst (with laughter, rage)', translateRU: 'лопаться (от смеха, злости)', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1230, present: 'πλανώ', future: 'θα πλανήσω', aorist: 'πλάνησα', imperative: 'πλάνησε / πλανήστε', translateEN: 'deceive, mislead', translateRU: 'обманывать, вводить в заблуждение', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1231, present: 'πλαστογραφώ', future: 'θα πλαστογραφήσω', aorist: 'πλαστογράφησα', imperative: 'πλαστογράφησε / πλαστογραφήστε', translateEN: 'forge', translateRU: 'подделывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1232, present: 'πλαταίνω', future: 'θα πλατύνω', aorist: 'πλάτυνα', imperative: 'πλάτυνε / πλατύνετε', translateEN: 'widen', translateRU: 'расширять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1233, present: 'πλατσουρίζω', future: 'θα πλατσουρίσω', aorist: 'πλατσούρισα', imperative: 'πλατσούρισε / πλατσουρίστε', translateEN: 'splash about', translateRU: 'плескаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1234, present: 'πλειστηριάζω', future: 'θα πλειστηριάσω', aorist: 'πλειστηρίασα', imperative: 'πλειστηρίασε / πλειστηριάστε', translateEN: 'auction', translateRU: 'продавать с аукциона', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1235, present: 'πλέκω', future: 'θα πλέξω', aorist: 'έπλεξα', imperative: 'πλέξε / πλέξτε', translateEN: 'knit, weave', translateRU: 'вязать, плести', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1236, present: 'πλένω', future: 'θα πλύνω', aorist: 'έπλυνα', imperative: 'πλύνε / πλύνετε', translateEN: 'wash', translateRU: 'мыть, стирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1237, present: 'πλεονάζω', future: 'θα πλεονάσω', aorist: 'πλεόνασα', imperative: 'πλεόνασε / πλεονάστε', translateEN: 'be in excess', translateRU: 'быть в избытке', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1238, present: 'πλέω', future: 'θα πλεύσω', aorist: 'έπλευσα', imperative: 'πλεύσε / πλεύστε', translateEN: 'sail', translateRU: 'плыть (по морю)', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1239, present: 'πληγώνω', future: 'θα πληγώσω', aorist: 'πλήγωσα', imperative: 'πλήγωσε / πληγώστε', translateEN: 'wound, hurt', translateRU: 'ранить, обижать', lexicalCategory: ['lexicalHealth','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1240, present: 'πληθαίνω', future: 'θα πληθύνω', aorist: 'πλήθυνα', imperative: 'πλήθυνε / πληθύνετε', translateEN: 'multiply, increase', translateRU: 'умножаться, множиться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1241, present: 'πληκτρολογώ', future: 'θα πληκτρολογήσω', aorist: 'πληκτρολόγησα', imperative: 'πληκτρολόγησε / πληκτρολογήστε', translateEN: 'type (on a keyboard)', translateRU: 'набирать на клавиатуре', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1242, present: 'πλημμυρίζω', future: 'θα πλημμυρίσω', aorist: 'πλημμύρισα', imperative: 'πλημμύρισε / πλημμυρίστε', translateEN: 'flood', translateRU: 'затоплять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1243, present: 'πληροφορώ', future: 'θα πληροφορήσω', aorist: 'πληροφόρησα', imperative: 'πληροφόρησε / πληροφορήστε', translateEN: 'inform', translateRU: 'информировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1244, present: 'πληρώνω', future: 'θα πληρώσω', aorist: 'πλήρωσα', imperative: 'πλήρωσε / πληρώστε', translateEN: 'pay', translateRU: 'платить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1245, present: 'πλησιάζομαι', future: 'θα πλησιαστώ', aorist: 'πλησιάστηκα', imperative: 'πλησιάσου / πλησιαστείτε', translateEN: 'be approached', translateRU: 'подвергаться приближению', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1246, present: 'πλησιάζω', future: 'θα πλησιάσω', aorist: 'πλησίασα', imperative: 'πλησίασε / πλησιάστε', translateEN: 'approach', translateRU: 'приближаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1247, present: 'πλήττω', future: 'θα πλήξω', aorist: 'έπληξα', imperative: null, translateEN: 'strike, bore', translateRU: 'поражать, наскучивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1248, present: 'πλοηγούμαι', future: 'θα πλοηγηθώ', aorist: 'πλοηγήθηκα', imperative: 'πλοηγήσου / πλοηγηθείτε', translateEN: 'navigate', translateRU: 'ориентироваться, навигировать', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1249, present: 'πλουτίζω', future: 'θα πλουτίσω', aorist: 'πλούτισα', imperative: 'πλούτισε / πλουτίστε', translateEN: 'enrich, get rich', translateRU: 'обогащать, богатеть', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1250, present: 'πνίγομαι', future: 'θα πνιγώ', aorist: 'πνίγηκα', imperative: 'πνίξου / πνιγείτε', translateEN: 'drown, choke', translateRU: 'тонуть, задыхаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1251, present: 'πνίγω', future: 'θα πνίξω', aorist: 'έπνιξα', imperative: 'πνίξε / πνίξτε', translateEN: 'drown, choke', translateRU: 'топить, душить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1252, present: 'ποδηλατώ', future: 'θα ποδηλατήσω', aorist: 'ποδηλάτησα', imperative: 'ποδηλάτησε / ποδηλατήστε', translateEN: 'cycle, ride a bike', translateRU: 'ездить на велосипеде', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1253, present: 'ποδοπατώ', future: 'θα ποδοπατήσω', aorist: 'ποδοπάτησα', imperative: 'ποδοπάτησε / ποδοπατήστε', translateEN: 'trample', translateRU: 'топтать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1254, present: 'ποιώ', future: 'θα ποιήσω', aorist: 'ποίησα', imperative: 'ποίησε / ποιήστε', translateEN: 'create, make', translateRU: 'творить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1255, present: 'πολεμώ', future: 'θα πολεμήσω', aorist: 'πολέμησα', imperative: 'πολέμησε / πολεμήστε', translateEN: 'fight, wage war', translateRU: 'воевать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1256, present: 'πολιορκώ', future: 'θα πολιορκήσω', aorist: 'πολιόρκησα', imperative: 'πολιόρκησε / πολιορκήστε', translateEN: 'besiege', translateRU: 'осаждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1257, present: 'πολλαπλασιάζομαι', future: 'θα πολλαπλασιαστώ', aorist: 'πολλαπλασιάστηκα', imperative: 'πολλαπλασιάσου / πολλαπλασιαστείτε', translateEN: 'multiply', translateRU: 'умножаться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1258, present: 'πολλαπλασιάζω', future: 'θα πολλαπλασιάσω', aorist: 'πολλαπλασίασα', imperative: 'πολλαπλασίασε / πολλαπλασιάστε', translateEN: 'multiply', translateRU: 'умножать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1259, present: 'ποντάρω', future: null, aorist: 'πόνταρα', imperative: 'πόνταρε / ποντάρετε', translateEN: 'bet', translateRU: 'ставить (на кого-л.)', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1260, present: 'πονώ', future: 'θα πονέσω', aorist: 'πόνεσα', imperative: 'πόνεσε / πονέστε', translateEN: 'hurt, ache', translateRU: 'болеть, причинять боль', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
{id: 1261, present: 'πορεύομαι', future: 'θα πορευτώ', aorist: 'πορεύτηκα', imperative: 'πορεύσου / πορευτείτε', translateEN: 'proceed, travel', translateRU: 'идти, следовать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1262, present: 'ποτίζω', future: 'θα ποτίσω', aorist: 'πότισα', imperative: 'πότισε / ποτίστε', translateEN: 'water, give a drink', translateRU: 'поливать, поить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1263, present: 'πουλώ', future: 'θα πουλήσω', aorist: 'πούλησα', imperative: 'πούλησε / πουλήστε', translateEN: 'sell', translateRU: 'продавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1264, present: 'πραγματοποιώ', future: 'θα πραγματοποιήσω', aorist: 'πραγματοποίησα', imperative: 'πραγματοποίησε / πραγματοποιήστε', translateEN: 'carry out, realize', translateRU: 'осуществлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1265, present: 'πράττω', future: 'θα πράξω', aorist: 'έπραξα', imperative: 'πράξε / πράξτε', translateEN: 'act, do', translateRU: 'поступать, совершать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1266, present: 'πρέπει', future: null, aorist: 'έπρεπε', imperative: null, translateEN: 'must, it is necessary', translateRU: 'нужно, должен', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarIrregular']},
{id: 1267, present: 'πρήζομαι', future: 'θα πρηστώ', aorist: 'πρήστηκα', imperative: 'πρήσου / πρηστείτε', translateEN: 'swell up', translateRU: 'опухать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1268, present: 'πριονίζω', future: 'θα πριονίσω', aorist: 'πρίονισα', imperative: 'πρίονισε / πριονίστε', translateEN: 'saw', translateRU: 'пилить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1269, present: 'προάγω', future: 'θα προάξω', aorist: 'προήγαγα', imperative: 'προάγαγε / προαγάγετε', translateEN: 'promote', translateRU: 'продвигать, повышать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1270, present: 'προαισθάνομαι', future: 'θα προαισθανθώ', aorist: 'προαισθάνθηκα', imperative: 'προαισθάνσου / προαισθανθείτε', translateEN: 'have a premonition', translateRU: 'предчувствовать', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1271, present: 'προβάλλω', future: 'θα προβάλω', aorist: 'πρόβαλα', imperative: 'πρόβαλε / προβάλετε', translateEN: 'project, show, put forward', translateRU: 'проецировать, выдвигать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1272, present: 'προβιβάζω', future: 'θα προβιβάσω', aorist: 'προβίβασα', imperative: 'προβίβασε / προβιβάστε', translateEN: 'promote', translateRU: 'повышать (в должности)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1273, present: 'προβλέπω', future: 'θα προβλέψω', aorist: 'προέβλεψα', imperative: 'πρόβλεψε / προβλέψτε', translateEN: 'predict, foresee', translateRU: 'предсказывать, предусматривать', lexicalCategory: ['lexicalTime','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1274, present: 'προβληματίζω', future: 'θα προβληματίσω', aorist: 'προβλημάτισα', imperative: 'προβλημάτισε / προβληματίστε', translateEN: 'make (someone) think, worry', translateRU: 'заставлять задуматься', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1275, present: 'προβοδίζω', future: 'θα προβοδίσω', aorist: 'προβόδισα', imperative: 'προβόδισε / προβοδίστε', translateEN: 'see off', translateRU: 'провожать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1276, present: 'προγραμματίζω', future: 'θα προγραμματίσω', aorist: 'προγραμμάτισα', imperative: 'προγραμμάτισε / προγραμματίστε', translateEN: 'schedule, program', translateRU: 'планировать, программировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1277, present: 'προδίδω', future: 'θα προδώσω', aorist: 'πρόδωσα', imperative: 'πρόδωσε / προδώστε', translateEN: 'betray', translateRU: 'предавать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1278, present: 'προειδοποιώ', future: 'θα προειδοποιήσω', aorist: 'προειδοποίησα', imperative: 'προειδοποίησε / προειδοποιήστε', translateEN: 'warn', translateRU: 'предупреждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1279, present: 'προέρχομαι', future: 'θα προέλθω', aorist: 'προήλθα', imperative: null, translateEN: 'originate, come from', translateRU: 'происходить', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1280, present: 'προετοιμάζω', future: 'θα προετοιμάσω', aorist: 'προετοίμασα', imperative: 'προετοίμασε / προετοιμάστε', translateEN: 'prepare', translateRU: 'подготавливать', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1281, present: 'προηγούμαι', future: 'θα προηγηθώ', aorist: 'προηγήθηκα', imperative: 'προηγήσου / προηγηθείτε', translateEN: 'precede, lead', translateRU: 'предшествовать, лидировать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1282, present: 'προκαλώ', future: 'θα προκαλέσω', aorist: 'προκάλεσα', imperative: 'προκάλεσε / προκαλέστε', translateEN: 'provoke, cause', translateRU: 'вызывать, провоцировать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1283, present: 'προκύπτω', future: 'θα προκύψω', aorist: 'προέκυψα', imperative: null, translateEN: 'arise, result', translateRU: 'возникать, следовать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1284, present: 'προλαβαίνω', future: 'θα προλάβω', aorist: 'πρόλαβα', imperative: 'πρόλαβε / προλάβετε', translateEN: 'catch in time, manage', translateRU: 'успевать, предотвращать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1285, present: 'προμηθεύομαι', future: 'θα προμηθευτώ', aorist: 'προμηθεύτηκα', imperative: 'προμηθεύσου / προμηθευτείτε', translateEN: 'obtain, get hold of', translateRU: 'приобретать, запасаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1286, present: 'προμηθεύω', future: 'θα προμηθεύσω', aorist: 'προμήθευσα', imperative: 'προμήθευσε / προμηθεύστε', translateEN: 'supply', translateRU: 'снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1287, present: 'προοδεύω', future: 'θα προοδεύσω', aorist: 'προόδευσα', imperative: 'προόδευσε / προοδεύστε', translateEN: 'progress', translateRU: 'преуспевать, развиваться', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1288, present: 'προπληρώνω', future: 'θα προπληρώσω', aorist: 'προπλήρωσα', imperative: 'προπλήρωσε / προπληρώστε', translateEN: 'prepay', translateRU: 'оплачивать заранее', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1289, present: 'προπονούμαι', future: 'θα προπονηθώ', aorist: 'προπονήθηκα', imperative: 'προπονήσου / προπονηθείτε', translateEN: 'train', translateRU: 'тренироваться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1290, present: 'προπονώ', future: 'θα προπονήσω', aorist: 'προπόνησα', imperative: 'προπόνησε / προπονήστε', translateEN: 'coach', translateRU: 'тренировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1291, present: 'προσανατολίζομαι', future: 'θα προσανατολιστώ', aorist: 'προσανατολίστηκα', imperative: 'προσανατολίσου / προσανατολιστείτε', translateEN: 'find one\'s bearings', translateRU: 'ориентироваться', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1292, present: 'προσανατολίζω', future: 'θα προσανατολίσω', aorist: 'προσανατόλισα', imperative: 'προσανατόλισε / προσανατολίστε', translateEN: 'orient, direct', translateRU: 'ориентировать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1293, present: 'προσαρμόζω', future: 'θα προσαρμόσω', aorist: 'προσάρμοσα', imperative: 'προσάρμοσε / προσαρμόστε', translateEN: 'adapt, adjust', translateRU: 'приспосабливать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1294, present: 'προσβάλλω', future: 'θα προσβάλω', aorist: 'πρόσβαλα', imperative: null, translateEN: 'offend', translateRU: 'оскорблять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1295, present: 'προσγειώνομαι', future: 'θα προσγειωθώ', aorist: 'προσγειώθηκα', imperative: 'προσγειώσου / προσγειωθείτε', translateEN: 'land', translateRU: 'приземляться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1296, present: 'προσδιορίζω', future: 'θα προσδιορίσω', aorist: 'προσδιόρισα', imperative: 'προσδιόρισε / προσδιορίστε', translateEN: 'specify, determine', translateRU: 'определять, уточнять', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1297, present: 'προσδοκώ', future: 'θα προσδοκήσω', aorist: 'προσδόκησα', imperative: 'προσδόκησε / προσδοκήστε', translateEN: 'expect, anticipate', translateRU: 'ожидать, надеяться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1298, present: 'προσεγγίζω', future: 'θα προσεγγίσω', aorist: 'προσέγγισα', imperative: 'προσέγγισε / προσεγγίστε', translateEN: 'approach', translateRU: 'приближаться, подходить', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1299, present: 'προσεύχομαι', future: 'θα προσευχηθώ', aorist: 'προσευχήθηκα', imperative: 'προσευχήσου / προσευχηθείτε', translateEN: 'pray', translateRU: 'молиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1300, present: 'προσέχω', future: 'θα προσέξω', aorist: 'πρόσεξα', imperative: 'πρόσεξε / προσέξτε', translateEN: 'pay attention, be careful', translateRU: 'быть внимательным, беречься', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1301, present: 'προσθέτω', future: 'θα προσθέσω', aorist: 'πρόσθεσα', imperative: 'πρόσθεσε / προσθέστε', translateEN: 'add', translateRU: 'добавлять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1302, present: 'προσκαλώ', future: 'θα προσκαλέσω', aorist: 'προσκάλεσα', imperative: 'προσκάλεσε / προσκαλέστε', translateEN: 'invite', translateRU: 'приглашать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1303, present: 'προσκομίζω', future: 'θα προσκομίσω', aorist: 'προσκόμισα', imperative: 'προσκόμισε / προσκομίστε', translateEN: 'bring, submit', translateRU: 'предоставлять, приносить', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1304, present: 'προσκυνώ', future: 'θα προσκυνήσω', aorist: 'προσκύνησα', imperative: 'προσκύνησε / προσκυνήστε', translateEN: 'worship, bow', translateRU: 'поклоняться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1305, present: 'προσλαμβάνομαι', future: 'θα προσληφθώ', aorist: 'προσλήφθηκα', imperative: 'προσλήψου / προσληφθείτε', translateEN: 'be hired', translateRU: 'быть нанятым', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1306, present: 'προσλαμβάνω', future: 'θα προσλάβω', aorist: 'προσέλαβα', imperative: 'πρόσλαβε / προσλάβετε', translateEN: 'hire', translateRU: 'нанимать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1307, present: 'προσπαθώ', future: 'θα προσπαθήσω', aorist: 'προσπάθησα', imperative: 'προσπάθησε / προσπαθήστε', translateEN: 'try', translateRU: 'пытаться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1308, present: 'προσπερνώ', future: 'θα προσπεράσω', aorist: 'προσπέρασα', imperative: 'προσπέρασε / προσπεράστε', translateEN: 'overtake, pass', translateRU: 'обгонять, проходить мимо', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1309, present: 'προσπίπτω', future: 'θα προσπέσω', aorist: 'προσέπεσα', imperative: 'πρόσπεσε / προσπέστε', translateEN: 'fall at, assail', translateRU: 'припадать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1310, present: 'προσποιούμαι', future: 'θα προσποιηθώ', aorist: 'προσποιήθηκα', imperative: 'προσποιήσου / προσποιηθείτε', translateEN: 'pretend', translateRU: 'притворяться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
{id: 1311, present: 'προστατεύω', future: 'θα προστατέψω', aorist: 'προστάτεψα', imperative: 'προστάτεψε / προστατέψτε', translateEN: 'protect', translateRU: 'защищать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1312, present: 'προσφέρομαι', future: 'θα προσφερθώ', aorist: 'προσφέρθηκα', imperative: 'προσφέρσου / προσφερθείτε', translateEN: 'offer one\'s services', translateRU: 'предлагать свои услуги', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1313, present: 'προσφέρω', future: null, aorist: 'πρόσφερα', imperative: 'πρόσφερε / προσφέρετε', translateEN: 'offer', translateRU: 'предлагать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1314, present: 'προτείνω', future: null, aorist: 'πρότεινα', imperative: 'πρότεινε / προτείνετε', translateEN: 'suggest, propose', translateRU: 'предлагать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1315, present: 'προτιμώ', future: 'θα προτιμήσω', aorist: 'προτίμησα', imperative: 'προτίμησε / προτιμήστε', translateEN: 'prefer', translateRU: 'предпочитать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1316, present: 'προτρέπω', future: 'θα προτρέψω', aorist: 'προέτρεψα', imperative: 'προτρέψε / προτρέψτε', translateEN: 'urge, encourage', translateRU: 'призывать, побуждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1317, present: 'προφέρω', future: null, aorist: 'πρόφερα', imperative: 'πρόφερε / προφέρετε', translateEN: 'pronounce', translateRU: 'произносить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1318, present: 'προφητεύω', future: 'θα προφητεύσω', aorist: 'προφήτευσα', imperative: 'προφήτευσε / προφητεύστε', translateEN: 'prophesy', translateRU: 'пророчествовать', lexicalCategory: ['lexicalTime','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1319, present: 'προφταίνω', future: 'θα προφτάσω', aorist: 'πρόφτασα', imperative: 'πρόφτασε / προφτάστε', translateEN: 'make it in time', translateRU: 'успевать', lexicalCategory: ['lexicalTime','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1320, present: 'προχωρώ', future: 'θα προχωρήσω', aorist: 'προχώρησα', imperative: 'προχώρησε / προχωρήστε', translateEN: 'proceed, advance', translateRU: 'продвигаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1321, present: 'προωθώ', future: 'θα προωθήσω', aorist: 'προώθησα', imperative: 'προώθησε / προωθήστε', translateEN: 'promote, forward', translateRU: 'продвигать, пересылать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1322, present: 'πρωταγωνιστώ', future: 'θα πρωταγωνιστήσω', aorist: 'πρωταγωνίστησα', imperative: 'πρωταγωνίστησε / πρωταγωνιστήστε', translateEN: 'play the lead', translateRU: 'играть главную роль', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1323, present: 'πρωτοπορώ', future: 'θα πρωτοπορήσω', aorist: 'πρωτοπόρησα', imperative: 'πρωτοπόρησε / πρωτοπορήστε', translateEN: 'pioneer', translateRU: 'быть новатором, идти впереди', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1324, present: 'πρωτοστατώ', future: 'θα πρωτοστατήσω', aorist: 'πρωτοστάτησα', imperative: 'πρωτοστάτησε / πρωτοστατήστε', translateEN: 'spearhead', translateRU: 'стоять во главе', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1325, present: 'πτωχεύω', future: 'θα πτωχεύσω', aorist: 'πτώχευσα', imperative: 'πτώχευσε / πτωχεύστε', translateEN: 'go bankrupt', translateRU: 'разоряться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1326, present: 'πυκνώνω', future: 'θα πυκνώσω', aorist: 'πύκνωσα', imperative: 'πύκνωσε / πυκνώστε', translateEN: 'thicken', translateRU: 'сгущать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1327, present: 'πυροβολώ', future: 'θα πυροβολήσω', aorist: 'πυροβόλησα', imperative: 'πυροβόλησε / πυροβολήστε', translateEN: 'shoot', translateRU: 'стрелять', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1328, present: 'πυροδοτώ', future: 'θα πυροδοτήσω', aorist: 'πυροδότησα', imperative: 'πυροδότησε / πυροδοτήστε', translateEN: 'trigger, ignite', translateRU: 'запускать, провоцировать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1329, present: 'πυρπολώ', future: 'θα πυρπολήσω', aorist: 'πυρπόλησα', imperative: 'πυρπόλησε / πυρπολήστε', translateEN: 'set on fire', translateRU: 'поджигать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1330, present: 'πυρώνω', future: 'θα πυρώσω', aorist: 'πύρωσα', imperative: 'πύρωσε / πυρώστε', translateEN: 'heat to red-hot', translateRU: 'раскалять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1331, present: 'πωλώ', future: 'θα πωλήσω', aorist: 'πώλησα', imperative: 'πώλησε / πωλήστε', translateEN: 'sell (formal)', translateRU: 'продавать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1332, present: 'ράβω', future: 'θα ράψω', aorist: 'έραψα', imperative: 'ράψε / ράψτε', translateEN: 'sew', translateRU: 'шить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1333, present: 'ραγίζω', future: 'θα ραγίσω', aorist: 'ράγισα', imperative: 'ράγισε / ραγίστε', translateEN: 'crack', translateRU: 'трескаться, давать трещину', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1334, present: 'ραντίζω', future: 'θα ραντίσω', aorist: 'ράντισα', imperative: 'ράντισε / ραντίστε', translateEN: 'sprinkle, spray', translateRU: 'опрыскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1335, present: 'ρεζιλεύω', future: 'θα ρεζιλέψω', aorist: 'ρεζίλεψα', imperative: 'ρεζίλεψε / ρεζιλέψτε', translateEN: 'humiliate, disgrace', translateRU: 'позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1336, present: 'ρευστοποιώ', future: 'θα ρευστοποιήσω', aorist: 'ρευστοποίησα', imperative: 'ρευστοποίησε / ρευστοποιήστε', translateEN: 'liquidate (assets)', translateRU: 'обращать в деньги', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1337, present: 'ρέω', future: 'θα ρεύσω', aorist: 'έρρευσα', imperative: null, translateEN: 'flow', translateRU: 'течь', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1338, present: 'ρισκάρω', future: null, aorist: 'ρίσκαρα', imperative: 'ρίσκαρε / ρισκάρετε', translateEN: 'risk', translateRU: 'рисковать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1339, present: 'ρίχνομαι', future: 'θα ριχτώ', aorist: 'ρίχτηκα', imperative: 'ρίξου / ριχτείτε', translateEN: 'throw oneself, rush', translateRU: 'бросаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1340, present: 'ρίχνω', future: 'θα ρίξω', aorist: 'έριξα', imperative: 'ρίξε / ρίξτε', translateEN: 'throw, drop', translateRU: 'бросать, ронять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1341, present: 'ροκανίζω', future: 'θα ροκανίσω', aorist: 'ρόκανισα', imperative: 'ροκάνισε / ροκανίστε', translateEN: 'gnaw', translateRU: 'грызть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1342, present: 'ρουφώ', future: 'θα ρουφήξω', aorist: 'ρούφηξα', imperative: 'ρούφηξε / ρουφήξτε', translateEN: 'suck, sip', translateRU: 'всасывать, втягивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1343, present: 'ροχαλίζω', future: 'θα ροχαλίσω', aorist: 'ρόχαλισα', imperative: 'ρόχαλισε / ροχαλίστε', translateEN: 'snore', translateRU: 'храпеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1344, present: 'ρυθμίζω', future: 'θα ρυθμίσω', aorist: 'ρύθμισα', imperative: 'ρύθμισε / ρυθμίστε', translateEN: 'adjust, regulate', translateRU: 'регулировать, настраивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1345, present: 'ρυμουλκώ', future: 'θα ρυμουλκήσω', aorist: 'ρυμούλκησα', imperative: 'ρυμούλκησε / ρυμουλκήστε', translateEN: 'tow', translateRU: 'буксировать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1346, present: 'ρυπαίνω', future: 'θα ρυπάνω', aorist: 'ρύπανα', imperative: 'ρύπανε / ρυπάνετε', translateEN: 'pollute', translateRU: 'загрязнять', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1347, present: 'ρωτώ', future: 'θα ρωτήσω', aorist: 'ρώτησα', imperative: 'ρώτησε / ρωτήστε', translateEN: 'ask', translateRU: 'спрашивать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1348, present: 'σαλπάρω', future: null, aorist: 'σάλπαρα', imperative: 'σάλπαρε / σαλπάρετε', translateEN: 'set sail', translateRU: 'отплывать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1349, present: 'σαπίζω', future: 'θα σαπίσω', aorist: 'σάπισα', imperative: null, translateEN: 'rot', translateRU: 'гнить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1350, present: 'σαπουνίζω', future: 'θα σαπουνίσω', aorist: 'σαπούνισα', imperative: 'σαπούνισε / σαπουνίστε', translateEN: 'soap up', translateRU: 'намыливать', lexicalCategory: ['lexicalAction','lexicalBasic'], grammaticalCategory: ['grammar1']},
{id: 1351, present: 'σαρώνω', future: 'θα σαρώσω', aorist: 'σάρωσα', imperative: 'σάρωσε / σαρώστε', translateEN: 'sweep, scan', translateRU: 'сметать, сканировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1352, present: 'σαστίζω', future: 'θα σαστίσω', aorist: 'σάστισα', imperative: null, translateEN: 'be bewildered', translateRU: 'смущаться, теряться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1353, present: 'σβήνω', future: 'θα σβήσω', aorist: 'έσβησα', imperative: 'σβήσε / σβήστε', translateEN: 'erase, extinguish', translateRU: 'стирать, гасить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1354, present: 'σέβομαι', future: 'θα σεβαστώ', aorist: 'σεβάστηκα', imperative: 'σεβάσου / σεβαστείτε', translateEN: 'respect', translateRU: 'уважать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1355, present: 'σερβίρω', future: null, aorist: 'σέρβιρα', imperative: 'σέρβιρε / σερβίρετε', translateEN: 'serve (food)', translateRU: 'подавать (на стол)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1356, present: 'σέρνομαι', future: 'θα συρθώ', aorist: 'σύρθηκα', imperative: 'σύρσου / συρθείτε', translateEN: 'crawl, drag oneself', translateRU: 'ползти, волочиться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1357, present: 'σέρνω', future: 'θα σύρω', aorist: 'έσυρα', imperative: 'σύρε / σύρτε', translateEN: 'drag, pull', translateRU: 'тащить, волочить', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1358, present: 'σηκώνομαι', future: 'θα σηκωθώ', aorist: 'σηκώθηκα', imperative: 'σήκω / σηκωθείτε', translateEN: 'get up, stand up', translateRU: 'вставать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1359, present: 'σηκώνω', future: 'θα σηκώσω', aorist: 'σήκωσα', imperative: 'σήκωσε / σηκώστε', translateEN: 'lift, raise', translateRU: 'поднимать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1360, present: 'σημαίνω', future: 'θα σημάνω', aorist: 'σήμανα', imperative: null, translateEN: 'mean, signify', translateRU: 'означать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1361, present: 'σημειώνω', future: 'θα σημειώσω', aorist: 'σημείωσα', imperative: 'σημείωσε / σημειώστε', translateEN: 'note, score', translateRU: 'отмечать, записывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1362, present: 'σιγοβράζω', future: 'θα σιγοβράσω', aorist: 'σιγόβρασα', imperative: 'σιγόβρασε / σιγοβράστε', translateEN: 'simmer', translateRU: 'томить, кипеть на медленном огне', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1363, present: 'σιγοτραγουδώ', future: 'θα σιγοτραγουδήσω', aorist: 'σιγοτραγούδησα', imperative: 'σιγοτραγούδησε / σιγοτραγουδήστε', translateEN: 'hum, sing softly', translateRU: 'напевать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1364, present: 'σιδερώνω', future: 'θα σιδερώσω', aorist: 'σιδέρωσα', imperative: 'σιδέρωσε / σιδερώστε', translateEN: 'iron', translateRU: 'гладить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1365, present: 'σιχαίνομαι', future: 'θα σιχαθώ', aorist: 'σιχάθηκα', imperative: 'σιχάσου / σιχαθείτε', translateEN: 'loathe', translateRU: 'брезговать, испытывать отвращение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1366, present: 'σιωπώ', future: 'θα σιωπήσω', aorist: 'σιώπησα', imperative: 'σιώπησε / σιωπήστε', translateEN: 'be silent', translateRU: 'молчать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1367, present: 'σκάβω', future: 'θα σκάψω', aorist: 'έσκαψα', imperative: 'σκάψε / σκάψτε', translateEN: 'dig', translateRU: 'копать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1368, present: 'σκαλίζω', future: 'θα σκαλίσω', aorist: 'σκάλισα', imperative: 'σκάλισε / σκαλίστε', translateEN: 'dig, carve', translateRU: 'ковырять, вырезать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1369, present: 'σκανδαλίζω', future: 'θα σκανδαλίσω', aorist: 'σκανδάλισα', imperative: 'σκανδάλισε / σκανδαλίστε', translateEN: 'scandalize, shock', translateRU: 'шокировать, соблазнять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1370, present: 'σκαρφαλώνω', future: 'θα σκαρφαλώσω', aorist: 'σκαρφάλωσα', imperative: 'σκαρφάλωσε / σκαρφαλώστε', translateEN: 'climb', translateRU: 'карабкаться, взбираться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1371, present: 'σκέφτομαι', future: 'θα σκεφτώ', aorist: 'σκέφτηκα', imperative: 'σκέψου / σκεφτείτε', translateEN: 'think', translateRU: 'думать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1372, present: 'σκηνοθετώ', future: 'θα σκηνοθετήσω', aorist: 'σκηνοθέτησα', imperative: 'σκηνοθέτησε / σκηνοθετήστε', translateEN: 'direct (film, play)', translateRU: 'ставить, режиссировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1373, present: 'σκιαγραφώ', future: 'θα σκιαγραφήσω', aorist: 'σκιαγράφησα', imperative: 'σκιαγράφησε / σκιαγραφήστε', translateEN: 'sketch, outline', translateRU: 'набрасывать, обрисовывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1374, present: 'σκιάζω', future: 'θα σκιάσω', aorist: 'σκίασα', imperative: 'σκίασε / σκιάστε', translateEN: 'shade, overshadow', translateRU: 'затенять', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1375, present: 'σκίζω', future: 'θα σκίσω', aorist: 'έσκισα', imperative: 'σκίσε / σκίστε', translateEN: 'tear', translateRU: 'рвать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1376, present: 'σκληραίνω', future: 'θα σκληρύνω', aorist: 'σκλήρυνα', imperative: 'σκλήρυνε / σκληρύνετε', translateEN: 'harden', translateRU: 'твердеть, ожесточать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1377, present: 'σκοντάφτω', future: 'θα σκοντάψω', aorist: 'σκόνταψα', imperative: null, translateEN: 'stumble', translateRU: 'спотыкаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1378, present: 'σκοπεύω', future: 'θα σκοπεύσω', aorist: 'σκόπευσα', imperative: null, translateEN: 'intend, aim', translateRU: 'намереваться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1379, present: 'σκοράρω', future: 'θα σκοράρω', aorist: 'σκόραρα', imperative: 'σκοράρισε / σκοραρίστε', translateEN: 'score', translateRU: 'забивать гол', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1380, present: 'σκορπίζω', future: 'θα σκορπίσω', aorist: 'σκόρπισα', imperative: 'σκόρπισε / σκορπίστε', translateEN: 'scatter', translateRU: 'рассыпать, разбрасывать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1381, present: 'σκοτώνω', future: 'θα σκοτώσω', aorist: 'σκότωσα', imperative: 'σκότωσε / σκοτώστε', translateEN: 'kill', translateRU: 'убивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1382, present: 'σκουντώ', future: 'θα σκουντήσω', aorist: 'σκούντηξα', imperative: 'σκούντηξε / σκουντήξτε', translateEN: 'nudge, jostle', translateRU: 'толкать локтем', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1383, present: 'σκουπίζω', future: 'θα σκουπίσω', aorist: 'σκούπισα', imperative: 'σκούπισε / σκουπίστε', translateEN: 'wipe, sweep', translateRU: 'вытирать, подметать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1384, present: 'σκουραίνω', future: 'θα σκουρύνω', aorist: 'σκούρυνα', imperative: null, translateEN: 'darken', translateRU: 'темнеть', lexicalCategory: ['lexicalSense','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1385, present: 'σκουριάζω', future: 'θα σκουριάσω', aorist: 'σκούριασα', imperative: 'σκούριασε / σκουριάστε', translateEN: 'rust', translateRU: 'ржаветь', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1386, present: 'σκύβω', future: 'θα σκύψω', aorist: 'έσκυψα', imperative: 'σκύψε / σκύψτε', translateEN: 'bend over', translateRU: 'наклоняться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1387, present: 'σμίγω', future: 'θα σμίξω', aorist: 'έσμιξα', imperative: null, translateEN: 'unite, meet', translateRU: 'соединяться, встречаться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1388, present: 'σοβαρεύω', future: 'θα σοβαρέψω', aorist: 'σοβάρεψα', imperative: 'σοβάρεψε / σοβαρέψτε', translateEN: 'become serious', translateRU: 'становиться серьёзным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1389, present: 'σοκάρω', future: 'θα σοκάρω', aorist: 'σόκαρα', imperative: 'σόκαρε / σοκάρετε', translateEN: 'shock', translateRU: 'шокировать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1390, present: 'σουτάρω', future: 'θα σουτάρω', aorist: 'σούταρα', imperative: 'σούταρε / σουτάρετε', translateEN: 'shoot (sport)', translateRU: 'бить по воротам', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1391, present: 'σπάζω', future: 'θα σπάσω', aorist: 'έσπασα', imperative: 'σπάσε / σπάστε', translateEN: 'break', translateRU: 'ломать, разбивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1392, present: 'σπανίζω', future: 'θα σπανίσω', aorist: 'σπάνισα', imperative: 'σπάνισε / σπανίστε', translateEN: 'be scarce', translateRU: 'быть редкостью, не хватать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1393, present: 'σπαράζω', future: 'θα σπαράξω', aorist: 'σπάραξα', imperative: 'σπάραξε / σπαράξτε', translateEN: 'writhe, tear apart', translateRU: 'разрывать, содрогаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1394, present: 'σπαρταρώ', future: 'θα σπαρταρήσω', aorist: 'σπαρτάρησα', imperative: 'σπαρτάρησε / σπαρταρήστε', translateEN: 'writhe, flutter', translateRU: 'биться, трепетать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1395, present: 'σπαταλώ', future: 'θα σπαταλήσω', aorist: 'σπατάλησα', imperative: 'σπατάλησε / σπαταλήστε', translateEN: 'waste, squander', translateRU: 'тратить впустую', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1396, present: 'σπέρνω', future: 'θα σπείρω', aorist: 'έσπειρα', imperative: 'σπείρε / σπείρτε', translateEN: 'sow', translateRU: 'сеять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1397, present: 'σπουδάζω', future: 'θα σπουδάσω', aorist: 'σπούδασα', imperative: 'σπούδασε / σπουδάστε', translateEN: 'study (at university)', translateRU: 'учиться (в вузе)', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1398, present: 'σπρώχνω', future: 'θα σπρώξω', aorist: 'έσπρωξα', imperative: 'σπρώξε / σπρώξτε', translateEN: 'push', translateRU: 'толкать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1399, present: 'στάζω', future: 'θα στάξω', aorist: 'έσταξα', imperative: 'στάξε / στάξτε', translateEN: 'drip', translateRU: 'капать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1400, present: 'σταθεροποιώ', future: 'θα σταθεροποιήσω', aorist: 'σταθεροποίησα', imperative: 'σταθεροποίησε / σταθεροποιήστε', translateEN: 'stabilize', translateRU: 'стабилизировать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1401, present: 'σταθμεύω', future: 'θα σταθμεύσω', aorist: 'στάθμευσα', imperative: 'στάθμευσε / σταθμεύστε', translateEN: 'park', translateRU: 'парковаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1402, present: 'σταματώ', future: 'θα σταματήσω', aorist: 'σταμάτησα', imperative: 'σταμάτησε / σταματήστε', translateEN: 'stop', translateRU: 'останавливать, останавливаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
{id: 1403, present: 'στεγάζω', future: 'θα στεγάσω', aorist: 'στέγασα', imperative: 'στέγασε / στεγάστε', translateEN: 'house, shelter', translateRU: 'размещать, давать приют', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1404, present: 'στεγνώνω', future: 'θα στεγνώσω', aorist: 'στέγνωσα', imperative: 'στέγνωσε / στεγνώστε', translateEN: 'dry', translateRU: 'сушить, сохнуть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1405, present: 'στέκομαι', future: 'θα σταθώ', aorist: 'στάθηκα', imperative: 'στάσου / σταθείτε', translateEN: 'stand', translateRU: 'стоять, останавливаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1406, present: 'στέλνω', future: 'θα στείλω', aorist: 'έστειλα', imperative: 'στείλε / στείλτε', translateEN: 'send', translateRU: 'отправлять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1407, present: 'στεναχωριέμαι', future: 'θα στεναχωρηθώ', aorist: 'στεναχωρήθηκα', imperative: null, translateEN: 'be upset', translateRU: 'огорчаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1408, present: 'στεναχωρώ', future: 'θα στεναχωρήσω', aorist: 'στεναχώρησα', imperative: 'στεναχώρησε / στεναχωρήστε', translateEN: 'upset', translateRU: 'огорчать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1409, present: 'στενεύω', future: 'θα στενέψω', aorist: 'στένεψα', imperative: 'στένεψε / στενέψτε', translateEN: 'narrow, tighten', translateRU: 'сужать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1410, present: 'στερεοποιώ', future: 'θα στερεοποιήσω', aorist: 'στερεοποίησα', imperative: 'στερεοποίησε / στερεοποιήστε', translateEN: 'solidify', translateRU: 'затвердевать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1411, present: 'στερεύω', future: 'θα στερέψω', aorist: 'στέρεψα', imperative: 'στέρεψε / στερέψτε', translateEN: 'dry up, run dry', translateRU: 'иссякать, высыхать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1412, present: 'στερούμαι', future: 'θα στερηθώ', aorist: 'στερήθηκα', imperative: null, translateEN: 'lack, be deprived of', translateRU: 'лишаться, испытывать недостаток', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1413, present: 'στερώ', future: 'θα στερήσω', aorist: 'στέρησα', imperative: 'στέρησε / στερήστε', translateEN: 'deprive', translateRU: 'лишать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1414, present: 'στεφανώνω', future: 'θα στεφανώσω', aorist: 'στεφάνωσα', imperative: 'στεφάνωσε / στεφανώστε', translateEN: 'crown, marry (ceremony)', translateRU: 'венчать, увенчивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1415, present: 'στηρίζω', future: 'θα στηρίξω', aorist: 'στήριξα', imperative: 'στήριξε / στηρίξτε', translateEN: 'support, prop', translateRU: 'поддерживать, опирать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1416, present: 'στιγματίζω', future: 'θα στιγματίσω', aorist: 'στιγμάτισα', imperative: 'στιγμάτισε / στιγματίστε', translateEN: 'stigmatize', translateRU: 'клеймить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1417, present: 'στίζω', future: 'θα στίξω', aorist: 'έστιξα', imperative: 'στίξε / στίξτε', translateEN: 'punctuate', translateRU: 'расставлять знаки препинания', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1418, present: 'στιλβώνω', future: 'θα στιλβώσω', aorist: 'στίλβωσα', imperative: 'στίλβωσε / στιλβώστε', translateEN: 'polish', translateRU: 'полировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1419, present: 'στιχουργώ', future: 'θα στιχουργήσω', aorist: 'στιχούργησα', imperative: 'στιχούργησε / στιχουργήστε', translateEN: 'write verses', translateRU: 'сочинять стихи', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1420, present: 'στολίζω', future: 'θα στολίσω', aorist: 'στόλισα', imperative: 'στόλισε / στολίστε', translateEN: 'decorate', translateRU: 'украшать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1421, present: 'στοχάζομαι', future: 'θα στοχαστώ', aorist: 'στοχάστηκα', imperative: 'στοχάσου / στοχαστείτε', translateEN: 'ponder', translateRU: 'размышлять, раздумывать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1422, present: 'στοχεύω', future: 'θα στοχεύσω', aorist: 'στόχευσα', imperative: 'στόχευσε / στοχεύστε', translateEN: 'aim', translateRU: 'целиться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1423, present: 'στραγγίζω', future: 'θα στραγγίσω', aorist: 'στράγγισα', imperative: 'στράγγισε / στραγγίστε', translateEN: 'drain, wring out', translateRU: 'сливать, отжимать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1424, present: 'στρατεύομαι', future: 'θα στρατευτώ', aorist: 'στρατεύτηκα', imperative: 'στρατεύσου / στρατευτείτε', translateEN: 'enlist, join the army', translateRU: 'вступать в армию', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1425, present: 'στρατολογώ', future: 'θα στρατολογήσω', aorist: 'στρατολόγησα', imperative: 'στρατολόγησε / στρατολογήστε', translateEN: 'recruit', translateRU: 'вербовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1426, present: 'στρέφω', future: 'θα στρέψω', aorist: 'έστρεψα', imperative: 'στρέψε / στρέψτε', translateEN: 'turn, direct', translateRU: 'поворачивать, направлять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1427, present: 'στρίβω', future: 'θα στρίψω', aorist: 'έστριψα', imperative: 'στρίψε / στρίψτε', translateEN: 'turn, twist', translateRU: 'поворачивать, крутить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1428, present: 'στριμώχνω', future: 'θα στριμώξω', aorist: 'στρίμωξα', imperative: 'στρίμωξε / στριμώξτε', translateEN: 'squeeze in, corner', translateRU: 'втискивать, загонять в угол', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1429, present: 'στριφογυρίζω', future: 'θα στριφογυρίσω', aorist: 'στριφογύρισα', imperative: 'στριφογύρισε / στριφογυρίστε', translateEN: 'spin around, toss', translateRU: 'вертеться, кружиться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1430, present: 'στρογγυλοποιώ', future: 'θα στρογγυλοποιήσω', aorist: 'στρογγυλοποίησα', imperative: 'στρογγυλοποίησε / στρογγυλοποιήστε', translateEN: 'round off', translateRU: 'округлять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1431, present: 'στρώνω', future: 'θα στρώσω', aorist: 'έστρωσα', imperative: 'στρώσε / στρώστε', translateEN: 'spread, make (bed), set (table)', translateRU: 'стелить, накрывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1432, present: 'συγγράφω', future: 'θα συγγράψω', aorist: 'συνέγραψα', imperative: 'σύγγραψε / συγγράψτε', translateEN: 'write (a book)', translateRU: 'сочинять, писать (книгу)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1433, present: 'συγκαλύπτω', future: 'θα συγκαλύψω', aorist: 'συγκάλυψα', imperative: 'συγκάλυψε / συγκαλύψτε', translateEN: 'cover up', translateRU: 'скрывать, покрывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1434, present: 'συγκεντρώνομαι', future: 'θα συγκεντρωθώ', aorist: 'συγκεντρώθηκα', imperative: 'συγκεντρώσου / συγκεντρωθείτε', translateEN: 'concentrate, gather', translateRU: 'сосредоточиваться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1435, present: 'συγκεντρώνω', future: 'θα συγκεντρώσω', aorist: 'συγκέντρωσα', imperative: 'συγκέντρωσε / συγκεντρώστε', translateEN: 'gather, concentrate', translateRU: 'собирать, сосредоточивать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1436, present: 'συγκινώ', future: 'θα συγκινήσω', aorist: 'συγκίνησα', imperative: 'συγκίνησε / συγκινήστε', translateEN: 'move (emotionally)', translateRU: 'трогать, волновать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1437, present: 'συγκλονίζω', future: 'θα συγκλονίσω', aorist: 'συγκλόνισα', imperative: 'συγκλόνισε / συγκλονίστε', translateEN: 'shake, shock', translateRU: 'потрясать', lexicalCategory: ['lexicalInfluence','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1438, present: 'συγκρατώ', future: 'θα συγκρατήσω', aorist: 'συγκράτησα', imperative: 'συγκράτησε / συγκρατήστε', translateEN: 'restrain, retain', translateRU: 'сдерживать, запоминать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1439, present: 'συγκρίνομαι', future: 'θα συγκριθώ', aorist: 'συγκρίθηκα', imperative: 'συγκρίσου / συγκριθείτε', translateEN: 'be compared', translateRU: 'сравниваться', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1440, present: 'συγκρίνω', future: null, aorist: 'σύγκρινα', imperative: 'σύγκρινε / συγκρίνετε', translateEN: 'compare', translateRU: 'сравнивать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1441, present: 'συγκρούομαι', future: 'θα συγκρουστώ', aorist: 'συγκρούστηκα', imperative: 'συγκρούσου / συγκρουστείτε', translateEN: 'collide, clash', translateRU: 'сталкиваться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1442, present: 'συγυρίζω', future: 'θα συγυρίσω', aorist: 'συγύρισα', imperative: 'συγύρισε / συγυρίστε', translateEN: 'tidy up', translateRU: 'прибирать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1443, present: 'συγχρονίζομαι', future: 'θα συγχρονιστώ', aorist: 'συγχρονίστηκα', imperative: 'συγχρονίσου / συγχρονιστείτε', translateEN: 'be in sync', translateRU: 'синхронизироваться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1444, present: 'συγχρονίζω', future: 'θα συγχρονίσω', aorist: 'συγχρόνισα', imperative: 'συγχρόνισε / συγχρονίστε', translateEN: 'synchronize', translateRU: 'синхронизировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1445, present: 'συγχωρώ', future: 'θα συγχωρήσω', aorist: 'συγχώρησα', imperative: 'συγχώρησε / συγχωρήστε', translateEN: 'forgive', translateRU: 'прощать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1446, present: 'συζητώ', future: 'θα συζητήσω', aorist: 'συζήτησα', imperative: 'συζήτησε / συζητήστε', translateEN: 'discuss', translateRU: 'обсуждать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1447, present: 'συκοφαντώ', future: 'θα συκοφαντήσω', aorist: 'συκοφάντησα', imperative: 'συκοφάντησε / συκοφαντήστε', translateEN: 'slander', translateRU: 'клеветать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1448, present: 'συλλαβίζω', future: 'θα συλλαβίσω', aorist: 'συλλάβισα', imperative: 'συλλάβισε / συλλαβίστε', translateEN: 'spell out, syllabify', translateRU: 'читать по слогам', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1449, present: 'συλλαμβάνω', future: 'θα συλλάβω', aorist: 'συνέλαβα', imperative: 'σύλλαβε / συλλάβετε', translateEN: 'arrest, conceive', translateRU: 'арестовывать, постигать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1450, present: 'συλλέγω', future: 'θα συλλέξω', aorist: 'συνέλεξα', imperative: 'σύλλεξε / συλλέξτε', translateEN: 'collect', translateRU: 'собирать, коллекционировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1451, present: 'συλλογίζομαι', future: 'θα συλλογιστώ', aorist: 'συλλογίστηκα', imperative: 'συλλογίσου / συλλογιστείτε', translateEN: 'ponder', translateRU: 'размышлять', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1452, present: 'συλλυπούμαι', future: 'θα συλλυπηθώ', aorist: 'συλλυπήθηκα', imperative: 'συλλυπήσου / συλλυπηθείτε', translateEN: 'offer condolences', translateRU: 'выражать соболезнования', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1453, present: 'συμβαίνω', future: 'θα συμβώ', aorist: 'συνέβη', imperative: null, translateEN: 'happen', translateRU: 'происходить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1454, present: 'συμβάλλω', future: 'θα συμβάλω', aorist: 'συνέβαλα', imperative: null, translateEN: 'contribute', translateRU: 'способствовать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1455, present: 'συμβουλεύομαι', future: 'θα συμβουλευτώ', aorist: 'συμβουλεύτηκα', imperative: 'συμβουλέψου / συμβουλευτείτε', translateEN: 'consult, seek advice', translateRU: 'советоваться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1456, present: 'συμβουλεύω', future: 'θα συμβουλέψω', aorist: 'συμβούλεψα', imperative: 'συμβούλεψε / συμβουλέψτε', translateEN: 'advise', translateRU: 'советовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1457, present: 'συμμετέχω', future: 'θα συμμετάσχω', aorist: 'συμμετείχα', imperative: null, translateEN: 'participate', translateRU: 'участвовать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1458, present: 'συμπαθώ', future: 'θα συμπαθήσω', aorist: 'συμπάθησα', imperative: 'συμπάθησε / συμπαθήστε', translateEN: 'like, sympathize', translateRU: 'симпатизировать, любить', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1459, present: 'συμπεραίνω', future: 'θα συμπεράνω', aorist: 'συμπέρανα', imperative: 'συμπέρανε / συμπεράνετε', translateEN: 'conclude', translateRU: 'делать вывод', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1460, present: 'συμπεριφέρομαι', future: 'θα συμπεριφερθώ', aorist: 'συμπεριφέρθηκα', imperative: 'συμπεριφέρσου / συμπεριφερθείτε', translateEN: 'behave', translateRU: 'вести себя', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1461, present: 'συμπιέζω', future: 'θα συμπιέσω', aorist: 'συμπίεσα', imperative: 'συμπίεσε / συμπιέστε', translateEN: 'compress', translateRU: 'сжимать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1462, present: 'συμπίπτω', future: 'θα συμπέσω', aorist: 'συνέπεσα', imperative: null, translateEN: 'coincide', translateRU: 'совпадать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1463, present: 'συμπληρώνομαι', future: 'θα συμπληρωθώ', aorist: 'συμπληρώθηκα', imperative: 'συμπληρώσου / συμπληρωθείτε', translateEN: 'be filled in, be completed', translateRU: 'заполняться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1464, present: 'συμπληρώνω', future: 'θα συμπληρώσω', aorist: 'συμπλήρωσα', imperative: 'συμπλήρωσε / συμπληρώστε', translateEN: 'complete, fill in', translateRU: 'заполнять, дополнять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1465, present: 'συμπονώ', future: 'θα συμπονέσω', aorist: 'συμπόνεσα', imperative: 'συμπόνεσε / συμπονέστε', translateEN: 'sympathize with', translateRU: 'сочувствовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1466, present: 'συμπυκνώνω', future: 'θα συμπυκνώσω', aorist: 'συμπύκνωσα', imperative: 'συμπύκνωσε / συμπυκνώστε', translateEN: 'condense, concentrate', translateRU: 'сгущать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1467, present: 'συμφιλιώνω', future: 'θα συμφιλιώσω', aorist: 'συμφίλιωσα', imperative: 'συμφίλιωσε / συμφιλιώστε', translateEN: 'reconcile', translateRU: 'примирять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1468, present: 'συμφωνώ', future: 'θα συμφωνήσω', aorist: 'συμφώνησα', imperative: 'συμφώνησε / συμφωνήστε', translateEN: 'agree', translateRU: 'соглашаться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1469, present: 'συναγωνίζομαι', future: 'θα συναγωνιστώ', aorist: 'συναγωνίστηκα', imperative: 'συναγωνίσου / συναγωνιστείτε', translateEN: 'compete', translateRU: 'конкурировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1470, present: 'συναινώ', future: 'θα συναινέσω', aorist: 'συναίνεσα', imperative: 'συναίνεσε / συναινέστε', translateEN: 'consent', translateRU: 'давать согласие', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1471, present: 'συναισθάνομαι', future: 'θα συναισθανθώ', aorist: 'συναισθάνθηκα', imperative: 'συναισθάνσου / συναισθανθείτε', translateEN: 'empathize', translateRU: 'сопереживать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1472, present: 'συναντιέμαι', future: 'θα συναντηθώ', aorist: 'συναντήθηκα', imperative: 'συναντήσου / συναντηθείτε', translateEN: 'meet (with each other)', translateRU: 'встречаться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
{id: 1473, present: 'συναντώ', future: 'θα συναντήσω', aorist: 'συνάντησα', imperative: 'συνάντησε / συναντήστε', translateEN: 'meet, encounter', translateRU: 'встречать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1474, present: 'συναρμολογώ', future: 'θα συναρμολογήσω', aorist: 'συναρμολόγησα', imperative: 'συναρμολόγησε / συναρμολογήστε', translateEN: 'assemble', translateRU: 'собирать (механизм)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1475, present: 'συνδέομαι', future: 'θα συνδεθώ', aorist: 'συνδέθηκα', imperative: 'συνδέσου / συνδεθείτε', translateEN: 'log in, connect', translateRU: 'входить в систему, подключаться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1476, present: 'συνδέω', future: 'θα συνδέσω', aorist: 'σύνδεσα', imperative: 'σύνδεσε / συνδέστε', translateEN: 'connect', translateRU: 'соединять, подключать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1477, present: 'συνδυάζω', future: 'θα συνδυάσω', aorist: 'συνδύασα', imperative: 'συνδύασε / συνδυάστε', translateEN: 'combine', translateRU: 'сочетать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1478, present: 'συνειδητοποιώ', future: 'θα συνειδητοποιήσω', aorist: 'συνειδητοποίησα', imperative: 'συνειδητοποίησε / συνειδητοποιήστε', translateEN: 'realize', translateRU: 'осознавать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1479, present: 'συνεισφέρω', future: null, aorist: 'συνεισέφερα', imperative: 'συνεισέφερε / συνεισεφέρετε', translateEN: 'contribute', translateRU: 'вносить вклад', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1480, present: 'συνεννοούμαι', future: 'θα συνεννοηθώ', aorist: 'συνεννοήθηκα', imperative: 'συνεννοήσου / συνεννοηθείτε', translateEN: 'communicate, come to terms', translateRU: 'договариваться, понимать друг друга', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1481, present: 'συνεργάζομαι', future: 'θα συνεργαστώ', aorist: 'συνεργάστηκα', imperative: 'συνεργάσου / συνεργαστείτε', translateEN: 'cooperate', translateRU: 'сотрудничать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
{id: 1482, present: 'συνεχίζω', future: 'θα συνεχίσω', aorist: 'συνέχισα', imperative: 'συνέχισε / συνεχίστε', translateEN: 'continue', translateRU: 'продолжать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1483, present: 'συνηθίζω', future: 'θα συνηθίσω', aorist: 'συνήθισα', imperative: 'συνήθισε / συνηθίστε', translateEN: 'get used to', translateRU: 'привыкать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1484, present: 'συνθέτω', future: 'θα συνθέσω', aorist: 'σύνθεσα', imperative: 'σύνθεσε / συνθέστε', translateEN: 'compose, synthesize', translateRU: 'сочинять, составлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1485, present: 'συνιστώ', future: 'θα συστήσω', aorist: 'σύστησα', imperative: 'σύστησε / συστήστε', translateEN: 'recommend', translateRU: 'рекомендовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1486, present: 'συνοδεύω', future: 'θα συνοδεύσω', aorist: 'συνόδευσα', imperative: 'συνόδευσε / συνοδεύστε', translateEN: 'accompany', translateRU: 'сопровождать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1487, present: 'συνομιλώ', future: 'θα συνομιλήσω', aorist: 'συνομίλησα', imperative: 'συνομίλησε / συνομιλήστε', translateEN: 'converse', translateRU: 'беседовать', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammar2']},
{id: 1488, present: 'συνοψίζω', future: 'θα συνοψίσω', aorist: 'συνόψισα', imperative: 'συνόψισε / συνοψίστε', translateEN: 'summarize', translateRU: 'резюмировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1489, present: 'συνταγογραφώ', future: 'θα συνταγογραφήσω', aorist: 'συνταγογράφησα', imperative: 'συνταγογράφησε / συνταγογραφήστε', translateEN: 'prescribe', translateRU: 'выписывать рецепт', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1490, present: 'συντάσσω', future: 'θα συντάξω', aorist: 'σύνταξα', imperative: 'σύνταξε / συντάξτε', translateEN: 'draw up, draft', translateRU: 'составлять (документ)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1491, present: 'συντηρώ', future: 'θα συντηρήσω', aorist: 'συντήρησα', imperative: 'συντήρησε / συντηρήστε', translateEN: 'maintain, support', translateRU: 'содержать, обслуживать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1492, present: 'συντομεύω', future: 'θα συντομεύσω', aorist: 'συντόμευσα', imperative: 'συντόμευσε / συντομεύστε', translateEN: 'shorten, hurry up', translateRU: 'сокращать, ускорять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1493, present: 'συντομογραφώ', future: 'θα συντομογραφήσω', aorist: 'συντομογράφησα', imperative: 'συντομογράφησε / συντομογραφήστε', translateEN: 'abbreviate', translateRU: 'сокращать (слово)', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1494, present: 'συσκευάζω', future: 'θα συσκευάσω', aorist: 'συσκεύασα', imperative: 'συσκεύασε / συσκευάστε', translateEN: 'pack', translateRU: 'упаковывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1495, present: 'συσσωρεύω', future: 'θα συσσωρεύσω', aorist: 'συσσώρευσα', imperative: 'συσσώρευσε / συσσωρεύστε', translateEN: 'accumulate', translateRU: 'накапливать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1496, present: 'συστέλλω', future: 'θα συστείλω', aorist: 'συνέστειλα', imperative: 'συστείλε / συστείλετε', translateEN: 'contract, constrict', translateRU: 'сжимать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1497, present: 'συστήνομαι', future: 'θα συσταθώ', aorist: 'συστήθηκα', imperative: 'συστήσου / συστηθείτε', translateEN: 'introduce oneself', translateRU: 'представляться', lexicalCategory: ['lexicalSocial','lexicalBasic'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1498, present: 'συστήνω', future: 'θα συστήσω', aorist: 'σύστησα', imperative: 'σύστησε / συστήστε', translateEN: 'introduce, recommend', translateRU: 'представлять, рекомендовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1499, present: 'συχνάζω', future: 'θα συχνάσω', aorist: 'σύχνασα', imperative: null, translateEN: 'frequent, hang out', translateRU: 'часто бывать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1500, present: 'σφάζω', future: 'θα σφάξω', aorist: 'έσφαξα', imperative: 'σφάξε / σφάξτε', translateEN: 'slaughter', translateRU: 'резать, забивать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1501, present: 'σφάλλω', future: null, aorist: 'έσφαλα', imperative: 'σφάλε / σφάλτε', translateEN: 'err, make a mistake', translateRU: 'ошибаться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1502, present: 'σφίγγομαι', future: 'θα σφιχτώ', aorist: 'σφίχτηκα', imperative: 'σφίξου / σφιχτείτε', translateEN: 'squeeze together, tighten', translateRU: 'сжиматься, теснее садиться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1503, present: 'σφίγγω', future: 'θα σφίξω', aorist: 'έσφιξα', imperative: 'σφίξε / σφίξτε', translateEN: 'squeeze, tighten', translateRU: 'сжимать, затягивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1504, present: 'σφουγγαρίζω', future: 'θα σφουγγαρίσω', aorist: 'σφουγγάρισα', imperative: 'σφουγγάρισε / σφουγγαρίστε', translateEN: 'mop', translateRU: 'мыть пол', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1505, present: 'σφραγίζω', future: 'θα σφραγίσω', aorist: 'σφράγισα', imperative: 'σφράγισε / σφραγίστε', translateEN: 'seal, stamp', translateRU: 'запечатывать, ставить печать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1506, present: 'σφυρηλατώ', future: 'θα σφυρηλατήσω', aorist: 'σφυρηλάτησα', imperative: 'σφυρηλάτησε / σφυρηλατήστε', translateEN: 'forge', translateRU: 'ковать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1507, present: 'σφυρίζω', future: 'θα σφυρίξω', aorist: 'σφύριξα', imperative: 'σφύριξε / σφυρίξτε', translateEN: 'whistle', translateRU: 'свистеть', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1508, present: 'σφυροκοπώ', future: 'θα σφυροκοπήσω', aorist: 'σφυροκόπησα', imperative: 'σφυροκόπησε / σφυροκοπήστε', translateEN: 'hammer', translateRU: 'колотить молотком', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1509, present: 'σχάζω', future: 'θα σχάσω', aorist: 'έσχασα', imperative: 'σχάσε / σχάστε', translateEN: 'split, burst', translateRU: 'раскалываться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1510, present: 'σχεδιάζω', future: 'θα σχεδιάσω', aorist: 'σχεδίασα', imperative: 'σχεδίασε / σχεδιάστε', translateEN: 'design, plan', translateRU: 'проектировать, планировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1511, present: 'σχετίζομαι', future: 'θα σχετιστώ', aorist: 'σχετίστηκα', imperative: 'σχετίσου / σχετιστείτε', translateEN: 'be related, associate', translateRU: 'быть связанным, общаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1512, present: 'σχηματίζω', future: 'θα σχηματίσω', aorist: 'σχημάτισα', imperative: 'σχημάτισε / σχηματίστε', translateEN: 'form', translateRU: 'образовывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1513, present: 'σχίζω', future: 'θα σχίσω', aorist: 'έσχισα', imperative: 'σχίσε / σχίστε', translateEN: 'tear, split', translateRU: 'рвать, раскалывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1514, present: 'σχολιάζω', future: 'θα σχολιάσω', aorist: 'σχολίασα', imperative: 'σχολίασε / σχολιάστε', translateEN: 'comment', translateRU: 'комментировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1515, present: 'σχολώ', future: 'θα σχολάσω', aorist: 'σχόλασα', imperative: 'σχόλασε / σχολάστε', translateEN: 'finish work/school', translateRU: 'заканчивать работу, занятия', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
{id: 1516, present: 'σώζομαι', future: 'θα σωθώ', aorist: 'σώθηκα', imperative: 'σώσου / σωθείτε', translateEN: 'be saved, escape', translateRU: 'спасаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1517, present: 'σώζω', future: 'θα σώσω', aorist: 'έσωσα', imperative: 'σώσε / σώστε', translateEN: 'save, rescue', translateRU: 'спасать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1518, present: 'σωπαίνω', future: 'θα σωπάσω', aorist: 'σώπασα', imperative: 'σώπασε / σωπάστε', translateEN: 'fall silent', translateRU: 'умолкать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1519, present: 'σωριάζομαι', future: 'θα σωριαστώ', aorist: 'σωριάστηκα', imperative: 'σωριάσου / σωριαστείτε', translateEN: 'collapse, slump', translateRU: 'валиться, рухнуть', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1520, present: 'τάζω', future: 'θα τάξω', aorist: 'έταξα', imperative: 'τάξε / τάξτε', translateEN: 'vow, promise', translateRU: 'обещать (в дар), давать обет', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1521, present: 'ταΐζω', future: 'θα ταΐσω', aorist: 'τάισα', imperative: 'τάισε / ταΐστε', translateEN: 'feed', translateRU: 'кормить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1522, present: 'ταιριάζω', future: 'θα ταιριάξω', aorist: 'ταίριαξα', imperative: 'ταίριαξε / ταιριάξτε', translateEN: 'match, suit', translateRU: 'подходить, сочетаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1523, present: 'τακτοποιώ', future: 'θα τακτοποιήσω', aorist: 'τακτοποίησα', imperative: 'τακτοποίησε / τακτοποιήστε', translateEN: 'tidy up, arrange', translateRU: 'приводить в порядок', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1524, present: 'ταλαιπωρώ', future: 'θα ταλαιπωρήσω', aorist: 'ταλαιπώρησα', imperative: 'ταλαιπώρησε / ταλαιπωρήστε', translateEN: 'torment, put through hardship', translateRU: 'мучить, изводить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1525, present: 'ταλαντεύομαι', future: 'θα ταλαντευτώ', aorist: 'ταλαντεύτηκα', imperative: 'ταλαντέψου / ταλαντευτείτε', translateEN: 'sway, waver', translateRU: 'колебаться, качаться', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1526, present: 'ταλαντώνω', future: 'θα ταλαντώσω', aorist: 'ταλάντωσα', imperative: 'ταλάντωσε / ταλαντώστε', translateEN: 'oscillate, swing', translateRU: 'колебать, раскачивать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1527, present: 'ταξιδεύω', future: 'θα ταξιδέψω', aorist: 'ταξίδεψα', imperative: 'ταξίδεψε / ταξιδέψτε', translateEN: 'travel', translateRU: 'путешествовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1528, present: 'ταξινομώ', future: 'θα ταξινομήσω', aorist: 'ταξινόμησα', imperative: 'ταξινόμησε / ταξινομήστε', translateEN: 'classify, sort', translateRU: 'классифицировать, сортировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1529, present: 'ταπεινώνω', future: 'θα ταπεινώσω', aorist: 'ταπείνωσα', imperative: 'ταπείνωσε / ταπεινώστε', translateEN: 'humiliate', translateRU: 'унижать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1530, present: 'ταράζω', future: 'θα ταράξω', aorist: 'τάραξα', imperative: 'τάραξε / ταράξτε', translateEN: 'disturb, shake', translateRU: 'тревожить, потрясать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1531, present: 'ταυτίζω', future: 'θα ταυτίσω', aorist: 'ταύτισα', imperative: 'ταύτισε / ταυτίστε', translateEN: 'identify (with)', translateRU: 'отождествлять', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1532, present: 'ταχυδρομώ', future: 'θα ταχυδρομήσω', aorist: 'ταχυδρόμησα', imperative: 'ταχυδρόμησε / ταχυδρομήστε', translateEN: 'mail, post', translateRU: 'отправлять по почте', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1533, present: 'τεκνοποιώ', future: 'θα τεκνοποιήσω', aorist: 'τεκνοποίησα', imperative: 'τεκνοποίησε / τεκνοποιήστε', translateEN: 'have children', translateRU: 'рожать детей', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1534, present: 'τελειοποιώ', future: 'θα τελειοποιήσω', aorist: 'τελειοποίησα', imperative: 'τελειοποίησε / τελειοποιήστε', translateEN: 'perfect', translateRU: 'совершенствовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1535, present: 'τελειώνω', future: 'θα τελειώσω', aorist: 'τελείωσα', imperative: 'τελείωσε / τελειώστε', translateEN: 'finish', translateRU: 'заканчивать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1536, present: 'τεμαχίζω', future: 'θα τεμαχίσω', aorist: 'τεμάχισα', imperative: 'τεμάχισε / τεμαχίστε', translateEN: 'cut into pieces', translateRU: 'разделять на куски', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1537, present: 'τεντώνομαι', future: 'θα τεντωθώ', aorist: 'τεντώθηκα', imperative: 'τεντώσου / τεντωθείτε', translateEN: 'stretch', translateRU: 'потягиваться, натягиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1538, present: 'τεντώνω', future: 'θα τεντώσω', aorist: 'τέντωσα', imperative: 'τέντωσε / τεντώστε', translateEN: 'stretch', translateRU: 'растягивать, напрягать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1539, present: 'τερματίζω', future: 'θα τερματίσω', aorist: 'τερμάτισα', imperative: 'τερμάτισε / τερματίστε', translateEN: 'end, finish', translateRU: 'завершать, финишировать', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1540, present: 'τέρπω', future: 'θα τέρψω', aorist: 'έτερψα', imperative: 'τέρψε / τέρψτε', translateEN: 'delight', translateRU: 'услаждать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1541, present: 'τηγανίζω', future: 'θα τηγανίσω', aorist: 'τηγάνισα', imperative: 'τηγάνισε / τηγανίστε', translateEN: 'fry', translateRU: 'жарить на сковороде', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1542, present: 'τηλεφωνώ', future: 'θα τηλεφωνήσω', aorist: 'τηλεφώνησα', imperative: 'τηλεφώνησε / τηλεφωνήστε', translateEN: 'phone, call', translateRU: 'звонить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1543, present: 'τηρώ', future: 'θα τηρήσω', aorist: 'τήρησα', imperative: 'τήρησε / τηρήστε', translateEN: 'observe, comply with', translateRU: 'соблюдать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1544, present: 'τιμώ', future: 'θα τιμήσω', aorist: 'τίμησα', imperative: 'τίμησε / τιμήστε', translateEN: 'honor', translateRU: 'чтить, почитать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1545, present: 'τιμωρώ', future: 'θα τιμωρήσω', aorist: 'τιμώρησα', imperative: 'τιμώρησε / τιμωρήστε', translateEN: 'punish', translateRU: 'наказывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1546, present: 'τινάζομαι', future: 'θα τιναχτώ', aorist: 'τινάχτηκα', imperative: 'τινάξου / τιναχτείτε', translateEN: 'jump, start', translateRU: 'вздрагивать, подскакивать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1547, present: 'τινάζω', future: 'θα τινάξω', aorist: 'τίναξα', imperative: 'τίναξε / τινάξτε', translateEN: 'shake off', translateRU: 'стряхивать, встряхивать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1548, present: 'τιτιβίζω', future: 'θα τιτιβίσω', aorist: 'τιτίβισα', imperative: 'τιτίβισε / τιτιβίστε', translateEN: 'twitter, chirp', translateRU: 'чирикать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1549, present: 'τολμώ', future: 'θα τολμήσω', aorist: 'τόλμησα', imperative: 'τόλμησε / τολμήστε', translateEN: 'dare', translateRU: 'осмеливаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1550, present: 'τονίζομαι', future: 'θα τονιστώ', aorist: 'τονίστηκα', imperative: 'τονίσου / τονιστείτε', translateEN: 'be stressed (accented)', translateRU: 'получать ударение', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1551, present: 'τονίζω', future: 'θα τονίσω', aorist: 'τόνισα', imperative: 'τόνισε / τονίστε', translateEN: 'stress, emphasize', translateRU: 'подчёркивать, ставить ударение', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1552, present: 'τοποθετώ', future: 'θα τοποθετήσω', aorist: 'τοποθέτησα', imperative: 'τοποθέτησε / τοποθετήστε', translateEN: 'place, position', translateRU: 'помещать, размещать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1553, present: 'τραβώ', future: 'θα τραβήξω', aorist: 'τράβηξα', imperative: 'τράβηξε / τραβήξτε', translateEN: 'pull, take (photo)', translateRU: 'тянуть, снимать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1554, present: 'τραγουδώ', future: 'θα τραγουδήσω', aorist: 'τραγούδησα', imperative: 'τραγούδησε / τραγουδήστε', translateEN: 'sing', translateRU: 'петь', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1555, present: 'τρακάρω', future: null, aorist: 'τράκαρα', imperative: null, translateEN: 'crash, collide', translateRU: 'врезаться, попасть в аварию', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1556, present: 'τραυλίζω', future: 'θα τραυλίσω', aorist: 'τραύλισα', imperative: 'τραύλισε / τραυλίστε', translateEN: 'stutter', translateRU: 'заикаться', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1557, present: 'τραυματίζω', future: 'θα τραυματίσω', aorist: 'τραυμάτισα', imperative: 'τραυμάτισε / τραυματίστε', translateEN: 'injure', translateRU: 'ранить, травмировать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1558, present: 'τρελαίνω', future: 'θα τρελάνω', aorist: 'τρέλανα', imperative: 'τρέλανε / τρελάνετε', translateEN: 'drive crazy', translateRU: 'сводить с ума', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1559, present: 'τρεμοπαίζω', future: 'θα τρεμοπαίξω', aorist: 'τρεμόπαιξα', imperative: 'τρεμόπαιξε / τρεμοπαίξτε', translateEN: 'flicker, blink', translateRU: 'мерцать, моргать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1560, present: 'τρέμω', future: null, aorist: 'έτρεμα', imperative: null, translateEN: 'tremble', translateRU: 'дрожать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1561, present: 'τρέπομαι', future: 'θα τραπώ', aorist: 'τράπηκα', imperative: 'τράπου / τραπείτε', translateEN: 'turn to, resort to', translateRU: 'обращаться, прибегать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1562, present: 'τρέφω', future: 'θα θρέψω', aorist: 'έθρεψα', imperative: 'θρέψε / θρέψτε', translateEN: 'feed, nourish', translateRU: 'кормить, питать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1563, present: 'τρέχω', future: 'θα τρέξω', aorist: 'έτρεξα', imperative: 'τρέξε / τρέξτε', translateEN: 'run', translateRU: 'бежать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1564, present: 'τρίβομαι', future: 'θα τριφτώ', aorist: 'τρίφτηκα', imperative: 'τρίψου / τριφτείτε', translateEN: 'rub oneself, wear away', translateRU: 'тереться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1565, present: 'τρίβω', future: 'θα τρίψω', aorist: 'έτριψα', imperative: 'τρίψε / τρίψτε', translateEN: 'rub, grate', translateRU: 'тереть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1566, present: 'τριγυρίζω', future: 'θα τριγυρίσω', aorist: 'τριγύρισα', imperative: 'τριγύρισε / τριγυρίστε', translateEN: 'wander around', translateRU: 'бродить, слоняться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1567, present: 'τρικλίζω', future: 'θα τρικλίσω', aorist: 'τρίκλισα', imperative: 'τρίκλισε / τρικλίστε', translateEN: 'stagger, totter', translateRU: 'шататься', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1568, present: 'τρομάζω', future: 'θα τρομάξω', aorist: 'τρόμαξα', imperative: 'τρόμαξε / τρομάξτε', translateEN: 'scare, get scared', translateRU: 'пугать, пугаться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1569, present: 'τρομοκρατώ', future: 'θα τρομοκρατήσω', aorist: 'τρομοκράτησα', imperative: 'τρομοκράτησε / τρομοκρατήστε', translateEN: 'terrorize', translateRU: 'терроризировать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1570, present: 'τροποποιώ', future: 'θα τροποποιήσω', aorist: 'τροποποίησα', imperative: 'τροποποίησε / τροποποιήστε', translateEN: 'modify', translateRU: 'изменять, видоизменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1571, present: 'τροφοδοτώ', future: 'θα τροφοδοτήσω', aorist: 'τροφοδότησα', imperative: 'τροφοδότησε / τροφοδοτήστε', translateEN: 'supply, feed', translateRU: 'снабжать, питать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1572, present: 'τροχίζω', future: 'θα τροχίσω', aorist: 'τρόχισα', imperative: 'τρόχισε / τροχίστε', translateEN: 'sharpen, grind', translateRU: 'точить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1573, present: 'τρυγώ', future: 'θα τρυγήσω', aorist: 'τρύγησα', imperative: 'τρύγησε / τρυγήστε', translateEN: 'harvest (grapes)', translateRU: 'собирать виноград', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1574, present: 'τρυπώ', future: 'θα τρυπήσω', aorist: 'τρύπησα', imperative: 'τρύπησε / τρυπήστε', translateEN: 'pierce, make a hole', translateRU: 'прокалывать, сверлить', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1575, present: 'τρώω', future: 'θα φάω', aorist: 'έφαγα', imperative: 'φάε / φάτε', translateEN: 'eat', translateRU: 'есть, кушать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1576, present: 'τσακίζομαι', future: 'θα τσακιστώ', aorist: 'τσακίστηκα', imperative: 'τσακίσου / τσακιστείτε', translateEN: 'break, hurry up', translateRU: 'ломаться, спешить', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1577, present: 'τσακίζω', future: 'θα τσακίσω', aorist: 'τσάκισα', imperative: 'τσάκισε / τσακίστε', translateEN: 'crush, break', translateRU: 'ломать, сокрушать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1578, present: 'τσακώνομαι', future: 'θα τσακωθώ', aorist: 'τσακώθηκα', imperative: 'τσακώσου / τσακωθείτε', translateEN: 'quarrel', translateRU: 'ссориться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1579, present: 'τσαλαβουτώ', future: 'θα τσαλαβουτήσω', aorist: 'τσαλαβούτησα', imperative: 'τσαλαβούτησε / τσαλαβουτήστε', translateEN: 'splash, paddle', translateRU: 'плескаться, барахтаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1580, present: 'τσαλακώνω', future: 'θα τσαλακώσω', aorist: 'τσαλάκωσα', imperative: 'τσαλάκωσε / τσαλακώστε', translateEN: 'crumple', translateRU: 'мять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1581, present: 'τσιγαρίζω', future: 'θα τσιγαρίσω', aorist: 'τσιγάρισα', imperative: 'τσιγάρισε / τσιγαρίστε', translateEN: 'sauté', translateRU: 'обжаривать, пассеровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1582, present: 'τσιμπολογώ', future: 'θα τσιμπολογήσω', aorist: 'τσιμπολόγησα', imperative: 'τσιμπολόγησε / τσιμπολογήστε', translateEN: 'nibble, peck', translateRU: 'клевать, перекусывать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1583, present: 'τσιμπώ', future: 'θα τσιμπήσω', aorist: 'τσίμπησα', imperative: 'τσίμπησε / τσιμπήστε', translateEN: 'pinch, sting', translateRU: 'щипать, кусать (о насекомых)', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1584, present: 'τσιρίζω', future: 'θα τσιρίξω', aorist: 'τσίριξα', imperative: 'τσίριξε / τσιρίξτε', translateEN: 'scream, shriek', translateRU: 'визжать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1585, present: 'τσουγκρίζω', future: 'θα τσουγκρίσω', aorist: 'τσούγκρισα', imperative: 'τσούγκρισε / τσουγκρίστε', translateEN: 'clink (glasses)', translateRU: 'чокаться', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1586, present: 'τυλίγομαι', future: 'θα τυλιχτώ', aorist: 'τυλίχτηκα', imperative: 'τυλίξου / τυλιχτείτε', translateEN: 'wrap oneself, curl up', translateRU: 'закутываться, свиваться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1587, present: 'τυλίγω', future: 'θα τυλίξω', aorist: 'τύλιξα', imperative: 'τύλιξε / τυλίξτε', translateEN: 'wrap', translateRU: 'заворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1588, present: 'τυπώνω', future: 'θα τυπώσω', aorist: 'τύπωσα', imperative: 'τύπωσε / τυπώστε', translateEN: 'print', translateRU: 'печатать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1589, present: 'τυραννώ', future: 'θα τυραννήσω', aorist: 'τυράννησα', imperative: 'τυράννησε / τυραννήστε', translateEN: 'torment, tyrannize', translateRU: 'мучить, тиранить', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1590, present: 'τυφλώνω', future: 'θα τυφλώσω', aorist: 'τύφλωσα', imperative: 'τύφλωσε / τυφλώστε', translateEN: 'blind', translateRU: 'ослеплять', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1591, present: 'τυχαίνω', future: 'θα τύχω', aorist: 'έτυχα', imperative: null, translateEN: 'happen (to be)', translateRU: 'случаться, оказываться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1592, present: 'υγραίνω', future: 'θα υγράνω', aorist: 'ύγρανα', imperative: 'ύγρανε / υγράνετε', translateEN: 'moisten', translateRU: 'увлажнять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1593, present: 'υγροποιώ', future: 'θα υγροποιήσω', aorist: 'υγροποίησα', imperative: 'υγροποίησε / υγροποιήστε', translateEN: 'liquefy', translateRU: 'сжижать', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1594, present: 'υιοθετώ', future: 'θα υιοθετήσω', aorist: 'υιοθέτησα', imperative: 'υιοθέτησε / υιοθετήστε', translateEN: 'adopt', translateRU: 'усыновлять, принимать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1595, present: 'υπαγορεύω', future: 'θα υπαγορεύσω', aorist: 'υπαγόρευσα', imperative: 'υπαγόρευσε / υπαγορεύστε', translateEN: 'dictate', translateRU: 'диктовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1596, present: 'υπαινίσσομαι', future: 'θα υπαινιχθώ', aorist: 'υπαινίχθηκα', imperative: null, translateEN: 'hint, insinuate', translateRU: 'намекать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1597, present: 'υπακούω', future: 'θα υπακούσω', aorist: 'υπάκουσα', imperative: 'υπάκουσε / υπακούστε', translateEN: 'obey', translateRU: 'слушаться, повиноваться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1598, present: 'υπάρχω', future: 'θα υπάρξω', aorist: 'υπήρξα', imperative: null, translateEN: 'exist', translateRU: 'существовать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1599, present: 'υπενθυμίζω', future: 'θα υπενθυμίσω', aorist: 'υπενθύμισα', imperative: 'υπενθύμισε / υπενθυμίστε', translateEN: 'remind', translateRU: 'напоминать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1600, present: 'υπερασπίζομαι', future: 'θα υπερασπιστώ', aorist: 'υπερασπίστηκα', imperative: 'υπερασπίσου / υπερασπιστείτε', translateEN: 'defend', translateRU: 'защищать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1601, present: 'υπερβάλλω', future: 'θα υπερβάλω', aorist: 'υπερέβαλα', imperative: null, translateEN: 'exaggerate', translateRU: 'преувеличивать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1602, present: 'υπερεκτιμώ', future: 'θα υπερεκτιμήσω', aorist: 'υπερεκτίμησα', imperative: 'υπερεκτίμησε / υπερεκτιμήστε', translateEN: 'overestimate', translateRU: 'переоценивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1603, present: 'υπερκαλύπτω', future: 'θα υπερκαλύψω', aorist: 'υπερκάλυψα', imperative: 'υπερκάλυψε / υπερκαλύψτε', translateEN: 'oversubscribe, exceed', translateRU: 'перекрывать, превышать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1604, present: 'υπερτερώ', future: 'θα υπερτερήσω', aorist: 'υπερτέρησα', imperative: 'υπερτέρησε / υπερτερήστε', translateEN: 'surpass, outnumber', translateRU: 'превосходить', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1605, present: 'υπερτιμώ', future: 'θα υπερτιμήσω', aorist: 'υπερτίμησα', imperative: 'υπερτίμησε / υπερτιμήστε', translateEN: 'overrate', translateRU: 'переоценивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1606, present: 'υπηρετώ', future: 'θα υπηρετήσω', aorist: 'υπηρέτησα', imperative: 'υπηρέτησε / υπηρετήστε', translateEN: 'serve', translateRU: 'служить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1607, present: 'υποβάλλω', future: 'θα υποβάλω', aorist: 'υπέβαλα', imperative: 'υπόβαλε / υποβάλετε', translateEN: 'submit, subject', translateRU: 'подавать, подвергать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1608, present: 'υποβιβάζω', future: 'θα υποβιβάσω', aorist: 'υποβίβασα', imperative: 'υποβίβασε / υποβιβάστε', translateEN: 'demote', translateRU: 'понижать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1609, present: 'υπογραμμίζω', future: 'θα υπογραμμίσω', aorist: 'υπογράμμισα', imperative: 'υπογράμμισε / υπογραμμίστε', translateEN: 'underline, stress', translateRU: 'подчёркивать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1610, present: 'υπογράφω', future: 'θα υπογράψω', aorist: 'υπέγραψα', imperative: 'υπόγραψε / υπογράψτε', translateEN: 'sign', translateRU: 'подписывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1611, present: 'υποδέχομαι', future: 'θα υποδεχτώ', aorist: 'υποδέχτηκα', imperative: 'υποδέξου / υποδεχτείτε', translateEN: 'welcome, receive', translateRU: 'встречать, принимать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1612, present: 'υποδουλώνω', future: 'θα υποδουλώσω', aorist: 'υποδούλωσα', imperative: 'υποδούλωσε / υποδουλώστε', translateEN: 'enslave', translateRU: 'порабощать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1613, present: 'υποδύομαι', future: 'θα υποδυθώ', aorist: 'υποδύθηκα', imperative: 'υποδύσου / υποδυθείτε', translateEN: 'play (a role), impersonate', translateRU: 'играть роль, изображать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1614, present: 'υποεκτιμώ', future: 'θα υποεκτιμήσω', aorist: 'υποεκτίμησα', imperative: 'υποεκτίμησε / υποεκτιμήστε', translateEN: 'underestimate', translateRU: 'недооценивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1615, present: 'υποθέτω', future: 'θα υποθέσω', aorist: 'υπέθεσα', imperative: 'υπόθεσε / υποθέστε', translateEN: 'suppose', translateRU: 'предполагать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1616, present: 'υποκρίνομαι', future: 'θα υποκριθώ', aorist: 'υποκρίθηκα', imperative: 'υποκρίσου / υποκριθείτε', translateEN: 'feign, pretend', translateRU: 'лицемерить, притворяться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1617, present: 'υπολογίζομαι', future: 'θα υπολογιστώ', aorist: 'υπολογίστηκα', imperative: 'υπολογίσου / υπολογιστείτε', translateEN: 'be counted', translateRU: 'учитываться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1618, present: 'υπολογίζω', future: 'θα υπολογίσω', aorist: 'υπολόγισα', imperative: 'υπολόγισε / υπολογίστε', translateEN: 'calculate, count on', translateRU: 'вычислять, рассчитывать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1619, present: 'υπομένω', future: 'θα υπομείνω', aorist: 'υπέμεινα', imperative: 'υπόμεινε / υπομείνετε', translateEN: 'endure, bear', translateRU: 'терпеть, выдерживать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1620, present: 'υπονομεύω', future: 'θα υπονομεύσω', aorist: 'υπονόμευσα', imperative: 'υπονόμευσε / υπονομεύστε', translateEN: 'undermine', translateRU: 'подрывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1621, present: 'υπονοώ', future: 'θα υπονοήσω', aorist: 'υπονόησα', imperative: 'υπονόησε / υπονοήστε', translateEN: 'imply', translateRU: 'намекать, подразумевать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1622, present: 'υποστηρίζω', future: 'θα υποστηρίξω', aorist: 'υποστήριξα', imperative: 'υποστήριξε / υποστηρίξτε', translateEN: 'support, claim', translateRU: 'поддерживать, утверждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1623, present: 'υποσχόμαι', future: 'θα υποσχεθώ', aorist: 'υποσχέθηκα', imperative: 'υποσχέσου / υποσχεθείτε', translateEN: 'promise', translateRU: 'обещать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammarMedial']},
{id: 1624, present: 'υποτιμώ', future: 'θα υποτιμήσω', aorist: 'υποτίμησα', imperative: 'υποτίμησε / υποτιμήστε', translateEN: 'underestimate', translateRU: 'недооценивать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1625, present: 'υποτιτλίζω', future: 'θα υποτιτλίσω', aorist: 'υπετίτλισα', imperative: 'υποτίτλισε / υποτιτλίστε', translateEN: 'subtitle', translateRU: 'делать субтитры', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1626, present: 'υποφέρω', future: null, aorist: 'υπέφερα', imperative: null, translateEN: 'suffer', translateRU: 'страдать, терпеть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1627, present: 'υποχρεώνομαι', future: 'θα υποχρεωθώ', aorist: 'υποχρεώθηκα', imperative: 'υποχρεώσου / υποχρεωθείτε', translateEN: 'be obliged', translateRU: 'быть обязанным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
{id: 1628, present: 'υποχρεώνω', future: 'θα υποχρεώσω', aorist: 'υποχρέωσα', imperative: 'υποχρέωσε / υποχρεώστε', translateEN: 'oblige', translateRU: 'обязывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1629, present: 'υποχωρώ', future: 'θα υποχωρήσω', aorist: 'υποχώρησα', imperative: 'υποχώρησε / υποχωρήστε', translateEN: 'retreat, give in', translateRU: 'отступать, уступать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1630, present: 'υποψιάζομαι', future: 'θα υποψιαστώ', aorist: 'υποψιάστηκα', imperative: 'υποψιάσου / υποψιαστείτε', translateEN: 'suspect', translateRU: 'подозревать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1631, present: 'υστερώ', future: 'θα υστερήσω', aorist: 'υστέρησα', imperative: 'υστέρησε / υστερήστε', translateEN: 'lag behind, fall short', translateRU: 'отставать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1632, present: 'υφαίνω', future: 'θα υφάνω', aorist: 'ύφανα', imperative: 'ύφανε / υφάνετε', translateEN: 'weave', translateRU: 'ткать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1633, present: 'υψώνω', future: 'θα υψώσω', aorist: 'ύψωσα', imperative: 'ύψωσε / υψώστε', translateEN: 'raise, erect', translateRU: 'поднимать, воздвигать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1634, present: 'φαίνομαι', future: 'θα φανώ', aorist: 'φάνηκα', imperative: null, translateEN: 'seem, appear', translateRU: 'казаться, виднеться', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1635, present: 'φαντάζομαι', future: 'θα φανταστώ', aorist: 'φαντάστηκα', imperative: 'φαντάσου / φανταστείτε', translateEN: 'imagine', translateRU: 'воображать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1636, present: 'φέρνω', future: 'θα φέρω', aorist: 'έφερα', imperative: 'φέρε / φέρτε', translateEN: 'bring', translateRU: 'приносить, приводить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1637, present: 'φέρομαι', future: 'θα φερθώ', aorist: 'φέρθηκα', imperative: 'φέρσου / φερθείτε', translateEN: 'behave, treat', translateRU: 'вести себя, обращаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1638, present: 'φεύγω', future: 'θα φύγω', aorist: 'έφυγα', imperative: 'φύγε / φύγετε', translateEN: 'leave, go away', translateRU: 'уходить, уезжать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1639, present: 'φθάνω', future: 'θα φτάσω', aorist: 'έφτασα', imperative: 'φτάσε / φτάστε', translateEN: 'arrive, reach, suffice', translateRU: 'прибывать, достигать, хватать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1640, present: 'φθείρομαι', future: 'θα φθαρώ', aorist: 'φθάρηκα', imperative: 'φθείρου / φθαρείτε', translateEN: 'wear out', translateRU: 'изнашиваться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1641, present: 'φθείρω', future: 'θα φθείρω', aorist: 'έφθειρα', imperative: 'φθείρε / φθείρτε', translateEN: 'wear out, corrupt', translateRU: 'изнашивать, развращать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1642, present: 'φθονώ', future: 'θα φθονήσω', aorist: 'φθόνησα', imperative: null, translateEN: 'envy', translateRU: 'завидовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1643, present: 'φιλιώνω', future: 'θα φιλιώσω', aorist: 'φίλιωσα', imperative: 'φίλιωσε / φιλιώστε', translateEN: 'make friends again', translateRU: 'мириться, подружиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1644, present: 'φιλοδοξώ', future: 'θα φιλοδοξήσω', aorist: 'φιλοδόξησα', imperative: null, translateEN: 'aspire', translateRU: 'стремиться, питать амбиции', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1645, present: 'φιλοξενώ', future: 'θα φιλοξενήσω', aorist: 'φιλοξένησα', imperative: 'φιλοξένησε / φιλοξενήστε', translateEN: 'host, accommodate', translateRU: 'принимать гостей', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1646, present: 'φιλτράρω', future: 'θα φιλτράρω', aorist: 'φιλτράρισα', imperative: 'φιλτράρισε / φιλτραρίστε', translateEN: 'filter', translateRU: 'фильтровать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1647, present: 'φιλώ', future: 'θα φιλήσω', aorist: 'φίλησα', imperative: 'φίλησε / φιλήστε', translateEN: 'kiss', translateRU: 'целовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1648, present: 'φλερτάρω', future: null, aorist: 'φλέρταρα', imperative: 'φλέρταρε / φλερτάρετε', translateEN: 'flirt', translateRU: 'флиртовать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1649, present: 'φλυαρώ', future: 'θα φλυαρήσω', aorist: 'φλυάρησα', imperative: 'φλυάρησε / φλυαρήστε', translateEN: 'chatter', translateRU: 'болтать, пустословить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1650, present: 'φοβάμαι', future: 'θα φοβηθώ', aorist: 'φοβήθηκα', imperative: 'φοβήσου / φοβηθείτε', translateEN: 'fear, be afraid', translateRU: 'бояться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1651, present: 'φοβίζω', future: 'θα φοβίσω', aorist: 'φόβισα', imperative: 'φόβισε / φοβίστε', translateEN: 'frighten', translateRU: 'пугать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1652, present: 'φοιτώ', future: 'θα φοιτήσω', aorist: 'φοίτησα', imperative: null, translateEN: 'attend (school)', translateRU: 'учиться, посещать (учебное заведение)', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1653, present: 'φονεύω', future: 'θα φονεύσω', aorist: 'φόνευσα', imperative: 'φόνευσε / φονεύστε', translateEN: 'murder', translateRU: 'убивать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1654, present: 'φοροδιαφεύγω', future: 'θα φοροδιαφύγω', aorist: 'φοροδιέφυγα', imperative: 'φοροδιάφυγε / φοροδιαφύγετε', translateEN: 'evade taxes', translateRU: 'уклоняться от налогов', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
{id: 1655, present: 'φορολογώ', future: 'θα φορολογήσω', aorist: 'φορολόγησα', imperative: 'φορολόγησε / φορολογήστε', translateEN: 'tax', translateRU: 'облагать налогом', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1656, present: 'φορτίζω', future: 'θα φορτίσω', aorist: 'φόρτισα', imperative: 'φόρτισε / φορτίστε', translateEN: 'charge (battery)', translateRU: 'заряжать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1657, present: 'φορτώνω', future: 'θα φορτώσω', aorist: 'φόρτωσα', imperative: 'φόρτωσε / φορτώστε', translateEN: 'load', translateRU: 'грузить, нагружать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1658, present: 'φορώ', future: 'θα φορέσω', aorist: 'φόρεσα', imperative: 'φόρεσε / φορέστε', translateEN: 'wear, put on', translateRU: 'носить, надевать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1659, present: 'φουσκώνομαι', future: 'θα φουσκωθώ', aorist: 'φουσκώθηκα', imperative: 'φουσκώσου / φουσκωθείτε', translateEN: 'bloat, swell', translateRU: 'раздуваться, пухнуть', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 1660, present: 'φουσκώνω', future: 'θα φουσκώσω', aorist: 'φούσκωσα', imperative: 'φούσκωσε / φουσκώστε', translateEN: 'inflate, swell', translateRU: 'надувать, раздуваться', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1661, present: 'φράζω', future: 'θα φράξω', aorist: 'έφραξα', imperative: 'φράξε / φράξτε', translateEN: 'block, fence', translateRU: 'загораживать, закупоривать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1662, present: 'φρενάρω', future: null, aorist: 'φρέναρα', imperative: 'φρέναρε / φρενάρετε', translateEN: 'brake', translateRU: 'тормозить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1663, present: 'φρικιάζω', future: 'θα φρικιάσω', aorist: 'φρίκιασα', imperative: 'φρίκιασε / φρικιάστε', translateEN: 'shudder', translateRU: 'ужасаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1664, present: 'φροντίζομαι', future: 'θα φροντιστώ', aorist: 'φροντίστηκα', imperative: 'φροντίσου / φροντιστείτε', translateEN: 'be looked after', translateRU: 'быть под присмотром', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1665, present: 'φροντίζω', future: 'θα φροντίσω', aorist: 'φρόντισα', imperative: 'φρόντισε / φροντίστε', translateEN: 'take care of, see to', translateRU: 'заботиться, позаботиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1666, present: 'φρουρώ', future: 'θα φρουρήσω', aorist: 'φρούρησα', imperative: 'φρούρησε / φρουρήστε', translateEN: 'guard', translateRU: 'охранять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1667, present: 'φρυγανίζω', future: 'θα φρυγανίσω', aorist: 'φρυγάνισα', imperative: 'φρυγάνισε / φρυγανίστε', translateEN: 'toast', translateRU: 'поджаривать (хлеб)', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1668, present: 'φτάνω', future: 'θα φτάσω', aorist: 'έφτασα', imperative: 'φτάσε / φτάστε', translateEN: 'arrive, reach', translateRU: 'приезжать, достигать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1669, present: 'φτερνίζομαι', future: 'θα φτερνιστώ', aorist: 'φτερνίστηκα', imperative: null, translateEN: 'sneeze', translateRU: 'чихать', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammarMedial']},
{id: 1670, present: 'φτιάχνω', future: 'θα φτιάξω', aorist: 'έφτιαξα', imperative: 'φτιάξε / φτιάξτε', translateEN: 'make, fix', translateRU: 'делать, чинить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1671, present: 'φτύνω', future: 'θα φτύσω', aorist: 'έφτυσα', imperative: 'φτύσε / φτύστε', translateEN: 'spit', translateRU: 'плевать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1672, present: 'φτωχαίνω', future: 'θα φτωχύνω', aorist: 'φτώχυνα', imperative: null, translateEN: 'become poor', translateRU: 'беднеть', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1673, present: 'φυλακίζομαι', future: 'θα φυλακιστώ', aorist: 'φυλακίστηκα', imperative: 'φυλακίσου / φυλακιστείτε', translateEN: 'be imprisoned', translateRU: 'попасть в тюрьму', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1674, present: 'φυλακίζω', future: 'θα φυλακίσω', aorist: 'φυλάκισα', imperative: 'φυλάκισε / φυλακίστε', translateEN: 'imprison', translateRU: 'сажать в тюрьму', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1675, present: 'φυλάω', future: 'θα φυλάξω', aorist: 'φύλαξα', imperative: 'φύλαξε / φυλάξτε', translateEN: 'guard, keep', translateRU: 'охранять, хранить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1676, present: 'φυσώ', future: 'θα φυσήξω', aorist: 'φύσηξα', imperative: 'φύσηξε / φυσήξτε', translateEN: 'blow', translateRU: 'дуть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1677, present: 'φυτεύω', future: 'θα φυτέψω', aorist: 'φύτεψα', imperative: 'φύτεψε / φυτέψτε', translateEN: 'plant', translateRU: 'сажать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1678, present: 'φυτρώνω', future: 'θα φυτρώσω', aorist: 'φύτρωσα', imperative: null, translateEN: 'sprout', translateRU: 'прорастать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1679, present: 'φωλιάζω', future: 'θα φωλιάσω', aorist: 'φώλιασα', imperative: 'φώλιασε / φωλιάστε', translateEN: 'nest, snuggle', translateRU: 'гнездиться, прижаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1680, present: 'φωνάζω', future: 'θα φωνάξω', aorist: 'φώναξα', imperative: 'φώναξε / φωνάξτε', translateEN: 'shout, call', translateRU: 'кричать, звать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1681, present: 'φωσφορίζω', future: 'θα φωσφορίσω', aorist: 'φωσφόρισα', imperative: 'φωσφόρισε / φωσφορίστε', translateEN: 'glow', translateRU: 'светиться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1682, present: 'φωτίζω', future: 'θα φωτίσω', aorist: 'φώτισα', imperative: 'φώτισε / φωτίστε', translateEN: 'illuminate', translateRU: 'освещать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1683, present: 'φωτογραφίζω', future: 'θα φωτογραφίσω', aorist: 'φωτογράφισα', imperative: 'φωτογράφισε / φωτογραφίστε', translateEN: 'photograph', translateRU: 'фотографировать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1684, present: 'φωτοτυπώ', future: 'θα φωτοτυπήσω', aorist: 'φωτοτύπησα', imperative: 'φωτοτύπησε / φωτοτυπήστε', translateEN: 'photocopy', translateRU: 'ксерокопировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1685, present: 'χαζεύω', future: 'θα χαζέψω', aorist: 'χάζεψα', imperative: 'χάζεψε / χαζέψτε', translateEN: 'gawk, gaze around', translateRU: 'глазеть, разглядывать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1686, present: 'χαϊδεύω', future: 'θα χαϊδέψω', aorist: 'χαΐδεψα', imperative: 'χαΐδεψε / χαϊδέψτε', translateEN: 'caress, pet', translateRU: 'ласкать, гладить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1687, present: 'χαϊδολογώ', future: 'θα χαϊδολογήσω', aorist: 'χαϊδολόγησα', imperative: 'χαϊδολόγησε / χαϊδολογήστε', translateEN: 'caress, fondle', translateRU: 'ласкать, нежничать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1688, present: 'χαιρετώ', future: 'θα χαιρετήσω', aorist: 'χαιρέτησα', imperative: 'χαιρέτησε / χαιρετήστε', translateEN: 'greet', translateRU: 'приветствовать, здороваться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1689, present: 'χαίρομαι', future: 'θα χαρώ', aorist: 'χάρηκα', imperative: 'χάρου / χαρείτε', translateEN: 'be glad', translateRU: 'радоваться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
{id: 1690, present: 'χαλαρώνω', future: 'θα χαλαρώσω', aorist: 'χαλάρωσα', imperative: 'χαλάρωσε / χαλαρώστε', translateEN: 'relax, loosen', translateRU: 'расслабляться, ослаблять', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1691, present: 'χαλώ', future: 'θα χαλάσω', aorist: 'χάλασα', imperative: 'χάλασε / χαλάστε', translateEN: 'spoil, break', translateRU: 'портить, ломать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1692, present: 'χαμηλώνω', future: 'θα χαμηλώσω', aorist: 'χαμήλωσα', imperative: 'χαμήλωσε / χαμηλώστε', translateEN: 'lower', translateRU: 'понижать, убавлять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1693, present: 'χαμογελώ', future: 'θα χαμογελάσω', aorist: 'χαμογέλασα', imperative: 'χαμογέλασε / χαμογελάστε', translateEN: 'smile', translateRU: 'улыбаться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1694, present: 'χάνομαι', future: 'θα χαθώ', aorist: 'χάθηκα', imperative: 'χάσου / χαθείτε', translateEN: 'get lost, disappear', translateRU: 'теряться, пропадать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1695, present: 'χαντακώνω', future: 'θα χαντακώσω', aorist: 'χαντάκωσα', imperative: 'χαντάκωσε / χαντακώστε', translateEN: 'ruin, wreck', translateRU: 'губить, портить', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1696, present: 'χάνω', future: 'θα χάσω', aorist: 'έχασα', imperative: 'χάσε / χάστε', translateEN: 'lose, miss', translateRU: 'терять, пропускать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1697, present: 'χαράζω', future: 'θα χαράξω', aorist: 'χάραξα', imperative: 'χάραξε / χαράξτε', translateEN: 'engrave, draw (a line)', translateRU: 'гравировать, прочерчивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1698, present: 'χαρακτηρίζω', future: 'θα χαρακτηρίσω', aorist: 'χαρακτήρισα', imperative: 'χαρακτήρισε / χαρακτηρίστε', translateEN: 'characterize', translateRU: 'характеризовать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1699, present: 'χαρίζω', future: 'θα χαρίσω', aorist: 'χάρισα', imperative: 'χάρισε / χαρίστε', translateEN: 'give (as a gift), forgive', translateRU: 'дарить, прощать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1700, present: 'χαρτογραφώ', future: 'θα χαρτογραφήσω', aorist: 'χαρτογράφησα', imperative: 'χαρτογράφησε / χαρτογραφήστε', translateEN: 'map', translateRU: 'составлять карту', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1701, present: 'χασμουριέμαι', future: 'θα χασμουρηθώ', aorist: 'χασμουρήθηκα', imperative: 'χασμουρήσου / χασμουρηθείτε', translateEN: 'yawn', translateRU: 'зевать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammarMedial']},
{id: 1702, present: 'χασομερώ', future: 'θα χασομερήσω', aorist: 'χασομέρησα', imperative: 'χασομέρησε / χασομερήστε', translateEN: 'waste time', translateRU: 'зря терять время', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
{id: 1703, present: 'χειραγωγώ', future: 'θα χειραγωγήσω', aorist: 'χειραγώγησα', imperative: 'χειραγώγησε / χειραγωγήστε', translateEN: 'manipulate, guide', translateRU: 'манипулировать, вести за руку', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
{id: 1704, present: 'χειρίζομαι', future: 'θα χειριστώ', aorist: 'χειρίστηκα', imperative: 'χειρίσου / χειριστείτε', translateEN: 'handle, operate', translateRU: 'обращаться, управлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1705, present: 'χειροκροτώ', future: 'θα χειροκροτήσω', aorist: 'χειροκρότησα', imperative: 'χειροκρότησε / χειροκροτήστε', translateEN: 'applaud', translateRU: 'аплодировать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1706, present: 'χειροτερεύω', future: 'θα χειροτερέψω', aorist: 'χειροτέρεψα', imperative: null, translateEN: 'worsen', translateRU: 'ухудшаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1707, present: 'χειρουργώ', future: 'θα χειρουργήσω', aorist: 'χειρούργησα', imperative: 'χειρούργησε / χειρουργήστε', translateEN: 'operate on, perform surgery', translateRU: 'оперировать', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar2']},
{id: 1708, present: 'χηρεύω', future: 'θα χηρέψω', aorist: 'χήρεψα', imperative: 'χήρεψε / χηρέψτε', translateEN: 'be widowed', translateRU: 'вдоветь', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1709, present: 'χιονίζω', future: 'θα χιονίσω', aorist: 'χιόνισα', imperative: null, translateEN: 'snow', translateRU: 'идти (о снеге)', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1710, present: 'χλευάζω', future: 'θα χλευάσω', aorist: 'χλεύασα', imperative: 'χλεύασε / χλευάστε', translateEN: 'mock', translateRU: 'высмеивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1711, present: 'χλωμιάζω', future: 'θα χλωμιάσω', aorist: 'χλώμιασα', imperative: null, translateEN: 'turn pale', translateRU: 'бледнеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1712, present: 'χοντραίνω', future: 'θα χοντρύνω', aorist: 'χόντρυνα', imperative: 'χόντρυνε / χοντρύνετε', translateEN: 'thicken', translateRU: 'утолщать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1713, present: 'χορεύω', future: 'θα χορέψω', aorist: 'χόρεψα', imperative: 'χόρεψε / χορέψτε', translateEN: 'dance', translateRU: 'танцевать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1714, present: 'χοροπηδώ', future: 'θα χοροπηδήσω', aorist: 'χοροπήδησα', imperative: 'χοροπήδησε / χοροπηδήστε', translateEN: 'skip, hop around', translateRU: 'подпрыгивать, скакать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1715, present: 'χορταίνω', future: 'θα χορτάσω', aorist: 'χόρτασα', imperative: 'χόρτασε / χορτάστε', translateEN: 'be full, satisfy hunger', translateRU: 'насыщаться, наедаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1716, present: 'χρειάζομαι', future: 'θα χρειαστώ', aorist: 'χρειάστηκα', imperative: null, translateEN: 'need', translateRU: 'нуждаться, быть нужным', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1717, present: 'χρεώνομαι', future: 'θα χρεωθώ', aorist: 'χρεώθηκα', imperative: 'χρεώσου / χρεωθείτε', translateEN: 'get into debt', translateRU: 'залезать в долги', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1718, present: 'χρεώνω', future: 'θα χρεώσω', aorist: 'χρέωσα', imperative: 'χρέωσε / χρεώστε', translateEN: 'charge, debit', translateRU: 'взимать плату, записывать в долг', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1719, present: 'χρηματοδοτώ', future: 'θα χρηματοδοτήσω', aorist: 'χρηματοδότησα', imperative: 'χρηματοδότησε / χρηματοδοτήστε', translateEN: 'finance, fund', translateRU: 'финансировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1720, present: 'χρησιμοποιώ', future: 'θα χρησιμοποιήσω', aorist: 'χρησιμοποίησα', imperative: 'χρησιμοποίησε / χρησιμοποιήστε', translateEN: 'use', translateRU: 'использовать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1721, present: 'χρωματίζω', future: 'θα χρωματίσω', aorist: 'χρωμάτισα', imperative: 'χρωμάτισε / χρωματίστε', translateEN: 'color', translateRU: 'раскрашивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1722, present: 'χτενίζομαι', future: 'θα χτενιστώ', aorist: 'χτενίστηκα', imperative: 'χτενίσου / χτενιστείτε', translateEN: 'comb one\'s hair', translateRU: 'расчёсываться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1723, present: 'χτενίζω', future: 'θα χτενίσω', aorist: 'χτένισα', imperative: 'χτένισε / χτενίστε', translateEN: 'comb', translateRU: 'причёсывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1724, present: 'χτίζω', future: 'θα χτίσω', aorist: 'έχτισα', imperative: 'χτίσε / χτίστε', translateEN: 'build', translateRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1725, present: 'χτυπιέμαι', future: 'θα χτυπηθώ', aorist: 'χτυπήθηκα', imperative: 'χτυπήσου / χτυπηθείτε', translateEN: 'get hit, hit oneself', translateRU: 'быть побитым, биться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
{id: 1726, present: 'χτυπώ', future: 'θα χτυπήσω', aorist: 'χτύπησα', imperative: 'χτύπησε / χτυπήστε', translateEN: 'hit, ring, knock', translateRU: 'бить, звонить, стучать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1727, present: 'χύνω', future: 'θα χύσω', aorist: 'έχυσα', imperative: 'χύσε / χύστε', translateEN: 'pour, spill', translateRU: 'лить, проливать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
{id: 1728, present: 'χωνεύω', future: 'θα χωνέψω', aorist: 'χώνεψα', imperative: 'χώνεψε / χωνέψτε', translateEN: 'digest, stand (someone)', translateRU: 'переваривать, терпеть (кого-л.)', lexicalCategory: ['lexicalHealth','lexicalSocial'], grammaticalCategory: ['grammar1']},
{id: 1729, present: 'χώνω', future: 'θα χώσω', aorist: 'έχωσα', imperative: 'χώσε / χώστε', translateEN: 'shove, stick in', translateRU: 'совать, засовывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1730, present: 'χωρίζω', future: 'θα χωρίσω', aorist: 'χώρισα', imperative: 'χώρισε / χωρίστε', translateEN: 'separate, divorce', translateRU: 'разделять, расставаться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1731, present: 'χωρώ', future: 'θα χωρέσω', aorist: 'χώρεσα', imperative: null, translateEN: 'fit, have room', translateRU: 'вмещаться, помещаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
{id: 1732, present: 'ψαρεύω', future: 'θα ψαρέψω', aorist: 'ψάρεψα', imperative: 'ψάρεψε / ψαρέψτε', translateEN: 'fish', translateRU: 'ловить рыбу', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1733, present: 'ψάχνω', future: 'θα ψάξω', aorist: 'έψαξα', imperative: 'ψάξε / ψάξτε', translateEN: 'search, look for', translateRU: 'искать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1734, present: 'ψεκάζω', future: 'θα ψεκάσω', aorist: 'ψέκασα', imperative: 'ψέκασε / ψεκάστε', translateEN: 'spray', translateRU: 'опрыскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1735, present: 'ψελλίζω', future: 'θα ψελλίσω', aorist: 'ψέλλισα', imperative: 'ψέλλισε / ψελλίστε', translateEN: 'stammer, mumble', translateRU: 'бормотать, лепетать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1736, present: 'ψηλαφώ', future: 'θα ψηλαφήσω', aorist: 'ψηλάφησα', imperative: 'ψηλάφησε / ψηλαφήστε', translateEN: 'feel, grope', translateRU: 'ощупывать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1737, present: 'ψηλώνω', future: 'θα ψηλώσω', aorist: 'ψήλωσα', imperative: null, translateEN: 'grow tall', translateRU: 'вырастать, становиться выше', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar1']},
{id: 1738, present: 'ψήνω', future: 'θα ψήσω', aorist: 'έψησα', imperative: 'ψήσε / ψήστε', translateEN: 'bake, roast, grill', translateRU: 'печь, жарить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1739, present: 'ψηφίζω', future: 'θα ψηφίσω', aorist: 'ψήφισα', imperative: 'ψήφισε / ψηφίστε', translateEN: 'vote', translateRU: 'голосовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
{id: 1740, present: 'ψηφιοποιώ', future: 'θα ψηφιοποιήσω', aorist: 'ψηφιοποίησα', imperative: 'ψηφιοποίησε / ψηφιοποιήστε', translateEN: 'digitize', translateRU: 'оцифровывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1741, present: 'ψιθυρίζω', future: 'θα ψιθυρίσω', aorist: 'ψιθύρισα', imperative: 'ψιθύρισε / ψιθυρίστε', translateEN: 'whisper', translateRU: 'шептать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
{id: 1742, present: 'ψιλοκόβω', future: 'θα ψιλοκόψω', aorist: 'ψιλόκοψα', imperative: 'ψιλόκοψε / ψιλοκόψτε', translateEN: 'chop finely', translateRU: 'мелко резать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
{id: 1743, present: 'ψυχαγωγώ', future: 'θα ψυχαγωγήσω', aorist: 'ψυχαγώγησα', imperative: 'ψυχαγώγησε / ψυχαγωγήστε', translateEN: 'entertain', translateRU: 'развлекать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1744, present: 'ψύχω', future: 'θα ψύξω', aorist: 'έψυξα', imperative: 'ψύξε / ψύξτε', translateEN: 'cool, refrigerate', translateRU: 'охлаждать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
{id: 1745, present: 'ψωνίζω', future: 'θα ψωνίσω', aorist: 'ψώνισα', imperative: 'ψώνισε / ψωνίστε', translateEN: 'shop', translateRU: 'делать покупки', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
{id: 1746, present: 'ωθώ', future: 'θα ωθήσω', aorist: 'ώθησα', imperative: 'ώθησε / ωθήστε', translateEN: 'push, urge', translateRU: 'подталкивать, побуждать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar2']},
{id: 1747, present: 'ωοτοκώ', future: 'θα ωοτοκήσω', aorist: 'ωοτόκησα', imperative: 'ωοτόκησε / ωοτοκήστε', translateEN: 'lay eggs', translateRU: 'откладывать яйца', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
{id: 1748, present: 'ωριμάζω', future: 'θα ωριμάσω', aorist: 'ώριμασα', imperative: null, translateEN: 'ripen, mature', translateRU: 'созревать, взрослеть', lexicalCategory: ['lexicalTime','lexicalHealth'], grammaticalCategory: ['grammar1']},
{id: 1749, present: 'ωφελούμαι', future: 'θα ωφεληθώ', aorist: 'ωφελήθηκα', imperative: 'ωφελήσου / ωφεληθείτε', translateEN: 'benefit, profit', translateRU: 'получать пользу', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
{id: 1750, present: 'ωφελώ', future: 'θα ωφελήσω', aorist: 'ωφέλησα', imperative: 'ωφέλησε / ωφελήστε', translateEN: 'benefit, be of use', translateRU: 'приносить пользу', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']}
];

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
    transform: translateY(-50%);
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
    transform: translateY(-50%);
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
