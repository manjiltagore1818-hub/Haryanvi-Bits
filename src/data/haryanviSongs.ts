import { Song, Playlist, GlossaryItem } from '../types/music';

export const HARYANVI_SONGS: Song[] = [
  {
    id: 'song-1',
    title: '52 Gaj Ka Daman',
    hindiTitle: '52 गज का दामन',
    artist: 'Renuka Panwar',
    starring: 'Pranjal Dahiya & Aman Jaji',
    musicDirector: 'Aman Jaji',
    category: 'dj_blast',
    year: 2020,
    duration: 184,
    plays: '1.6B+',
    moodTag: 'Party & Dance',
    funFact: 'Crossed 1 Billion views in record time; Pranjal Dahiya\'s traditional dance moves became a global trend.',
    coverGradient: {
      from: 'from-amber-600',
      via: 'via-rose-600',
      to: 'to-purple-900',
      accent: '#f59e0b',
      icon: 'dancer'
    },
    audioProfile: {
      bpm: 126,
      rootFreq: 261.63, // C4
      scale: [0, 2, 4, 5, 7, 9, 11],
      rhythmStyle: 'wedding_bhangra',
      leadPattern: [0, 2, 4, 5, 7, 7, 5, 4, 2, 0, 2, 4, 2, 0, 0, -1],
      bassNoteFreq: 65.41
    },
    lyrics: [
      { time: 0, text: 'Aapna roop sajaun gi, baavan gaj ka daman pehar matak ke chaalungi', hindi: 'आपणा रूप सजाऊंगी, बावन गज का दामन पहर मटक के चालूँगी', meaning: 'I will dress up beautifully, wear my 52-yard traditional skirt, and walk with graceful desi poise.' },
      { time: 18, text: 'Ghoonghat ki oat mein dekhungi, saare gaam mein raula kar dungi', hindi: 'घूंघट की ओट में देखूँगी, सारे गाम में रौला कर दूँगी', meaning: 'Peeking through my veil, I will create a celebratory buzz across the entire village.' },
      { time: 36, text: 'Jhanjhar baje paanv mein, chan chan chan chan hoye', hindi: 'झांझर बाजे पाँव में, छन छन छन छन होय', meaning: 'The silver anklets chime on my feet, ringing in melodious festive rhythm.' },
      { time: 54, text: 'Balam mera chhora yo laadla, dholak pe thaath jamegi', hindi: 'बालम मेरा छोरा यो लाडला, ढोलक पे ठाठ जमेगी', meaning: 'My husband is the beloved lad of the clan, and our grandeur will rock the dholak beat.' }
    ]
  },
  {
    id: 'song-2',
    title: 'Solid Body',
    hindiTitle: 'सॉलिड बॉडी',
    artist: 'Raju Punjabi & Sheenam Katholic',
    starring: 'Ajay Hooda & Anjali Raghav',
    musicDirector: 'VR Bros',
    category: 'all_time_hits',
    year: 2015,
    duration: 198,
    plays: '450M+',
    moodTag: 'Classic Folk Pop',
    funFact: 'The pioneering anthem that transformed the Haryanvi music industry into mainstream North Indian DJ culture.',
    coverGradient: {
      from: 'from-emerald-600',
      via: 'via-teal-700',
      to: 'to-slate-900',
      accent: '#10b981',
      icon: 'dholak'
    },
    audioProfile: {
      bpm: 128,
      rootFreq: 293.66, // D4
      scale: [0, 2, 3, 5, 7, 8, 10], // Kafi / Dorian feel
      rhythmStyle: 'dholak_fast',
      leadPattern: [0, 0, 3, 5, 7, 5, 3, 0, 2, 3, 5, 3, 2, 0, 0, -1],
      bassNoteFreq: 73.42
    },
    lyrics: [
      { time: 0, text: 'Teri solid body re, maney khave goli re', hindi: 'तेरी सॉलिड बॉडी रे, मनै खावे गोली रे', meaning: 'Your dashing athletic fitness is like a sharp bullet hitting my heart.' },
      { time: 20, text: 'Raju Punjabi ki dhun pe, DJ baaje pura zor te', hindi: 'राजू पंजाबी की धुन पे, डीजे बाजे पूरा जोर ते', meaning: 'On Raju Punjabi\'s timeless tune, the sound systems blast at full throttle.' },
      { time: 42, text: 'Tu roop ki rani se, main desi chhora Desi Thaat ka', hindi: 'तू रूप की रानी से, मैं देसी छोरा देसी ठाठ का', meaning: 'You are the queen of charm, and I am the rustic boy of royal village pride.' }
    ]
  },
  {
    id: 'song-3',
    title: 'Systumm',
    hindiTitle: 'सिस्टम (Systumm)',
    artist: 'Masoom Sharma & Manisha Sharma',
    starring: 'Masoom Sharma & Pranjal Dahiya',
    musicDirector: 'Pinna Music',
    category: 'desi_swag',
    year: 2022,
    duration: 195,
    plays: '380M+',
    moodTag: 'Heavy Bass & Swag',
    funFact: 'Spawned the viral slang term "Systumm Baitha Denge" across nationwide youth pop culture.',
    coverGradient: {
      from: 'from-red-600',
      via: 'via-amber-700',
      to: 'to-stone-950',
      accent: '#ef4444',
      icon: 'tractor'
    },
    audioProfile: {
      bpm: 132,
      rootFreq: 220.00, // A3
      scale: [0, 1, 4, 5, 7, 8, 11], // Bhairav intense
      rhythmStyle: 'heavy_bass_trap',
      leadPattern: [0, 4, 7, 8, 7, 4, 1, 0, 0, 4, 7, 11, 7, 4, 0, -1],
      bassNoteFreq: 55.00
    },
    lyrics: [
      { time: 0, text: 'Systumm pe systumm bitha rakheya, Haryana aale chore ne', hindi: 'सिस्टम पे सिस्टम बिठा रख्या, हरियाणा आले छोरे ने', meaning: 'The sons of Haryana run the entire game on their own terms and authority.' },
      { time: 22, text: 'Kafila chale re kaali gaddi ka, goli barge bol', hindi: 'काफिला चले रे काली गड्डी का, गोली बरगे बोल', meaning: 'A convoy of black SUVs rolls out, with words as sharp and decisive as bullets.' },
      { time: 45, text: 'Raula poore shehar mein, Masoom Sharma bolya!', hindi: 'रौला पूरे शहर में, मासूम शर्मा बोल्या!', meaning: 'The town is abuzz with respect when Masoom Sharma takes the mic.' }
    ]
  },
  {
    id: 'song-4',
    title: 'Moto',
    hindiTitle: 'मोटो (Moto)',
    artist: 'Diler Kharkiya',
    starring: 'Diler Kharkiya & Anjali Raghav',
    musicDirector: 'Aman Jaji',
    category: 'romantic',
    year: 2020,
    duration: 215,
    plays: '750M+',
    moodTag: 'Cute & Romantic',
    funFact: 'Singing continuation of legendary folk singer Rajkishan Kharkiya\'s family legacy with modern charm.',
    coverGradient: {
      from: 'from-pink-500',
      via: 'via-rose-600',
      to: 'to-indigo-950',
      accent: '#ec4899',
      icon: 'heart'
    },
    audioProfile: {
      bpm: 118,
      rootFreq: 261.63, // C4
      scale: [0, 2, 4, 5, 7, 9, 11],
      rhythmStyle: 'acoustic_desi',
      leadPattern: [4, 4, 5, 7, 7, 5, 4, 2, 0, 2, 4, 4, 2, 0, 0, -1],
      bassNoteFreq: 65.41
    },
    lyrics: [
      { time: 0, text: 'Kavegi jo kar dunga, shart teri saari manzoor se', hindi: 'कवेगी जो कर दूंगा, शर्त तेरी सारी मंजूर से', meaning: 'Whatever you ask for, I will fulfill; every single condition of yours is accepted.' },
      { time: 24, text: 'Teri khatir la dunga Moto, suit laal gulabi rang ka', hindi: 'तेरी खातिर ला दूंगा मोटो, सूट लाल गुलाबी रंग का', meaning: 'For you my dear Moto, I will bring the finest rose-pink traditional suit.' },
      { time: 48, text: 'Haath jod ke rab te mangya, tu hi mere jeen ka sahara', hindi: 'हाथ जोड़ के रब ते मांग्या, तू ही मेरे जीण का सहारा', meaning: 'I prayed with folded hands to the almighty, for you are my life\'s anchor.' }
    ]
  },
  {
    id: 'song-5',
    title: 'Middle Class',
    hindiTitle: 'मिडिल क्लास',
    artist: 'Gulzaar Chhaniwala',
    starring: 'Gulzaar Chhaniwala',
    musicDirector: 'Gulzaar Chhaniwala',
    category: 'desi_swag',
    year: 2019,
    duration: 228,
    plays: '310M+',
    moodTag: 'Heartfelt Hustle',
    funFact: 'Written, composed, sung, and directed entirely by Gulzaar himself; resonated with millions of hardworking middle-class youth.',
    coverGradient: {
      from: 'from-amber-700',
      via: 'via-orange-800',
      to: 'to-slate-950',
      accent: '#d97706',
      icon: 'tractor'
    },
    audioProfile: {
      bpm: 122,
      rootFreq: 246.94, // B3
      scale: [0, 2, 3, 5, 7, 8, 10],
      rhythmStyle: 'heavy_bass_trap',
      leadPattern: [0, 2, 3, 5, 7, 5, 3, 2, 0, 0, 3, 2, 0, -1, 0, 2],
      bassNoteFreq: 61.74
    },
    lyrics: [
      { time: 0, text: 'Middle class aale chhore kade haar na maande re', hindi: 'मिडिल क्लास आले छोरे कदे हार ना मान्दे रे', meaning: 'Middle-class boys never surrender or bow down to difficulties.' },
      { time: 25, text: 'Baapu ka sarr ooncha karna, bas yaahi zidd se', hindi: 'बापू का सर ऊंचा करना, बस याही ज़िद्द से', meaning: 'To make my father\'s head hold high with pride is my only burning resolve.' },
      { time: 50, text: 'Gaam ki mitti mein khele, aaz zamane pe chha gaye', hindi: 'गाम की मिट्टी में खेले, आज ज़माने पे छा गए', meaning: 'Raised playing in the village soil, today we conquer hearts across the world.' }
    ]
  },
  {
    id: 'song-6',
    title: 'Teri Aakhya Ka Yo Kajal',
    hindiTitle: 'तेरी आख्या का यो काजल',
    artist: 'DC Madana',
    starring: 'Sapna Choudhary',
    musicDirector: 'VR Bros',
    category: 'all_time_hits',
    year: 2018,
    duration: 172,
    plays: '950M+',
    moodTag: 'Iconic Stage Dance',
    funFact: 'Sapna Choudhary\'s live performance video of this track became the most watched dance video in Indian history.',
    coverGradient: {
      from: 'from-yellow-500',
      via: 'via-amber-600',
      to: 'to-stone-900',
      accent: '#eab308',
      icon: 'dancer'
    },
    audioProfile: {
      bpm: 134,
      rootFreq: 293.66, // D4
      scale: [0, 2, 4, 5, 7, 9, 11],
      rhythmStyle: 'wedding_bhangra',
      leadPattern: [4, 5, 7, 9, 7, 5, 4, 2, 0, 2, 4, 5, 4, 2, 0, -1],
      bassNoteFreq: 73.42
    },
    lyrics: [
      { time: 0, text: 'Teri aakhya ka yo kajal, mane kare se ghayal', hindi: 'तेरी आख्या का यो काजल, मनै करे से घायल', meaning: 'The dark kohl in your eyes wounds my heart with its magnetic charm.' },
      { time: 19, text: 'Sapna chali re stage pe, DJ pe goli chale', hindi: 'सपना चली रे स्टेज पे, डीजे पे गोली चले', meaning: 'When Sapna steps onto the stage, the crowd bursts into celebratory dance.' },
      { time: 38, text: 'Ghoonghat uthake jab tu dekhe, dil mein baje sitar', hindi: 'घूंघट उठाके जब तू देखे, दिल में बाजे सितार', meaning: 'When you lift your veil and glance, strings of melody resonate in the soul.' }
    ]
  },
  {
    id: 'song-7',
    title: 'Desi Desi Na Bolya Kar',
    hindiTitle: 'देसी देसी ना बोल्या कर',
    artist: 'MD, KD & Raju Punjabi',
    starring: 'MD & KD Desi Rock',
    musicDirector: 'G R Music',
    category: 'desi_swag',
    year: 2017,
    duration: 210,
    plays: '620M+',
    moodTag: 'Desi Pride Anthem',
    funFact: 'KD\'s hard-hitting Haryanvi rap verse popularized rural vernacular pride among urban university crowds.',
    coverGradient: {
      from: 'from-blue-700',
      via: 'via-slate-800',
      to: 'to-slate-950',
      accent: '#3b82f6',
      icon: 'dj'
    },
    audioProfile: {
      bpm: 125,
      rootFreq: 220.00, // A3
      scale: [0, 2, 3, 5, 7, 8, 10],
      rhythmStyle: 'heavy_bass_trap',
      leadPattern: [7, 7, 5, 3, 5, 7, 3, 2, 0, 2, 3, 5, 3, 2, 0, 0],
      bassNoteFreq: 55.00
    },
    lyrics: [
      { time: 0, text: 'Desi desi na bolya kar chori re, is desi ki fan ya duniya hori re', hindi: 'देसी देसी ना बोल्या कर छोरी रे, इस देसी की फैन या दुनिया होरी रे', meaning: 'Don\'t mock us as "desi", girl; this whole wide world is turning into fans of this desi swagger.' },
      { time: 24, text: 'KD ka flow aur MD ki beat, Haryana kare har chart ne beat', hindi: 'केडी का फ्लो और एमडी की बीट, हरियाणा करे हर चार्ट ने बीट', meaning: 'With KD\'s unstoppable flow and MD\'s beat, Haryana tops every music chart.' }
    ]
  },
  {
    id: 'song-8',
    title: 'Chetak',
    hindiTitle: 'चेतक (Chetak)',
    artist: 'Raj Mawar',
    starring: 'Sapna Choudhary & Mehar Risky',
    musicDirector: 'V R Bros',
    category: 'all_time_hits',
    year: 2018,
    duration: 204,
    plays: '510M+',
    moodTag: 'Retro Folk Groove',
    funFact: 'Celebrated the classic Bajaj Chetak scooter as the ultimate ride of romance in Haryana villages.',
    coverGradient: {
      from: 'from-amber-500',
      via: 'via-emerald-700',
      to: 'to-stone-900',
      accent: '#f59e0b',
      icon: 'tractor'
    },
    audioProfile: {
      bpm: 124,
      rootFreq: 261.63,
      scale: [0, 2, 4, 5, 7, 9, 11],
      rhythmStyle: 'dholak_fast',
      leadPattern: [0, 4, 5, 7, 9, 7, 5, 4, 2, 4, 2, 0, 0, -1, 4, 5],
      bassNoteFreq: 65.41
    },
    lyrics: [
      { time: 0, text: 'Mera Chetak scooter 120 pe bhaage, tere roop ke aage sab phike laage', hindi: 'मेरा चेतक स्कूटर 120 पे भागे, तेरे रूप के आगे सब फीके लागे', meaning: 'My trusty Chetak scooter dashes at full spirit, yet everything fades before your grace.' },
      { time: 22, text: 'Gaddi lambi chhod ke hum toh Chetak pe ghoomaange', hindi: 'गाड्डी लम्बी छोड़ के हम तोह चेतक पे घूमांगे', meaning: 'Who needs luxury limousines? We celebrate life exploring on our desi scooter.' }
    ]
  },
  {
    id: 'song-9',
    title: 'Bahu Kale Ki',
    hindiTitle: 'बहू काले की',
    artist: 'Gajender Phogat & Annu Kadyan',
    starring: 'Ajay Hooda & Pooja Hooda',
    musicDirector: 'Gajender Phogat',
    category: 'folk_ragni',
    year: 2018,
    duration: 188,
    plays: '680M+',
    moodTag: 'Folk Comedy & Joy',
    funFact: 'Ajay Hooda\'s signature dance step and humorous banter made it an indispensable family wedding song.',
    coverGradient: {
      from: 'from-emerald-700',
      via: 'via-amber-800',
      to: 'to-stone-950',
      accent: '#059669',
      icon: 'dholak'
    },
    audioProfile: {
      bpm: 130,
      rootFreq: 293.66,
      scale: [0, 2, 4, 5, 7, 9, 10], // Khamaj
      rhythmStyle: 'ragni_harmonium',
      leadPattern: [0, 2, 4, 5, 7, 5, 4, 2, 0, 0, 2, 4, 5, 4, 2, 0],
      bassNoteFreq: 73.42
    },
    lyrics: [
      { time: 0, text: 'Kare se nakhre Bahu Kale ki, gaam mein charcha chaale ji', hindi: 'करे से नखरे बहू काले की, गाम में चर्चा चाले जी', meaning: 'The pretty bride puts on sweet airs, and the entire village admires her spirited charm.' },
      { time: 21, text: 'Rang mera gora-chitta, balam mera sanwla sa', hindi: 'रंग मेरा गोरा-चिट्टा, बालम मेरा सांवला सा', meaning: 'Fair is my complexion and deeply charming is my hard-working desi husband.' }
    ]
  },
  {
    id: 'song-10',
    title: 'Bholenath',
    hindiTitle: 'भोलेनाथ (Bholenath)',
    artist: 'Khasa Aala Chahar',
    starring: 'Khasa Aala Chahar',
    musicDirector: 'DJ Sky',
    category: 'desi_swag',
    year: 2021,
    duration: 220,
    plays: '420M+',
    moodTag: 'Spiritual Desi Swag',
    funFact: 'A tribute track to Lord Shiva that became an anthem for gym-goers, wrestlers, and young road-trippers.',
    coverGradient: {
      from: 'from-cyan-700',
      via: 'via-blue-800',
      to: 'to-slate-950',
      accent: '#06b6d4',
      icon: 'flute'
    },
    audioProfile: {
      bpm: 120,
      rootFreq: 220.00,
      scale: [0, 2, 3, 5, 7, 8, 10],
      rhythmStyle: 'heavy_bass_trap',
      leadPattern: [0, 3, 5, 7, 8, 7, 5, 3, 0, 2, 3, 5, 3, 2, 0, -1],
      bassNoteFreq: 55.00
    },
    lyrics: [
      { time: 0, text: 'Bhole tere charna mein dhyan dhareya, kade kisi aage na hath pasareya', hindi: 'भोले तेरे चरणा में ध्यान धर्या, कदे किसी आगे ना हाथ पसर्या', meaning: 'Lord Shiva, my devotion rests at your feet; I have never bowed or begged before anyone else.' },
      { time: 26, text: 'Khasa gaam ka chhora bhole, teri kripa te chale se', hindi: 'खासा गाम का छोरा भोले, तेरी कृपा ते चले से', meaning: 'The boy from Khasa village walks tall, guided solely by Mahadev\'s blessings.' }
    ]
  },
  {
    id: 'song-11',
    title: 'Laad Piya Ke',
    hindiTitle: 'लाड पिया के',
    artist: 'Raju Punjabi & Sushila Thokchom',
    starring: 'Sapna Choudhary & Veer Sahu',
    musicDirector: 'VR Bros',
    category: 'romantic',
    year: 2016,
    duration: 205,
    plays: '490M+',
    moodTag: 'Evergreen Duet',
    funFact: 'One of the smoothest romantic duets in Haryanvi folk pop history, frequently requested on all rural radios.',
    coverGradient: {
      from: 'from-rose-600',
      via: 'via-purple-800',
      to: 'to-slate-950',
      accent: '#f43f5e',
      icon: 'heart'
    },
    audioProfile: {
      bpm: 122,
      rootFreq: 261.63,
      scale: [0, 2, 4, 5, 7, 9, 11],
      rhythmStyle: 'acoustic_desi',
      leadPattern: [0, 4, 7, 9, 7, 4, 2, 0, 2, 4, 5, 4, 2, 0, 0, -1],
      bassNoteFreq: 65.41
    },
    lyrics: [
      { time: 0, text: 'Mere laad ladave piya mera, mera roop nikharta jaave se', hindi: 'मेरे लाड लड़ावे पिया मेरा, मेरा रूप निखरता जावे से', meaning: 'My beloved showers me with endless affection, and my beauty blossoms with joy.' },
      { time: 24, text: 'Haryane ki chhori main, mera balam bada dilwala se', hindi: 'हरियाणे की छोरी मैं, मेरा बालम बड़ा दिलवाला से', meaning: 'I am a proud daughter of Haryana, and my partner has a heart as vast as the sky.' }
    ]
  },
  {
    id: 'song-12',
    title: 'Haryane Ka Chhora',
    hindiTitle: 'हरियाणे का छोरा',
    artist: 'Gulzaar Chhaniwala',
    starring: 'Gulzaar Chhaniwala',
    musicDirector: 'Gulzaar Chhaniwala',
    category: 'dj_blast',
    year: 2022,
    duration: 208,
    plays: '270M+',
    moodTag: 'High Energy Anthem',
    funFact: 'Features brass horns combined with traditional Haryanvi boliyan and high-rev tractor sounds.',
    coverGradient: {
      from: 'from-amber-500',
      via: 'via-red-700',
      to: 'to-zinc-950',
      accent: '#f59e0b',
      icon: 'crown'
    },
    audioProfile: {
      bpm: 136,
      rootFreq: 246.94,
      scale: [0, 2, 4, 5, 7, 9, 11],
      rhythmStyle: 'wedding_bhangra',
      leadPattern: [7, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 4, 5, 4, 2, 0],
      bassNoteFreq: 61.74
    },
    lyrics: [
      { time: 0, text: 'Haryane ka chhora kadde dabeya na kare, shaan te jeena shaan te marna', hindi: 'हरियाणे का छोरा कद्दे दब्या ना करे, शान ते जीना शान ते मरना', meaning: 'The sons of Haryana never get intimidated; we live with royal honor and stand for dignity.' }
    ]
  },
  {
    id: 'song-13',
    title: 'Yaar Ki Shaadi',
    hindiTitle: 'यार की शादी',
    artist: 'Sumit Goswami',
    starring: 'Sumit Goswami',
    musicDirector: 'Khatri',
    category: 'dj_blast',
    year: 2019,
    duration: 195,
    plays: '340M+',
    moodTag: 'Baraat Dance Blast',
    funFact: 'The indispensable anthem blasted on high-wattage sound trucks during every friend\'s wedding procession.',
    coverGradient: {
      from: 'from-orange-600',
      via: 'via-amber-700',
      to: 'to-neutral-950',
      accent: '#ea580c',
      icon: 'dj'
    },
    audioProfile: {
      bpm: 130,
      rootFreq: 261.63,
      scale: [0, 2, 4, 5, 7, 9, 11],
      rhythmStyle: 'wedding_bhangra',
      leadPattern: [0, 2, 4, 7, 7, 4, 2, 0, 4, 7, 9, 7, 4, 2, 0, -1],
      bassNoteFreq: 65.41
    },
    lyrics: [
      { time: 0, text: 'Aaj mere yaar ki shaadi se, DJ pe thaath jamawange', hindi: 'आज मेरे यार की शादी से, डीजे पे ठाठ जमावांगे', meaning: 'Today is my best brother\'s wedding day, we will rock the DJ dancefloor all night.' }
    ]
  },
  {
    id: 'song-14',
    title: 'Gajban Pani Ne Chali',
    hindiTitle: 'गजबण पाणी ने चाली',
    artist: 'Vishvajeet Choudhary',
    starring: 'Sapna Choudhary',
    musicDirector: 'VR Bros',
    category: 'folk_ragni',
    year: 2019,
    duration: 212,
    plays: '430M+',
    moodTag: 'Folk Cultural Classic',
    funFact: 'A contemporary tribute to classical village water-well songs where women dressed in colorful ghagras gathered.',
    coverGradient: {
      from: 'from-teal-600',
      via: 'via-emerald-800',
      to: 'to-slate-950',
      accent: '#0d9488',
      icon: 'hookah'
    },
    audioProfile: {
      bpm: 124,
      rootFreq: 293.66,
      scale: [0, 2, 4, 5, 7, 9, 10],
      rhythmStyle: 'ragni_harmonium',
      leadPattern: [4, 5, 7, 9, 7, 5, 4, 2, 0, 2, 4, 2, 0, -1, 0, 2],
      bassNoteFreq: 73.42
    },
    lyrics: [
      { time: 0, text: 'Gajban paani ne chaali, chham chham paanv baaje', hindi: 'गजबण पाणी ने चाली, छम छम पाँव बाजे', meaning: 'The graceful maiden walks toward the village well, her silver foot trinkets chiming softly.' }
    ]
  },
  {
    id: 'song-15',
    title: 'Chambal Ke Daaku',
    hindiTitle: 'चंबल के डाकू',
    artist: 'Masoom Sharma & Manisha Sharma',
    starring: 'Masoom Sharma',
    musicDirector: 'Pinna Music',
    category: 'desi_swag',
    year: 2023,
    duration: 186,
    plays: '290M+',
    moodTag: 'Rustic Rebel Swag',
    funFact: 'A cinematic high-concept narrative track blending dramatic folk dialogues with thunderous 808 sub drops.',
    coverGradient: {
      from: 'from-zinc-700',
      via: 'via-red-900',
      to: 'to-black',
      accent: '#dc2626',
      icon: 'tractor'
    },
    audioProfile: {
      bpm: 130,
      rootFreq: 220.00,
      scale: [0, 1, 4, 5, 7, 8, 10],
      rhythmStyle: 'heavy_bass_trap',
      leadPattern: [0, 1, 4, 5, 7, 5, 4, 1, 0, 4, 7, 8, 7, 4, 0, -1],
      bassNoteFreq: 55.00
    },
    lyrics: [
      { time: 0, text: 'Dabda ni kade yo chhora, Chambal ke dhar te tezi', hindi: 'दबदा नी कदे यो छोरा, चंबल के धार ते तेज़ी', meaning: 'This boy never yields; swift like the currents of wild rivers and proud of his roots.' }
    ]
  },
  {
    id: 'song-16',
    title: 'Lala Lala Lori',
    hindiTitle: 'लाला लाला लोरी',
    artist: 'Fazilpuria & Afsana Khan',
    starring: 'Fazilpuria & Deana Uppal',
    musicDirector: 'Sukhe Muzical Doctorz',
    category: 'dj_blast',
    year: 2021,
    duration: 178,
    plays: '520M+',
    moodTag: 'Party Club Banger',
    funFact: 'Fazilpuria blended Haryanvi dialect rap with modern Punjabi electronic synth hooks.',
    coverGradient: {
      from: 'from-violet-600',
      via: 'via-pink-700',
      to: 'to-slate-950',
      accent: '#8b5cf6',
      icon: 'dj'
    },
    audioProfile: {
      bpm: 128,
      rootFreq: 261.63,
      scale: [0, 2, 3, 5, 7, 8, 10],
      rhythmStyle: 'wedding_bhangra',
      leadPattern: [0, 3, 7, 10, 7, 3, 0, 3, 5, 7, 5, 3, 0, 0, -1, 2],
      bassNoteFreq: 65.41
    },
    lyrics: [
      { time: 0, text: 'Lala lala lori, daaru ki katori, DJ pe nachti se chhori', hindi: 'लाला लाला लोरी, दारू की कटोरी, डीजे पे नाचती से छोरी', meaning: 'The rhythm surges high, everyone dances together without a care under the festival lights.' }
    ]
  }
];

