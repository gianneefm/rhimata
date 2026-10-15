import { useMemo, useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, X } from 'lucide-react';


const VERB_DATA = [
    {id: 1, present: 'αγαπώ', future: 'θα αγαπήσω', aorist: 'αγάπησα', imperative: 'αγάπησε / αγαπήστε', translationEN: 'love', translationRU: 'любить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 2, present: 'αγγίζω', future: 'θα αγγίξω', aorist: 'άγγιξα', imperative: 'άγγιξε / αγγίξτε', translationEN: 'touch', translationRU: 'касаться, трогать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 3, present: 'αγκαλιάζω', future: 'θα αγκαλιάσω', aorist: 'αγκάλιασα', imperative: 'αγκάλιασε / αγκαλιάστε', translationEN: 'hug', translationRU: 'обнимать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 4, present: 'αγνοώ', future: 'θα αγνοήσω', aorist: 'αγνόησα', imperative: 'αγνόησε / αγνοήστε', translationEN: 'ignore', translationRU: 'игнорировать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 5, present: 'αγοράζω', future: 'θα αγοράσω', aorist: 'αγόρασα', imperative: 'αγόρασε / αγοράστε', translationEN: 'buy', translationRU: 'покупать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 6, present: 'αγχώνομαι', future: 'θα αγχωθώ', aorist: 'αγχώθηκα', imperative: 'αγχώσου / αγχωθείτε', translationEN: 'get stressed', translationRU: 'тревожиться, нервничать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 7, present: 'αγωνίζομαι', future: 'θα αγωνιστώ', aorist: 'αγωνίστηκα', imperative: 'αγωνίσου / αγωνιστείτε', translationEN: 'fight, struggle', translationRU: 'бороться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 8, present: 'αδειάζω', future: 'θα αδειάσω', aorist: 'άδειασα', imperative: 'άδειασε / αδειάστε', translationEN: 'empty', translationRU: 'опустошать, освобождать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 9, present: 'αδικώ', future: 'θα αδικήσω', aorist: 'αδίκησα', imperative: 'αδίκησε / αδικήστε', translationEN: 'wrong, treat unfairly', translationRU: 'обижать, поступать несправедливо', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 10, present: 'αθετώ', future: 'θα αθετήσω', aorist: 'αθέτησα', imperative: 'αθέτησε / αθετήστε', translationEN: 'break (a promise)', translationRU: 'нарушать (обещание)', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 11, present: 'αισθάνομαι', future: 'θα αισθανθώ', aorist: 'αισθάνθηκα', imperative: 'αισθάνσου / αισθανθείτε', translationEN: 'feel', translationRU: 'чувствовать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammarMedial']},
    {id: 12, present: 'αιχμαλωτίζω', future: 'θα αιχμαλωτίσω', aorist: 'αιχμαλώτισα', imperative: 'αιχμαλώτισε / αιχμαλωτίστε', translationEN: 'capture', translationRU: 'брать в плен, пленять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 13, present: 'ακολουθώ', future: 'θα ακολουθήσω', aorist: 'ακολούθησα', imperative: 'ακολούθησε / ακολουθήστε', translationEN: 'follow', translationRU: 'следовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 14, present: 'ακουμπώ', future: 'θα ακουμπήσω', aorist: 'ακούμπησα', imperative: 'ακούμπησε / ακουμπήστε', translationEN: 'lean, put down, touch', translationRU: 'прислонять, касаться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 15, present: 'ακούω', future: 'θα ακούσω', aorist: 'άκουσα', imperative: 'άκουσε / ακούστε', translationEN: 'hear, listen', translationRU: 'слышать, слушать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 16, present: 'ακυρώνω', future: 'θα ακυρώσω', aorist: 'ακύρωσα', imperative: 'ακύρωσε / ακυρώστε', translationEN: 'cancel', translationRU: 'отменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 17, present: 'αλέθω', future: 'θα αλέσω', aorist: 'άλεσα', imperative: 'άλεσε / αλέστε', translationEN: 'grind, mill', translationRU: 'молоть', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 18, present: 'αλλάζω', future: 'θα αλλάξω', aorist: 'άλλαξα', imperative: 'άλλαξε / αλλάξτε', translationEN: 'change', translationRU: 'менять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 19, present: 'αμύνομαι', future: 'θα αμυνθώ', aorist: 'αμύνθηκα', imperative: 'αμύνσου / αμυνθείτε', translationEN: 'defend oneself', translationRU: 'защищаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 20, present: 'αμφισβητώ', future: 'θα αμφισβητήσω', aorist: 'αμφισβήτησα', imperative: 'αμφισβήτησε / αμφισβητήστε', translationEN: 'challenge, dispute', translationRU: 'оспаривать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 21, present: 'αναβάλλω', future: 'θα αναβάλω', aorist: 'ανέβαλα', imperative: 'ανάβαλε / αναβάλετε', translationEN: 'postpone', translationRU: 'откладывать', lexicalCategory: ['lexicalTime','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 22, present: 'αναβοσβήνω', future: 'θα αναβοσβήσω', aorist: 'αναβόσβησα', imperative: 'αναβόσβησε / αναβοσβήστε', translationEN: 'blink, flash on and off', translationRU: 'мигать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 23, present: 'ανάβω', future: 'θα ανάψω', aorist: 'άναψα', imperative: 'άναψε / ανάψτε', translationEN: 'light, turn on', translationRU: 'зажигать, включать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 24, present: 'αναγκάζω', future: 'θα αναγκάσω', aorist: 'ανάγκασα', imperative: 'ανάγκασε / αναγκάστε', translationEN: 'force', translationRU: 'принуждать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 25, present: 'αναγνωρίζω', future: 'θα αναγνωρίσω', aorist: 'αναγνώρισα', imperative: 'αναγνώρισε / αναγνωρίστε', translationEN: 'recognize', translationRU: 'узнавать, признавать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 26, present: 'αναζητώ', future: 'θα αναζητήσω', aorist: 'αναζήτησα', imperative: 'αναζήτησε / αναζητήστε', translationEN: 'search for', translationRU: 'искать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 27, present: 'αναθέτω', future: 'θα αναθέσω', aorist: 'ανέθεσα', imperative: 'ανάθεσε / αναθέστε', translationEN: 'assign', translationRU: 'поручать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 28, present: 'ανακαλύπτω', future: 'θα ανακαλύψω', aorist: 'ανακάλυψα', imperative: 'ανακάλυψε / ανακαλύψτε', translationEN: 'discover', translationRU: 'открывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 29, present: 'ανακατεύω', future: 'θα ανακατέψω', aorist: 'ανακάτεψα', imperative: 'ανακάτεψε / ανακατέψτε', translationEN: 'mix, stir', translationRU: 'смешивать, помешивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 30, present: 'ανακοινώνω', future: 'θα ανακοινώσω', aorist: 'ανακοίνωσα', imperative: 'ανακοίνωσε / ανακοινώστε', translationEN: 'announce', translationRU: 'объявлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 31, present: 'ανακουφίζω', future: 'θα ανακουφίσω', aorist: 'ανακούφισα', imperative: 'ανακούφισε / ανακουφίστε', translationEN: 'relieve', translationRU: 'облегчать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 32, present: 'αναλαμβάνω', future: 'θα αναλάβω', aorist: 'ανέλαβα', imperative: 'ανάλαβε / αναλάβετε', translationEN: 'undertake, take over', translationRU: 'брать на себя', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 33, present: 'αναλύω', future: 'θα αναλύσω', aorist: 'ανάλυσα', imperative: 'ανάλυσε / αναλύστε', translationEN: 'analyze', translationRU: 'анализировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 34, present: 'ανανεώνω', future: 'θα ανανεώσω', aorist: 'ανανέωσα', imperative: 'ανανέωσε / ανανεώστε', translationEN: 'renew', translationRU: 'обновлять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 35, present: 'αναπαύομαι', future: 'θα αναπαυθώ', aorist: 'αναπαύθηκα', imperative: 'αναπαύσου / αναπαυθείτε', translationEN: 'rest', translationRU: 'отдыхать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
    {id: 36, present: 'αναπνέω', future: 'θα αναπνεύσω', aorist: 'ανέπνευσα', imperative: 'ανάπνευσε / αναπνεύστε', translationEN: 'breathe', translationRU: 'дышать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 37, present: 'αναπτύσσω', future: 'θα αναπτύξω', aorist: 'ανέπτυξα', imperative: 'ανάπτυξε / αναπτύξτε', translationEN: 'develop', translationRU: 'развивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 38, present: 'αναρωτιέμαι', future: 'θα αναρωτηθώ', aorist: 'αναρωτήθηκα', imperative: 'αναρωτήσου / αναρωτηθείτε', translationEN: 'wonder', translationRU: 'задаваться вопросом', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 39, present: 'αναστατώνω', future: 'θα αναστατώσω', aorist: 'αναστάτωσα', imperative: 'αναστάτωσε / αναστατώστε', translationEN: 'upset, disturb', translationRU: 'волновать, расстраивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 40, present: 'ανατρέπω', future: 'θα ανατρέψω', aorist: 'ανέτρεψα', imperative: 'ανάτρεψε / ανατρέψτε', translationEN: 'overturn', translationRU: 'опрокидывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 41, present: 'αναφέρω', future: null, aorist: 'ανέφερα', imperative: 'ανέφερε / ανεφέρετε', translationEN: 'mention', translationRU: 'упоминать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 42, present: 'ανεβάζω', future: 'θα ανεβάσω', aorist: 'ανέβασα', imperative: 'ανέβασε / ανεβάστε', translationEN: 'raise, upload', translationRU: 'поднимать, загружать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 43, present: 'ανεβαίνω', future: 'θα ανέβω', aorist: 'ανέβηκα', imperative: 'ανέβα / ανεβείτε', translationEN: 'go up, climb', translationRU: 'подниматься', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 44, present: 'ανέχομαι', future: 'θα ανεχτώ', aorist: 'ανέχτηκα', imperative: 'ανέξου / ανεχτείτε', translationEN: 'tolerate', translationRU: 'терпеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 45, present: 'ανήκω', future: null, aorist: null, imperative: null, translationEN: 'belong', translationRU: 'принадлежать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 46, present: 'ανησυχώ', future: 'θα ανησυχήσω', aorist: 'ανησύχησα', imperative: 'ανησύχησε / ανησυχήστε', translationEN: 'worry', translationRU: 'беспокоиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 47, present: 'ανοίγω', future: 'θα ανοίξω', aorist: 'άνοιξα', imperative: 'άνοιξε / ανοίξτε', translationEN: 'open', translationRU: 'открывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 48, present: 'ανταγωνίζομαι', future: 'θα ανταγωνιστώ', aorist: 'ανταγωνίστηκα', imperative: 'ανταγωνίσου / ανταγωνιστείτε', translationEN: 'compete', translationRU: 'конкурировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 49, present: 'ανταλλάσσω', future: 'θα ανταλλάξω', aorist: 'αντάλλαξα', imperative: 'αντάλλαξε / ανταλλάξτε', translationEN: 'exchange', translationRU: 'обменивать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 50, present: 'ανταποκρίνομαι', future: 'θα ανταποκριθώ', aorist: 'ανταποκρίθηκα', imperative: 'ανταποκρίσου / ανταποκριθείτε', translationEN: 'respond, meet (expectations)', translationRU: 'откликаться, соответствовать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 51, present: 'αντέχω', future: 'θα αντέξω', aorist: 'άντεξα', imperative: 'άντεξε / αντέξτε', translationEN: 'endure', translationRU: 'выдерживать', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 52, present: 'αντιγράφω', future: 'θα αντιγράψω', aorist: 'αντέγραψα', imperative: 'αντίγραψε / αντιγράψτε', translationEN: 'copy', translationRU: 'копировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 53, present: 'αντιδρώ', future: 'θα αντιδράσω', aorist: 'αντέδρασα', imperative: 'αντίδρασε / αντιδράστε', translationEN: 'react', translationRU: 'реагировать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 54, present: 'αντικαθιστώ', future: 'θα αντικαταστήσω', aorist: 'αντικατέστησα', imperative: 'αντικατάστησε / αντικαταστήστε', translationEN: 'replace', translationRU: 'заменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 55, present: 'αντιλαμβάνομαι', future: 'θα αντιληφθώ', aorist: 'αντιλήφθηκα', imperative: null, translationEN: 'perceive, realize', translationRU: 'осознавать, замечать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 56, present: 'αντιμετωπίζω', future: 'θα αντιμετωπίσω', aorist: 'αντιμετώπισα', imperative: 'αντιμετώπισε / αντιμετωπίστε', translationEN: 'face, deal with', translationRU: 'сталкиваться, справляться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 57, present: 'αντιπαθώ', future: 'θα αντιπαθήσω', aorist: 'αντιπάθησα', imperative: null, translationEN: 'dislike', translationRU: 'не любить, питать антипатию', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 58, present: 'αντιπροσωπεύω', future: 'θα αντιπροσωπεύσω', aorist: 'αντιπροσώπευσα', imperative: 'αντιπροσώπευσε / αντιπροσωπεύστε', translationEN: 'represent', translationRU: 'представлять', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 59, present: 'αντιστέκομαι', future: 'θα αντισταθώ', aorist: 'αντιστάθηκα', imperative: 'αντιστάσου / αντισταθείτε', translationEN: 'resist', translationRU: 'сопротивляться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
    {id: 60, present: 'αξίζω', future: null, aorist: 'άξιζα', imperative: null, translationEN: 'be worth, deserve', translationRU: 'стоить, заслуживать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 61, present: 'απαγορεύω', future: 'θα απαγορεύσω', aorist: 'απαγόρευσα', imperative: 'απαγόρευσε / απαγορεύστε', translationEN: 'forbid', translationRU: 'запрещать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 62, present: 'απαιτώ', future: 'θα απαιτήσω', aorist: 'απαίτησα', imperative: 'απαίτησε / απαιτήστε', translationEN: 'demand', translationRU: 'требовать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 63, present: 'απαλλάσσω', future: 'θα απαλλάξω', aorist: 'απήλλαξα', imperative: 'απάλλαξε / απαλλάξτε', translationEN: 'relieve, exempt', translationRU: 'освобождать (от чего-л.)', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 64, present: 'απαντώ', future: 'θα απαντήσω', aorist: 'απάντησα', imperative: 'απάντησε / απαντήστε', translationEN: 'answer', translationRU: 'отвечать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 65, present: 'απασχολώ', future: 'θα απασχολήσω', aorist: 'απασχόλησα', imperative: 'απασχόλησε / απασχολήστε', translationEN: 'occupy, employ', translationRU: 'занимать, нанимать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 66, present: 'απειλώ', future: 'θα απειλήσω', aorist: 'απείλησα', imperative: 'απείλησε / απειλήστε', translationEN: 'threaten', translationRU: 'угрожать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 67, present: 'απελευθερώνω', future: 'θα απελευθερώσω', aorist: 'απελευθέρωσα', imperative: 'απελευθέρωσε / απελευθερώστε', translationEN: 'free, liberate', translationRU: 'освобождать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 68, present: 'απευθύνομαι', future: 'θα απευθυνθώ', aorist: 'απευθύνθηκα', imperative: 'απευθύνσου / απευθυνθείτε', translationEN: 'address, turn to', translationRU: 'обращаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 69, present: 'απέχω', future: null, aorist: 'απείχα', imperative: null, translationEN: 'be far, abstain', translationRU: 'отстоять, воздерживаться', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 70, present: 'απλώνω', future: 'θα απλώσω', aorist: 'άπλωσα', imperative: 'άπλωσε / απλώστε', translationEN: 'spread, hang out', translationRU: 'расстилать, развешивать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 71, present: 'απογοητεύω', future: 'θα απογοητεύσω', aorist: 'απογοήτευσα', imperative: 'απογοήτευσε / απογοητεύστε', translationEN: 'disappoint', translationRU: 'разочаровывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 72, present: 'αποδεικνύω', future: 'θα αποδείξω', aorist: 'απέδειξα', imperative: 'απόδειξε / αποδείξτε', translationEN: 'prove', translationRU: 'доказывать', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 73, present: 'αποδέχομαι', future: 'θα αποδεχτώ', aorist: 'αποδέχτηκα', imperative: 'αποδέξου / αποδεχτείτε', translationEN: 'accept', translationRU: 'принимать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 74, present: 'αποδίδω', future: 'θα αποδώσω', aorist: 'απέδωσα', imperative: 'απόδωσε / αποδώστε', translationEN: 'attribute, render', translationRU: 'приписывать, отдавать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 75, present: 'αποθηκεύω', future: 'θα αποθηκεύσω', aorist: 'αποθήκευσα', imperative: 'αποθήκευσε / αποθηκεύστε', translationEN: 'store, save', translationRU: 'хранить, сохранять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 76, present: 'αποκαθιστώ', future: 'θα αποκαταστήσω', aorist: 'αποκατέστησα', imperative: 'αποκατάστησε / αποκαταστήστε', translationEN: 'restore', translationRU: 'восстанавливать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 77, present: 'αποκαλύπτω', future: 'θα αποκαλύψω', aorist: 'αποκάλυψα', imperative: 'αποκάλυψε / αποκαλύψτε', translationEN: 'reveal, disclose', translationRU: 'раскрывать, обнаруживать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 78, present: 'αποκαλώ', future: 'θα αποκαλέσω', aorist: 'αποκάλεσα', imperative: 'αποκάλεσε / αποκαλέστε', translationEN: 'call, name', translationRU: 'называть', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 79, present: 'αποκλείω', future: 'θα αποκλείσω', aorist: 'απέκλεισα', imperative: 'απόκλεισε / αποκλείστε', translationEN: 'exclude', translationRU: 'исключать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 80, present: 'αποκρίνομαι', future: 'θα αποκριθώ', aorist: 'αποκρίθηκα', imperative: 'αποκρίσου / αποκριθείτε', translationEN: 'reply, respond', translationRU: 'отвечать, откликаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 81, present: 'αποκτώ', future: 'θα αποκτήσω', aorist: 'απέκτησα', imperative: 'απόκτησε / αποκτήστε', translationEN: 'acquire, get', translationRU: 'приобретать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 82, present: 'απολαμβάνω', future: 'θα απολαύσω', aorist: 'απόλαυσα', imperative: 'απόλαυσε / απολαύστε', translationEN: 'enjoy', translationRU: 'наслаждаться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 83, present: 'απολογούμαι', future: 'θα απολογηθώ', aorist: 'απολογήθηκα', imperative: 'απολογήσου / απολογηθείτε', translationEN: 'apologize, defend oneself', translationRU: 'оправдываться, извиняться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 84, present: 'απολύω', future: 'θα απολύσω', aorist: 'απέλυσα', imperative: 'απόλυσε / απολύστε', translationEN: 'fire, dismiss', translationRU: 'увольнять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 85, present: 'απομακρύνω', future: null, aorist: 'απομάκρυνα', imperative: 'απομάκρυνε / απομακρύνετε', translationEN: 'remove, move away', translationRU: 'удалять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 86, present: 'απορρίπτω', future: 'θα απορρίψω', aorist: 'απέρριψα', imperative: 'απόρριψε / απορρίψτε', translationEN: 'reject', translationRU: 'отвергать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 87, present: 'απορώ', future: 'θα απορήσω', aorist: 'απόρησα', imperative: null, translationEN: 'wonder, be surprised', translationRU: 'удивляться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 88, present: 'αποσπώ', future: 'θα αποσπάσω', aorist: 'απέσπασα', imperative: 'απόσπασε / αποσπάστε', translationEN: 'detach, distract, extract', translationRU: 'отвлекать, отрывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 89, present: 'αποστέλλω', future: 'θα αποστείλω', aorist: 'απέστειλα', imperative: 'απόστειλε / αποστείλετε', translationEN: 'send (formal)', translationRU: 'отправлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 90, present: 'αποσύρω', future: null, aorist: 'απέσυρα', imperative: 'απόσυρε / αποσύρετε', translationEN: 'withdraw, pull back', translationRU: 'отзывать, снимать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 91, present: 'αποτελώ', future: 'θα αποτελέσω', aorist: 'αποτέλεσα', imperative: null, translationEN: 'constitute', translationRU: 'составлять', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 92, present: 'αποτρέπω', future: 'θα αποτρέψω', aorist: 'απέτρεψα', imperative: 'απότρεψε / αποτρέψτε', translationEN: 'prevent', translationRU: 'предотвращать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 93, present: 'αποτυγχάνω', future: 'θα αποτύχω', aorist: 'απέτυχα', imperative: null, translationEN: 'fail', translationRU: 'терпеть неудачу', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 94, present: 'αποφασίζω', future: 'θα αποφασίσω', aorist: 'αποφάσισα', imperative: 'αποφάσισε / αποφασίστε', translationEN: 'decide', translationRU: 'решать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 95, present: 'αποφεύγω', future: 'θα αποφύγω', aorist: 'απέφυγα', imperative: 'απόφυγε / αποφύγετε', translationEN: 'avoid', translationRU: 'избегать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 96, present: 'αποχαιρετώ', future: 'θα αποχαιρετήσω', aorist: 'αποχαιρέτησα', imperative: 'αποχαιρέτησε / αποχαιρετήστε', translationEN: 'bid farewell', translationRU: 'прощаться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 97, present: 'αποχωρώ', future: 'θα αποχωρήσω', aorist: 'αποχώρησα', imperative: 'αποχώρησε / αποχωρήστε', translationEN: 'withdraw, leave', translationRU: 'уходить, удаляться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 98, present: 'αραιώνω', future: 'θα αραιώσω', aorist: 'αραίωσα', imperative: 'αραίωσε / αραιώστε', translationEN: 'dilute, thin out', translationRU: 'разбавлять, разрежать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 99, present: 'αργώ', future: 'θα αργήσω', aorist: 'άργησα', imperative: 'άργησε / αργήστε', translationEN: 'be late, delay', translationRU: 'опаздывать, медлить', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 100, present: 'αρέσω', future: null, aorist: 'άρεσα', imperative: null, translationEN: 'be liked, please', translationRU: 'нравиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 101, present: 'αρκώ', future: 'θα αρκέσω', aorist: 'άρκεσα', imperative: null, translationEN: 'suffice, be enough', translationRU: 'хватать, быть достаточным', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 102, present: 'αρνούμαι', future: 'θα αρνηθώ', aorist: 'αρνήθηκα', imperative: 'αρνήσου / αρνηθείτε', translationEN: 'refuse, deny', translationRU: 'отказываться, отрицать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 103, present: 'αρπάζω', future: 'θα αρπάξω', aorist: 'άρπαξα', imperative: 'άρπαξε / αρπάξτε', translationEN: 'grab', translationRU: 'хватать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 104, present: 'αρχίζω', future: 'θα αρχίσω', aorist: 'άρχισα', imperative: 'άρχισε / αρχίστε', translationEN: 'begin', translationRU: 'начинать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 105, present: 'ασκώ', future: 'θα ασκήσω', aorist: 'άσκησα', imperative: 'άσκησε / ασκήστε', translationEN: 'exercise, practise', translationRU: 'осуществлять, упражнять', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 106, present: 'ασπάζομαι', future: 'θα ασπαστώ', aorist: 'ασπάστηκα', imperative: 'ασπάσου / ασπαστείτε', translationEN: 'embrace (an idea), kiss', translationRU: 'принимать (идею), целовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
    {id: 107, present: 'αστειεύομαι', future: 'θα αστειευτώ', aorist: 'αστειεύτηκα', imperative: 'αστειέψου / αστειευτείτε', translationEN: 'joke', translationRU: 'шутить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 108, present: 'αστράφτω', future: 'θα αστράψω', aorist: 'άστραψα', imperative: 'άστραψε / αστράψτε', translationEN: 'flash (lightning), flash with light', translationRU: 'сверкать, блистать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 109, present: 'ασφαλίζω', future: 'θα ασφαλίσω', aorist: 'ασφάλισα', imperative: 'ασφάλισε / ασφαλίστε', translationEN: 'insure, secure', translationRU: 'страховать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 110, present: 'ασχολούμαι', future: 'θα ασχοληθώ', aorist: 'ασχολήθηκα', imperative: 'ασχολήσου / ασχοληθείτε', translationEN: 'be occupied with, deal with', translationRU: 'заниматься', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 111, present: 'αυξάνω', future: 'θα αυξήσω', aorist: 'αύξησα', imperative: 'αύξησε / αυξήστε', translationEN: 'increase', translationRU: 'увеличивать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 112, present: 'αφαιρώ', future: 'θα αφαιρέσω', aorist: 'αφαίρεσα', imperative: 'αφαίρεσε / αφαιρέστε', translationEN: 'remove, subtract', translationRU: 'удалять, вычитать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 113, present: 'αφήνω', future: 'θα αφήσω', aorist: 'άφησα', imperative: 'άφησε / αφήστε', translationEN: 'leave, let', translationRU: 'оставлять, позволять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 114, present: 'αφιερώνω', future: 'θα αφιερώσω', aorist: 'αφιέρωσα', imperative: 'αφιέρωσε / αφιερώστε', translationEN: 'dedicate', translationRU: 'посвящать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 115, present: 'βαδίζω', future: 'θα βαδίσω', aorist: 'βάδισα', imperative: 'βάδισε / βαδίστε', translationEN: 'walk, march', translationRU: 'шагать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 116, present: 'βάζω', future: 'θα βάλω', aorist: 'έβαλα', imperative: 'βάλε / βάλτε', translationEN: 'put', translationRU: 'класть, ставить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 117, present: 'βαραίνω', future: 'θα βαρύνω', aorist: 'βάρυνα', imperative: 'βάρυνε / βαρύνετε', translationEN: 'weigh down, become heavy', translationRU: 'тяжелеть, отягощать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 118, present: 'βαριέμαι', future: 'θα βαρεθώ', aorist: 'βαρέθηκα', imperative: null, translationEN: 'be bored', translationRU: 'скучать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 119, present: 'βασανίζω', future: 'θα βασανίσω', aorist: 'βασάνισα', imperative: 'βασάνισε / βασανίστε', translationEN: 'torture', translationRU: 'мучить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 120, present: 'βασίζομαι', future: 'θα βασιστώ', aorist: 'βασίστηκα', imperative: 'βασίσου / βασιστείτε', translationEN: 'rely', translationRU: 'полагаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 121, present: 'βαστώ', future: 'θα βαστάξω', aorist: 'βάσταξα', imperative: 'βάσταξε / βαστάξτε', translationEN: 'hold, bear', translationRU: 'держать, выдерживать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 122, present: 'βαφτίζω', future: 'θα βαφτίσω', aorist: 'βάφτισα', imperative: 'βάφτισε / βαφτίστε', translationEN: 'baptize', translationRU: 'крестить', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 123, present: 'βάφω', future: 'θα βάψω', aorist: 'έβαψα', imperative: 'βάψε / βάψτε', translationEN: 'paint, dye', translationRU: 'красить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 124, present: 'βγάζω', future: 'θα βγάλω', aorist: 'έβγαλα', imperative: 'βγάλε / βγάλτε', translationEN: 'take out, remove', translationRU: 'вынимать, снимать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 125, present: 'βγαίνω', future: 'θα βγω', aorist: 'βγήκα', imperative: 'βγες / βγείτε', translationEN: 'go out', translationRU: 'выходить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 126, present: 'βεβαιώνω', future: 'θα βεβαιώσω', aorist: 'βεβαίωσα', imperative: 'βεβαίωσε / βεβαιώστε', translationEN: 'assure, confirm', translationRU: 'заверять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 127, present: 'βελτιώνω', future: 'θα βελτιώσω', aorist: 'βελτίωσα', imperative: 'βελτίωσε / βελτιώστε', translationEN: 'improve', translationRU: 'улучшать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 128, present: 'βήχω', future: 'θα βήξω', aorist: 'έβηξα', imperative: 'βήξε / βήξτε', translationEN: 'cough', translationRU: 'кашлять', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 129, present: 'βιάζομαι', future: 'θα βιαστώ', aorist: 'βιάστηκα', imperative: 'βιάσου / βιαστείτε', translationEN: 'hurry', translationRU: 'спешить', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 130, present: 'βλάπτω', future: 'θα βλάψω', aorist: 'έβλαψα', imperative: 'βλάψε / βλάψτε', translationEN: 'harm, damage', translationRU: 'вредить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 131, present: 'βλέπω', future: 'θα δω', aorist: 'είδα', imperative: 'δες / δείτε', translationEN: 'see', translationRU: 'видеть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 132, present: 'βογκώ', future: 'θα βογκήξω', aorist: 'βόγκηξα', imperative: null, translationEN: 'groan, moan', translationRU: 'стонать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 133, present: 'βοηθώ', future: 'θα βοηθήσω', aorist: 'βοήθησα', imperative: 'βοήθησε / βοηθήστε', translationEN: 'help', translationRU: 'помогать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 134, present: 'βουλιάζω', future: 'θα βουλιάξω', aorist: 'βούλιαξα', imperative: 'βούλιαξε / βουλιάξτε', translationEN: 'sink', translationRU: 'тонуть', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 135, present: 'βουτώ', future: 'θα βουτήξω', aorist: 'βούτηξα', imperative: 'βούτηξε / βουτήξτε', translationEN: 'dip, dive', translationRU: 'окунать, нырять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 136, present: 'βράζω', future: 'θα βράσω', aorist: 'έβρασα', imperative: 'βράσε / βράστε', translationEN: 'boil', translationRU: 'кипятить, варить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 137, present: 'βρέχω', future: 'θα βρέξω', aorist: 'έβρεξα', imperative: 'βρέξε / βρέξτε', translationEN: 'wet; rain', translationRU: 'мочить; идти (о дожде)', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 138, present: 'βρίζω', future: 'θα βρίσω', aorist: 'έβρισα', imperative: 'βρίσε / βρίστε', translationEN: 'swear at, insult', translationRU: 'ругать, оскорблять', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 139, present: 'βρίσκω', future: 'θα βρω', aorist: 'βρήκα', imperative: 'βρες / βρείτε', translationEN: 'find', translationRU: 'находить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 140, present: 'βροντώ', future: 'θα βροντήξω', aorist: 'βρόντηξα', imperative: 'βρόντηξε / βροντήξτε', translationEN: 'thunder, bang', translationRU: 'греметь', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 141, present: 'βρυχώμαι', future: 'θα βρυχηθώ', aorist: 'βρυχήθηκα', imperative: null, translationEN: 'roar', translationRU: 'рычать, рёвом реветь', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 142, present: 'βυθίζω', future: 'θα βυθίσω', aorist: 'βύθισα', imperative: 'βύθισε / βυθίστε', translationEN: 'sink (transitive), immerse', translationRU: 'топить, погружать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 143, present: 'γαβγίζω', future: 'θα γαβγίσω', aorist: 'γάβγισα', imperative: 'γάβγισε / γαβγίστε', translationEN: 'bark', translationRU: 'лаять', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 144, present: 'γδέρνω', future: 'θα γδάρω', aorist: 'έγδαρα', imperative: 'γδάρε / γδάρτε', translationEN: 'scrape, skin', translationRU: 'сдирать, обдирать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 145, present: 'γδύνω', future: 'θα γδύσω', aorist: 'έγδυσα', imperative: 'γδύσε / γδύστε', translationEN: 'undress (someone)', translationRU: 'раздевать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 146, present: 'γελιέμαι', future: 'θα γελαστώ', aorist: 'γελάστηκα', imperative: null, translationEN: 'be mistaken', translationRU: 'ошибаться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 147, present: 'γελώ', future: 'θα γελάσω', aorist: 'γέλασα', imperative: 'γέλασε / γελάστε', translationEN: 'laugh', translationRU: 'смеяться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 148, present: 'γεμίζω', future: 'θα γεμίσω', aorist: 'γέμισα', imperative: 'γέμισε / γεμίστε', translationEN: 'fill', translationRU: 'наполнять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 149, present: 'γεννιέμαι', future: 'θα γεννηθώ', aorist: 'γεννήθηκα', imperative: null, translationEN: 'be born', translationRU: 'рождаться', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
    {id: 150, present: 'γεννώ', future: 'θα γεννήσω', aorist: 'γέννησα', imperative: 'γέννησε / γεννήστε', translationEN: 'give birth', translationRU: 'рожать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 151, present: 'γερνώ', future: 'θα γεράσω', aorist: 'γέρασα', imperative: null, translationEN: 'grow old', translationRU: 'стареть', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar2']},
    {id: 152, present: 'γεύομαι', future: 'θα γευτώ', aorist: 'γεύτηκα', imperative: 'γεύσου / γευτείτε', translationEN: 'taste', translationRU: 'пробовать на вкус', lexicalCategory: ['lexicalSense'], grammaticalCategory: ['grammarMedial']},
    {id: 153, present: 'γιατρεύω', future: 'θα γιατρέψω', aorist: 'γιάτρεψα', imperative: 'γιάτρεψε / γιατρέψτε', translationEN: 'cure', translationRU: 'лечить', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 154, present: 'γίνομαι', future: 'θα γίνω', aorist: 'έγινα', imperative: 'γίνε / γίνετε', translationEN: 'become', translationRU: 'становиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 155, present: 'γιορτάζω', future: 'θα γιορτάσω', aorist: 'γιόρτασα', imperative: 'γιόρτασε / γιορτάστε', translationEN: 'celebrate', translationRU: 'праздновать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 156, present: 'γκρεμίζω', future: 'θα γκρεμίσω', aorist: 'γκρέμισα', imperative: 'γκρέμισε / γκρεμίστε', translationEN: 'demolish', translationRU: 'разрушать, сносить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 157, present: 'γκρινιάζω', future: 'θα γκρινιάξω', aorist: 'γκρίνιαξα', imperative: 'γκρίνιαξε / γκρινιάξτε', translationEN: 'grumble', translationRU: 'ныть, ворчать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 158, present: 'γλείφω', future: 'θα γλείψω', aorist: 'έγλειψα', imperative: 'γλείψε / γλείψτε', translationEN: 'lick', translationRU: 'лизать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 159, present: 'γλεντώ', future: 'θα γλεντήσω', aorist: 'γλέντησα', imperative: 'γλέντησε / γλεντήστε', translationEN: 'party, enjoy oneself', translationRU: 'веселиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 160, present: 'γλιστρώ', future: 'θα γλιστρήσω', aorist: 'γλίστρησα', imperative: 'γλίστρησε / γλιστρήστε', translationEN: 'slip', translationRU: 'скользить', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 161, present: 'γλιτώνω', future: 'θα γλιτώσω', aorist: 'γλίτωσα', imperative: 'γλίτωσε / γλιτώστε', translationEN: 'escape, save, get rid of', translationRU: 'спасаться, избавляться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 162, present: 'γλυτώνω', future: 'θα γλυτώσω', aorist: 'γλύτωσα', imperative: 'γλύτωσε / γλυτώστε', translationEN: 'escape, save', translationRU: 'спасаться, избавляться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 163, present: 'γνωρίζω', future: 'θα γνωρίσω', aorist: 'γνώρισα', imperative: 'γνώρισε / γνωρίστε', translationEN: 'know, introduce', translationRU: 'знать, знакомить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 164, present: 'γογγύζω', future: 'θα γογγύσω', aorist: 'γόγγυσα', imperative: null, translationEN: 'grumble, murmur', translationRU: 'ворчать, роптать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 165, present: 'γοητεύω', future: 'θα γοητεύσω', aorist: 'γοήτευσα', imperative: 'γοήτευσε / γοητεύστε', translationEN: 'charm', translationRU: 'очаровывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 166, present: 'γονατίζω', future: 'θα γονατίσω', aorist: 'γονάτισα', imperative: 'γονάτισε / γονατίστε', translationEN: 'kneel', translationRU: 'становиться на колени', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 167, present: 'γρατζουνώ', future: 'θα γρατζουνίσω', aorist: 'γρατζούνισα', imperative: 'γρατζούνισε / γρατζουνίστε', translationEN: 'scratch', translationRU: 'царапать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 168, present: 'γράφω', future: 'θα γράψω', aorist: 'έγραψα', imperative: 'γράψε / γράψτε', translationEN: 'write', translationRU: 'писать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 169, present: 'γρυλίζω', future: 'θα γρυλίσω', aorist: 'γρύλισα', imperative: 'γρύλισε / γρυλίστε', translationEN: 'growl', translationRU: 'рычать (о животных), хрюкать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 170, present: 'γυαλίζω', future: 'θα γυαλίσω', aorist: 'γύαλισα', imperative: 'γύαλισε / γυαλίστε', translationEN: 'polish', translationRU: 'полировать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 171, present: 'γυμνάζομαι', future: 'θα γυμναστώ', aorist: 'γυμνάστηκα', imperative: 'γυμνάσου / γυμναστείτε', translationEN: 'exercise', translationRU: 'заниматься спортом, тренироваться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 172, present: 'γυρίζω', future: 'θα γυρίσω', aorist: 'γύρισα', imperative: 'γύρισε / γυρίστε', translationEN: 'turn, return', translationRU: 'поворачивать, возвращаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 173, present: 'δαγκώνω', future: 'θα δαγκώσω', aorist: 'δάγκωσα', imperative: 'δάγκωσε / δαγκώστε', translationEN: 'bite', translationRU: 'кусать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 174, present: 'δακρύζω', future: 'θα δακρύσω', aorist: 'δάκρυσα', imperative: null, translationEN: 'shed tears', translationRU: 'наворачиваться слезам', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 175, present: 'δαμάζω', future: 'θα δαμάσω', aorist: 'δάμασα', imperative: 'δάμασε / δαμάστε', translationEN: 'tame, subdue', translationRU: 'укрощать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 176, present: 'δανείζομαι', future: 'θα δανειστώ', aorist: 'δανείστηκα', imperative: 'δανείσου / δανειστείτε', translationEN: 'borrow', translationRU: 'занимать (у кого-л.)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 177, present: 'δανείζω', future: 'θα δανείσω', aorist: 'δάνεισα', imperative: 'δάνεισε / δανείστε', translationEN: 'lend', translationRU: 'одалживать (кому-л.)', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 178, present: 'δειπνώ', future: 'θα δειπνήσω', aorist: 'δείπνησα', imperative: 'δείπνησε / δειπνήστε', translationEN: 'dine', translationRU: 'ужинать', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar2']},
    {id: 179, present: 'δείχνω', future: 'θα δείξω', aorist: 'έδειξα', imperative: 'δείξε / δείξτε', translationEN: 'show', translationRU: 'показывать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 180, present: 'δένω', future: 'θα δέσω', aorist: 'έδεσα', imperative: 'δέσε / δέστε', translationEN: 'tie', translationRU: 'завязывать, привязывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 181, present: 'δέρνω', future: 'θα δείρω', aorist: 'έδειρα', imperative: 'δείρε / δείρτε', translationEN: 'beat', translationRU: 'бить', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 182, present: 'δεσμεύω', future: 'θα δεσμεύσω', aorist: 'δέσμευσα', imperative: 'δέσμευσε / δεσμεύστε', translationEN: 'bind, commit', translationRU: 'связывать, обязывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 183, present: 'δέχομαι', future: 'θα δεχτώ', aorist: 'δέχτηκα', imperative: 'δέξου / δεχτείτε', translationEN: 'accept, receive', translationRU: 'принимать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 184, present: 'δηλώνω', future: 'θα δηλώσω', aorist: 'δήλωσα', imperative: 'δήλωσε / δηλώστε', translationEN: 'declare', translationRU: 'заявлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 185, present: 'δημιουργώ', future: 'θα δημιουργήσω', aorist: 'δημιούργησα', imperative: 'δημιούργησε / δημιουργήστε', translationEN: 'create', translationRU: 'создавать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 186, present: 'δημοσιεύω', future: 'θα δημοσιεύσω', aorist: 'δημοσίευσα', imperative: 'δημοσίευσε / δημοσιεύστε', translationEN: 'publish', translationRU: 'публиковать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 187, present: 'διαβάζω', future: 'θα διαβάσω', aorist: 'διάβασα', imperative: 'διάβασε / διαβάστε', translationEN: 'read, study', translationRU: 'читать, учить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 188, present: 'διαγράφω', future: 'θα διαγράψω', aorist: 'διέγραψα', imperative: 'διάγραψε / διαγράψτε', translationEN: 'delete', translationRU: 'удалять, стирать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 189, present: 'διαδίδω', future: 'θα διαδώσω', aorist: 'διέδωσα', imperative: 'διάδωσε / διαδώστε', translationEN: 'spread (news)', translationRU: 'распространять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 190, present: 'διαθέτω', future: 'θα διαθέσω', aorist: 'διέθεσα', imperative: 'διάθεσε / διαθέστε', translationEN: 'have at one\'s disposal', translationRU: 'располагать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 191, present: 'διακόπτω', future: 'θα διακόψω', aorist: 'διέκοψα', imperative: 'διάκοψε / διακόψτε', translationEN: 'interrupt', translationRU: 'прерывать', lexicalCategory: ['lexicalTime','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 192, present: 'διακοσμώ', future: 'θα διακοσμήσω', aorist: 'διακόσμησα', imperative: 'διακόσμησε / διακοσμήστε', translationEN: 'decorate', translationRU: 'украшать, декорировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 193, present: 'διακρίνω', future: null, aorist: 'διέκρινα', imperative: 'διάκρινε / διακρίνετε', translationEN: 'distinguish', translationRU: 'различать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 194, present: 'διαλέγω', future: 'θα διαλέξω', aorist: 'διάλεξα', imperative: 'διάλεξε / διαλέξτε', translationEN: 'choose', translationRU: 'выбирать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 195, present: 'διαλύω', future: 'θα διαλύσω', aorist: 'διέλυσα', imperative: 'διάλυσε / διαλύστε', translationEN: 'dissolve, break up', translationRU: 'растворять, распускать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 196, present: 'διαπιστώνω', future: 'θα διαπιστώσω', aorist: 'διαπίστωσα', imperative: 'διαπίστωσε / διαπιστώστε', translationEN: 'ascertain', translationRU: 'констатировать', lexicalCategory: ['lexicalSense','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 197, present: 'διαπραγματεύομαι', future: 'θα διαπραγματευτώ', aorist: 'διαπραγματεύτηκα', imperative: 'διαπραγματεύσου / διαπραγματευτείτε', translationEN: 'negotiate', translationRU: 'вести переговоры', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 198, present: 'διαρκώ', future: 'θα διαρκέσω', aorist: 'διήρκεσα', imperative: null, translationEN: 'last', translationRU: 'длиться', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 199, present: 'διασκεδάζω', future: 'θα διασκεδάσω', aorist: 'διασκέδασα', imperative: 'διασκέδασε / διασκεδάστε', translationEN: 'have fun, entertain', translationRU: 'развлекаться, развлекать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 200, present: 'διασχίζω', future: 'θα διασχίσω', aorist: 'διέσχισα', imperative: 'διάσχισε / διασχίστε', translationEN: 'cross', translationRU: 'пересекать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 201, present: 'διατάζω', future: 'θα διατάξω', aorist: 'διέταξα', imperative: 'διάταξε / διατάξτε', translationEN: 'order, command', translationRU: 'приказывать', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 202, present: 'διατηρώ', future: 'θα διατηρήσω', aorist: 'διατήρησα', imperative: 'διατήρησε / διατηρήστε', translationEN: 'maintain, preserve', translationRU: 'сохранять', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 203, present: 'διαφέρω', future: null, aorist: 'διέφερα', imperative: null, translationEN: 'differ', translationRU: 'отличаться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 204, present: 'διαφωνώ', future: 'θα διαφωνήσω', aorist: 'διαφώνησα', imperative: 'διαφώνησε / διαφωνήστε', translationEN: 'disagree', translationRU: 'не соглашаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 205, present: 'διαχειρίζομαι', future: 'θα διαχειριστώ', aorist: 'διαχειρίστηκα', imperative: 'διαχειρίσου / διαχειριστείτε', translationEN: 'manage', translationRU: 'управлять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
    {id: 206, present: 'διαχωρίζω', future: 'θα διαχωρίσω', aorist: 'διαχώρισα', imperative: 'διαχώρισε / διαχωρίστε', translationEN: 'separate', translationRU: 'разделять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 207, present: 'διδάσκω', future: 'θα διδάξω', aorist: 'δίδαξα', imperative: 'δίδαξε / διδάξτε', translationEN: 'teach', translationRU: 'преподавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 208, present: 'διεκδικώ', future: 'θα διεκδικήσω', aorist: 'διεκδίκησα', imperative: 'διεκδίκησε / διεκδικήστε', translationEN: 'claim, demand', translationRU: 'требовать, добиваться', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 209, present: 'διευθύνω', future: null, aorist: 'διεύθυνα', imperative: 'διεύθυνε / διευθύνετε', translationEN: 'direct, manage', translationRU: 'руководить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 210, present: 'διηγούμαι', future: 'θα διηγηθώ', aorist: 'διηγήθηκα', imperative: 'διηγήσου / διηγηθείτε', translationEN: 'narrate, tell', translationRU: 'рассказывать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 211, present: 'δικάζω', future: 'θα δικάσω', aorist: 'δίκασα', imperative: 'δίκασε / δικάστε', translationEN: 'judge, try', translationRU: 'судить', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 212, present: 'δικαιολογώ', future: 'θα δικαιολογήσω', aorist: 'δικαιολόγησα', imperative: 'δικαιολόγησε / δικαιολογήστε', translationEN: 'justify, excuse', translationRU: 'оправдывать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 213, present: 'δίνω', future: 'θα δώσω', aorist: 'έδωσα', imperative: 'δώσε / δώστε', translationEN: 'give', translationRU: 'давать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 214, present: 'διορθώνω', future: 'θα διορθώσω', aorist: 'διόρθωσα', imperative: 'διόρθωσε / διορθώστε', translationEN: 'correct, fix', translationRU: 'исправлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 215, present: 'διψώ', future: 'θα διψάσω', aorist: 'δίψασα', imperative: null, translationEN: 'be thirsty', translationRU: 'хотеть пить', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 216, present: 'διώχνω', future: 'θα διώξω', aorist: 'έδιωξα', imperative: 'δίωξε / διώξτε', translationEN: 'chase away, fire', translationRU: 'прогонять, увольнять', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 217, present: 'δοκιμάζω', future: 'θα δοκιμάσω', aorist: 'δοκίμασα', imperative: 'δοκίμασε / δοκιμάστε', translationEN: 'try, taste', translationRU: 'пробовать, примерять', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 218, present: 'δοξάζω', future: 'θα δοξάσω', aorist: 'δόξασα', imperative: 'δόξασε / δοξάστε', translationEN: 'glorify', translationRU: 'прославлять', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 219, present: 'δουλεύω', future: 'θα δουλέψω', aorist: 'δούλεψα', imperative: 'δούλεψε / δουλέψτε', translationEN: 'work', translationRU: 'работать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 220, present: 'δραπετεύω', future: 'θα δραπετεύσω', aorist: 'δραπέτευσα', imperative: 'δραπέτευσε / δραπετεύστε', translationEN: 'escape', translationRU: 'сбегать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 221, present: 'δροσίζομαι', future: 'θα δροσιστώ', aorist: 'δροσίστηκα', imperative: 'δροσίσου / δροσιστείτε', translationEN: 'cool down, refresh oneself', translationRU: 'освежаться, охлаждаться', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
    {id: 222, present: 'δροσίζω', future: 'θα δροσίσω', aorist: 'δρόσισα', imperative: 'δρόσισε / δροσίστε', translationEN: 'cool, refresh', translationRU: 'освежать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 223, present: 'δυναμώνω', future: 'θα δυναμώσω', aorist: 'δυνάμωσα', imperative: 'δυνάμωσε / δυναμώστε', translationEN: 'strengthen', translationRU: 'усиливать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 224, present: 'δυσκολεύω', future: 'θα δυσκολέψω', aorist: 'δυσκόλεψα', imperative: 'δυσκόλεψε / δυσκολέψτε', translationEN: 'make difficult', translationRU: 'затруднять', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 225, present: 'εγγυώμαι', future: 'θα εγγυηθώ', aorist: 'εγγυήθηκα', imperative: 'εγγυήσου / εγγυηθείτε', translationEN: 'guarantee', translationRU: 'гарантировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 226, present: 'εγκαθιστώ', future: 'θα εγκαταστήσω', aorist: 'εγκατέστησα', imperative: 'εγκατάστησε / εγκαταστήστε', translationEN: 'install, settle', translationRU: 'устанавливать, поселять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 227, present: 'εγκαταλείπω', future: 'θα εγκαταλείψω', aorist: 'εγκατέλειψα', imperative: 'εγκατάλειψε / εγκαταλείψτε', translationEN: 'abandon', translationRU: 'бросать, покидать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 228, present: 'εγκρίνω', future: null, aorist: 'ενέκρινα', imperative: 'έγκρινε / εγκρίνετε', translationEN: 'approve', translationRU: 'одобрять', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 229, present: 'ειδοποιώ', future: 'θα ειδοποιήσω', aorist: 'ειδοποίησα', imperative: 'ειδοποίησε / ειδοποιήστε', translationEN: 'notify', translationRU: 'уведомлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 230, present: 'είμαι', future: null, aorist: 'ήμουν', imperative: null, translationEN: 'be', translationRU: 'быть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarIrregular']},
    {id: 231, present: 'εισάγω', future: 'θα εισαγάγω', aorist: 'εισήγαγα', imperative: null, translationEN: 'import, introduce', translationRU: 'импортировать, вводить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 232, present: 'εισβάλλω', future: 'θα εισβάλω', aorist: 'εισέβαλα', imperative: 'εισέβαλε / εισεβάλετε', translationEN: 'invade', translationRU: 'вторгаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 233, present: 'εισπράττω', future: 'θα εισπράξω', aorist: 'εισέπραξα', imperative: 'είσπραξε / εισπράξτε', translationEN: 'collect (money)', translationRU: 'получать (деньги)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 234, present: 'εκδηλώνω', future: 'θα εκδηλώσω', aorist: 'εκδήλωσα', imperative: 'εκδήλωσε / εκδηλώστε', translationEN: 'express, manifest', translationRU: 'проявлять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 235, present: 'εκδίδω', future: 'θα εκδώσω', aorist: 'εξέδωσα', imperative: 'έκδωσε / εκδώστε', translationEN: 'publish, issue', translationRU: 'издавать, выдавать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 236, present: 'εκδικούμαι', future: 'θα εκδικηθώ', aorist: 'εκδικήθηκα', imperative: 'εκδικήσου / εκδικηθείτε', translationEN: 'take revenge', translationRU: 'мстить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
    {id: 237, present: 'εκθέτω', future: 'θα εκθέσω', aorist: 'έκθεσα', imperative: 'έκθεσε / εκθέστε', translationEN: 'expose, exhibit', translationRU: 'выставлять, подвергать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 238, present: 'εκλέγω', future: 'θα εκλέξω', aorist: 'εξέλεξα', imperative: null, translationEN: 'elect', translationRU: 'избирать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 239, present: 'εκλιπαρώ', future: 'θα εκλιπαρήσω', aorist: 'εκλιπάρησα', imperative: 'εκλιπάρησε / εκλιπαρήστε', translationEN: 'beg, implore', translationRU: 'умолять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 240, present: 'εκμεταλλεύομαι', future: 'θα εκμεταλλευτώ', aorist: 'εκμεταλλεύτηκα', imperative: 'εκμεταλλεύσου / εκμεταλλευτείτε', translationEN: 'exploit, take advantage of', translationRU: 'использовать, эксплуатировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
    {id: 241, present: 'εκνευρίζω', future: 'θα εκνευρίσω', aorist: 'εκνεύρισα', imperative: 'εκνεύρισε / εκνευρίστε', translationEN: 'irritate', translationRU: 'раздражать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 242, present: 'εκπαιδεύομαι', future: 'θα εκπαιδευτώ', aorist: 'εκπαιδεύτηκα', imperative: 'εκπαιδεύσου / εκπαιδευτείτε', translationEN: 'be trained, train', translationRU: 'обучаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 243, present: 'εκπαιδεύω', future: 'θα εκπαιδεύσω', aorist: 'εκπαίδευσα', imperative: 'εκπαίδευσε / εκπαιδεύστε', translationEN: 'train, educate', translationRU: 'обучать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 244, present: 'εκπληρώνω', future: 'θα εκπληρώσω', aorist: 'εκπλήρωσα', imperative: 'εκπλήρωσε / εκπληρώστε', translationEN: 'fulfill', translationRU: 'исполнять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 245, present: 'εκπλήσσω', future: 'θα εκπλήξω', aorist: 'εξέπληξα', imperative: 'έκπληξε / εκπλήξτε', translationEN: 'surprise', translationRU: 'удивлять', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 246, present: 'εκτελώ', future: 'θα εκτελέσω', aorist: 'εκτέλεσα', imperative: 'εκτέλεσε / εκτελέστε', translationEN: 'execute, carry out', translationRU: 'выполнять, казнить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 247, present: 'εκτιμώ', future: 'θα εκτιμήσω', aorist: 'εκτίμησα', imperative: 'εκτίμησε / εκτιμήστε', translationEN: 'appreciate, estimate', translationRU: 'ценить, оценивать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 248, present: 'εκφράζω', future: 'θα εκφράσω', aorist: 'εξέφρασα', imperative: 'έκφρασε / εκφράστε', translationEN: 'express', translationRU: 'выражать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 249, present: 'ελαττώνω', future: 'θα ελαττώσω', aorist: 'ελάττωσα', imperative: 'ελάττωσε / ελαττώστε', translationEN: 'reduce', translationRU: 'уменьшать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 250, present: 'ελέγχω', future: 'θα ελέγξω', aorist: 'έλεγξα', imperative: 'έλεγξε / ελέγξτε', translationEN: 'check, control', translationRU: 'проверять, контролировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 251, present: 'ελευθερώνω', future: 'θα ελευθερώσω', aorist: 'ελευθέρωσα', imperative: 'ελευθέρωσε / ελευθερώστε', translationEN: 'free', translationRU: 'освобождать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 252, present: 'ελπίζω', future: 'θα ελπίσω', aorist: 'έλπισα', imperative: 'έλπισε / ελπίστε', translationEN: 'hope', translationRU: 'надеяться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 253, present: 'εμπιστεύομαι', future: 'θα εμπιστευτώ', aorist: 'εμπιστεύτηκα', imperative: 'εμπιστεύσου / εμπιστευτείτε', translationEN: 'trust', translationRU: 'доверять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 254, present: 'εμπλέκω', future: 'θα εμπλέξω', aorist: 'ενέπλεξα', imperative: null, translationEN: 'involve, entangle', translationRU: 'вовлекать, запутывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 255, present: 'εμπνέω', future: 'θα εμπνεύσω', aorist: 'ενέπνευσα', imperative: 'έμπνευσε / εμπνεύστε', translationEN: 'inspire', translationRU: 'вдохновлять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 256, present: 'εμποδίζω', future: 'θα εμποδίσω', aorist: 'εμπόδισα', imperative: 'εμπόδισε / εμποδίστε', translationEN: 'prevent, hinder', translationRU: 'мешать, препятствовать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 257, present: 'εμπορεύομαι', future: 'θα εμπορευτώ', aorist: 'εμπορεύτηκα', imperative: null, translationEN: 'trade', translationRU: 'торговать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 258, present: 'εμφανίζομαι', future: 'θα εμφανιστώ', aorist: 'εμφανίστηκα', imperative: 'εμφανίσου / εμφανιστείτε', translationEN: 'appear', translationRU: 'появляться', lexicalCategory: ['lexicalSense','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 259, present: 'εμφανίζω', future: 'θα εμφανίσω', aorist: 'εμφάνισα', imperative: 'εμφάνισε / εμφανίστε', translationEN: 'show, develop (photos)', translationRU: 'показывать, проявлять', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 260, present: 'ενδιαφέρομαι', future: 'θα ενδιαφερθώ', aorist: 'ενδιαφέρθηκα', imperative: 'ενδιαφέρσου / ενδιαφερθείτε', translationEN: 'be interested', translationRU: 'интересоваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 261, present: 'ενεργοποιώ', future: 'θα ενεργοποιήσω', aorist: 'ενεργοποίησα', imperative: 'ενεργοποίησε / ενεργοποιήστε', translationEN: 'activate', translationRU: 'активировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 262, present: 'ενεργώ', future: 'θα ενεργήσω', aorist: 'ενήργησα', imperative: 'ενέργησε / ενεργήστε', translationEN: 'act', translationRU: 'действовать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 263, present: 'ενημερώνω', future: 'θα ενημερώσω', aorist: 'ενημέρωσα', imperative: 'ενημέρωσε / ενημερώστε', translationEN: 'inform, update', translationRU: 'информировать, обновлять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 264, present: 'ενθαρρύνω', future: null, aorist: 'ενθάρρυνα', imperative: 'ενθάρρυνε / ενθαρρύνετε', translationEN: 'encourage', translationRU: 'поощрять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 265, present: 'ενθουσιάζομαι', future: 'θα ενθουσιαστώ', aorist: 'ενθουσιάστηκα', imperative: 'ενθουσιάσου / ενθουσιαστείτε', translationEN: 'get excited', translationRU: 'восторгаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 266, present: 'ενισχύω', future: 'θα ενισχύσω', aorist: 'ενίσχυσα', imperative: 'ενίσχυσε / ενισχύστε', translationEN: 'reinforce, support', translationRU: 'усиливать, поддерживать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 267, present: 'εννοώ', future: 'θα εννοήσω', aorist: 'εννόησα', imperative: 'εννόησε / εννοήστε', translationEN: 'mean', translationRU: 'подразумевать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 268, present: 'ενοικιάζω', future: 'θα ενοικιάσω', aorist: 'ενοικίασα', imperative: 'ενοικίασε / ενοικιάστε', translationEN: 'rent out, rent', translationRU: 'сдавать, арендовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 269, present: 'ενοχλώ', future: 'θα ενοχλήσω', aorist: 'ενόχλησα', imperative: 'ενόχλησε / ενοχλήστε', translationEN: 'bother, disturb', translationRU: 'беспокоить, мешать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 270, present: 'ενώνω', future: 'θα ενώσω', aorist: 'ένωσα', imperative: 'ένωσε / ενώστε', translationEN: 'unite, connect', translationRU: 'соединять', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 271, present: 'εξαγοράζω', future: 'θα εξαγοράσω', aorist: 'εξαγόρασα', imperative: 'εξαγόρασε / εξαγοράστε', translationEN: 'buy out, bribe', translationRU: 'выкупать, подкупать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 272, present: 'εξαιρώ', future: 'θα εξαιρέσω', aorist: 'εξαίρεσα', imperative: 'εξαίρεσε / εξαιρέστε', translationEN: 'exclude, exempt', translationRU: 'исключать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 273, present: 'εξακολουθώ', future: 'θα εξακολουθήσω', aorist: 'εξακολούθησα', imperative: 'εξακολούθησε / εξακολουθήστε', translationEN: 'continue', translationRU: 'продолжать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 274, present: 'εξαντλώ', future: 'θα εξαντλήσω', aorist: 'εξάντλησα', imperative: 'εξάντλησε / εξαντλήστε', translationEN: 'exhaust', translationRU: 'истощать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 275, present: 'εξαπατώ', future: 'θα εξαπατήσω', aorist: 'εξαπάτησα', imperative: 'εξαπάτησε / εξαπατήστε', translationEN: 'deceive, cheat', translationRU: 'обманывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 276, present: 'εξαρτώμαι', future: 'θα εξαρτηθώ', aorist: 'εξαρτήθηκα', imperative: null, translationEN: 'depend', translationRU: 'зависеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 277, present: 'εξασφαλίζω', future: 'θα εξασφαλίσω', aorist: 'εξασφάλισα', imperative: 'εξασφάλισε / εξασφαλίστε', translationEN: 'secure, ensure', translationRU: 'обеспечивать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 278, present: 'εξαφανίζομαι', future: 'θα εξαφανιστώ', aorist: 'εξαφανίστηκα', imperative: 'εξαφανίσου / εξαφανιστείτε', translationEN: 'disappear', translationRU: 'исчезать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 279, present: 'εξαφανίζω', future: 'θα εξαφανίσω', aorist: 'εξαφάνισα', imperative: 'εξαφάνισε / εξαφανίστε', translationEN: 'make disappear', translationRU: 'уничтожать, прятать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 280, present: 'εξελίσσομαι', future: 'θα εξελιχθώ', aorist: 'εξελίχθηκα', imperative: null, translationEN: 'evolve', translationRU: 'развиваться, эволюционировать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammarMedial']},
    {id: 281, present: 'εξετάζω', future: 'θα εξετάσω', aorist: 'εξέτασα', imperative: 'εξέτασε / εξετάστε', translationEN: 'examine', translationRU: 'исследовать, экзаменовать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 282, present: 'εξηγώ', future: 'θα εξηγήσω', aorist: 'εξήγησα', imperative: 'εξήγησε / εξηγήστε', translationEN: 'explain', translationRU: 'объяснять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 283, present: 'εξοικονομώ', future: 'θα εξοικονομήσω', aorist: 'εξοικονόμησα', imperative: 'εξοικονόμησε / εξοικονομήστε', translationEN: 'save (money, time)', translationRU: 'экономить', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
    {id: 284, present: 'εξοργίζω', future: 'θα εξοργίσω', aorist: 'εξόργισα', imperative: 'εξόργισε / εξοργίστε', translationEN: 'enrage', translationRU: 'приводить в ярость', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 285, present: 'εξυπηρετώ', future: 'θα εξυπηρετήσω', aorist: 'εξυπηρέτησα', imperative: 'εξυπηρέτησε / εξυπηρετήστε', translationEN: 'serve, help', translationRU: 'обслуживать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 286, present: 'επαινώ', future: 'θα επαινέσω', aorist: 'επαίνεσα', imperative: 'επαίνεσε / επαινέστε', translationEN: 'praise', translationRU: 'хвалить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 287, present: 'επαναλαμβάνω', future: 'θα επαναλάβω', aorist: 'επανέλαβα', imperative: 'επανάλαβε / επαναλάβετε', translationEN: 'repeat', translationRU: 'повторять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 288, present: 'επαναστατώ', future: 'θα επαναστατήσω', aorist: 'επαναστάτησα', imperative: 'επαναστάτησε / επαναστατήστε', translationEN: 'rebel', translationRU: 'бунтовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 289, present: 'επεκτείνω', future: null, aorist: 'επέκτεινα', imperative: 'επέκτεινε / επεκτείνετε', translationEN: 'extend', translationRU: 'расширять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 290, present: 'επενδύω', future: 'θα επενδύσω', aorist: 'επένδυσα', imperative: 'επένδυσε / επενδύστε', translationEN: 'invest', translationRU: 'инвестировать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 291, present: 'επεξεργάζομαι', future: 'θα επεξεργαστώ', aorist: 'επεξεργάστηκα', imperative: 'επεξεργάσου / επεξεργαστείτε', translationEN: 'process, edit', translationRU: 'обрабатывать, редактировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 292, present: 'επηρεάζω', future: 'θα επηρεάσω', aorist: 'επηρέασα', imperative: 'επηρέασε / επηρεάστε', translationEN: 'affect, influence', translationRU: 'влиять', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 293, present: 'επιβάλλω', future: 'θα επιβάλω', aorist: 'επέβαλα', imperative: 'επίβαλε / επιβάλετε', translationEN: 'impose', translationRU: 'навязывать, налагать', lexicalCategory: ['lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 294, present: 'επιβεβαιώνω', future: 'θα επιβεβαιώσω', aorist: 'επιβεβαίωσα', imperative: 'επιβεβαίωσε / επιβεβαιώστε', translationEN: 'confirm', translationRU: 'подтверждать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 295, present: 'επιβιώνω', future: 'θα επιβιώσω', aorist: 'επιβίωσα', imperative: null, translationEN: 'survive', translationRU: 'выживать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 296, present: 'επιδεινώνω', future: 'θα επιδεινώσω', aorist: 'επιδείνωσα', imperative: 'επιδείνωσε / επιδεινώστε', translationEN: 'worsen', translationRU: 'ухудшать', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 297, present: 'επιδιορθώνω', future: 'θα επιδιορθώσω', aorist: 'επιδιόρθωσα', imperative: 'επιδιόρθωσε / επιδιορθώστε', translationEN: 'repair, fix', translationRU: 'ремонтировать, чинить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 298, present: 'επιδιώκω', future: 'θα επιδιώξω', aorist: 'επιδίωξα', imperative: 'επιδίωξε / επιδιώξτε', translationEN: 'seek, pursue', translationRU: 'стремиться, добиваться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 299, present: 'επιθυμώ', future: 'θα επιθυμήσω', aorist: 'επιθύμησα', imperative: null, translationEN: 'desire', translationRU: 'желать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 300, present: 'επικοινωνώ', future: 'θα επικοινωνήσω', aorist: 'επικοινώνησα', imperative: 'επικοινώνησε / επικοινωνήστε', translationEN: 'communicate, contact', translationRU: 'общаться, связываться', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 301, present: 'επιλέγω', future: 'θα επιλέξω', aorist: 'επέλεξα', imperative: 'επίλεξε / επιλέξτε', translationEN: 'select', translationRU: 'выбирать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 302, present: 'επιμένω', future: 'θα επιμείνω', aorist: 'επέμεινα', imperative: 'επίμεινε / επιμείνετε', translationEN: 'insist', translationRU: 'настаивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 303, present: 'επισκέπτομαι', future: 'θα επισκεφτώ', aorist: 'επισκέφτηκα', imperative: 'επισκέψου / επισκεφτείτε', translationEN: 'visit', translationRU: 'посещать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 304, present: 'επισκευάζω', future: 'θα επισκευάσω', aorist: 'επισκεύασα', imperative: 'επισκεύασε / επισκευάστε', translationEN: 'repair', translationRU: 'ремонтировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 305, present: 'επιστρέφω', future: 'θα επιστρέψω', aorist: 'επέστρεψα', imperative: 'επίστρεψε / επιστρέψτε', translationEN: 'return', translationRU: 'возвращаться, возвращать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 306, present: 'επιταχύνω', future: null, aorist: 'επιτάχυνα', imperative: 'επιτάχυνε / επιταχύνετε', translationEN: 'accelerate', translationRU: 'ускорять', lexicalCategory: ['lexicalMotion','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 307, present: 'επιτίθεμαι', future: 'θα επιτεθώ', aorist: 'επιτέθηκα', imperative: null, translationEN: 'attack', translationRU: 'нападать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 308, present: 'επιτρέπω', future: 'θα επιτρέψω', aorist: 'επέτρεψα', imperative: 'επίτρεψε / επιτρέψτε', translationEN: 'allow', translationRU: 'разрешать', lexicalCategory: ['lexicalBasic','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 309, present: 'επιτυγχάνω', future: 'θα επιτύχω', aorist: 'επέτυχα', imperative: 'επίτυχε / επιτύχετε', translationEN: 'achieve, succeed', translationRU: 'достигать, добиваться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 310, present: 'επιχειρώ', future: 'θα επιχειρήσω', aorist: 'επιχείρησα', imperative: 'επιχείρησε / επιχειρήστε', translationEN: 'attempt', translationRU: 'пытаться, предпринимать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 311, present: 'εργάζομαι', future: 'θα εργαστώ', aorist: 'εργάστηκα', imperative: 'εργάσου / εργαστείτε', translationEN: 'work', translationRU: 'работать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 312, present: 'ερευνώ', future: 'θα ερευνήσω', aorist: 'ερεύνησα', imperative: 'ερεύνησε / ερευνήστε', translationEN: 'investigate, research', translationRU: 'исследовать, расследовать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 313, present: 'ερμηνεύω', future: 'θα ερμηνεύσω', aorist: 'ερμήνευσα', imperative: 'ερμήνευσε / ερμηνεύστε', translationEN: 'interpret', translationRU: 'толковать, исполнять', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 314, present: 'έρχομαι', future: 'θα έρθω', aorist: 'ήρθα', imperative: 'έλα / ελάτε', translationEN: 'come', translationRU: 'приходить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 315, present: 'ερωτεύομαι', future: 'θα ερωτευτώ', aorist: 'ερωτεύτηκα', imperative: 'ερωτεύσου / ερωτευτείτε', translationEN: 'fall in love', translationRU: 'влюбляться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 316, present: 'ερωτώ', future: 'θα ερωτήσω', aorist: 'ερώτησα', imperative: 'ερώτησε / ερωτήστε', translationEN: 'ask', translationRU: 'спрашивать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 317, present: 'ετοιμάζομαι', future: 'θα ετοιμαστώ', aorist: 'ετοιμάστηκα', imperative: 'ετοιμάσου / ετοιμαστείτε', translationEN: 'get ready', translationRU: 'готовиться', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammarMedial']},
    {id: 318, present: 'ετοιμάζω', future: 'θα ετοιμάσω', aorist: 'ετοίμασα', imperative: 'ετοίμασε / ετοιμάστε', translationEN: 'prepare', translationRU: 'готовить, подготавливать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 319, present: 'ευλογώ', future: 'θα ευλογήσω', aorist: 'ευλόγησα', imperative: 'ευλόγησε / ευλογήστε', translationEN: 'bless', translationRU: 'благословлять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 320, present: 'ευχαριστιέμαι', future: 'θα ευχαριστηθώ', aorist: 'ευχαριστήθηκα', imperative: null, translationEN: 'enjoy, take pleasure', translationRU: 'получать удовольствие', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
    {id: 321, present: 'ευχαριστώ', future: 'θα ευχαριστήσω', aorist: 'ευχαρίστησα', imperative: 'ευχαρίστησε / ευχαριστήστε', translationEN: 'thank, please', translationRU: 'благодарить, радовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 322, present: 'εύχομαι', future: 'θα ευχηθώ', aorist: 'ευχήθηκα', imperative: 'ευχήσου / ευχηθείτε', translationEN: 'wish', translationRU: 'желать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 323, present: 'εφαρμόζω', future: 'θα εφαρμόσω', aorist: 'εφάρμοσα', imperative: 'εφάρμοσε / εφαρμόστε', translationEN: 'apply, fit', translationRU: 'применять, подходить по размеру', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 324, present: 'εφευρίσκω', future: 'θα εφεύρω', aorist: 'εφηύρα', imperative: null, translationEN: 'invent', translationRU: 'изобретать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 325, present: 'εφοδιάζω', future: 'θα εφοδιάσω', aorist: 'εφοδίασα', imperative: 'εφοδίασε / εφοδιάστε', translationEN: 'supply', translationRU: 'снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 326, present: 'έχω', future: null, aorist: 'είχα', imperative: 'έχε / έχετε', translationEN: 'have', translationRU: 'иметь', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 327, present: 'ζαλίζω', future: 'θα ζαλίσω', aorist: 'ζάλισα', imperative: 'ζάλισε / ζαλίστε', translationEN: 'make dizzy', translationRU: 'кружить голову', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 328, present: 'ζεσταίνω', future: 'θα ζεστάνω', aorist: 'ζέστανα', imperative: 'ζέστανε / ζεστάνετε', translationEN: 'warm up', translationRU: 'греть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 329, present: 'ζηλεύω', future: 'θα ζηλέψω', aorist: 'ζήλεψα', imperative: 'ζήλεψε / ζηλέψτε', translationEN: 'be jealous, envy', translationRU: 'ревновать, завидовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 330, present: 'ζητώ', future: 'θα ζητήσω', aorist: 'ζήτησα', imperative: 'ζήτησε / ζητήστε', translationEN: 'ask for, request', translationRU: 'просить, требовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 331, present: 'ζορίζω', future: 'θα ζορίσω', aorist: 'ζόρισα', imperative: 'ζόρισε / ζορίστε', translationEN: 'strain, pressure', translationRU: 'давить, напрягать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 332, present: 'ζουλώ', future: 'θα ζουλήξω', aorist: 'ζούληξα', imperative: 'ζούληξε / ζουλήξτε', translationEN: 'squeeze', translationRU: 'давить, сжимать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 333, present: 'ζυγίζω', future: 'θα ζυγίσω', aorist: 'ζύγισα', imperative: 'ζύγισε / ζυγίστε', translationEN: 'weigh', translationRU: 'взвешивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 334, present: 'ζυμώνω', future: 'θα ζυμώσω', aorist: 'ζύμωσα', imperative: 'ζύμωσε / ζυμώστε', translationEN: 'knead', translationRU: 'месить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 335, present: 'ζω', future: 'θα ζήσω', aorist: 'έζησα', imperative: 'ζήσε / ζήστε', translationEN: 'live', translationRU: 'жить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 336, present: 'ζωγραφίζω', future: 'θα ζωγραφίσω', aorist: 'ζωγράφισα', imperative: 'ζωγράφισε / ζωγραφίστε', translationEN: 'paint, draw', translationRU: 'рисовать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 337, present: 'ηρεμώ', future: 'θα ηρεμήσω', aorist: 'ηρέμησα', imperative: 'ηρέμησε / ηρεμήστε', translationEN: 'calm down', translationRU: 'успокаиваться', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 338, present: 'ησυχάζω', future: 'θα ησυχάσω', aorist: 'ησύχασα', imperative: 'ησύχασε / ησυχάστε', translationEN: 'quiet down', translationRU: 'затихать, успокаиваться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 339, present: 'ηχώ', future: 'θα ηχήσω', aorist: 'ήχησα', imperative: null, translationEN: 'sound, resound', translationRU: 'звучать, раздаваться', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 340, present: 'θάβω', future: 'θα θάψω', aorist: 'έθαψα', imperative: 'θάψε / θάψτε', translationEN: 'bury', translationRU: 'хоронить, зарывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 341, present: 'θαμπώνω', future: 'θα θαμπώσω', aorist: 'θάμπωσα', imperative: 'θάμπωσε / θαμπώστε', translationEN: 'dazzle, blur', translationRU: 'слепить, затуманивать', lexicalCategory: ['lexicalSense','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 342, present: 'θαρρώ', future: 'θα θαρρέψω', aorist: 'θάρρεψα', imperative: null, translationEN: 'think, believe', translationRU: 'полагать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 343, present: 'θαυμάζω', future: 'θα θαυμάσω', aorist: 'θαύμασα', imperative: 'θαύμασε / θαυμάστε', translationEN: 'admire', translationRU: 'восхищаться', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 344, present: 'θέλω', future: 'θα θελήσω', aorist: 'θέλησα', imperative: null, translationEN: 'want', translationRU: 'хотеть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 345, present: 'θεμελιώνω', future: 'θα θεμελιώσω', aorist: 'θεμελίωσα', imperative: 'θεμελίωσε / θεμελιώστε', translationEN: 'found, establish', translationRU: 'закладывать, обосновывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 346, present: 'θεραπεύομαι', future: 'θα θεραπευτώ', aorist: 'θεραπεύτηκα', imperative: 'θεραπεύσου / θεραπευτείτε', translationEN: 'be cured, undergo treatment', translationRU: 'лечиться', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammarMedial']},
    {id: 347, present: 'θεραπεύω', future: 'θα θεραπεύσω', aorist: 'θεράπευσα', imperative: 'θεράπευσε / θεραπεύστε', translationEN: 'cure, treat', translationRU: 'лечить', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 348, present: 'θερίζω', future: 'θα θερίσω', aorist: 'θέρισα', imperative: 'θέρισε / θερίστε', translationEN: 'reap', translationRU: 'жать, косить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 349, present: 'θερμαίνω', future: 'θα θερμάνω', aorist: 'θέρμανα', imperative: 'θέρμανε / θερμάνετε', translationEN: 'heat', translationRU: 'нагревать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 350, present: 'θέτω', future: 'θα θέσω', aorist: 'έθεσα', imperative: 'θέσε / θέστε', translationEN: 'put, set, pose', translationRU: 'ставить, полагать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 351, present: 'θεωρώ', future: 'θα θεωρήσω', aorist: 'θεώρησα', imperative: 'θεώρησε / θεωρήστε', translationEN: 'consider', translationRU: 'считать, рассматривать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 352, present: 'θίγω', future: 'θα θίξω', aorist: 'έθιξα', imperative: 'θίξε / θίξτε', translationEN: 'touch upon, offend', translationRU: 'затрагивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 353, present: 'θρέφω', future: 'θα θρέψω', aorist: 'έθρεψα', imperative: 'θρέψε / θρέψτε', translationEN: 'feed, nourish', translationRU: 'кормить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 354, present: 'θρηνώ', future: 'θα θρηνήσω', aorist: 'θρήνησα', imperative: 'θρήνησε / θρηνήστε', translationEN: 'mourn', translationRU: 'оплакивать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 355, present: 'θυμάμαι', future: 'θα θυμηθώ', aorist: 'θυμήθηκα', imperative: 'θυμήσου / θυμηθείτε', translationEN: 'remember', translationRU: 'помнить, вспоминать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammarMedial']},
    {id: 356, present: 'θυμώνω', future: 'θα θυμώσω', aorist: 'θύμωσα', imperative: 'θύμωσε / θυμώστε', translationEN: 'anger; get angry', translationRU: 'сердить; сердиться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 357, present: 'θυσιάζω', future: 'θα θυσιάσω', aorist: 'θυσίασα', imperative: 'θυσίασε / θυσιάστε', translationEN: 'sacrifice', translationRU: 'жертвовать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 358, present: 'ιδρύω', future: 'θα ιδρύσω', aorist: 'ίδρυσα', imperative: 'ίδρυσε / ιδρύστε', translationEN: 'found', translationRU: 'основывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 359, present: 'ιδρώνω', future: 'θα ιδρώσω', aorist: 'ίδρωσα', imperative: null, translationEN: 'sweat', translationRU: 'потеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 360, present: 'ικανοποιώ', future: 'θα ικανοποιήσω', aorist: 'ικανοποίησα', imperative: 'ικανοποίησε / ικανοποιήστε', translationEN: 'satisfy', translationRU: 'удовлетворять', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 361, present: 'ισχύω', future: 'θα ισχύσω', aorist: 'ίσχυσα', imperative: null, translationEN: 'be valid', translationRU: 'действовать, быть в силе', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 362, present: 'καθαρίζω', future: 'θα καθαρίσω', aorist: 'καθάρισα', imperative: 'καθάρισε / καθαρίστε', translationEN: 'clean', translationRU: 'чистить, убирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 363, present: 'καθιστώ', future: 'θα καταστήσω', aorist: 'κατέστησα', imperative: 'κατάστησε / καταστήστε', translationEN: 'render, make', translationRU: 'делать (каким-л.)', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 364, present: 'κάθομαι', future: 'θα κάτσω', aorist: 'κάθισα', imperative: 'κάτσε / κάτσετε', translationEN: 'sit', translationRU: 'сидеть, садиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 365, present: 'καθορίζω', future: 'θα καθορίσω', aorist: 'καθόρισα', imperative: 'καθόρισε / καθορίστε', translationEN: 'determine, set', translationRU: 'определять, устанавливать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 366, present: 'καθυστερώ', future: 'θα καθυστερήσω', aorist: 'καθυστέρησα', imperative: 'καθυστέρησε / καθυστερήστε', translationEN: 'delay', translationRU: 'задерживать, опаздывать', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 367, present: 'καίω', future: 'θα κάψω', aorist: 'έκαψα', imperative: 'κάψε / κάψτε', translationEN: 'burn', translationRU: 'жечь', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 368, present: 'καλλιεργώ', future: 'θα καλλιεργήσω', aorist: 'καλλιέργησα', imperative: 'καλλιέργησε / καλλιεργήστε', translationEN: 'cultivate', translationRU: 'выращивать, культивировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 369, present: 'καλύπτω', future: 'θα καλύψω', aorist: 'κάλυψα', imperative: 'κάλυψε / καλύψτε', translationEN: 'cover', translationRU: 'покрывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 370, present: 'καλώ', future: 'θα καλέσω', aorist: 'κάλεσα', imperative: 'κάλεσε / καλέστε', translationEN: 'call, invite', translationRU: 'звать, приглашать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 371, present: 'καλωσορίζω', future: 'θα καλωσορίσω', aorist: 'καλωσόρισα', imperative: 'καλωσόρισε / καλωσορίστε', translationEN: 'welcome', translationRU: 'приветствовать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 372, present: 'καμαρώνω', future: 'θα καμαρώσω', aorist: 'καμάρωσα', imperative: 'καμάρωσε / καμαρώστε', translationEN: 'be proud, admire', translationRU: 'гордиться, любоваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 373, present: 'κάμπτω', future: 'θα κάμψω', aorist: 'έκαμψα', imperative: 'κάμψε / κάμψτε', translationEN: 'bend, bow, break (resistance)', translationRU: 'сгибать, ломать (сопротивление)', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 374, present: 'κανονίζω', future: 'θα κανονίσω', aorist: 'κανόνισα', imperative: 'κανόνισε / κανονίστε', translationEN: 'arrange', translationRU: 'устраивать, улаживать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 375, present: 'κάνω', future: null, aorist: 'έκανα', imperative: 'κάνε / κάντε', translationEN: 'do, make', translationRU: 'делать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 376, present: 'καπνίζω', future: 'θα καπνίσω', aorist: 'κάπνισα', imperative: 'κάπνισε / καπνίστε', translationEN: 'smoke', translationRU: 'курить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 377, present: 'καρφώνω', future: 'θα καρφώσω', aorist: 'κάρφωσα', imperative: 'κάρφωσε / καρφώστε', translationEN: 'nail', translationRU: 'забивать (гвоздь)', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 378, present: 'καταγγέλλω', future: 'θα καταγγείλω', aorist: 'κατήγγειλα', imperative: 'κατάγγειλε / καταγγείλετε', translationEN: 'report, denounce', translationRU: 'заявлять, обвинять', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 379, present: 'καταγράφω', future: 'θα καταγράψω', aorist: 'κατέγραψα', imperative: 'κατάγραψε / καταγράψτε', translationEN: 'record, list', translationRU: 'записывать, регистрировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 380, present: 'καταδικάζω', future: 'θα καταδικάσω', aorist: 'καταδίκασα', imperative: 'καταδίκασε / καταδικάστε', translationEN: 'condemn, sentence', translationRU: 'осуждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 381, present: 'καταθέτω', future: 'θα καταθέσω', aorist: 'κατέθεσα', imperative: 'κατάθεσε / καταθέστε', translationEN: 'deposit, testify', translationRU: 'вносить, давать показания', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 382, present: 'κατακρίνω', future: null, aorist: 'κατέκρινα', imperative: 'κατάκρινε / κατακρίνετε', translationEN: 'criticize, condemn', translationRU: 'осуждать, критиковать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 383, present: 'κατακτώ', future: 'θα κατακτήσω', aorist: 'κατέκτησα', imperative: 'κατάκτησε / κατακτήστε', translationEN: 'conquer', translationRU: 'завоёвывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 384, present: 'καταλαβαίνω', future: 'θα καταλάβω', aorist: 'κατάλαβα', imperative: 'κατάλαβε / καταλάβετε', translationEN: 'understand', translationRU: 'понимать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 385, present: 'καταλαμβάνω', future: 'θα καταλάβω', aorist: 'κατέλαβα', imperative: 'κατάλαβε / καταλάβετε', translationEN: 'occupy, seize', translationRU: 'занимать, захватывать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 386, present: 'καταλήγω', future: 'θα καταλήξω', aorist: 'κατέληξα', imperative: 'κατάληξε / καταλήξτε', translationEN: 'end up', translationRU: 'заканчиваться, приходить к', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 387, present: 'καταναλώνω', future: 'θα καταναλώσω', aorist: 'κατανάλωσα', imperative: 'κατανάλωσε / καταναλώστε', translationEN: 'consume', translationRU: 'потреблять', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 388, present: 'καταπίνω', future: 'θα καταπιώ', aorist: 'κατάπια', imperative: 'κατάπιε / καταπιείτε', translationEN: 'swallow', translationRU: 'глотать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 389, present: 'καταπολεμώ', future: 'θα καταπολεμήσω', aorist: 'καταπολέμησα', imperative: 'καταπολέμησε / καταπολεμήστε', translationEN: 'combat', translationRU: 'бороться с', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 390, present: 'καταργώ', future: 'θα καταργήσω', aorist: 'κατήργησα', imperative: 'κατάργησε / καταργήστε', translationEN: 'abolish', translationRU: 'отменять, упразднять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 391, present: 'κατασκευάζω', future: 'θα κατασκευάσω', aorist: 'κατασκεύασα', imperative: 'κατασκεύασε / κατασκευάστε', translationEN: 'build, construct', translationRU: 'строить, изготавливать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 392, present: 'καταστρέφω', future: 'θα καταστρέψω', aorist: 'κατέστρεψα', imperative: 'κατάστρεψε / καταστρέψτε', translationEN: 'destroy', translationRU: 'разрушать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 393, present: 'καταφέρνω', future: 'θα καταφέρω', aorist: 'κατάφερα', imperative: 'κατάφερε / καταφέρετε', translationEN: 'manage, succeed', translationRU: 'суметь, добиться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 394, present: 'καταφεύγω', future: 'θα καταφύγω', aorist: 'κατέφυγα', imperative: null, translationEN: 'take refuge, resort', translationRU: 'прибегать, укрываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 395, present: 'καταχωρώ', future: 'θα καταχωρήσω', aorist: 'καταχώρησα', imperative: 'καταχώρησε / καταχωρήστε', translationEN: 'register, enter', translationRU: 'регистрировать, заносить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 396, present: 'κατεβάζω', future: 'θα κατεβάσω', aorist: 'κατέβασα', imperative: 'κατέβασε / κατεβάστε', translationEN: 'take down, download', translationRU: 'снимать, скачивать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 397, present: 'κατεβαίνω', future: 'θα κατέβω', aorist: 'κατέβηκα', imperative: 'κατέβα / κατεβείτε', translationEN: 'go down', translationRU: 'спускаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 398, present: 'κατέχω', future: null, aorist: 'κατείχα', imperative: null, translationEN: 'possess, know well', translationRU: 'владеть, разбираться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 399, present: 'κατηγορώ', future: 'θα κατηγορήσω', aorist: 'κατηγόρησα', imperative: 'κατηγόρησε / κατηγορήστε', translationEN: 'accuse', translationRU: 'обвинять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 400, present: 'κατοικώ', future: 'θα κατοικήσω', aorist: 'κατοίκησα', imperative: null, translationEN: 'reside', translationRU: 'проживать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 401, present: 'κεντώ', future: 'θα κεντήσω', aorist: 'κέντησα', imperative: 'κέντησε / κεντήστε', translationEN: 'embroider, sting', translationRU: 'вышивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 402, present: 'κερδίζω', future: 'θα κερδίσω', aorist: 'κέρδισα', imperative: 'κέρδισε / κερδίστε', translationEN: 'win, earn', translationRU: 'выигрывать, зарабатывать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 403, present: 'κερνώ', future: 'θα κεράσω', aorist: 'κέρασα', imperative: 'κέρασε / κεράστε', translationEN: 'treat, offer', translationRU: 'угощать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 404, present: 'κηρύσσω', future: 'θα κηρύξω', aorist: 'κήρυξα', imperative: 'κήρυξε / κηρύξτε', translationEN: 'declare, preach', translationRU: 'провозглашать, проповедовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 405, present: 'κινδυνεύω', future: 'θα κινδυνεύσω', aorist: 'κινδύνεψα', imperative: 'κινδύνεψε / κινδυνέψτε', translationEN: 'be in danger, risk', translationRU: 'рисковать, находиться в опасности', lexicalCategory: ['lexicalState','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 406, present: 'κινούμαι', future: 'θα κινηθώ', aorist: 'κινήθηκα', imperative: 'κινήσου / κινηθείτε', translationEN: 'move', translationRU: 'двигаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 407, present: 'κινώ', future: 'θα κινήσω', aorist: 'κίνησα', imperative: 'κίνησε / κινήστε', translationEN: 'set in motion', translationRU: 'приводить в движение', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 408, present: 'κλαίγομαι', future: 'θα κλαφτώ', aorist: 'κλάφτηκα', imperative: 'κλάψου / κλαφτείτε', translationEN: 'complain, lament', translationRU: 'жаловаться, плакаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 409, present: 'κλαίω', future: 'θα κλάψω', aorist: 'έκλαψα', imperative: 'κλάψε / κλάψτε', translationEN: 'cry', translationRU: 'плакать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 410, present: 'κλέβω', future: 'θα κλέψω', aorist: 'έκλεψα', imperative: 'κλέψε / κλέψτε', translationEN: 'steal', translationRU: 'красть', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 411, present: 'κλείνω', future: 'θα κλείσω', aorist: 'έκλεισα', imperative: 'κλείσε / κλείστε', translationEN: 'close, book', translationRU: 'закрывать, бронировать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 412, present: 'κληρονομώ', future: 'θα κληρονομήσω', aorist: 'κληρονόμησα', imperative: 'κληρονόμησε / κληρονομήστε', translationEN: 'inherit', translationRU: 'наследовать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 413, present: 'κλίνω', future: 'θα κλίνω', aorist: 'έκλινα', imperative: 'κλίνε / κλίνετε', translationEN: 'lean, incline, decline (grammar)', translationRU: 'наклонять, склонять', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 414, present: 'κλωτσώ', future: 'θα κλωτσήσω', aorist: 'κλώτσησα', imperative: 'κλώτσησε / κλωτσήστε', translationEN: 'kick', translationRU: 'пинать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 415, present: 'κόβω', future: 'θα κόψω', aorist: 'έκοψα', imperative: 'κόψε / κόψτε', translationEN: 'cut', translationRU: 'резать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 416, present: 'κοιμάμαι', future: 'θα κοιμηθώ', aorist: 'κοιμήθηκα', imperative: 'κοιμήσου / κοιμηθείτε', translationEN: 'sleep', translationRU: 'спать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
    {id: 417, present: 'κοιτάζω', future: 'θα κοιτάξω', aorist: 'κοίταξα', imperative: 'κοίταξε / κοιτάξτε', translationEN: 'look', translationRU: 'смотреть', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 418, present: 'κοκκινίζω', future: 'θα κοκκινίσω', aorist: 'κοκκίνισα', imperative: 'κοκκίνισε / κοκκινίστε', translationEN: 'redden, blush', translationRU: 'краснеть', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 419, present: 'κολακεύω', future: 'θα κολακέψω', aorist: 'κολάκεψα', imperative: 'κολάκεψε / κολακέψτε', translationEN: 'flatter', translationRU: 'льстить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 420, present: 'κολλώ', future: 'θα κολλήσω', aorist: 'κόλλησα', imperative: 'κόλλησε / κολλήστε', translationEN: 'stick, glue', translationRU: 'клеить, прилипать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 421, present: 'κολυμπώ', future: 'θα κολυμπήσω', aorist: 'κολύμπησα', imperative: 'κολύμπησε / κολυμπήστε', translationEN: 'swim', translationRU: 'плавать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 422, present: 'κομματιάζω', future: 'θα κομματιάσω', aorist: 'κομμάτιασα', imperative: 'κομμάτιασε / κομματιάστε', translationEN: 'tear to pieces', translationRU: 'рвать на куски', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 423, present: 'κοντεύω', future: 'θα κοντέψω', aorist: 'κόντεψα', imperative: null, translationEN: 'be about to, approach', translationRU: 'почти, приближаться', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 424, present: 'κοπιάζω', future: 'θα κοπιάσω', aorist: 'κόπιασα', imperative: 'κόπιασε / κοπιάστε', translationEN: 'toil; (polite) come', translationRU: 'трудиться; пожалуйте', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 425, present: 'κοροϊδεύω', future: 'θα κοροϊδέψω', aorist: 'κορόιδεψα', imperative: 'κορόιδεψε / κοροϊδέψτε', translationEN: 'mock, fool', translationRU: 'дразнить, обманывать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 426, present: 'κοστίζω', future: 'θα κοστίσω', aorist: 'κόστισα', imperative: null, translationEN: 'cost', translationRU: 'стоить', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 427, present: 'κουβαλώ', future: 'θα κουβαλήσω', aorist: 'κουβάλησα', imperative: 'κουβάλησε / κουβαλήστε', translationEN: 'carry', translationRU: 'таскать, носить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 428, present: 'κουβεντιάζω', future: 'θα κουβεντιάσω', aorist: 'κουβέντιασα', imperative: 'κουβέντιασε / κουβεντιάστε', translationEN: 'chat', translationRU: 'беседовать, болтать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 429, present: 'κουνώ', future: 'θα κουνήσω', aorist: 'κούνησα', imperative: 'κούνησε / κουνήστε', translationEN: 'shake, move', translationRU: 'трясти, двигать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 430, present: 'κουράζομαι', future: 'θα κουραστώ', aorist: 'κουράστηκα', imperative: 'κουράσου / κουραστείτε', translationEN: 'get tired', translationRU: 'уставать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 431, present: 'κουράζω', future: 'θα κουράσω', aorist: 'κούρασα', imperative: 'κούρασε / κουράστε', translationEN: 'tire', translationRU: 'утомлять', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 432, present: 'κουρεύω', future: 'θα κουρέψω', aorist: 'κούρεψα', imperative: 'κούρεψε / κουρέψτε', translationEN: 'cut hair, mow', translationRU: 'стричь', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 433, present: 'κρατιέμαι', future: 'θα κρατηθώ', aorist: 'κρατήθηκα', imperative: 'κρατήσου / κρατηθείτε', translationEN: 'hold on, restrain oneself', translationRU: 'держаться, сдерживаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 434, present: 'κρατώ', future: 'θα κρατήσω', aorist: 'κράτησα', imperative: 'κράτησε / κρατήστε', translationEN: 'hold, keep', translationRU: 'держать, хранить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 435, present: 'κραυγάζω', future: 'θα κραυγάσω', aorist: 'κραύγασα', imperative: 'κραύγασε / κραυγάστε', translationEN: 'shout', translationRU: 'кричать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 436, present: 'κρεμώ', future: 'θα κρεμάσω', aorist: 'κρέμασα', imperative: 'κρέμασε / κρεμάστε', translationEN: 'hang', translationRU: 'вешать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 437, present: 'κρίνω', future: null, aorist: 'έκρινα', imperative: 'κρίνε / κρίνετε', translationEN: 'judge', translationRU: 'судить, оценивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 438, present: 'κριτικάρω', future: null, aorist: 'κριτίκαρα', imperative: 'κριτίκαρε / κριτικάρετε', translationEN: 'criticize', translationRU: 'критиковать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 439, present: 'κρύβομαι', future: 'θα κρυφτώ', aorist: 'κρύφτηκα', imperative: 'κρύψου / κρυφτείτε', translationEN: 'hide (oneself)', translationRU: 'прятаться', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 440, present: 'κρύβω', future: 'θα κρύψω', aorist: 'έκρυψα', imperative: 'κρύψε / κρύψτε', translationEN: 'hide', translationRU: 'прятать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 441, present: 'κρυώνω', future: 'θα κρυώσω', aorist: 'κρύωσα', imperative: null, translationEN: 'be cold, catch cold', translationRU: 'мёрзнуть, простужаться', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 442, present: 'κτίζω', future: 'θα κτίσω', aorist: 'έκτισα', imperative: 'κτίσε / κτίστε', translationEN: 'build', translationRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 443, present: 'κυβερνώ', future: 'θα κυβερνήσω', aorist: 'κυβέρνησα', imperative: 'κυβέρνησε / κυβερνήστε', translationEN: 'govern', translationRU: 'управлять, править', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 444, present: 'κυκλοφορώ', future: 'θα κυκλοφορήσω', aorist: 'κυκλοφόρησα', imperative: 'κυκλοφόρησε / κυκλοφορήστε', translationEN: 'circulate, release', translationRU: 'циркулировать, выпускать', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 445, present: 'κυλώ', future: 'θα κυλήσω', aorist: 'κύλησα', imperative: 'κύλησε / κυλήστε', translationEN: 'roll', translationRU: 'катить, катиться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 446, present: 'κυνηγώ', future: 'θα κυνηγήσω', aorist: 'κυνήγησα', imperative: 'κυνήγησε / κυνηγήστε', translationEN: 'hunt, chase', translationRU: 'охотиться, преследовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 447, present: 'λαδώνω', future: 'θα λαδώσω', aorist: 'λάδωσα', imperative: 'λάδωσε / λαδώστε', translationEN: 'grease, bribe', translationRU: 'смазывать, подкупать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 448, present: 'λαμβάνω', future: 'θα λάβω', aorist: 'έλαβα', imperative: 'λάβε / λάβετε', translationEN: 'receive, take', translationRU: 'получать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 449, present: 'λάμπω', future: 'θα λάμψω', aorist: 'έλαμψα', imperative: 'λάμψε / λάμψτε', translationEN: 'shine', translationRU: 'сиять, блестеть', lexicalCategory: ['lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 450, present: 'λατρεύω', future: 'θα λατρέψω', aorist: 'λάτρεψα', imperative: 'λάτρεψε / λατρέψτε', translationEN: 'adore', translationRU: 'обожать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 451, present: 'λαχταρώ', future: 'θα λαχταρήσω', aorist: 'λαχτάρησα', imperative: null, translationEN: 'long for', translationRU: 'страстно желать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 452, present: 'λείπω', future: 'θα λείψω', aorist: 'έλειψα', imperative: null, translationEN: 'be absent, be missing', translationRU: 'отсутствовать, не хватать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 453, present: 'λειτουργώ', future: 'θα λειτουργήσω', aorist: 'λειτούργησα', imperative: 'λειτούργησε / λειτουργήστε', translationEN: 'operate, function', translationRU: 'работать, функционировать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 454, present: 'λερώνω', future: 'θα λερώσω', aorist: 'λέρωσα', imperative: 'λέρωσε / λερώστε', translationEN: 'dirty', translationRU: 'пачкать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 455, present: 'λευκαίνω', future: 'θα λευκάνω', aorist: 'λεύκανα', imperative: 'λεύκανε / λευκάνετε', translationEN: 'whiten', translationRU: 'отбеливать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 456, present: 'λέω', future: 'θα πω', aorist: 'είπα', imperative: 'πες / πείτε', translationEN: 'say, tell', translationRU: 'говорить, сказать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 457, present: 'λησμονώ', future: 'θα λησμονήσω', aorist: 'λησμόνησα', imperative: 'λησμόνησε / λησμονήστε', translationEN: 'forget', translationRU: 'забывать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 458, present: 'λιγοστεύω', future: 'θα λιγοστέψω', aorist: 'λιγόστεψα', imperative: 'λιγόστεψε / λιγοστέψτε', translationEN: 'diminish', translationRU: 'убавлять, убывать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 459, present: 'λιγώνω', future: 'θα λιγώσω', aorist: 'λίγωσα', imperative: null, translationEN: 'make faint, make queasy', translationRU: 'вызывать слабость, тошноту', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 460, present: 'λιποθυμώ', future: 'θα λιποθυμήσω', aorist: 'λιποθύμησα', imperative: null, translationEN: 'faint', translationRU: 'падать в обморок', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 461, present: 'λιώνω', future: 'θα λιώσω', aorist: 'έλιωσα', imperative: 'λιώσε / λιώστε', translationEN: 'melt, crush', translationRU: 'таять, растирать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 462, present: 'λογαριάζω', future: 'θα λογαριάσω', aorist: 'λογάριασα', imperative: 'λογάριασε / λογαριάστε', translationEN: 'calculate, reckon', translationRU: 'считать, учитывать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 463, present: 'λούζομαι', future: 'θα λουστώ', aorist: 'λούστηκα', imperative: 'λούσου / λουστείτε', translationEN: 'wash one\'s hair', translationRU: 'мыть голову', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 464, present: 'λούζω', future: 'θα λούσω', aorist: 'έλουσα', imperative: 'λούσε / λούστε', translationEN: 'wash (hair)', translationRU: 'мыть (голову)', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 465, present: 'λυγίζω', future: 'θα λυγίσω', aorist: 'λύγισα', imperative: 'λύγισε / λυγίστε', translationEN: 'bend', translationRU: 'гнуть, сгибаться', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 466, present: 'λύνω', future: 'θα λύσω', aorist: 'έλυσα', imperative: 'λύσε / λύστε', translationEN: 'solve, untie', translationRU: 'решать, развязывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 467, present: 'λυπάμαι', future: 'θα λυπηθώ', aorist: 'λυπήθηκα', imperative: 'λυπήσου / λυπηθείτε', translationEN: 'be sorry, pity', translationRU: 'сожалеть, жалеть', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 468, present: 'λυπώ', future: 'θα λυπήσω', aorist: 'λύπησα', imperative: 'λύπησε / λυπήστε', translationEN: 'sadden', translationRU: 'огорчать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 469, present: 'λυτρώνω', future: 'θα λυτρώσω', aorist: 'λύτρωσα', imperative: 'λύτρωσε / λυτρώστε', translationEN: 'redeem, deliver', translationRU: 'избавлять, спасать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 470, present: 'μαγειρεύω', future: 'θα μαγειρέψω', aorist: 'μαγείρεψα', imperative: 'μαγείρεψε / μαγειρέψτε', translationEN: 'cook', translationRU: 'готовить (еду)', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 471, present: 'μαγεύω', future: 'θα μαγέψω', aorist: 'μάγεψα', imperative: 'μάγεψε / μαγέψτε', translationEN: 'bewitch', translationRU: 'очаровывать', lexicalCategory: ['lexicalInfluence','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 472, present: 'μαζεύω', future: 'θα μαζέψω', aorist: 'μάζεψα', imperative: 'μάζεψε / μαζέψτε', translationEN: 'gather, collect', translationRU: 'собирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 473, present: 'μαθαίνω', future: 'θα μάθω', aorist: 'έμαθα', imperative: 'μάθε / μάθετε', translationEN: 'learn, teach', translationRU: 'учить, узнавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 474, present: 'μακραίνω', future: 'θα μακρύνω', aorist: 'μάκρυνα', imperative: 'μάκρυνε / μακρύνετε', translationEN: 'lengthen', translationRU: 'удлинять', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 475, present: 'μαλακώνω', future: 'θα μαλακώσω', aorist: 'μαλάκωσα', imperative: 'μαλάκωσε / μαλακώστε', translationEN: 'soften', translationRU: 'смягчать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 476, present: 'μαλώνω', future: 'θα μαλώσω', aorist: 'μάλωσα', imperative: 'μάλωσε / μαλώστε', translationEN: 'scold, quarrel', translationRU: 'ругать, ссориться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 477, present: 'μαντεύω', future: 'θα μαντέψω', aorist: 'μάντεψα', imperative: 'μάντεψε / μαντέψτε', translationEN: 'guess', translationRU: 'угадывать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 478, present: 'μαρτυρώ', future: 'θα μαρτυρήσω', aorist: 'μαρτύρησα', imperative: 'μαρτύρησε / μαρτυρήστε', translationEN: 'testify, betray', translationRU: 'свидетельствовать, выдавать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 479, present: 'μασώ', future: 'θα μασήσω', aorist: 'μάσησα', imperative: 'μάσησε / μασήστε', translationEN: 'chew', translationRU: 'жевать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 480, present: 'ματαιώνω', future: 'θα ματαιώσω', aorist: 'ματαίωσα', imperative: 'ματαίωσε / ματαιώστε', translationEN: 'frustrate, call off', translationRU: 'срывать, отменять', lexicalCategory: ['lexicalInfluence','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 481, present: 'μαυρίζω', future: 'θα μαυρίσω', aorist: 'μαύρισα', imperative: 'μαύρισε / μαυρίστε', translationEN: 'blacken, tan', translationRU: 'чернить, загорать', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 482, present: 'μάχομαι', future: 'θα μαχηθώ', aorist: 'μαχήθηκα', imperative: 'μαχήσου / μαχηθείτε', translationEN: 'fight', translationRU: 'сражаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 483, present: 'μεγαλώνω', future: 'θα μεγαλώσω', aorist: 'μεγάλωσα', imperative: 'μεγάλωσε / μεγαλώστε', translationEN: 'grow, raise', translationRU: 'расти, растить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 484, present: 'μεθώ', future: 'θα μεθύσω', aorist: 'μέθυσα', imperative: null, translationEN: 'get drunk', translationRU: 'напиваться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 485, present: 'μειώνω', future: 'θα μειώσω', aorist: 'μείωσα', imperative: 'μείωσε / μειώστε', translationEN: 'reduce', translationRU: 'уменьшать', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 486, present: 'μελετώ', future: 'θα μελετήσω', aorist: 'μελέτησα', imperative: 'μελέτησε / μελετήστε', translationEN: 'study', translationRU: 'изучать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 487, present: 'μένω', future: 'θα μείνω', aorist: 'έμεινα', imperative: 'μείνε / μείνετε', translationEN: 'stay, live', translationRU: 'оставаться, жить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 488, present: 'μεταβάλλω', future: 'θα μεταβάλω', aorist: 'μετέβαλα', imperative: 'μετάβαλε / μεταβάλετε', translationEN: 'change, alter', translationRU: 'изменять', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 489, present: 'μεταδίδω', future: 'θα μεταδώσω', aorist: 'μετέδωσα', imperative: 'μετάδωσε / μεταδώστε', translationEN: 'transmit, broadcast', translationRU: 'передавать, транслировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 490, present: 'μετακινούμαι', future: 'θα μετακινηθώ', aorist: 'μετακινήθηκα', imperative: 'μετακινήσου / μετακινηθείτε', translationEN: 'move around, travel', translationRU: 'перемещаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 491, present: 'μετακινώ', future: 'θα μετακινήσω', aorist: 'μετακίνησα', imperative: 'μετακίνησε / μετακινήστε', translationEN: 'move, shift', translationRU: 'перемещать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 492, present: 'μεταναστεύω', future: 'θα μεταναστεύσω', aorist: 'μετανάστευσα', imperative: 'μετανάστευσε / μεταναστεύστε', translationEN: 'emigrate', translationRU: 'эмигрировать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 493, present: 'μετανιώνω', future: 'θα μετανιώσω', aorist: 'μετάνιωσα', imperative: 'μετάνιωσε / μετανιώστε', translationEN: 'regret', translationRU: 'сожалеть, раскаиваться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 494, present: 'μετατρέπω', future: 'θα μετατρέψω', aorist: 'μετέτρεψα', imperative: 'μετάτρεψε / μετατρέψτε', translationEN: 'convert', translationRU: 'превращать, преобразовывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 495, present: 'μεταφέρω', future: null, aorist: 'μετέφερα', imperative: 'μετάφερε / μεταφέρετε', translationEN: 'transport, carry', translationRU: 'перевозить, переносить', lexicalCategory: ['lexicalMotion','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 496, present: 'μεταφράζω', future: 'θα μεταφράσω', aorist: 'μετέφρασα', imperative: 'μετάφρασε / μεταφράστε', translationEN: 'translation', translationRU: 'переводить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 497, present: 'μεταχειρίζομαι', future: 'θα μεταχειριστώ', aorist: 'μεταχειρίστηκα', imperative: 'μεταχειρίσου / μεταχειριστείτε', translationEN: 'use, treat', translationRU: 'использовать, обращаться', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 498, present: 'μετρώ', future: 'θα μετρήσω', aorist: 'μέτρησα', imperative: 'μέτρησε / μετρήστε', translationEN: 'count, measure', translationRU: 'считать, измерять', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 499, present: 'μηνύω', future: 'θα μηνύσω', aorist: 'μήνυσα', imperative: 'μήνυσε / μηνύστε', translationEN: 'sue', translationRU: 'подавать в суд', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 500, present: 'μιλώ', future: 'θα μιλήσω', aorist: 'μίλησα', imperative: 'μίλησε / μιλήστε', translationEN: 'speak', translationRU: 'говорить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 501, present: 'μιμούμαι', future: 'θα μιμηθώ', aorist: 'μιμήθηκα', imperative: 'μιμήσου / μιμηθείτε', translationEN: 'imitate', translationRU: 'подражать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 502, present: 'μισθώνω', future: 'θα μισθώσω', aorist: 'μίσθωσα', imperative: 'μίσθωσε / μισθώστε', translationEN: 'rent, hire', translationRU: 'арендовать, нанимать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 503, present: 'μισώ', future: 'θα μισήσω', aorist: 'μίσησα', imperative: 'μίσησε / μισήστε', translationEN: 'hate', translationRU: 'ненавидеть', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 504, present: 'μοιάζω', future: 'θα μοιάσω', aorist: 'μοίασα', imperative: null, translationEN: 'resemble', translationRU: 'быть похожим', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 505, present: 'μοιράζομαι', future: 'θα μοιραστώ', aorist: 'μοιράστηκα', imperative: 'μοιράσου / μοιραστείτε', translationEN: 'share', translationRU: 'делиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 506, present: 'μοιράζω', future: 'θα μοιράσω', aorist: 'μοίρασα', imperative: 'μοίρασε / μοιράστε', translationEN: 'distribute, deal', translationRU: 'раздавать, делить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 507, present: 'μολύνω', future: null, aorist: 'μόλυνα', imperative: 'μόλυνε / μολύνετε', translationEN: 'contaminate, infect', translationRU: 'загрязнять, заражать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 508, present: 'μουρμουρίζω', future: 'θα μουρμουρίσω', aorist: 'μουρμούρισα', imperative: 'μουρμούρισε / μουρμουρίστε', translationEN: 'mutter, hum', translationRU: 'бормотать, напевать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 509, present: 'μουσκεύω', future: 'θα μουσκέψω', aorist: 'μούσκεψα', imperative: 'μούσκεψε / μουσκέψτε', translationEN: 'soak', translationRU: 'мочить, вымачивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 510, present: 'μοχθώ', future: 'θα μοχθήσω', aorist: 'μόχθησα', imperative: 'μόχθησε / μοχθήστε', translationEN: 'toil, labor', translationRU: 'трудиться, маяться', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 511, present: 'μπαίνω', future: 'θα μπω', aorist: 'μπήκα', imperative: 'μπες / μπείτε', translationEN: 'enter', translationRU: 'входить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 512, present: 'μπερδεύω', future: 'θα μπερδέψω', aorist: 'μπέρδεψα', imperative: 'μπέρδεψε / μπερδέψτε', translationEN: 'confuse, mix up', translationRU: 'путать', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 513, present: 'μπλέκω', future: 'θα μπλέξω', aorist: 'έμπλεξα', imperative: 'μπλέξε / μπλέξτε', translationEN: 'get tangled, involve', translationRU: 'запутывать, впутываться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 514, present: 'μπορώ', future: 'θα μπορέσω', aorist: 'μπόρεσα', imperative: null, translationEN: 'can, be able', translationRU: 'мочь, уметь', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 515, present: 'μυρίζω', future: 'θα μυρίσω', aorist: 'μύρισα', imperative: 'μύρισε / μυρίστε', translationEN: 'smell', translationRU: 'пахнуть, нюхать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 516, present: 'νανουρίζω', future: 'θα νανουρίσω', aorist: 'νανούρισα', imperative: 'νανούρισε / νανουρίστε', translationEN: 'lull', translationRU: 'убаюкивать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 517, present: 'νερώνω', future: 'θα νερώσω', aorist: 'νέρωσα', imperative: 'νέρωσε / νερώστε', translationEN: 'dilute', translationRU: 'разбавлять', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 518, present: 'νευριάζω', future: 'θα νευριάσω', aorist: 'νεύριασα', imperative: 'νεύριασε / νευριάστε', translationEN: 'get annoyed, irritate', translationRU: 'злиться, раздражать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 519, present: 'νεύω', future: 'θα νεύσω', aorist: 'ένευσα', imperative: null, translationEN: 'nod, beckon', translationRU: 'кивать, делать знак', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 520, present: 'νηστεύω', future: 'θα νηστέψω', aorist: 'νήστεψα', imperative: null, translationEN: 'fast', translationRU: 'поститься', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 521, present: 'νικώ', future: 'θα νικήσω', aorist: 'νίκησα', imperative: 'νίκησε / νικήστε', translationEN: 'win, defeat', translationRU: 'побеждать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 522, present: 'νιώθω', future: 'θα νιώσω', aorist: 'ένιωσα', imperative: 'νιώσε / νιώστε', translationEN: 'feel', translationRU: 'чувствовать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 523, present: 'νοιάζομαι', future: 'θα νοιαστώ', aorist: 'νοιάστηκα', imperative: 'νοιάσου / νοιαστείτε', translationEN: 'care', translationRU: 'заботиться, переживать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 524, present: 'νοικιάζω', future: 'θα νοικιάσω', aorist: 'νοίκιασα', imperative: 'νοίκιασε / νοικιάστε', translationEN: 'rent', translationRU: 'арендовать, снимать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 525, present: 'νομίζω', future: 'θα νομίσω', aorist: 'νόμισα', imperative: null, translationEN: 'think, suppose', translationRU: 'думать, полагать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 526, present: 'νομιμοποιώ', future: 'θα νομιμοποιήσω', aorist: 'νομιμοποίησα', imperative: 'νομιμοποίησε / νομιμοποιήστε', translationEN: 'legalize', translationRU: 'легализовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 527, present: 'νοσηλεύω', future: 'θα νοσηλεύσω', aorist: 'νοσήλευσα', imperative: 'νοσήλευσε / νοσηλεύστε', translationEN: 'nurse, treat', translationRU: 'лечить, ухаживать за больным', lexicalCategory: ['lexicalHealth','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 528, present: 'νοσταλγώ', future: 'θα νοσταλγήσω', aorist: 'νοστάλγησα', imperative: null, translationEN: 'miss, long for', translationRU: 'тосковать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
    {id: 529, present: 'ντύνομαι', future: 'θα ντυθώ', aorist: 'ντύθηκα', imperative: 'ντύσου / ντυθείτε', translationEN: 'get dressed', translationRU: 'одеваться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 530, present: 'ντύνω', future: 'θα ντύσω', aorist: 'έντυσα', imperative: 'ντύσε / ντύστε', translationEN: 'dress (someone)', translationRU: 'одевать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 531, present: 'νυστάζω', future: 'θα νυστάξω', aorist: 'νύσταξα', imperative: null, translationEN: 'be sleepy', translationRU: 'хотеть спать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 532, present: 'νυχτώνω', future: 'θα νυχτώσω', aorist: 'νύχτωσα', imperative: null, translationEN: 'get dark (night falls)', translationRU: 'темнеть, наступать (о ночи)', lexicalCategory: ['lexicalTime','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 533, present: 'ξαναρχίζω', future: 'θα ξαναρχίσω', aorist: 'ξανάρχισα', imperative: 'ξανάρχισε / ξαναρχίστε', translationEN: 'start again', translationRU: 'начинать снова', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 534, present: 'ξαπλώνω', future: 'θα ξαπλώσω', aorist: 'ξάπλωσα', imperative: 'ξάπλωσε / ξαπλώστε', translationEN: 'lie down', translationRU: 'ложиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 535, present: 'ξεγελώ', future: 'θα ξεγελάσω', aorist: 'ξεγέλασα', imperative: 'ξεγέλασε / ξεγελάστε', translationEN: 'deceive, trick', translationRU: 'обманывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 536, present: 'ξεδιψώ', future: 'θα ξεδιψάσω', aorist: 'ξεδίψασα', imperative: null, translationEN: 'quench thirst', translationRU: 'утолять жажду', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 537, present: 'ξεθωριάζω', future: 'θα ξεθωριάσω', aorist: 'ξεθώριασα', imperative: null, translationEN: 'fade', translationRU: 'выцветать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 538, present: 'ξεκαθαρίζω', future: 'θα ξεκαθαρίσω', aorist: 'ξεκαθάρισα', imperative: 'ξεκαθάρισε / ξεκαθαρίστε', translationEN: 'clarify, sort out', translationRU: 'прояснять, улаживать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 539, present: 'ξεκινώ', future: 'θα ξεκινήσω', aorist: 'ξεκίνησα', imperative: 'ξεκίνησε / ξεκινήστε', translationEN: 'start, set off', translationRU: 'начинать, отправляться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 540, present: 'ξεκλειδώνω', future: 'θα ξεκλειδώσω', aorist: 'ξεκλείδωσα', imperative: 'ξεκλείδωσε / ξεκλειδώστε', translationEN: 'unlock', translationRU: 'отпирать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 541, present: 'ξεκολλώ', future: 'θα ξεκολλήσω', aorist: 'ξεκόλλησα', imperative: 'ξεκόλλησε / ξεκολλήστε', translationEN: 'unstick, detach', translationRU: 'отклеивать, отлипать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 542, present: 'ξεκουράζομαι', future: 'θα ξεκουραστώ', aorist: 'ξεκουράστηκα', imperative: 'ξεκουράσου / ξεκουραστείτε', translationEN: 'rest', translationRU: 'отдыхать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 543, present: 'ξεμένω', future: 'θα ξεμείνω', aorist: 'ξέμεινα', imperative: null, translationEN: 'run out of, be stranded', translationRU: 'остаться без, застрять', lexicalCategory: ['lexicalState','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 544, present: 'ξεπερνώ', future: 'θα ξεπεράσω', aorist: 'ξεπέρασα', imperative: 'ξεπέρασε / ξεπεράστε', translationEN: 'surpass, overcome', translationRU: 'превосходить, преодолевать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 545, present: 'ξεπλένω', future: 'θα ξεπλύνω', aorist: 'ξέπλυνα', imperative: 'ξέπλυνε / ξεπλύνετε', translationEN: 'rinse', translationRU: 'полоскать, ополаскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 546, present: 'ξεπουλώ', future: 'θα ξεπουλήσω', aorist: 'ξεπούλησα', imperative: 'ξεπούλησε / ξεπουλήστε', translationEN: 'sell off', translationRU: 'распродавать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 547, present: 'ξερνώ', future: 'θα ξεράσω', aorist: 'ξέρασα', imperative: 'ξέρασε / ξεράστε', translationEN: 'vomit', translationRU: 'рвать (тошнить)', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 548, present: 'ξέρω', future: null, aorist: 'ήξερα', imperative: null, translationEN: 'know', translationRU: 'знать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 549, present: 'ξεσηκώνω', future: 'θα ξεσηκώσω', aorist: 'ξεσήκωσα', imperative: 'ξεσήκωσε / ξεσηκώστε', translationEN: 'rouse, incite', translationRU: 'поднимать, подстрекать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 550, present: 'ξεσκίζω', future: 'θα ξεσκίσω', aorist: 'ξέσκισα', imperative: 'ξέσκισε / ξεσκίστε', translationEN: 'tear up', translationRU: 'разрывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 551, present: 'ξεσκονίζω', future: 'θα ξεσκονίσω', aorist: 'ξεσκόνισα', imperative: 'ξεσκόνισε / ξεσκονίστε', translationEN: 'dust', translationRU: 'вытирать пыль', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 552, present: 'ξεσπώ', future: 'θα ξεσπάσω', aorist: 'ξέσπασα', imperative: 'ξέσπασε / ξεσπάστε', translationEN: 'burst out', translationRU: 'вспыхивать, срываться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 553, present: 'ξετυλίγω', future: 'θα ξετυλίξω', aorist: 'ξετύλιξα', imperative: 'ξετύλιξε / ξετυλίξτε', translationEN: 'unwrap, unroll', translationRU: 'разворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 554, present: 'ξεφεύγω', future: 'θα ξεφύγω', aorist: 'ξέφυγα', imperative: 'ξέφυγε / ξεφύγετε', translationEN: 'escape, slip away', translationRU: 'ускользать, вырываться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 555, present: 'ξεφορτώνω', future: 'θα ξεφορτώσω', aorist: 'ξεφόρτωσα', imperative: 'ξεφόρτωσε / ξεφορτώστε', translationEN: 'unload, get rid of', translationRU: 'разгружать, избавляться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 556, present: 'ξεφυλλίζω', future: 'θα ξεφυλλίσω', aorist: 'ξεφύλλισα', imperative: 'ξεφύλλισε / ξεφυλλίστε', translationEN: 'leaf through', translationRU: 'листать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 557, present: 'ξεχειλίζω', future: 'θα ξεχειλίσω', aorist: 'ξεχείλισα', imperative: null, translationEN: 'overflow', translationRU: 'переливаться через край', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 558, present: 'ξεχνώ', future: 'θα ξεχάσω', aorist: 'ξέχασα', imperative: 'ξέχασε / ξεχάστε', translationEN: 'forget', translationRU: 'забывать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 559, present: 'ξεχωρίζω', future: 'θα ξεχωρίσω', aorist: 'ξεχώρισα', imperative: 'ξεχώρισε / ξεχωρίστε', translationEN: 'separate, stand out', translationRU: 'отделять, выделяться', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 560, present: 'ξημερώνω', future: 'θα ξημερώσω', aorist: 'ξημέρωσα', imperative: null, translationEN: 'dawn', translationRU: 'рассветать', lexicalCategory: ['lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 561, present: 'ξοδεύω', future: 'θα ξοδέψω', aorist: 'ξόδεψα', imperative: 'ξόδεψε / ξοδέψτε', translationEN: 'spend', translationRU: 'тратить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 562, present: 'ξύνω', future: 'θα ξύσω', aorist: 'έξυσα', imperative: 'ξύσε / ξύστε', translationEN: 'scratch', translationRU: 'чесать, скрести', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 563, present: 'ξυπνώ', future: 'θα ξυπνήσω', aorist: 'ξύπνησα', imperative: 'ξύπνησε / ξυπνήστε', translationEN: 'wake up', translationRU: 'просыпаться, будить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 564, present: 'ξυρίζομαι', future: 'θα ξυριστώ', aorist: 'ξυρίστηκα', imperative: 'ξυρίσου / ξυριστείτε', translationEN: 'shave (oneself)', translationRU: 'бриться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 565, present: 'ξυρίζω', future: 'θα ξυρίσω', aorist: 'ξύρισα', imperative: 'ξύρισε / ξυρίστε', translationEN: 'shave', translationRU: 'брить', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 566, present: 'οδηγώ', future: 'θα οδηγήσω', aorist: 'οδήγησα', imperative: 'οδήγησε / οδηγήστε', translationEN: 'drive, lead', translationRU: 'водить, вести', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 567, present: 'οικοδομώ', future: 'θα οικοδομήσω', aorist: 'οικοδόμησα', imperative: 'οικοδόμησε / οικοδομήστε', translationEN: 'build', translationRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 568, present: 'ολοκληρώνω', future: 'θα ολοκληρώσω', aorist: 'ολοκλήρωσα', imperative: 'ολοκλήρωσε / ολοκληρώστε', translationEN: 'complete', translationRU: 'завершать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 569, present: 'ομολογώ', future: 'θα ομολογήσω', aorist: 'ομολόγησα', imperative: 'ομολόγησε / ομολογήστε', translationEN: 'confess', translationRU: 'признавать, признаваться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 570, present: 'ομορφαίνω', future: 'θα ομορφύνω', aorist: 'ομόρφυνα', imperative: 'ομόρφυνε / ομορφύνετε', translationEN: 'beautify', translationRU: 'украшать, хорошеть', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 571, present: 'ονειρεύομαι', future: 'θα ονειρευτώ', aorist: 'ονειρεύτηκα', imperative: 'ονειρέψου / ονειρευτείτε', translationEN: 'dream', translationRU: 'мечтать, видеть сны', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
    {id: 572, present: 'ονομάζομαι', future: 'θα ονομαστώ', aorist: 'ονομάστηκα', imperative: 'ονομάσου / ονομαστείτε', translationEN: 'be called', translationRU: 'называться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 573, present: 'ονομάζω', future: 'θα ονομάσω', aorist: 'ονόμασα', imperative: 'ονόμασε / ονομάστε', translationEN: 'name', translationRU: 'называть', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 574, present: 'οπισθοχωρώ', future: 'θα οπισθοχωρήσω', aorist: 'οπισθοχώρησα', imperative: 'οπισθοχώρησε / οπισθοχωρήστε', translationEN: 'retreat', translationRU: 'отступать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 575, present: 'οργανώνω', future: 'θα οργανώσω', aorist: 'οργάνωσα', imperative: 'οργάνωσε / οργανώστε', translationEN: 'organize', translationRU: 'организовывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 576, present: 'οργίζομαι', future: 'θα οργιστώ', aorist: 'οργίστηκα', imperative: 'οργίσου / οργιστείτε', translationEN: 'get angry', translationRU: 'гневаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 577, present: 'ορίζω', future: 'θα ορίσω', aorist: 'όρισα', imperative: 'όρισε / ορίστε', translationEN: 'define, set', translationRU: 'определять, назначать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 578, present: 'ορκίζομαι', future: 'θα ορκιστώ', aorist: 'ορκίστηκα', imperative: 'ορκίσου / ορκιστείτε', translationEN: 'swear', translationRU: 'клясться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 579, present: 'ουρλιάζω', future: 'θα ουρλιάξω', aorist: 'ούρλιαξα', imperative: 'ούρλιαξε / ουρλιάξτε', translationEN: 'howl, scream', translationRU: 'выть, вопить', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 580, present: 'οφείλω', future: null, aorist: 'όφειλα', imperative: null, translationEN: 'owe, ought', translationRU: 'быть должным', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 581, present: 'παγώνω', future: 'θα παγώσω', aorist: 'πάγωσα', imperative: 'πάγωσε / παγώστε', translationEN: 'freeze', translationRU: 'замерзать, замораживать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 582, present: 'παθαίνω', future: 'θα πάθω', aorist: 'έπαθα', imperative: 'πάθε / πάθετε', translationEN: 'suffer, undergo', translationRU: 'страдать, претерпевать', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 583, present: 'παίζω', future: 'θα παίξω', aorist: 'έπαιξα', imperative: 'παίξε / παίξτε', translationEN: 'play', translationRU: 'играть', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 584, present: 'παίρνω', future: 'θα πάρω', aorist: 'πήρα', imperative: 'πάρε / πάρτε', translationEN: 'take', translationRU: 'брать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 585, present: 'παλεύω', future: 'θα παλέψω', aorist: 'πάλεψα', imperative: 'πάλεψε / παλέψτε', translationEN: 'wrestle, fight', translationRU: 'бороться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 586, present: 'παραγγέλνω', future: 'θα παραγγείλω', aorist: 'παρήγγειλα', imperative: 'παράγγειλε / παραγγείλετε', translationEN: 'order', translationRU: 'заказывать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 587, present: 'παράγω', future: null, aorist: 'παρήγαγα', imperative: null, translationEN: 'produce', translationRU: 'производить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 588, present: 'παραδέχομαι', future: 'θα παραδεχτώ', aorist: 'παραδέχτηκα', imperative: 'παραδέξου / παραδεχτείτε', translationEN: 'admit', translationRU: 'признавать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 589, present: 'παραδίδω', future: 'θα παραδώσω', aorist: 'παρέδωσα', imperative: 'παράδωσε / παραδώστε', translationEN: 'hand over, deliver', translationRU: 'сдавать, передавать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 590, present: 'παραιτούμαι', future: 'θα παραιτηθώ', aorist: 'παραιτήθηκα', imperative: 'παραιτήσου / παραιτηθείτε', translationEN: 'resign', translationRU: 'уходить в отставку, отказываться', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 591, present: 'παρακαλώ', future: 'θα παρακαλέσω', aorist: 'παρακάλεσα', imperative: 'παρακάλεσε / παρακαλέστε', translationEN: 'beg, request', translationRU: 'просить, умолять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 592, present: 'παρακολουθώ', future: 'θα παρακολουθήσω', aorist: 'παρακολούθησα', imperative: 'παρακολούθησε / παρακολουθήστε', translationEN: 'watch, follow, attend', translationRU: 'следить, посещать', lexicalCategory: ['lexicalSense','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 593, present: 'παραμελώ', future: 'θα παραμελήσω', aorist: 'παραμέλησα', imperative: 'παραμέλησε / παραμελήστε', translationEN: 'neglect', translationRU: 'запускать, пренебрегать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 594, present: 'παραμένω', future: 'θα παραμείνω', aorist: 'παρέμεινα', imperative: 'παράμεινε / παραμείνετε', translationEN: 'remain', translationRU: 'оставаться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 595, present: 'παραμορφώνω', future: 'θα παραμορφώσω', aorist: 'παραμόρφωσα', imperative: 'παραμόρφωσε / παραμορφώστε', translationEN: 'deform, distort', translationRU: 'искажать, деформировать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 596, present: 'παραπονιέμαι', future: 'θα παραπονεθώ', aorist: 'παραπονέθηκα', imperative: 'παραπονέσου / παραπονεθείτε', translationEN: 'complain', translationRU: 'жаловаться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 597, present: 'παρασύρω', future: null, aorist: 'παρέσυρα', imperative: 'παράσυρε / παρασύρετε', translationEN: 'sweep away, drag along', translationRU: 'увлекать, сносить', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 598, present: 'παρατηρώ', future: 'θα παρατηρήσω', aorist: 'παρατήρησα', imperative: 'παρατήρησε / παρατηρήστε', translationEN: 'observe, notice', translationRU: 'наблюдать, замечать', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 599, present: 'παρατώ', future: 'θα παρατήσω', aorist: 'παράτησα', imperative: 'παράτησε / παρατήστε', translationEN: 'abandon, quit', translationRU: 'бросать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 600, present: 'παραχωρώ', future: 'θα παραχωρήσω', aorist: 'παραχώρησα', imperative: 'παραχώρησε / παραχωρήστε', translationEN: 'concede, give up', translationRU: 'уступать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 601, present: 'παρεξηγώ', future: 'θα παρεξηγήσω', aorist: 'παρεξήγησα', imperative: 'παρεξήγησε / παρεξηγήστε', translationEN: 'misunderstand', translationRU: 'неверно понимать, обижаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 602, present: 'παρέχω', future: 'θα παράσχω', aorist: 'παρείχα', imperative: null, translationEN: 'provide', translationRU: 'предоставлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 603, present: 'παρηγορώ', future: 'θα παρηγορήσω', aorist: 'παρηγόρησα', imperative: 'παρηγόρησε / παρηγορήστε', translationEN: 'comfort', translationRU: 'утешать', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 604, present: 'παρουσιάζομαι', future: 'θα παρουσιαστώ', aorist: 'παρουσιάστηκα', imperative: 'παρουσιάσου / παρουσιαστείτε', translationEN: 'appear, report in', translationRU: 'являться, появляться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 605, present: 'παρουσιάζω', future: 'θα παρουσιάσω', aorist: 'παρουσίασα', imperative: 'παρουσίασε / παρουσιάστε', translationEN: 'present, introduce', translationRU: 'представлять, показывать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 606, present: 'πασχίζω', future: 'θα πασχίσω', aorist: 'πάσχισα', imperative: 'πάσχισε / πασχίστε', translationEN: 'strive', translationRU: 'стараться', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 607, present: 'πατώ', future: 'θα πατήσω', aorist: 'πάτησα', imperative: 'πάτησε / πατήστε', translationEN: 'step on, press', translationRU: 'наступать, нажимать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 608, present: 'παύω', future: 'θα παύσω', aorist: 'έπαυσα', imperative: 'παύσε / παύστε', translationEN: 'cease, stop', translationRU: 'прекращать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 609, present: 'πάω', future: null, aorist: 'πήγα', imperative: 'πήγαινε / πηγαίνετε', translationEN: 'go', translationRU: 'идти, ехать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2','grammarIrregular']},
    {id: 610, present: 'πεθαίνω', future: 'θα πεθάνω', aorist: 'πέθανα', imperative: 'πέθανε / πεθάνετε', translationEN: 'die', translationRU: 'умирать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 611, present: 'πειθαρχώ', future: 'θα πειθαρχήσω', aorist: 'πειθάρχησα', imperative: 'πειθάρχησε / πειθαρχήστε', translationEN: 'obey, be disciplined', translationRU: 'подчиняться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 612, present: 'πείθω', future: 'θα πείσω', aorist: 'έπεισα', imperative: 'πείσε / πείστε', translationEN: 'convince', translationRU: 'убеждать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 613, present: 'πεινώ', future: 'θα πεινάσω', aorist: 'πείνασα', imperative: null, translationEN: 'be hungry', translationRU: 'хотеть есть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 614, present: 'πειράζω', future: 'θα πειράξω', aorist: 'πείραξα', imperative: 'πείραξε / πειράξτε', translationEN: 'bother, tease', translationRU: 'беспокоить, дразнить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 615, present: 'πειραματίζομαι', future: 'θα πειραματιστώ', aorist: 'πειραματίστηκα', imperative: 'πειραματίσου / πειραματιστείτε', translationEN: 'experiment', translationRU: 'экспериментировать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 616, present: 'πενθώ', future: 'θα πενθήσω', aorist: 'πένθησα', imperative: null, translationEN: 'mourn', translationRU: 'скорбеть', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 617, present: 'περιγράφω', future: 'θα περιγράψω', aorist: 'περιέγραψα', imperative: 'περίγραψε / περιγράψτε', translationEN: 'describe', translationRU: 'описывать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 618, present: 'περιέχω', future: null, aorist: 'περιείχα', imperative: null, translationEN: 'contain', translationRU: 'содержать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 619, present: 'περιλαμβάνω', future: 'θα περιλάβω', aorist: 'περιέλαβα', imperative: 'περίλαβε / περιλάβετε', translationEN: 'include', translationRU: 'включать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 620, present: 'περιμένω', future: null, aorist: 'περίμενα', imperative: 'περίμενε / περιμένετε', translationEN: 'wait, expect', translationRU: 'ждать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 621, present: 'περιορίζω', future: 'θα περιορίσω', aorist: 'περιόρισα', imperative: 'περιόρισε / περιορίστε', translationEN: 'restrict', translationRU: 'ограничивать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 622, present: 'περιποιούμαι', future: 'θα περιποιηθώ', aorist: 'περιποιήθηκα', imperative: 'περιποιήσου / περιποιηθείτε', translationEN: 'take care of, treat', translationRU: 'ухаживать, угощать', lexicalCategory: ['lexicalSocial','lexicalHealth'], grammaticalCategory: ['grammarMedial']},
    {id: 623, present: 'περισσεύω', future: 'θα περισσέψω', aorist: 'περίσσεψα', imperative: null, translationEN: 'be left over', translationRU: 'оставаться, быть в избытке', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 624, present: 'περιστρέφω', future: 'θα περιστρέψω', aorist: 'περιέστρεψα', imperative: 'περίστρεψε / περιστρέψτε', translationEN: 'rotate', translationRU: 'вращать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 625, present: 'περιφρονώ', future: 'θα περιφρονήσω', aorist: 'περιφρόνησα', imperative: 'περιφρόνησε / περιφρονήστε', translationEN: 'despise', translationRU: 'презирать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 626, present: 'περνώ', future: 'θα περάσω', aorist: 'πέρασα', imperative: 'πέρασε / περάστε', translationEN: 'pass, spend (time)', translationRU: 'проходить, проводить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 627, present: 'περπατώ', future: 'θα περπατήσω', aorist: 'περπάτησα', imperative: 'περπάτησε / περπατήστε', translationEN: 'walk', translationRU: 'ходить пешком', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 628, present: 'πετυχαίνω', future: 'θα πετύχω', aorist: 'πέτυχα', imperative: 'πέτυχε / πετύχετε', translationEN: 'succeed, hit', translationRU: 'удаваться, попадать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 629, present: 'πετώ', future: 'θα πετάξω', aorist: 'πέταξα', imperative: 'πέταξε / πετάξτε', translationEN: 'throw, fly', translationRU: 'бросать, летать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 630, present: 'πηδώ', future: 'θα πηδήξω', aorist: 'πήδηξα', imperative: 'πήδηξε / πηδήξτε', translationEN: 'jump', translationRU: 'прыгать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 631, present: 'πιάνω', future: 'θα πιάσω', aorist: 'έπιασα', imperative: 'πιάσε / πιάστε', translationEN: 'catch, grab', translationRU: 'ловить, хватать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 632, present: 'πιέζω', future: 'θα πιέσω', aorist: 'έπιεσα', imperative: 'πίεσε / πιέστε', translationEN: 'press, pressure', translationRU: 'давить', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 633, present: 'πίνω', future: 'θα πιω', aorist: 'ήπια', imperative: 'πιες / πιείτε', translationEN: 'drink', translationRU: 'пить', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 634, present: 'πιστεύω', future: 'θα πιστέψω', aorist: 'πίστεψα', imperative: 'πίστεψε / πιστέψτε', translationEN: 'believe', translationRU: 'верить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 635, present: 'πιστοποιώ', future: 'θα πιστοποιήσω', aorist: 'πιστοποίησα', imperative: 'πιστοποίησε / πιστοποιήστε', translationEN: 'certify', translationRU: 'удостоверять, сертифицировать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 636, present: 'πιτσιλίζω', future: 'θα πιτσιλίσω', aorist: 'πιτσίλισα', imperative: 'πιτσίλισε / πιτσιλίστε', translationEN: 'splash', translationRU: 'брызгать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 637, present: 'πλαγιάζω', future: 'θα πλαγιάσω', aorist: 'πλάγιασα', imperative: 'πλάγιασε / πλαγιάστε', translationEN: 'lie down, go to bed', translationRU: 'ложиться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 638, present: 'πλάθω', future: 'θα πλάσω', aorist: 'έπλασα', imperative: 'πλάσε / πλάστε', translationEN: 'mold, shape', translationRU: 'лепить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 639, present: 'πλακώνω', future: 'θα πλακώσω', aorist: 'πλάκωσα', imperative: 'πλάκωσε / πλακώστε', translationEN: 'crush, press down, descend upon', translationRU: 'придавливать, наваливаться', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 640, present: 'πλανώ', future: 'θα πλανήσω', aorist: 'πλάνησα', imperative: 'πλάνησε / πλανήστε', translationEN: 'deceive, mislead', translationRU: 'обманывать, вводить в заблуждение', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 641, present: 'πλαστογραφώ', future: 'θα πλαστογραφήσω', aorist: 'πλαστογράφησα', imperative: 'πλαστογράφησε / πλαστογραφήστε', translationEN: 'forge', translationRU: 'подделывать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 642, present: 'πλέκω', future: 'θα πλέξω', aorist: 'έπλεξα', imperative: 'πλέξε / πλέξτε', translationEN: 'knit, weave', translationRU: 'вязать, плести', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 643, present: 'πλένω', future: 'θα πλύνω', aorist: 'έπλυνα', imperative: 'πλύνε / πλύνετε', translationEN: 'wash', translationRU: 'мыть, стирать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 644, present: 'πλέω', future: 'θα πλεύσω', aorist: 'έπλευσα', imperative: 'πλεύσε / πλεύστε', translationEN: 'sail', translationRU: 'плыть (по морю)', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 645, present: 'πληγώνω', future: 'θα πληγώσω', aorist: 'πλήγωσα', imperative: 'πλήγωσε / πληγώστε', translationEN: 'wound, hurt', translationRU: 'ранить, обижать', lexicalCategory: ['lexicalHealth','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 646, present: 'πλημμυρίζω', future: 'θα πλημμυρίσω', aorist: 'πλημμύρισα', imperative: 'πλημμύρισε / πλημμυρίστε', translationEN: 'flood', translationRU: 'затоплять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 647, present: 'πληροφορώ', future: 'θα πληροφορήσω', aorist: 'πληροφόρησα', imperative: 'πληροφόρησε / πληροφορήστε', translationEN: 'inform', translationRU: 'информировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 648, present: 'πληρώνω', future: 'θα πληρώσω', aorist: 'πλήρωσα', imperative: 'πλήρωσε / πληρώστε', translationEN: 'pay', translationRU: 'платить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 649, present: 'πλησιάζομαι', future: 'θα πλησιαστώ', aorist: 'πλησιάστηκα', imperative: 'πλησιάσου / πλησιαστείτε', translationEN: 'be approached', translationRU: 'подвергаться приближению', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 650, present: 'πλησιάζω', future: 'θα πλησιάσω', aorist: 'πλησίασα', imperative: 'πλησίασε / πλησιάστε', translationEN: 'approach', translationRU: 'приближаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 651, present: 'πλήττω', future: 'θα πλήξω', aorist: 'έπληξα', imperative: null, translationEN: 'strike, bore', translationRU: 'поражать, наскучивать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 652, present: 'πλουτίζω', future: 'θα πλουτίσω', aorist: 'πλούτισα', imperative: 'πλούτισε / πλουτίστε', translationEN: 'enrich, get rich', translationRU: 'обогащать, богатеть', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 653, present: 'πνίγω', future: 'θα πνίξω', aorist: 'έπνιξα', imperative: 'πνίξε / πνίξτε', translationEN: 'drown, choke', translationRU: 'топить, душить', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 654, present: 'ποδοπατώ', future: 'θα ποδοπατήσω', aorist: 'ποδοπάτησα', imperative: 'ποδοπάτησε / ποδοπατήστε', translationEN: 'trample', translationRU: 'топтать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 655, present: 'πολεμώ', future: 'θα πολεμήσω', aorist: 'πολέμησα', imperative: 'πολέμησε / πολεμήστε', translationEN: 'fight, wage war', translationRU: 'воевать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 656, present: 'πολλαπλασιάζω', future: 'θα πολλαπλασιάσω', aorist: 'πολλαπλασίασα', imperative: 'πολλαπλασίασε / πολλαπλασιάστε', translationEN: 'multiply', translationRU: 'умножать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 657, present: 'ποντάρω', future: null, aorist: 'πόνταρα', imperative: 'πόνταρε / ποντάρετε', translationEN: 'bet', translationRU: 'ставить (на кого-л.)', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 658, present: 'πονώ', future: 'θα πονέσω', aorist: 'πόνεσα', imperative: 'πόνεσε / πονέστε', translationEN: 'hurt, ache', translationRU: 'болеть, причинять боль', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar2']},
    {id: 659, present: 'πορεύομαι', future: 'θα πορευτώ', aorist: 'πορεύτηκα', imperative: 'πορεύσου / πορευτείτε', translationEN: 'proceed, travel', translationRU: 'идти, следовать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 660, present: 'ποτίζω', future: 'θα ποτίσω', aorist: 'πότισα', imperative: 'πότισε / ποτίστε', translationEN: 'water, give a drink', translationRU: 'поливать, поить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 661, present: 'πουλώ', future: 'θα πουλήσω', aorist: 'πούλησα', imperative: 'πούλησε / πουλήστε', translationEN: 'sell', translationRU: 'продавать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 662, present: 'πραγματοποιώ', future: 'θα πραγματοποιήσω', aorist: 'πραγματοποίησα', imperative: 'πραγματοποίησε / πραγματοποιήστε', translationEN: 'carry out, realize', translationRU: 'осуществлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 663, present: 'πράττω', future: 'θα πράξω', aorist: 'έπραξα', imperative: 'πράξε / πράξτε', translationEN: 'act, do', translationRU: 'поступать, совершать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 664, present: 'πρέπει', future: null, aorist: 'έπρεπε', imperative: null, translationEN: 'must, it is necessary', translationRU: 'нужно, должен', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarIrregular']},
    {id: 665, present: 'πριονίζω', future: 'θα πριονίσω', aorist: 'πρίονισα', imperative: 'πρίονισε / πριονίστε', translationEN: 'saw', translationRU: 'пилить', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 666, present: 'προβάλλω', future: 'θα προβάλω', aorist: 'πρόβαλα', imperative: 'πρόβαλε / προβάλετε', translationEN: 'project, show, put forward', translationRU: 'проецировать, выдвигать', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 667, present: 'προβλέπω', future: 'θα προβλέψω', aorist: 'προέβλεψα', imperative: 'πρόβλεψε / προβλέψτε', translationEN: 'predict, foresee', translationRU: 'предсказывать, предусматривать', lexicalCategory: ['lexicalTime','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 668, present: 'προβληματίζω', future: 'θα προβληματίσω', aorist: 'προβλημάτισα', imperative: 'προβλημάτισε / προβληματίστε', translationEN: 'make (someone) think, worry', translationRU: 'заставлять задуматься', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 669, present: 'προγραμματίζω', future: 'θα προγραμματίσω', aorist: 'προγραμμάτισα', imperative: 'προγραμμάτισε / προγραμματίστε', translationEN: 'schedule, program', translationRU: 'планировать, программировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 670, present: 'προδίδω', future: 'θα προδώσω', aorist: 'πρόδωσα', imperative: 'πρόδωσε / προδώστε', translationEN: 'betray', translationRU: 'предавать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 671, present: 'προειδοποιώ', future: 'θα προειδοποιήσω', aorist: 'προειδοποίησα', imperative: 'προειδοποίησε / προειδοποιήστε', translationEN: 'warn', translationRU: 'предупреждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 672, present: 'προέρχομαι', future: 'θα προέλθω', aorist: 'προήλθα', imperative: null, translationEN: 'originate, come from', translationRU: 'происходить', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 673, present: 'προετοιμάζω', future: 'θα προετοιμάσω', aorist: 'προετοίμασα', imperative: 'προετοίμασε / προετοιμάστε', translationEN: 'prepare', translationRU: 'подготавливать', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 674, present: 'προκαλώ', future: 'θα προκαλέσω', aorist: 'προκάλεσα', imperative: 'προκάλεσε / προκαλέστε', translationEN: 'provoke, cause', translationRU: 'вызывать, провоцировать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 675, present: 'προκύπτω', future: 'θα προκύψω', aorist: 'προέκυψα', imperative: null, translationEN: 'arise, result', translationRU: 'возникать, следовать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 676, present: 'προλαβαίνω', future: 'θα προλάβω', aorist: 'πρόλαβα', imperative: 'πρόλαβε / προλάβετε', translationEN: 'catch in time, manage', translationRU: 'успевать, предотвращать', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 677, present: 'προμηθεύομαι', future: 'θα προμηθευτώ', aorist: 'προμηθεύτηκα', imperative: 'προμηθεύσου / προμηθευτείτε', translationEN: 'obtain, get hold of', translationRU: 'приобретать, запасаться', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 678, present: 'προμηθεύω', future: 'θα προμηθεύσω', aorist: 'προμήθευσα', imperative: 'προμήθευσε / προμηθεύστε', translationEN: 'supply', translationRU: 'снабжать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 679, present: 'προοδεύω', future: 'θα προοδεύσω', aorist: 'προόδευσα', imperative: 'προόδευσε / προοδεύστε', translationEN: 'progress', translationRU: 'преуспевать, развиваться', lexicalCategory: ['lexicalAction','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 680, present: 'προπονούμαι', future: 'θα προπονηθώ', aorist: 'προπονήθηκα', imperative: 'προπονήσου / προπονηθείτε', translationEN: 'train', translationRU: 'тренироваться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 681, present: 'προσαρμόζω', future: 'θα προσαρμόσω', aorist: 'προσάρμοσα', imperative: 'προσάρμοσε / προσαρμόστε', translationEN: 'adapt, adjust', translationRU: 'приспосабливать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 682, present: 'προσβάλλω', future: 'θα προσβάλω', aorist: 'πρόσβαλα', imperative: null, translationEN: 'offend', translationRU: 'оскорблять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 683, present: 'προσγειώνομαι', future: 'θα προσγειωθώ', aorist: 'προσγειώθηκα', imperative: 'προσγειώσου / προσγειωθείτε', translationEN: 'land', translationRU: 'приземляться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 684, present: 'προσδιορίζω', future: 'θα προσδιορίσω', aorist: 'προσδιόρισα', imperative: 'προσδιόρισε / προσδιορίστε', translationEN: 'specify, determine', translationRU: 'определять, уточнять', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 685, present: 'προσδοκώ', future: 'θα προσδοκήσω', aorist: 'προσδόκησα', imperative: 'προσδόκησε / προσδοκήστε', translationEN: 'expect, anticipate', translationRU: 'ожидать, надеяться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar2']},
    {id: 686, present: 'προσεύχομαι', future: 'θα προσευχηθώ', aorist: 'προσευχήθηκα', imperative: 'προσευχήσου / προσευχηθείτε', translationEN: 'pray', translationRU: 'молиться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 687, present: 'προσέχω', future: 'θα προσέξω', aorist: 'πρόσεξα', imperative: 'πρόσεξε / προσέξτε', translationEN: 'pay attention, be careful', translationRU: 'быть внимательным, беречься', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 688, present: 'προσθέτω', future: 'θα προσθέσω', aorist: 'πρόσθεσα', imperative: 'πρόσθεσε / προσθέστε', translationEN: 'add', translationRU: 'добавлять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 689, present: 'προσκαλώ', future: 'θα προσκαλέσω', aorist: 'προσκάλεσα', imperative: 'προσκάλεσε / προσκαλέστε', translationEN: 'invite', translationRU: 'приглашать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 690, present: 'προσκομίζω', future: 'θα προσκομίσω', aorist: 'προσκόμισα', imperative: 'προσκόμισε / προσκομίστε', translationEN: 'bring, submit', translationRU: 'предоставлять, приносить', lexicalCategory: ['lexicalWork','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 691, present: 'προσκυνώ', future: 'θα προσκυνήσω', aorist: 'προσκύνησα', imperative: 'προσκύνησε / προσκυνήστε', translationEN: 'worship, bow', translationRU: 'поклоняться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 692, present: 'προσλαμβάνω', future: 'θα προσλάβω', aorist: 'προσέλαβα', imperative: 'πρόσλαβε / προσλάβετε', translationEN: 'hire', translationRU: 'нанимать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 693, present: 'προσπαθώ', future: 'θα προσπαθήσω', aorist: 'προσπάθησα', imperative: 'προσπάθησε / προσπαθήστε', translationEN: 'try', translationRU: 'пытаться', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 694, present: 'προσπερνώ', future: 'θα προσπεράσω', aorist: 'προσπέρασα', imperative: 'προσπέρασε / προσπεράστε', translationEN: 'overtake, pass', translationRU: 'обгонять, проходить мимо', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 695, present: 'προσποιούμαι', future: 'θα προσποιηθώ', aorist: 'προσποιήθηκα', imperative: 'προσποιήσου / προσποιηθείτε', translationEN: 'pretend', translationRU: 'притворяться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial']},
    {id: 696, present: 'προστατεύω', future: 'θα προστατέψω', aorist: 'προστάτεψα', imperative: 'προστάτεψε / προστατέψτε', translationEN: 'protect', translationRU: 'защищать', lexicalCategory: ['lexicalAction','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 697, present: 'προσφέρομαι', future: 'θα προσφερθώ', aorist: 'προσφέρθηκα', imperative: 'προσφέρσου / προσφερθείτε', translationEN: 'offer one\'s services', translationRU: 'предлагать свои услуги', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 698, present: 'προσφέρω', future: null, aorist: 'πρόσφερα', imperative: 'πρόσφερε / προσφέρετε', translationEN: 'offer', translationRU: 'предлагать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 699, present: 'προτείνω', future: null, aorist: 'πρότεινα', imperative: 'πρότεινε / προτείνετε', translationEN: 'suggest, propose', translationRU: 'предлагать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 700, present: 'προτιμώ', future: 'θα προτιμήσω', aorist: 'προτίμησα', imperative: 'προτίμησε / προτιμήστε', translationEN: 'prefer', translationRU: 'предпочитать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 701, present: 'προφέρω', future: null, aorist: 'πρόφερα', imperative: 'πρόφερε / προφέρετε', translationEN: 'pronounce', translationRU: 'произносить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 702, present: 'προφητεύω', future: 'θα προφητεύσω', aorist: 'προφήτευσα', imperative: 'προφήτευσε / προφητεύστε', translationEN: 'prophesy', translationRU: 'пророчествовать', lexicalCategory: ['lexicalTime','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 703, present: 'προχωρώ', future: 'θα προχωρήσω', aorist: 'προχώρησα', imperative: 'προχώρησε / προχωρήστε', translationEN: 'proceed, advance', translationRU: 'продвигаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 704, present: 'προωθώ', future: 'θα προωθήσω', aorist: 'προώθησα', imperative: 'προώθησε / προωθήστε', translationEN: 'promote, forward', translationRU: 'продвигать, пересылать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 705, present: 'πυκνώνω', future: 'θα πυκνώσω', aorist: 'πύκνωσα', imperative: 'πύκνωσε / πυκνώστε', translationEN: 'thicken', translationRU: 'сгущать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 706, present: 'πυροβολώ', future: 'θα πυροβολήσω', aorist: 'πυροβόλησα', imperative: 'πυροβόλησε / πυροβολήστε', translationEN: 'shoot', translationRU: 'стрелять', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 707, present: 'πυροδοτώ', future: 'θα πυροδοτήσω', aorist: 'πυροδότησα', imperative: 'πυροδότησε / πυροδοτήστε', translationEN: 'trigger, ignite', translationRU: 'запускать, провоцировать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 708, present: 'πωλώ', future: 'θα πωλήσω', aorist: 'πώλησα', imperative: 'πώλησε / πωλήστε', translationEN: 'sell (formal)', translationRU: 'продавать', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 709, present: 'ράβω', future: 'θα ράψω', aorist: 'έραψα', imperative: 'ράψε / ράψτε', translationEN: 'sew', translationRU: 'шить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 710, present: 'ραγίζω', future: 'θα ραγίσω', aorist: 'ράγισα', imperative: 'ράγισε / ραγίστε', translationEN: 'crack', translationRU: 'трескаться, давать трещину', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 711, present: 'ραντίζω', future: 'θα ραντίσω', aorist: 'ράντισα', imperative: 'ράντισε / ραντίστε', translationEN: 'sprinkle, spray', translationRU: 'опрыскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 712, present: 'ρεζιλεύω', future: 'θα ρεζιλέψω', aorist: 'ρεζίλεψα', imperative: 'ρεζίλεψε / ρεζιλέψτε', translationEN: 'humiliate, disgrace', translationRU: 'позорить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 713, present: 'ρευστοποιώ', future: 'θα ρευστοποιήσω', aorist: 'ρευστοποίησα', imperative: 'ρευστοποίησε / ρευστοποιήστε', translationEN: 'liquidate (assets)', translationRU: 'обращать в деньги', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 714, present: 'ρέω', future: 'θα ρεύσω', aorist: 'έρρευσα', imperative: null, translationEN: 'flow', translationRU: 'течь', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 715, present: 'ρισκάρω', future: null, aorist: 'ρίσκαρα', imperative: 'ρίσκαρε / ρισκάρετε', translationEN: 'risk', translationRU: 'рисковать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 716, present: 'ρίχνομαι', future: 'θα ριχτώ', aorist: 'ρίχτηκα', imperative: 'ρίξου / ριχτείτε', translationEN: 'throw oneself, rush', translationRU: 'бросаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 717, present: 'ρίχνω', future: 'θα ρίξω', aorist: 'έριξα', imperative: 'ρίξε / ρίξτε', translationEN: 'throw, drop', translationRU: 'бросать, ронять', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 718, present: 'ροκανίζω', future: 'θα ροκανίσω', aorist: 'ρόκανισα', imperative: 'ροκάνισε / ροκανίστε', translationEN: 'gnaw', translationRU: 'грызть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 719, present: 'ρουφώ', future: 'θα ρουφήξω', aorist: 'ρούφηξα', imperative: 'ρούφηξε / ρουφήξτε', translationEN: 'suck, sip', translationRU: 'всасывать, втягивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 720, present: 'ρυθμίζω', future: 'θα ρυθμίσω', aorist: 'ρύθμισα', imperative: 'ρύθμισε / ρυθμίστε', translationEN: 'adjust, regulate', translationRU: 'регулировать, настраивать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 721, present: 'ρυπαίνω', future: 'θα ρυπάνω', aorist: 'ρύπανα', imperative: 'ρύπανε / ρυπάνετε', translationEN: 'pollute', translationRU: 'загрязнять', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 722, present: 'ρωτώ', future: 'θα ρωτήσω', aorist: 'ρώτησα', imperative: 'ρώτησε / ρωτήστε', translationEN: 'ask', translationRU: 'спрашивать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 723, present: 'σαλπάρω', future: null, aorist: 'σάλπαρα', imperative: 'σάλπαρε / σαλπάρετε', translationEN: 'set sail', translationRU: 'отплывать', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 724, present: 'σαπίζω', future: 'θα σαπίσω', aorist: 'σάπισα', imperative: null, translationEN: 'rot', translationRU: 'гнить', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 725, present: 'σαρώνω', future: 'θα σαρώσω', aorist: 'σάρωσα', imperative: 'σάρωσε / σαρώστε', translationEN: 'sweep, scan', translationRU: 'сметать, сканировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 726, present: 'σαστίζω', future: 'θα σαστίσω', aorist: 'σάστισα', imperative: null, translationEN: 'be bewildered', translationRU: 'смущаться, теряться', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 727, present: 'σβήνω', future: 'θα σβήσω', aorist: 'έσβησα', imperative: 'σβήσε / σβήστε', translationEN: 'erase, extinguish', translationRU: 'стирать, гасить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 728, present: 'σέβομαι', future: 'θα σεβαστώ', aorist: 'σεβάστηκα', imperative: 'σεβάσου / σεβαστείτε', translationEN: 'respect', translationRU: 'уважать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 729, present: 'σερβίρω', future: null, aorist: 'σέρβιρα', imperative: 'σέρβιρε / σερβίρετε', translationEN: 'serve (food)', translationRU: 'подавать (на стол)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 730, present: 'σηκώνομαι', future: 'θα σηκωθώ', aorist: 'σηκώθηκα', imperative: 'σήκω / σηκωθείτε', translationEN: 'get up, stand up', translationRU: 'вставать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 731, present: 'σηκώνω', future: 'θα σηκώσω', aorist: 'σήκωσα', imperative: 'σήκωσε / σηκώστε', translationEN: 'lift, raise', translationRU: 'поднимать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 732, present: 'σημαίνω', future: 'θα σημάνω', aorist: 'σήμανα', imperative: null, translationEN: 'mean, signify', translationRU: 'означать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 733, present: 'σημειώνω', future: 'θα σημειώσω', aorist: 'σημείωσα', imperative: 'σημείωσε / σημειώστε', translationEN: 'note, score', translationRU: 'отмечать, записывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 734, present: 'σιδερώνω', future: 'θα σιδερώσω', aorist: 'σιδέρωσα', imperative: 'σιδέρωσε / σιδερώστε', translationEN: 'iron', translationRU: 'гладить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 735, present: 'σιωπώ', future: 'θα σιωπήσω', aorist: 'σιώπησα', imperative: 'σιώπησε / σιωπήστε', translationEN: 'be silent', translationRU: 'молчать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 736, present: 'σκάβω', future: 'θα σκάψω', aorist: 'έσκαψα', imperative: 'σκάψε / σκάψτε', translationEN: 'dig', translationRU: 'копать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 737, present: 'σκανδαλίζω', future: 'θα σκανδαλίσω', aorist: 'σκανδάλισα', imperative: 'σκανδάλισε / σκανδαλίστε', translationEN: 'scandalize, shock', translationRU: 'шокировать, соблазнять', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 738, present: 'σκαρφαλώνω', future: 'θα σκαρφαλώσω', aorist: 'σκαρφάλωσα', imperative: 'σκαρφάλωσε / σκαρφαλώστε', translationEN: 'climb', translationRU: 'карабкаться, взбираться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 739, present: 'σκέφτομαι', future: 'θα σκεφτώ', aorist: 'σκέφτηκα', imperative: 'σκέψου / σκεφτείτε', translationEN: 'think', translationRU: 'думать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 740, present: 'σκίζω', future: 'θα σκίσω', aorist: 'έσκισα', imperative: 'σκίσε / σκίστε', translationEN: 'tear', translationRU: 'рвать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 741, present: 'σκληραίνω', future: 'θα σκληρύνω', aorist: 'σκλήρυνα', imperative: 'σκλήρυνε / σκληρύνετε', translationEN: 'harden', translationRU: 'твердеть, ожесточать', lexicalCategory: ['lexicalSense','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 742, present: 'σκοντάφτω', future: 'θα σκοντάψω', aorist: 'σκόνταψα', imperative: null, translationEN: 'stumble', translationRU: 'спотыкаться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 743, present: 'σκοπεύω', future: 'θα σκοπεύσω', aorist: 'σκόπευσα', imperative: null, translationEN: 'intend, aim', translationRU: 'намереваться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 744, present: 'σκορπίζω', future: 'θα σκορπίσω', aorist: 'σκόρπισα', imperative: 'σκόρπισε / σκορπίστε', translationEN: 'scatter', translationRU: 'рассыпать, разбрасывать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 745, present: 'σκοτώνω', future: 'θα σκοτώσω', aorist: 'σκότωσα', imperative: 'σκότωσε / σκοτώστε', translationEN: 'kill', translationRU: 'убивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 746, present: 'σκουπίζω', future: 'θα σκουπίσω', aorist: 'σκούπισα', imperative: 'σκούπισε / σκουπίστε', translationEN: 'wipe, sweep', translationRU: 'вытирать, подметать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 747, present: 'σκουραίνω', future: 'θα σκουρύνω', aorist: 'σκούρυνα', imperative: null, translationEN: 'darken', translationRU: 'темнеть', lexicalCategory: ['lexicalSense','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 748, present: 'σκύβω', future: 'θα σκύψω', aorist: 'έσκυψα', imperative: 'σκύψε / σκύψτε', translationEN: 'bend over', translationRU: 'наклоняться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 749, present: 'σμίγω', future: 'θα σμίξω', aorist: 'έσμιξα', imperative: null, translationEN: 'unite, meet', translationRU: 'соединяться, встречаться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 750, present: 'σοβαρεύω', future: 'θα σοβαρέψω', aorist: 'σοβάρεψα', imperative: 'σοβάρεψε / σοβαρέψτε', translationEN: 'become serious', translationRU: 'становиться серьёзным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 751, present: 'σπάζω', future: 'θα σπάσω', aorist: 'έσπασα', imperative: 'σπάσε / σπάστε', translationEN: 'break', translationRU: 'ломать, разбивать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 752, present: 'σπαταλώ', future: 'θα σπαταλήσω', aorist: 'σπατάλησα', imperative: 'σπατάλησε / σπαταλήστε', translationEN: 'waste, squander', translationRU: 'тратить впустую', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
    {id: 753, present: 'σπέρνω', future: 'θα σπείρω', aorist: 'έσπειρα', imperative: 'σπείρε / σπείρτε', translationEN: 'sow', translationRU: 'сеять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 754, present: 'σπουδάζω', future: 'θα σπουδάσω', aorist: 'σπούδασα', imperative: 'σπούδασε / σπουδάστε', translationEN: 'study (at university)', translationRU: 'учиться (в вузе)', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 755, present: 'σπρώχνω', future: 'θα σπρώξω', aorist: 'έσπρωξα', imperative: 'σπρώξε / σπρώξτε', translationEN: 'push', translationRU: 'толкать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 756, present: 'στάζω', future: 'θα στάξω', aorist: 'έσταξα', imperative: 'στάξε / στάξτε', translationEN: 'drip', translationRU: 'капать', lexicalCategory: ['lexicalMotion','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 757, present: 'σταθμεύω', future: 'θα σταθμεύσω', aorist: 'στάθμευσα', imperative: 'στάθμευσε / σταθμεύστε', translationEN: 'park', translationRU: 'парковаться', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 758, present: 'σταματώ', future: 'θα σταματήσω', aorist: 'σταμάτησα', imperative: 'σταμάτησε / σταματήστε', translationEN: 'stop', translationRU: 'останавливать, останавливаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar2']},
    {id: 759, present: 'στεγάζω', future: 'θα στεγάσω', aorist: 'στέγασα', imperative: 'στέγασε / στεγάστε', translationEN: 'house, shelter', translationRU: 'размещать, давать приют', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 760, present: 'στεγνώνω', future: 'θα στεγνώσω', aorist: 'στέγνωσα', imperative: 'στέγνωσε / στεγνώστε', translationEN: 'dry', translationRU: 'сушить, сохнуть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 761, present: 'στέκομαι', future: 'θα σταθώ', aorist: 'στάθηκα', imperative: 'στάσου / σταθείτε', translationEN: 'stand', translationRU: 'стоять, останавливаться', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 762, present: 'στέλνω', future: 'θα στείλω', aorist: 'έστειλα', imperative: 'στείλε / στείλτε', translationEN: 'send', translationRU: 'отправлять', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 763, present: 'στεναχωριέμαι', future: 'θα στεναχωρηθώ', aorist: 'στεναχωρήθηκα', imperative: null, translationEN: 'be upset', translationRU: 'огорчаться', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 764, present: 'στεναχωρώ', future: 'θα στεναχωρήσω', aorist: 'στεναχώρησα', imperative: 'στεναχώρησε / στεναχωρήστε', translationEN: 'upset', translationRU: 'огорчать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 765, present: 'στενεύω', future: 'θα στενέψω', aorist: 'στένεψα', imperative: 'στένεψε / στενέψτε', translationEN: 'narrow, tighten', translationRU: 'сужать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 766, present: 'στερούμαι', future: 'θα στερηθώ', aorist: 'στερήθηκα', imperative: null, translationEN: 'lack, be deprived of', translationRU: 'лишаться, испытывать недостаток', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 767, present: 'στερώ', future: 'θα στερήσω', aorist: 'στέρησα', imperative: 'στέρησε / στερήστε', translationEN: 'deprive', translationRU: 'лишать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 768, present: 'στηρίζω', future: 'θα στηρίξω', aorist: 'στήριξα', imperative: 'στήριξε / στηρίξτε', translationEN: 'support, prop', translationRU: 'поддерживать, опирать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 769, present: 'στιγματίζω', future: 'θα στιγματίσω', aorist: 'στιγμάτισα', imperative: 'στιγμάτισε / στιγματίστε', translationEN: 'stigmatize', translationRU: 'клеймить', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 770, present: 'στολίζω', future: 'θα στολίσω', aorist: 'στόλισα', imperative: 'στόλισε / στολίστε', translationEN: 'decorate', translationRU: 'украшать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 771, present: 'στραγγίζω', future: 'θα στραγγίσω', aorist: 'στράγγισα', imperative: 'στράγγισε / στραγγίστε', translationEN: 'drain, wring out', translationRU: 'сливать, отжимать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 772, present: 'στρατολογώ', future: 'θα στρατολογήσω', aorist: 'στρατολόγησα', imperative: 'στρατολόγησε / στρατολογήστε', translationEN: 'recruit', translationRU: 'вербовать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 773, present: 'στρέφω', future: 'θα στρέψω', aorist: 'έστρεψα', imperative: 'στρέψε / στρέψτε', translationEN: 'turn, direct', translationRU: 'поворачивать, направлять', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 774, present: 'στρίβω', future: 'θα στρίψω', aorist: 'έστριψα', imperative: 'στρίψε / στρίψτε', translationEN: 'turn, twist', translationRU: 'поворачивать, крутить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 775, present: 'στριμώχνω', future: 'θα στριμώξω', aorist: 'στρίμωξα', imperative: 'στρίμωξε / στριμώξτε', translationEN: 'squeeze in, corner', translationRU: 'втискивать, загонять в угол', lexicalCategory: ['lexicalAction','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 776, present: 'στρώνω', future: 'θα στρώσω', aorist: 'έστρωσα', imperative: 'στρώσε / στρώστε', translationEN: 'spread, make (bed), set (table)', translationRU: 'стелить, накрывать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 777, present: 'συγγράφω', future: 'θα συγγράψω', aorist: 'συνέγραψα', imperative: 'σύγγραψε / συγγράψτε', translationEN: 'write (a book)', translationRU: 'сочинять, писать (книгу)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 778, present: 'συγκαλύπτω', future: 'θα συγκαλύψω', aorist: 'συγκάλυψα', imperative: 'συγκάλυψε / συγκαλύψτε', translationEN: 'cover up', translationRU: 'скрывать, покрывать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 779, present: 'συγκεντρώνομαι', future: 'θα συγκεντρωθώ', aorist: 'συγκεντρώθηκα', imperative: 'συγκεντρώσου / συγκεντρωθείτε', translationEN: 'concentrate, gather', translationRU: 'сосредоточиваться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 780, present: 'συγκεντρώνω', future: 'θα συγκεντρώσω', aorist: 'συγκέντρωσα', imperative: 'συγκέντρωσε / συγκεντρώστε', translationEN: 'gather, concentrate', translationRU: 'собирать, сосредоточивать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 781, present: 'συγκινώ', future: 'θα συγκινήσω', aorist: 'συγκίνησα', imperative: 'συγκίνησε / συγκινήστε', translationEN: 'move (emotionally)', translationRU: 'трогать, волновать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 782, present: 'συγκλονίζω', future: 'θα συγκλονίσω', aorist: 'συγκλόνισα', imperative: 'συγκλόνισε / συγκλονίστε', translationEN: 'shake, shock', translationRU: 'потрясать', lexicalCategory: ['lexicalInfluence','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 783, present: 'συγκρατώ', future: 'θα συγκρατήσω', aorist: 'συγκράτησα', imperative: 'συγκράτησε / συγκρατήστε', translationEN: 'restrain, retain', translationRU: 'сдерживать, запоминать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 784, present: 'συγκρίνω', future: null, aorist: 'σύγκρινα', imperative: 'σύγκρινε / συγκρίνετε', translationEN: 'compare', translationRU: 'сравнивать', lexicalCategory: ['lexicalWork','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 785, present: 'συγκρούομαι', future: 'θα συγκρουστώ', aorist: 'συγκρούστηκα', imperative: 'συγκρούσου / συγκρουστείτε', translationEN: 'collide, clash', translationRU: 'сталкиваться', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 786, present: 'συγχωρώ', future: 'θα συγχωρήσω', aorist: 'συγχώρησα', imperative: 'συγχώρησε / συγχωρήστε', translationEN: 'forgive', translationRU: 'прощать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 787, present: 'συζητώ', future: 'θα συζητήσω', aorist: 'συζήτησα', imperative: 'συζήτησε / συζητήστε', translationEN: 'discuss', translationRU: 'обсуждать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 788, present: 'συκοφαντώ', future: 'θα συκοφαντήσω', aorist: 'συκοφάντησα', imperative: 'συκοφάντησε / συκοφαντήστε', translationEN: 'slander', translationRU: 'клеветать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 789, present: 'συλλαμβάνω', future: 'θα συλλάβω', aorist: 'συνέλαβα', imperative: 'σύλλαβε / συλλάβετε', translationEN: 'arrest, conceive', translationRU: 'арестовывать, постигать', lexicalCategory: ['lexicalInfluence','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 790, present: 'συλλέγω', future: 'θα συλλέξω', aorist: 'συνέλεξα', imperative: 'σύλλεξε / συλλέξτε', translationEN: 'collect', translationRU: 'собирать, коллекционировать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 791, present: 'συμβαίνω', future: 'θα συμβώ', aorist: 'συνέβη', imperative: null, translationEN: 'happen', translationRU: 'происходить', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 792, present: 'συμβάλλω', future: 'θα συμβάλω', aorist: 'συνέβαλα', imperative: null, translationEN: 'contribute', translationRU: 'способствовать', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 793, present: 'συμβουλεύομαι', future: 'θα συμβουλευτώ', aorist: 'συμβουλεύτηκα', imperative: 'συμβουλέψου / συμβουλευτείτε', translationEN: 'consult, seek advice', translationRU: 'советоваться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 794, present: 'συμβουλεύω', future: 'θα συμβουλέψω', aorist: 'συμβούλεψα', imperative: 'συμβούλεψε / συμβουλέψτε', translationEN: 'advise', translationRU: 'советовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 795, present: 'συμμετέχω', future: 'θα συμμετάσχω', aorist: 'συμμετείχα', imperative: null, translationEN: 'participate', translationRU: 'участвовать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 796, present: 'συμπαθώ', future: 'θα συμπαθήσω', aorist: 'συμπάθησα', imperative: 'συμπάθησε / συμπαθήστε', translationEN: 'like, sympathize', translationRU: 'симпатизировать, любить', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 797, present: 'συμπεραίνω', future: 'θα συμπεράνω', aorist: 'συμπέρανα', imperative: 'συμπέρανε / συμπεράνετε', translationEN: 'conclude', translationRU: 'делать вывод', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 798, present: 'συμπεριφέρομαι', future: 'θα συμπεριφερθώ', aorist: 'συμπεριφέρθηκα', imperative: 'συμπεριφέρσου / συμπεριφερθείτε', translationEN: 'behave', translationRU: 'вести себя', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 799, present: 'συμπιέζω', future: 'θα συμπιέσω', aorist: 'συμπίεσα', imperative: 'συμπίεσε / συμπιέστε', translationEN: 'compress', translationRU: 'сжимать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 800, present: 'συμπίπτω', future: 'θα συμπέσω', aorist: 'συνέπεσα', imperative: null, translationEN: 'coincide', translationRU: 'совпадать', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 801, present: 'συμπληρώνομαι', future: 'θα συμπληρωθώ', aorist: 'συμπληρώθηκα', imperative: 'συμπληρώσου / συμπληρωθείτε', translationEN: 'be filled in, be completed', translationRU: 'заполняться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 802, present: 'συμπληρώνω', future: 'θα συμπληρώσω', aorist: 'συμπλήρωσα', imperative: 'συμπλήρωσε / συμπληρώστε', translationEN: 'complete, fill in', translationRU: 'заполнять, дополнять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 803, present: 'συμφωνώ', future: 'θα συμφωνήσω', aorist: 'συμφώνησα', imperative: 'συμφώνησε / συμφωνήστε', translationEN: 'agree', translationRU: 'соглашаться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 804, present: 'συναγωνίζομαι', future: 'θα συναγωνιστώ', aorist: 'συναγωνίστηκα', imperative: 'συναγωνίσου / συναγωνιστείτε', translationEN: 'compete', translationRU: 'конкурировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 805, present: 'συναινώ', future: 'θα συναινέσω', aorist: 'συναίνεσα', imperative: 'συναίνεσε / συναινέστε', translationEN: 'consent', translationRU: 'давать согласие', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 806, present: 'συναντιέμαι', future: 'θα συναντηθώ', aorist: 'συναντήθηκα', imperative: 'συναντήσου / συναντηθείτε', translationEN: 'meet (with each other)', translationRU: 'встречаться', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammarMedial']},
    {id: 807, present: 'συναντώ', future: 'θα συναντήσω', aorist: 'συνάντησα', imperative: 'συνάντησε / συναντήστε', translationEN: 'meet, encounter', translationRU: 'встречать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 808, present: 'συναρμολογώ', future: 'θα συναρμολογήσω', aorist: 'συναρμολόγησα', imperative: 'συναρμολόγησε / συναρμολογήστε', translationEN: 'assemble', translationRU: 'собирать (механизм)', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 809, present: 'συνδέω', future: 'θα συνδέσω', aorist: 'σύνδεσα', imperative: 'σύνδεσε / συνδέστε', translationEN: 'connect', translationRU: 'соединять, подключать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 810, present: 'συνδυάζω', future: 'θα συνδυάσω', aorist: 'συνδύασα', imperative: 'συνδύασε / συνδυάστε', translationEN: 'combine', translationRU: 'сочетать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 811, present: 'συνειδητοποιώ', future: 'θα συνειδητοποιήσω', aorist: 'συνειδητοποίησα', imperative: 'συνειδητοποίησε / συνειδητοποιήστε', translationEN: 'realize', translationRU: 'осознавать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 812, present: 'συνεισφέρω', future: null, aorist: 'συνεισέφερα', imperative: 'συνεισέφερε / συνεισεφέρετε', translationEN: 'contribute', translationRU: 'вносить вклад', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 813, present: 'συνεννοούμαι', future: 'θα συνεννοηθώ', aorist: 'συνεννοήθηκα', imperative: 'συνεννοήσου / συνεννοηθείτε', translationEN: 'communicate, come to terms', translationRU: 'договариваться, понимать друг друга', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 814, present: 'συνεργάζομαι', future: 'θα συνεργαστώ', aorist: 'συνεργάστηκα', imperative: 'συνεργάσου / συνεργαστείτε', translationEN: 'cooperate', translationRU: 'сотрудничать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammarMedial']},
    {id: 815, present: 'συνεχίζω', future: 'θα συνεχίσω', aorist: 'συνέχισα', imperative: 'συνέχισε / συνεχίστε', translationEN: 'continue', translationRU: 'продолжать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 816, present: 'συνηθίζω', future: 'θα συνηθίσω', aorist: 'συνήθισα', imperative: 'συνήθισε / συνηθίστε', translationEN: 'get used to', translationRU: 'привыкать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 817, present: 'συνθέτω', future: 'θα συνθέσω', aorist: 'σύνθεσα', imperative: 'σύνθεσε / συνθέστε', translationEN: 'compose, synthesize', translationRU: 'сочинять, составлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 818, present: 'συνιστώ', future: 'θα συστήσω', aorist: 'σύστησα', imperative: 'σύστησε / συστήστε', translationEN: 'recommend', translationRU: 'рекомендовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 819, present: 'συνοδεύω', future: 'θα συνοδεύσω', aorist: 'συνόδευσα', imperative: 'συνόδευσε / συνοδεύστε', translationEN: 'accompany', translationRU: 'сопровождать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 820, present: 'συντάσσω', future: 'θα συντάξω', aorist: 'σύνταξα', imperative: 'σύνταξε / συντάξτε', translationEN: 'draw up, draft', translationRU: 'составлять (документ)', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 821, present: 'συντηρώ', future: 'θα συντηρήσω', aorist: 'συντήρησα', imperative: 'συντήρησε / συντηρήστε', translationEN: 'maintain, support', translationRU: 'содержать, обслуживать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 822, present: 'συντομεύω', future: 'θα συντομεύσω', aorist: 'συντόμευσα', imperative: 'συντόμευσε / συντομεύστε', translationEN: 'shorten, hurry up', translationRU: 'сокращать, ускорять', lexicalCategory: ['lexicalTime','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 823, present: 'συσκευάζω', future: 'θα συσκευάσω', aorist: 'συσκεύασα', imperative: 'συσκεύασε / συσκευάστε', translationEN: 'pack', translationRU: 'упаковывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 824, present: 'συσσωρεύω', future: 'θα συσσωρεύσω', aorist: 'συσσώρευσα', imperative: 'συσσώρευσε / συσσωρεύστε', translationEN: 'accumulate', translationRU: 'накапливать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 825, present: 'συστήνω', future: 'θα συστήσω', aorist: 'σύστησα', imperative: 'σύστησε / συστήστε', translationEN: 'introduce, recommend', translationRU: 'представлять, рекомендовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 826, present: 'συχνάζω', future: 'θα συχνάσω', aorist: 'σύχνασα', imperative: null, translationEN: 'frequent, hang out', translationRU: 'часто бывать', lexicalCategory: ['lexicalSocial','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 827, present: 'σφάζω', future: 'θα σφάξω', aorist: 'έσφαξα', imperative: 'σφάξε / σφάξτε', translationEN: 'slaughter', translationRU: 'резать, забивать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 828, present: 'σφάλλω', future: null, aorist: 'έσφαλα', imperative: 'σφάλε / σφάλτε', translationEN: 'err, make a mistake', translationRU: 'ошибаться', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 829, present: 'σφίγγω', future: 'θα σφίξω', aorist: 'έσφιξα', imperative: 'σφίξε / σφίξτε', translationEN: 'squeeze, tighten', translationRU: 'сжимать, затягивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 830, present: 'σφραγίζω', future: 'θα σφραγίσω', aorist: 'σφράγισα', imperative: 'σφράγισε / σφραγίστε', translationEN: 'seal, stamp', translationRU: 'запечатывать, ставить печать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 831, present: 'σφυρίζω', future: 'θα σφυρίξω', aorist: 'σφύριξα', imperative: 'σφύριξε / σφυρίξτε', translationEN: 'whistle', translationRU: 'свистеть', lexicalCategory: ['lexicalSense','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 832, present: 'σχεδιάζω', future: 'θα σχεδιάσω', aorist: 'σχεδίασα', imperative: 'σχεδίασε / σχεδιάστε', translationEN: 'design, plan', translationRU: 'проектировать, планировать', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 833, present: 'σχετίζομαι', future: 'θα σχετιστώ', aorist: 'σχετίστηκα', imperative: 'σχετίσου / σχετιστείτε', translationEN: 'be related, associate', translationRU: 'быть связанным, общаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 834, present: 'σχηματίζω', future: 'θα σχηματίσω', aorist: 'σχημάτισα', imperative: 'σχημάτισε / σχηματίστε', translationEN: 'form', translationRU: 'образовывать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 835, present: 'σχίζω', future: 'θα σχίσω', aorist: 'έσχισα', imperative: 'σχίσε / σχίστε', translationEN: 'tear, split', translationRU: 'рвать, раскалывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 836, present: 'σχολιάζω', future: 'θα σχολιάσω', aorist: 'σχολίασα', imperative: 'σχολίασε / σχολιάστε', translationEN: 'comment', translationRU: 'комментировать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 837, present: 'σχολώ', future: 'θα σχολάσω', aorist: 'σχόλασα', imperative: 'σχόλασε / σχολάστε', translationEN: 'finish work/school', translationRU: 'заканчивать работу, занятия', lexicalCategory: ['lexicalWork','lexicalTime'], grammaticalCategory: ['grammar2']},
    {id: 838, present: 'σώζομαι', future: 'θα σωθώ', aorist: 'σώθηκα', imperative: 'σώσου / σωθείτε', translationEN: 'be saved, escape', translationRU: 'спасаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 839, present: 'σώζω', future: 'θα σώσω', aorist: 'έσωσα', imperative: 'σώσε / σώστε', translationEN: 'save, rescue', translationRU: 'спасать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 840, present: 'σωπαίνω', future: 'θα σωπάσω', aorist: 'σώπασα', imperative: 'σώπασε / σωπάστε', translationEN: 'fall silent', translationRU: 'умолкать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 841, present: 'ταΐζω', future: 'θα ταΐσω', aorist: 'τάισα', imperative: 'τάισε / ταΐστε', translationEN: 'feed', translationRU: 'кормить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 842, present: 'ταιριάζω', future: 'θα ταιριάξω', aorist: 'ταίριαξα', imperative: 'ταίριαξε / ταιριάξτε', translationEN: 'match, suit', translationRU: 'подходить, сочетаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 843, present: 'ταλαιπωρώ', future: 'θα ταλαιπωρήσω', aorist: 'ταλαιπώρησα', imperative: 'ταλαιπώρησε / ταλαιπωρήστε', translationEN: 'torment, put through hardship', translationRU: 'мучить, изводить', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 844, present: 'ταξιδεύω', future: 'θα ταξιδέψω', aorist: 'ταξίδεψα', imperative: 'ταξίδεψε / ταξιδέψτε', translationEN: 'travel', translationRU: 'путешествовать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 845, present: 'ταπεινώνω', future: 'θα ταπεινώσω', aorist: 'ταπείνωσα', imperative: 'ταπείνωσε / ταπεινώστε', translationEN: 'humiliate', translationRU: 'унижать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 846, present: 'ταράζω', future: 'θα ταράξω', aorist: 'τάραξα', imperative: 'τάραξε / ταράξτε', translationEN: 'disturb, shake', translationRU: 'тревожить, потрясать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 847, present: 'ταυτίζω', future: 'θα ταυτίσω', aorist: 'ταύτισα', imperative: 'ταύτισε / ταυτίστε', translationEN: 'identify (with)', translationRU: 'отождествлять', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 848, present: 'ταχυδρομώ', future: 'θα ταχυδρομήσω', aorist: 'ταχυδρόμησα', imperative: 'ταχυδρόμησε / ταχυδρομήστε', translationEN: 'mail, post', translationRU: 'отправлять по почте', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 849, present: 'τελειοποιώ', future: 'θα τελειοποιήσω', aorist: 'τελειοποίησα', imperative: 'τελειοποίησε / τελειοποιήστε', translationEN: 'perfect', translationRU: 'совершенствовать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 850, present: 'τελειώνω', future: 'θα τελειώσω', aorist: 'τελείωσα', imperative: 'τελείωσε / τελειώστε', translationEN: 'finish', translationRU: 'заканчивать', lexicalCategory: ['lexicalBasic','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 851, present: 'τεντώνω', future: 'θα τεντώσω', aorist: 'τέντωσα', imperative: 'τέντωσε / τεντώστε', translationEN: 'stretch', translationRU: 'растягивать, напрягать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 852, present: 'τερματίζω', future: 'θα τερματίσω', aorist: 'τερμάτισα', imperative: 'τερμάτισε / τερματίστε', translationEN: 'end, finish', translationRU: 'завершать, финишировать', lexicalCategory: ['lexicalTime','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 853, present: 'τηλεφωνώ', future: 'θα τηλεφωνήσω', aorist: 'τηλεφώνησα', imperative: 'τηλεφώνησε / τηλεφωνήστε', translationEN: 'phone, call', translationRU: 'звонить', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 854, present: 'τηρώ', future: 'θα τηρήσω', aorist: 'τήρησα', imperative: 'τήρησε / τηρήστε', translationEN: 'observe, comply with', translationRU: 'соблюдать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 855, present: 'τιμώ', future: 'θα τιμήσω', aorist: 'τίμησα', imperative: 'τίμησε / τιμήστε', translationEN: 'honor', translationRU: 'чтить, почитать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 856, present: 'τιμωρώ', future: 'θα τιμωρήσω', aorist: 'τιμώρησα', imperative: 'τιμώρησε / τιμωρήστε', translationEN: 'punish', translationRU: 'наказывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 857, present: 'τινάζω', future: 'θα τινάξω', aorist: 'τίναξα', imperative: 'τίναξε / τινάξτε', translationEN: 'shake off', translationRU: 'стряхивать, встряхивать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 858, present: 'τολμώ', future: 'θα τολμήσω', aorist: 'τόλμησα', imperative: 'τόλμησε / τολμήστε', translationEN: 'dare', translationRU: 'осмеливаться', lexicalCategory: ['lexicalState','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 859, present: 'τονίζω', future: 'θα τονίσω', aorist: 'τόνισα', imperative: 'τόνισε / τονίστε', translationEN: 'stress, emphasize', translationRU: 'подчёркивать, ставить ударение', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 860, present: 'τοποθετώ', future: 'θα τοποθετήσω', aorist: 'τοποθέτησα', imperative: 'τοποθέτησε / τοποθετήστε', translationEN: 'place, position', translationRU: 'помещать, размещать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 861, present: 'τραβώ', future: 'θα τραβήξω', aorist: 'τράβηξα', imperative: 'τράβηξε / τραβήξτε', translationEN: 'pull, take (photo)', translationRU: 'тянуть, снимать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 862, present: 'τραγουδώ', future: 'θα τραγουδήσω', aorist: 'τραγούδησα', imperative: 'τραγούδησε / τραγουδήστε', translationEN: 'sing', translationRU: 'петь', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 863, present: 'τρακάρω', future: null, aorist: 'τράκαρα', imperative: null, translationEN: 'crash, collide', translationRU: 'врезаться, попасть в аварию', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 864, present: 'τραυματίζω', future: 'θα τραυματίσω', aorist: 'τραυμάτισα', imperative: 'τραυμάτισε / τραυματίστε', translationEN: 'injure', translationRU: 'ранить, травмировать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 865, present: 'τρελαίνω', future: 'θα τρελάνω', aorist: 'τρέλανα', imperative: 'τρέλανε / τρελάνετε', translationEN: 'drive crazy', translationRU: 'сводить с ума', lexicalCategory: ['lexicalHealth','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 866, present: 'τρέμω', future: null, aorist: 'έτρεμα', imperative: null, translationEN: 'tremble', translationRU: 'дрожать', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 867, present: 'τρέφω', future: 'θα θρέψω', aorist: 'έθρεψα', imperative: 'θρέψε / θρέψτε', translationEN: 'feed, nourish', translationRU: 'кормить, питать', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 868, present: 'τρέχω', future: 'θα τρέξω', aorist: 'έτρεξα', imperative: 'τρέξε / τρέξτε', translationEN: 'run', translationRU: 'бежать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 869, present: 'τρίβω', future: 'θα τρίψω', aorist: 'έτριψα', imperative: 'τρίψε / τρίψτε', translationEN: 'rub, grate', translationRU: 'тереть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 870, present: 'τριγυρίζω', future: 'θα τριγυρίσω', aorist: 'τριγύρισα', imperative: 'τριγύρισε / τριγυρίστε', translationEN: 'wander around', translationRU: 'бродить, слоняться', lexicalCategory: ['lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 871, present: 'τρομάζω', future: 'θα τρομάξω', aorist: 'τρόμαξα', imperative: 'τρόμαξε / τρομάξτε', translationEN: 'scare, get scared', translationRU: 'пугать, пугаться', lexicalCategory: ['lexicalState','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 872, present: 'τρομοκρατώ', future: 'θα τρομοκρατήσω', aorist: 'τρομοκράτησα', imperative: 'τρομοκράτησε / τρομοκρατήστε', translationEN: 'terrorize', translationRU: 'терроризировать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 873, present: 'τροποποιώ', future: 'θα τροποποιήσω', aorist: 'τροποποίησα', imperative: 'τροποποίησε / τροποποιήστε', translationEN: 'modify', translationRU: 'изменять, видоизменять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 874, present: 'τροφοδοτώ', future: 'θα τροφοδοτήσω', aorist: 'τροφοδότησα', imperative: 'τροφοδότησε / τροφοδοτήστε', translationEN: 'supply, feed', translationRU: 'снабжать, питать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 875, present: 'τρυπώ', future: 'θα τρυπήσω', aorist: 'τρύπησα', imperative: 'τρύπησε / τρυπήστε', translationEN: 'pierce, make a hole', translationRU: 'прокалывать, сверлить', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 876, present: 'τρώω', future: 'θα φάω', aorist: 'έφαγα', imperative: 'φάε / φάτε', translationEN: 'eat', translationRU: 'есть, кушать', lexicalCategory: ['lexicalBasic','lexicalHealth'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 877, present: 'τσακώνομαι', future: 'θα τσακωθώ', aorist: 'τσακώθηκα', imperative: 'τσακώσου / τσακωθείτε', translationEN: 'quarrel', translationRU: 'ссориться', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 878, present: 'τσαλακώνω', future: 'θα τσαλακώσω', aorist: 'τσαλάκωσα', imperative: 'τσαλάκωσε / τσαλακώστε', translationEN: 'crumple', translationRU: 'мять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 879, present: 'τσιμπώ', future: 'θα τσιμπήσω', aorist: 'τσίμπησα', imperative: 'τσίμπησε / τσιμπήστε', translationEN: 'pinch, sting', translationRU: 'щипать, кусать (о насекомых)', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 880, present: 'τσιρίζω', future: 'θα τσιρίξω', aorist: 'τσίριξα', imperative: 'τσίριξε / τσιρίξτε', translationEN: 'scream, shriek', translationRU: 'визжать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 881, present: 'τσουγκρίζω', future: 'θα τσουγκρίσω', aorist: 'τσούγκρισα', imperative: 'τσούγκρισε / τσουγκρίστε', translationEN: 'clink (glasses)', translationRU: 'чокаться', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 882, present: 'τυλίγω', future: 'θα τυλίξω', aorist: 'τύλιξα', imperative: 'τύλιξε / τυλίξτε', translationEN: 'wrap', translationRU: 'заворачивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 883, present: 'τυπώνω', future: 'θα τυπώσω', aorist: 'τύπωσα', imperative: 'τύπωσε / τυπώστε', translationEN: 'print', translationRU: 'печатать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 884, present: 'τυραννώ', future: 'θα τυραννήσω', aorist: 'τυράννησα', imperative: 'τυράννησε / τυραννήστε', translationEN: 'torment, tyrannize', translationRU: 'мучить, тиранить', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 885, present: 'τυφλώνω', future: 'θα τυφλώσω', aorist: 'τύφλωσα', imperative: 'τύφλωσε / τυφλώστε', translationEN: 'blind', translationRU: 'ослеплять', lexicalCategory: ['lexicalSense','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 886, present: 'τυχαίνω', future: 'θα τύχω', aorist: 'έτυχα', imperative: null, translationEN: 'happen (to be)', translationRU: 'случаться, оказываться', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 887, present: 'υιοθετώ', future: 'θα υιοθετήσω', aorist: 'υιοθέτησα', imperative: 'υιοθέτησε / υιοθετήστε', translationEN: 'adopt', translationRU: 'усыновлять, принимать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 888, present: 'υπαινίσσομαι', future: 'θα υπαινιχθώ', aorist: 'υπαινίχθηκα', imperative: null, translationEN: 'hint, insinuate', translationRU: 'намекать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 889, present: 'υπακούω', future: 'θα υπακούσω', aorist: 'υπάκουσα', imperative: 'υπάκουσε / υπακούστε', translationEN: 'obey', translationRU: 'слушаться, повиноваться', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 890, present: 'υπάρχω', future: 'θα υπάρξω', aorist: 'υπήρξα', imperative: null, translationEN: 'exist', translationRU: 'существовать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 891, present: 'υπενθυμίζω', future: 'θα υπενθυμίσω', aorist: 'υπενθύμισα', imperative: 'υπενθύμισε / υπενθυμίστε', translationEN: 'remind', translationRU: 'напоминать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 892, present: 'υπερασπίζομαι', future: 'θα υπερασπιστώ', aorist: 'υπερασπίστηκα', imperative: 'υπερασπίσου / υπερασπιστείτε', translationEN: 'defend', translationRU: 'защищать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 893, present: 'υπερβάλλω', future: 'θα υπερβάλω', aorist: 'υπερέβαλα', imperative: null, translationEN: 'exaggerate', translationRU: 'преувеличивать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 894, present: 'υπηρετώ', future: 'θα υπηρετήσω', aorist: 'υπηρέτησα', imperative: 'υπηρέτησε / υπηρετήστε', translationEN: 'serve', translationRU: 'служить', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 895, present: 'υποβάλλω', future: 'θα υποβάλω', aorist: 'υπέβαλα', imperative: 'υπόβαλε / υποβάλετε', translationEN: 'submit, subject', translationRU: 'подавать, подвергать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 896, present: 'υπογραμμίζω', future: 'θα υπογραμμίσω', aorist: 'υπογράμμισα', imperative: 'υπογράμμισε / υπογραμμίστε', translationEN: 'underline, stress', translationRU: 'подчёркивать', lexicalCategory: ['lexicalSocial','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 897, present: 'υπογράφω', future: 'θα υπογράψω', aorist: 'υπέγραψα', imperative: 'υπόγραψε / υπογράψτε', translationEN: 'sign', translationRU: 'подписывать', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 898, present: 'υποδέχομαι', future: 'θα υποδεχτώ', aorist: 'υποδέχτηκα', imperative: 'υποδέξου / υποδεχτείτε', translationEN: 'welcome, receive', translationRU: 'встречать, принимать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 899, present: 'υποθέτω', future: 'θα υποθέσω', aorist: 'υπέθεσα', imperative: 'υπόθεσε / υποθέστε', translationEN: 'suppose', translationRU: 'предполагать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 900, present: 'υπολογίζω', future: 'θα υπολογίσω', aorist: 'υπολόγισα', imperative: 'υπολόγισε / υπολογίστε', translationEN: 'calculate, count on', translationRU: 'вычислять, рассчитывать', lexicalCategory: ['lexicalWork','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 901, present: 'υπομένω', future: 'θα υπομείνω', aorist: 'υπέμεινα', imperative: 'υπόμεινε / υπομείνετε', translationEN: 'endure, bear', translationRU: 'терпеть, выдерживать', lexicalCategory: ['lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 902, present: 'υπονομεύω', future: 'θα υπονομεύσω', aorist: 'υπονόμευσα', imperative: 'υπονόμευσε / υπονομεύστε', translationEN: 'undermine', translationRU: 'подрывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 903, present: 'υπονοώ', future: 'θα υπονοήσω', aorist: 'υπονόησα', imperative: 'υπονόησε / υπονοήστε', translationEN: 'imply', translationRU: 'намекать, подразумевать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 904, present: 'υποστηρίζω', future: 'θα υποστηρίξω', aorist: 'υποστήριξα', imperative: 'υποστήριξε / υποστηρίξτε', translationEN: 'support, claim', translationRU: 'поддерживать, утверждать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 905, present: 'υποσχόμαι', future: 'θα υποσχεθώ', aorist: 'υποσχέθηκα', imperative: 'υποσχέσου / υποσχεθείτε', translationEN: 'promise', translationRU: 'обещать', lexicalCategory: ['lexicalSocial','lexicalTime'], grammaticalCategory: ['grammarMedial']},
    {id: 906, present: 'υποτιμώ', future: 'θα υποτιμήσω', aorist: 'υποτίμησα', imperative: 'υποτίμησε / υποτιμήστε', translationEN: 'underestimate', translationRU: 'недооценивать', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 907, present: 'υποφέρω', future: null, aorist: 'υπέφερα', imperative: null, translationEN: 'suffer', translationRU: 'страдать, терпеть', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 908, present: 'υποχρεώνομαι', future: 'θα υποχρεωθώ', aorist: 'υποχρεώθηκα', imperative: 'υποχρεώσου / υποχρεωθείτε', translationEN: 'be obliged', translationRU: 'быть обязанным', lexicalCategory: ['lexicalState','lexicalSocial'], grammaticalCategory: ['grammarMedial']},
    {id: 909, present: 'υποχρεώνω', future: 'θα υποχρεώσω', aorist: 'υποχρέωσα', imperative: 'υποχρέωσε / υποχρεώστε', translationEN: 'oblige', translationRU: 'обязывать', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 910, present: 'υποχωρώ', future: 'θα υποχωρήσω', aorist: 'υποχώρησα', imperative: 'υποχώρησε / υποχωρήστε', translationEN: 'retreat, give in', translationRU: 'отступать, уступать', lexicalCategory: ['lexicalMotion','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 911, present: 'υποψιάζομαι', future: 'θα υποψιαστώ', aorist: 'υποψιάστηκα', imperative: 'υποψιάσου / υποψιαστείτε', translationEN: 'suspect', translationRU: 'подозревать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
    {id: 912, present: 'υστερώ', future: 'θα υστερήσω', aorist: 'υστέρησα', imperative: 'υστέρησε / υστερήστε', translationEN: 'lag behind, fall short', translationRU: 'отставать', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 913, present: 'υψώνω', future: 'θα υψώσω', aorist: 'ύψωσα', imperative: 'ύψωσε / υψώστε', translationEN: 'raise, erect', translationRU: 'поднимать, воздвигать', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 914, present: 'φαίνομαι', future: 'θα φανώ', aorist: 'φάνηκα', imperative: null, translationEN: 'seem, appear', translationRU: 'казаться, виднеться', lexicalCategory: ['lexicalBasic','lexicalSense'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 915, present: 'φαντάζομαι', future: 'θα φανταστώ', aorist: 'φαντάστηκα', imperative: 'φαντάσου / φανταστείτε', translationEN: 'imagine', translationRU: 'воображать', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammarMedial']},
    {id: 916, present: 'φέρνω', future: 'θα φέρω', aorist: 'έφερα', imperative: 'φέρε / φέρτε', translationEN: 'bring', translationRU: 'приносить, приводить', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1','grammarIrregular']},
    {id: 917, present: 'φέρομαι', future: 'θα φερθώ', aorist: 'φέρθηκα', imperative: 'φέρσου / φερθείτε', translationEN: 'behave, treat', translationRU: 'вести себя, обращаться', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 918, present: 'φεύγω', future: 'θα φύγω', aorist: 'έφυγα', imperative: 'φύγε / φύγετε', translationEN: 'leave, go away', translationRU: 'уходить, уезжать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 919, present: 'φθάνω', future: 'θα φτάσω', aorist: 'έφτασα', imperative: 'φτάσε / φτάστε', translationEN: 'arrive, reach, suffice', translationRU: 'прибывать, достигать, хватать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 920, present: 'φθονώ', future: 'θα φθονήσω', aorist: 'φθόνησα', imperative: null, translationEN: 'envy', translationRU: 'завидовать', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 921, present: 'φιλοδοξώ', future: 'θα φιλοδοξήσω', aorist: 'φιλοδόξησα', imperative: null, translationEN: 'aspire', translationRU: 'стремиться, питать амбиции', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar2']},
    {id: 922, present: 'φιλοξενώ', future: 'θα φιλοξενήσω', aorist: 'φιλοξένησα', imperative: 'φιλοξένησε / φιλοξενήστε', translationEN: 'host, accommodate', translationRU: 'принимать гостей', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 923, present: 'φιλώ', future: 'θα φιλήσω', aorist: 'φίλησα', imperative: 'φίλησε / φιλήστε', translationEN: 'kiss', translationRU: 'целовать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 924, present: 'φλερτάρω', future: null, aorist: 'φλέρταρα', imperative: 'φλέρταρε / φλερτάρετε', translationEN: 'flirt', translationRU: 'флиртовать', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 925, present: 'φλυαρώ', future: 'θα φλυαρήσω', aorist: 'φλυάρησα', imperative: 'φλυάρησε / φλυαρήστε', translationEN: 'chatter', translationRU: 'болтать, пустословить', lexicalCategory: ['lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 926, present: 'φοβάμαι', future: 'θα φοβηθώ', aorist: 'φοβήθηκα', imperative: 'φοβήσου / φοβηθείτε', translationEN: 'fear, be afraid', translationRU: 'бояться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 927, present: 'φοβίζω', future: 'θα φοβίσω', aorist: 'φόβισα', imperative: 'φόβισε / φοβίστε', translationEN: 'frighten', translationRU: 'пугать', lexicalCategory: ['lexicalInfluence','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 928, present: 'φοιτώ', future: 'θα φοιτήσω', aorist: 'φοίτησα', imperative: null, translationEN: 'attend (school)', translationRU: 'учиться, посещать (учебное заведение)', lexicalCategory: ['lexicalWork','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 929, present: 'φονεύω', future: 'θα φονεύσω', aorist: 'φόνευσα', imperative: 'φόνευσε / φονεύστε', translationEN: 'murder', translationRU: 'убивать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 930, present: 'φορολογώ', future: 'θα φορολογήσω', aorist: 'φορολόγησα', imperative: 'φορολόγησε / φορολογήστε', translationEN: 'tax', translationRU: 'облагать налогом', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 931, present: 'φορτίζω', future: 'θα φορτίσω', aorist: 'φόρτισα', imperative: 'φόρτισε / φορτίστε', translationEN: 'charge (battery)', translationRU: 'заряжать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 932, present: 'φορτώνω', future: 'θα φορτώσω', aorist: 'φόρτωσα', imperative: 'φόρτωσε / φορτώστε', translationEN: 'load', translationRU: 'грузить, нагружать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 933, present: 'φορώ', future: 'θα φορέσω', aorist: 'φόρεσα', imperative: 'φόρεσε / φορέστε', translationEN: 'wear, put on', translationRU: 'носить, надевать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 934, present: 'φουσκώνω', future: 'θα φουσκώσω', aorist: 'φούσκωσα', imperative: 'φούσκωσε / φουσκώστε', translationEN: 'inflate, swell', translationRU: 'надувать, раздуваться', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 935, present: 'φρενάρω', future: null, aorist: 'φρέναρα', imperative: 'φρέναρε / φρενάρετε', translationEN: 'brake', translationRU: 'тормозить', lexicalCategory: ['lexicalMotion','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 936, present: 'φροντίζομαι', future: 'θα φροντιστώ', aorist: 'φροντίστηκα', imperative: 'φροντίσου / φροντιστείτε', translationEN: 'be looked after', translationRU: 'быть под присмотром', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 937, present: 'φροντίζω', future: 'θα φροντίσω', aorist: 'φρόντισα', imperative: 'φρόντισε / φροντίστε', translationEN: 'take care of, see to', translationRU: 'заботиться, позаботиться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 938, present: 'φρυγανίζω', future: 'θα φρυγανίσω', aorist: 'φρυγάνισα', imperative: 'φρυγάνισε / φρυγανίστε', translationEN: 'toast', translationRU: 'поджаривать (хлеб)', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 939, present: 'φτάνω', future: 'θα φτάσω', aorist: 'έφτασα', imperative: 'φτάσε / φτάστε', translationEN: 'arrive, reach', translationRU: 'приезжать, достигать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 940, present: 'φτερνίζομαι', future: 'θα φτερνιστώ', aorist: 'φτερνίστηκα', imperative: null, translationEN: 'sneeze', translationRU: 'чихать', lexicalCategory: ['lexicalHealth'], grammaticalCategory: ['grammarMedial']},
    {id: 941, present: 'φτιάχνω', future: 'θα φτιάξω', aorist: 'έφτιαξα', imperative: 'φτιάξε / φτιάξτε', translationEN: 'make, fix', translationRU: 'делать, чинить', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 942, present: 'φτύνω', future: 'θα φτύσω', aorist: 'έφτυσα', imperative: 'φτύσε / φτύστε', translationEN: 'spit', translationRU: 'плевать', lexicalCategory: ['lexicalAction','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 943, present: 'φτωχαίνω', future: 'θα φτωχύνω', aorist: 'φτώχυνα', imperative: null, translationEN: 'become poor', translationRU: 'беднеть', lexicalCategory: ['lexicalState','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 944, present: 'φυλακίζω', future: 'θα φυλακίσω', aorist: 'φυλάκισα', imperative: 'φυλάκισε / φυλακίστε', translationEN: 'imprison', translationRU: 'сажать в тюрьму', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 945, present: 'φυλάω', future: 'θα φυλάξω', aorist: 'φύλαξα', imperative: 'φύλαξε / φυλάξτε', translationEN: 'guard, keep', translationRU: 'охранять, хранить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 946, present: 'φυσώ', future: 'θα φυσήξω', aorist: 'φύσηξα', imperative: 'φύσηξε / φυσήξτε', translationEN: 'blow', translationRU: 'дуть', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 947, present: 'φυτεύω', future: 'θα φυτέψω', aorist: 'φύτεψα', imperative: 'φύτεψε / φυτέψτε', translationEN: 'plant', translationRU: 'сажать', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 948, present: 'φυτρώνω', future: 'θα φυτρώσω', aorist: 'φύτρωσα', imperative: null, translationEN: 'sprout', translationRU: 'прорастать', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 949, present: 'φωνάζω', future: 'θα φωνάξω', aorist: 'φώναξα', imperative: 'φώναξε / φωνάξτε', translationEN: 'shout, call', translationRU: 'кричать, звать', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 950, present: 'φωτίζω', future: 'θα φωτίσω', aorist: 'φώτισα', imperative: 'φώτισε / φωτίστε', translationEN: 'illuminate', translationRU: 'освещать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 951, present: 'φωτογραφίζω', future: 'θα φωτογραφίσω', aorist: 'φωτογράφισα', imperative: 'φωτογράφισε / φωτογραφίστε', translationEN: 'photograph', translationRU: 'фотографировать', lexicalCategory: ['lexicalSense','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 952, present: 'χαϊδεύω', future: 'θα χαϊδέψω', aorist: 'χαΐδεψα', imperative: 'χαΐδεψε / χαϊδέψτε', translationEN: 'caress, pet', translationRU: 'ласкать, гладить', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 953, present: 'χαιρετώ', future: 'θα χαιρετήσω', aorist: 'χαιρέτησα', imperative: 'χαιρέτησε / χαιρετήστε', translationEN: 'greet', translationRU: 'приветствовать, здороваться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 954, present: 'χαίρομαι', future: 'θα χαρώ', aorist: 'χάρηκα', imperative: 'χάρου / χαρείτε', translationEN: 'be glad', translationRU: 'радоваться', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial','grammarIrregular']},
    {id: 955, present: 'χαλαρώνω', future: 'θα χαλαρώσω', aorist: 'χαλάρωσα', imperative: 'χαλάρωσε / χαλαρώστε', translationEN: 'relax, loosen', translationRU: 'расслабляться, ослаблять', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 956, present: 'χαλώ', future: 'θα χαλάσω', aorist: 'χάλασα', imperative: 'χάλασε / χαλάστε', translationEN: 'spoil, break', translationRU: 'портить, ломать', lexicalCategory: ['lexicalAction','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 957, present: 'χαμηλώνω', future: 'θα χαμηλώσω', aorist: 'χαμήλωσα', imperative: 'χαμήλωσε / χαμηλώστε', translationEN: 'lower', translationRU: 'понижать, убавлять', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 958, present: 'χαμογελώ', future: 'θα χαμογελάσω', aorist: 'χαμογέλασα', imperative: 'χαμογέλασε / χαμογελάστε', translationEN: 'smile', translationRU: 'улыбаться', lexicalCategory: ['lexicalBasic','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 959, present: 'χάνομαι', future: 'θα χαθώ', aorist: 'χάθηκα', imperative: 'χάσου / χαθείτε', translationEN: 'get lost, disappear', translationRU: 'теряться, пропадать', lexicalCategory: ['lexicalMotion','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 960, present: 'χάνω', future: 'θα χάσω', aorist: 'έχασα', imperative: 'χάσε / χάστε', translationEN: 'lose, miss', translationRU: 'терять, пропускать', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 961, present: 'χαράζω', future: 'θα χαράξω', aorist: 'χάραξα', imperative: 'χάραξε / χαράξτε', translationEN: 'engrave, draw (a line)', translationRU: 'гравировать, прочерчивать', lexicalCategory: ['lexicalAction','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 962, present: 'χαρακτηρίζω', future: 'θα χαρακτηρίσω', aorist: 'χαρακτήρισα', imperative: 'χαρακτήρισε / χαρακτηρίστε', translationEN: 'characterize', translationRU: 'характеризовать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 963, present: 'χαρίζω', future: 'θα χαρίσω', aorist: 'χάρισα', imperative: 'χάρισε / χαρίστε', translationEN: 'give (as a gift), forgive', translationRU: 'дарить, прощать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 964, present: 'χασομερώ', future: 'θα χασομερήσω', aorist: 'χασομέρησα', imperative: 'χασομέρησε / χασομερήστε', translationEN: 'waste time', translationRU: 'зря терять время', lexicalCategory: ['lexicalTime','lexicalState'], grammaticalCategory: ['grammar2']},
    {id: 965, present: 'χειραγωγώ', future: 'θα χειραγωγήσω', aorist: 'χειραγώγησα', imperative: 'χειραγώγησε / χειραγωγήστε', translationEN: 'manipulate, guide', translationRU: 'манипулировать, вести за руку', lexicalCategory: ['lexicalInfluence','lexicalSocial'], grammaticalCategory: ['grammar2']},
    {id: 966, present: 'χειρίζομαι', future: 'θα χειριστώ', aorist: 'χειρίστηκα', imperative: 'χειρίσου / χειριστείτε', translationEN: 'handle, operate', translationRU: 'обращаться, управлять', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 967, present: 'χειροκροτώ', future: 'θα χειροκροτήσω', aorist: 'χειροκρότησα', imperative: 'χειροκρότησε / χειροκροτήστε', translationEN: 'applaud', translationRU: 'аплодировать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 968, present: 'χειροτερεύω', future: 'θα χειροτερέψω', aorist: 'χειροτέρεψα', imperative: null, translationEN: 'worsen', translationRU: 'ухудшаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 969, present: 'χιονίζω', future: 'θα χιονίσω', aorist: 'χιόνισα', imperative: null, translationEN: 'snow', translationRU: 'идти (о снеге)', lexicalCategory: ['lexicalState','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 970, present: 'χλευάζω', future: 'θα χλευάσω', aorist: 'χλεύασα', imperative: 'χλεύασε / χλευάστε', translationEN: 'mock', translationRU: 'высмеивать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 971, present: 'χλωμιάζω', future: 'θα χλωμιάσω', aorist: 'χλώμιασα', imperative: null, translationEN: 'turn pale', translationRU: 'бледнеть', lexicalCategory: ['lexicalHealth','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 972, present: 'χορεύω', future: 'θα χορέψω', aorist: 'χόρεψα', imperative: 'χόρεψε / χορέψτε', translationEN: 'dance', translationRU: 'танцевать', lexicalCategory: ['lexicalBasic','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 973, present: 'χορταίνω', future: 'θα χορτάσω', aorist: 'χόρτασα', imperative: 'χόρτασε / χορτάστε', translationEN: 'be full, satisfy hunger', translationRU: 'насыщаться, наедаться', lexicalCategory: ['lexicalHealth','lexicalState'], grammaticalCategory: ['grammar1']},
    {id: 974, present: 'χρειάζομαι', future: 'θα χρειαστώ', aorist: 'χρειάστηκα', imperative: null, translationEN: 'need', translationRU: 'нуждаться, быть нужным', lexicalCategory: ['lexicalBasic','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 975, present: 'χρεώνω', future: 'θα χρεώσω', aorist: 'χρέωσα', imperative: 'χρέωσε / χρεώστε', translationEN: 'charge, debit', translationRU: 'взимать плату, записывать в долг', lexicalCategory: ['lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 976, present: 'χρηματοδοτώ', future: 'θα χρηματοδοτήσω', aorist: 'χρηματοδότησα', imperative: 'χρηματοδότησε / χρηματοδοτήστε', translationEN: 'finance, fund', translationRU: 'финансировать', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 977, present: 'χρησιμοποιώ', future: 'θα χρησιμοποιήσω', aorist: 'χρησιμοποίησα', imperative: 'χρησιμοποίησε / χρησιμοποιήστε', translationEN: 'use', translationRU: 'использовать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 978, present: 'χρωματίζω', future: 'θα χρωματίσω', aorist: 'χρωμάτισα', imperative: 'χρωμάτισε / χρωματίστε', translationEN: 'color', translationRU: 'раскрашивать', lexicalCategory: ['lexicalAction','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 979, present: 'χτενίζομαι', future: 'θα χτενιστώ', aorist: 'χτενίστηκα', imperative: 'χτενίσου / χτενιστείτε', translationEN: 'comb one\'s hair', translationRU: 'расчёсываться', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 980, present: 'χτενίζω', future: 'θα χτενίσω', aorist: 'χτένισα', imperative: 'χτένισε / χτενίστε', translationEN: 'comb', translationRU: 'причёсывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 981, present: 'χτίζω', future: 'θα χτίσω', aorist: 'έχτισα', imperative: 'χτίσε / χτίστε', translationEN: 'build', translationRU: 'строить', lexicalCategory: ['lexicalWork','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 982, present: 'χτυπιέμαι', future: 'θα χτυπηθώ', aorist: 'χτυπήθηκα', imperative: 'χτυπήσου / χτυπηθείτε', translationEN: 'get hit, hit oneself', translationRU: 'быть побитым, биться', lexicalCategory: ['lexicalHealth','lexicalAction'], grammaticalCategory: ['grammarMedial']},
    {id: 983, present: 'χτυπώ', future: 'θα χτυπήσω', aorist: 'χτύπησα', imperative: 'χτύπησε / χτυπήστε', translationEN: 'hit, ring, knock', translationRU: 'бить, звонить, стучать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 984, present: 'χύνω', future: 'θα χύσω', aorist: 'έχυσα', imperative: 'χύσε / χύστε', translationEN: 'pour, spill', translationRU: 'лить, проливать', lexicalCategory: ['lexicalAction','lexicalMotion'], grammaticalCategory: ['grammar1']},
    {id: 985, present: 'χωνεύω', future: 'θα χωνέψω', aorist: 'χώνεψα', imperative: 'χώνεψε / χωνέψτε', translationEN: 'digest, stand (someone)', translationRU: 'переваривать, терпеть (кого-л.)', lexicalCategory: ['lexicalHealth','lexicalSocial'], grammaticalCategory: ['grammar1']},
    {id: 986, present: 'χώνω', future: 'θα χώσω', aorist: 'έχωσα', imperative: 'χώσε / χώστε', translationEN: 'shove, stick in', translationRU: 'совать, засовывать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 987, present: 'χωρίζω', future: 'θα χωρίσω', aorist: 'χώρισα', imperative: 'χώρισε / χωρίστε', translationEN: 'separate, divorce', translationRU: 'разделять, расставаться', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 988, present: 'χωρώ', future: 'θα χωρέσω', aorist: 'χώρεσα', imperative: null, translationEN: 'fit, have room', translationRU: 'вмещаться, помещаться', lexicalCategory: ['lexicalState','lexicalSense'], grammaticalCategory: ['grammar2']},
    {id: 989, present: 'ψάχνω', future: 'θα ψάξω', aorist: 'έψαξα', imperative: 'ψάξε / ψάξτε', translationEN: 'search, look for', translationRU: 'искать', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 990, present: 'ψεκάζω', future: 'θα ψεκάσω', aorist: 'ψέκασα', imperative: 'ψέκασε / ψεκάστε', translationEN: 'spray', translationRU: 'опрыскивать', lexicalCategory: ['lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 991, present: 'ψηλώνω', future: 'θα ψηλώσω', aorist: 'ψήλωσα', imperative: null, translationEN: 'grow tall', translationRU: 'вырастать, становиться выше', lexicalCategory: ['lexicalHealth','lexicalTime'], grammaticalCategory: ['grammar1']},
    {id: 992, present: 'ψήνω', future: 'θα ψήσω', aorist: 'έψησα', imperative: 'ψήσε / ψήστε', translationEN: 'bake, roast, grill', translationRU: 'печь, жарить', lexicalCategory: ['lexicalBasic','lexicalAction'], grammaticalCategory: ['grammar1']},
    {id: 993, present: 'ψηφίζω', future: 'θα ψηφίσω', aorist: 'ψήφισα', imperative: 'ψήφισε / ψηφίστε', translationEN: 'vote', translationRU: 'голосовать', lexicalCategory: ['lexicalSocial','lexicalInfluence'], grammaticalCategory: ['grammar1']},
    {id: 994, present: 'ψιθυρίζω', future: 'θα ψιθυρίσω', aorist: 'ψιθύρισα', imperative: 'ψιθύρισε / ψιθυρίστε', translationEN: 'whisper', translationRU: 'шептать', lexicalCategory: ['lexicalSocial','lexicalSense'], grammaticalCategory: ['grammar1']},
    {id: 995, present: 'ψυχαγωγώ', future: 'θα ψυχαγωγήσω', aorist: 'ψυχαγώγησα', imperative: 'ψυχαγώγησε / ψυχαγωγήστε', translationEN: 'entertain', translationRU: 'развлекать', lexicalCategory: ['lexicalSocial','lexicalAction'], grammaticalCategory: ['grammar2']},
    {id: 996, present: 'ψωνίζω', future: 'θα ψωνίσω', aorist: 'ψώνισα', imperative: 'ψώνισε / ψωνίστε', translationEN: 'shop', translationRU: 'делать покупки', lexicalCategory: ['lexicalBasic','lexicalWork'], grammaticalCategory: ['grammar1']},
    {id: 997, present: 'ωθώ', future: 'θα ωθήσω', aorist: 'ώθησα', imperative: 'ώθησε / ωθήστε', translationEN: 'push, urge', translationRU: 'подталкивать, побуждать', lexicalCategory: ['lexicalMotion','lexicalInfluence'], grammaticalCategory: ['grammar2']},
    {id: 998, present: 'ωριμάζω', future: 'θα ωριμάσω', aorist: 'ώριμασα', imperative: null, translationEN: 'ripen, mature', translationRU: 'созревать, взрослеть', lexicalCategory: ['lexicalTime','lexicalHealth'], grammaticalCategory: ['grammar1']},
    {id: 999, present: 'ωφελούμαι', future: 'θα ωφεληθώ', aorist: 'ωφελήθηκα', imperative: 'ωφελήσου / ωφεληθείτε', translationEN: 'benefit, profit', translationRU: 'получать пользу', lexicalCategory: ['lexicalSocial','lexicalState'], grammaticalCategory: ['grammarMedial']},
    {id: 1000, present: 'ωφελώ', future: 'θα ωφελήσω', aorist: 'ωφέλησα', imperative: 'ωφέλησε / ωφελήστε', translationEN: 'benefit, be of use', translationRU: 'приносить пользу', lexicalCategory: ['lexicalWork','lexicalInfluence'], grammaticalCategory: ['grammar2']}
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
    color: #333;
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