export const CURATED_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-dj-blast',
    name: 'Haryana DJ Blast (100% Bass)',
    hindiName: 'हरियाणा डीजे ब्लास्ट (100% बास)',
    description: 'High octane dholak beats, tractor-revving bass drops, and wedding baraat dance floor smashers.',
    songIds: ['song-1', 'song-3', 'song-12', 'song-13', 'song-16'],
    coverColor: 'from-amber-500 to-red-600',
    accent: '#f59e0b'
  },
  {
    id: 'pl-desi-systumm',
    name: 'Desi Systumm & Swag Hits',
    hindiName: 'देसी सिस्टम और स्वैग हिट्स',
    description: 'Raw Haryanvi pride, heavy 808 sub bass, black SUV cruisers, and gym workout motivation.',
    songIds: ['song-3', 'song-5', 'song-7', 'song-10', 'song-15'],
    coverColor: 'from-red-600 to-zinc-900',
    accent: '#ef4444'
  },
  {
    id: 'pl-raju-punjabi-tribute',
    name: 'Old Gold & Raju Punjabi Tribute',
    hindiName: 'ओल्ड गोल्ड और राजू पंजाबी ट्रिब्यूट',
    description: 'Immortal evergreen melodies that defined the golden age of modern Haryanvi folk pop.',
    songIds: ['song-2', 'song-7', 'song-8', 'song-11'],
    coverColor: 'from-emerald-600 to-cyan-900',
    accent: '#10b981'
  },
  {
    id: 'pl-sapna-stage',
    name: 'Sapna Choudhary Stage Anthems',
    hindiName: 'सपना चौधरी स्टेज एंथम्स',
    description: 'The viral folk dance phenomenon tracks that set festival stages ablaze across Northern India.',
    songIds: ['song-6', 'song-1', 'song-8', 'song-14'],
    coverColor: 'from-yellow-500 to-purple-900',
    accent: '#eab308'
  },
  {
    id: 'pl-romantic-geet',
    name: 'Romantic Desi Geets',
    hindiName: 'रोमांटिक देसी गीत',
    description: 'Sweet rustic love stories, melodious flute harmonies, and tender couple conversations.',
    songIds: ['song-4', 'song-11', 'song-8', 'song-14'],
    coverColor: 'from-rose-500 to-indigo-900',
    accent: '#f43f5e'
  },
  {
    id: 'pl-hookah-ragni',
    name: 'Hookah Baithak & Ragni Roots',
    hindiName: 'हुक्का बैठक और रागनी रूट्स',
    description: 'Soulful harmonium notes, traditional dholak thaath, and classic chaupal wisdom.',
    songIds: ['song-9', 'song-14', 'song-2', 'song-10'],
    coverColor: 'from-teal-600 to-amber-900',
    accent: '#0d9488'
  }
];

export const HARYANVI_GLOSSARY: GlossaryItem[] = [
  {
    term: 'Systumm (सिस्टम)',
    hindi: 'सिस्टम',
    meaning: 'Dominance, total control, flawless influence and unquestioned local authority.',
    exampleSong: 'Systumm by Masoom Sharma',
    culturalNote: 'Commonly used in phrase "Systumm baitha denge" meaning to settle any matter with authority.'
  },
  {
    term: 'Daman / Ghaghri (दामन)',
    hindi: 'दामन',
    meaning: 'The heavy traditional pleated skirt worn with pride by Haryanvi women in rural celebrations.',
    exampleSong: '52 Gaj Ka Daman by Renuka Panwar',
    culturalNote: 'A 52-yard (Gaj) flared daman signifies grandeur, royal folk heritage, and festive celebration.'
  },
  {
    term: 'Raula (रौला)',
    hindi: 'रौला',
    meaning: 'Fame, grand aura, buzz, noise, and massive popularity across villages.',
    exampleSong: 'Chambal Ke Daaku / Systumm',
    culturalNote: 'Used when someone\'s presence commands attention: "Bhai ka poora raula se."'
  },
  {
    term: 'Baithak / Chaupal (बैठक)',
    hindi: 'बैठक / चौपाल',
    meaning: 'Traditional community gathering parlor where village elders share hookah, folk wisdom, and camaraderie.',
    exampleSong: 'Middle Class by Gulzaar Chhaniwala',
    culturalNote: 'Center of rural democracy and Haryanvi storytelling traditions.'
  },
  {
    term: 'Bahu (बहू)',
    hindi: 'बहू',
    meaning: 'Daughter-in-law or married woman, admired with warmth and playful folk teasing.',
    exampleSong: 'Bahu Kale Ki by Ajay Hooda',
    culturalNote: 'Central subject of witty folk songs highlighting domestic humor and rural bonds.'
  },
  {
    term: 'Chhora / Chhori (छोरा / छोरी)',
    hindi: 'छोरा / छोरी',
    meaning: 'Young lad (Chhora) and young girl (Chhori) of Haryana.',
    exampleSong: 'Haryane Ka Chhora by Gulzaar Chhaniwala',
    culturalNote: 'Affectionate and proud designation representing fitness, honesty, and bravery.'
  },
  {
    term: 'Balam (बालम)',
    hindi: 'बालम',
    meaning: 'Beloved partner or husband in traditional folk poetry.',
    exampleSong: 'Laad Piya Ke / 52 Gaj Ka Daman',
    culturalNote: 'Deeply expressive poetic term celebrating lifelong affection and sweet loyalty.'
  },
  {
    term: 'Hukka (हुक्का)',
    hindi: 'हुक्का',
    meaning: 'The community water-pipe, a timeless symbol of unity, brotherhood, and rural conversation.',
    exampleSong: 'Hookah Baithak Ragni',
    culturalNote: 'Sharing a hookah (Hukka-Pani) in Haryanvi culture symbolizes unbroken social harmony.'
  }
];

export const ARTISTS_LIST = [
  { name: 'Renuka Panwar', title: 'Melody Queen of Haryana', count: 2, iconColor: 'text-amber-400' },
  { name: 'Raju Punjabi', title: 'Legendary Pioneer (Tribute)', count: 3, iconColor: 'text-emerald-400' },
  { name: 'Gulzaar Chhaniwala', title: 'Youth Icon & Composer', count: 2, iconColor: 'text-orange-400' },
  { name: 'Masoom Sharma', title: 'Swag & Bass Maestro', count: 2, iconColor: 'text-red-400' },
  { name: 'Sapna Choudhary', title: 'Stage Dance Sensation', count: 3, iconColor: 'text-yellow-400' },
  { name: 'Diler Kharkiya', title: 'Romantic Folk Virtuoso', count: 1, iconColor: 'text-pink-400' },
  { name: 'Ajay Hooda', title: 'Actor & Folk Lyricist', count: 1, iconColor: 'text-cyan-400' },
  { name: 'Khasa Aala Chahar', title: 'Desi Rap & Devotion', count: 1, iconColor: 'text-sky-400' }
];
