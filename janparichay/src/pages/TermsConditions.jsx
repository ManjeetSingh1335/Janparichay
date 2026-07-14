import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import meriPehchaanLogo from '../images/meri-pehchaan.png'
import '../TermsConditions.css'

const TRANSLATIONS = {
  English: {
    banner: "Thanks for using Jan JanParichay. The service is provided by National Informatics Centre (NIC), located at Block- A, CGO Complex, Lodhi Road, New Delhi, India. By using this service, you are agreeing to the terms and conditions mentioned below. Please read them carefully",
    title1: "TERMS OF SERVICE",
    p1: "This legal agreement between you and National Informatics Centre (NIC), governs your use of the Jan Parichay service.",
    p2: "NIC is the provider of Jan Parichay service, which provide e-Authentication as a service to government departments for providing a secure and convenient way for users to access government services as well as for the government departments to assess the authenticity of the users only under the terms and conditions mentioned in this agreement. The Jan Parichay service is available to you in India as well as outside India.",
    p3: "Use of Jan Parichay service requires compatible devices, internet access, and certain software. You agree that it is your responsibility to meet these requirements which may change from time to time. The Jan Parichay service is part SSO framework for government to citizen(G2C) applications, so any service/product part of such framework are by default part of Jan Parichay application. Obtaining any other product/service under NIC which are not part of G2C SSO framework shall not guarantee you access to the NIC Jan Parichay service.",
    title2: "USER ACCOUNT",
    p4: "As a registered user of Jan Parichay service, you may establish an account. Do not disclose your account details to anyone. You are solely responsible for maintaining the confidentiality and security of your account. All activities that occur on or through your account are your responsibility, and you agree to immediately notify NIC of any security breach of your account. NIC shall not be responsible for any losses arising out of the unauthorized use of your account.",
    p5: "In order to use Jan Parichay service, you must register using email Id/ mobile no. and verify your identity using any of the verification parameters including Aadhaar Card, Pan Card, Driving Licence, Email Id, or Mobile No. The verification parameter are subject to change without giving prior notice to user. After registration, enter your login ID and password to authenticate your account. The Jan Parichay is a centralized session and user authentication service in which one set of login credentials can be used to access multiple applications. The service authenticates user one on one designated platform, enabling the user to use a plethora of services without having to log in and logout each time. The application can be accessed via the web and multi-factor authentication can be configured via android auth app. When the user register on janparichay.nic.in, the application checks for existence of registration Id and then asked to fill basic details and verification parameters to validate his identity for accessing multiple integrated services.",
    p6: "You agree to provide accurate and complete information when you register and use Jan Parichay service. You also agree to update your Jan Parichay registration data from time to time for keeping the information accurate and complete. NIC use crucial data such as Aadhar card information only to validate user identity and never stores anything in the database. However, for other Jan Parichay registration data, you agree that NIC may store and use for coordination purpose.",
    bullets: [
      "You are authorized to use Jan Parichayservice only for personal use.",
      "Any commercial use of this service is strictly prohibited.",
      "Only users above the age of 5 years are allowed to register on JanParichay",
      "You acknowledge that, if NIC changes or discontinues the Jan Parichayservice, which NIC may do at its own discretion, you may not be able to use Jan Parichayservice in the same manner as prior to such change or discontinuation, and that NIC shall have no liability to you in such case.",
      "The provision of Jan Parichayservice does not provide you any commercial or promotional use right for the NIC products and services.",
      "It is your responsibility not to lose, destroy or damage the NIC services or products once they are successfully installed.",
      "The NIC products or services may offer service that allows you to submit material on various areas related to research. You agree that your usage of such features, including any materials submitted by you, shall be your sole responsibility, shall not violate the rights of any other party or violate any laws or otherwise be obscene or objectionable. You also agree that you have obtained all necessary rights and licenses related to the material submitted by you. You agree to provide accurate and complete information in connection with your submission of any materials on the NIC Service. You hereby provide NIC with a worldwide, royalty-free, non-exclusive license to use such materials as part of the NIC Service, and in relation to NIC Products, without any compensation or obligation to you.",
      "NIC has the right, but not the responsibility, to monitor any materials submitted by you or otherwise available on the NIC Service. NIC will investigate any reported or apparent violation of this Agreement and may take any action that NIC in its sole discretion feels appropriate, including immediate termination of service to the user."
    ]
  },
  'हिन्दी': {
    banner: "जन जनपरिचय का उपयोग करने के लिए धन्यवाद। यह सेवा राष्ट्रीय सूचना विज्ञान केंद्र (एनआईसी) द्वारा प्रदान की जाती है, जो ब्लॉक- ए, सीजीओ कॉम्प्लेक्स, लोधी रोड, नई दिल्ली, भारत में स्थित है। इस सेवा का उपयोग करके, आप नीचे उल्लिखित नियमों और शर्तों से सहमत हो रहे हैं। कृपया उन्हें ध्यान से पढ़ें",
    title1: "सेवा की शर्तें",
    p1: "आपके और राष्ट्रीय सूचना विज्ञान केंद्र (एनआईसी) के बीच यह कानूनी समझौता जन परिचय सेवा के आपके उपयोग को नियंत्रित करता है।",
    p2: "एनआईसी जन परिचय सेवा का प्रदाता है, जो सरकारी विभागों को ई-प्रमाणीकरण सेवा प्रदान करता है ताकि उपयोगकर्ताओं को सरकारी सेवाओं तक पहुँचने का एक सुरक्षित और सुविधाजनक तरीका मिल सके, साथ ही सरकारी विभागों के लिए उपयोगकर्ताओं की प्रामाणिकता का आकलन करने के लिए केवल इस समझौते में उल्लिखित नियमों और शर्तों के तहत किया जा सके। जन परिचय सेवा आपके लिए भारत के साथ-साथ भारत के बाहर भी उपलब्ध है।",
    p3: "जन परिचय सेवा के उपयोग के लिए संगत उपकरणों, इंटरनेट की पहुँच और कुछ सॉफ़्टवेयर की आवश्यकता होती है। आप सहमत हैं कि इन आवश्यकताओं को पूरा करना आपकी ज़िम्मेदारी है जो समय-समय पर बदल सकती हैं। जन परिचय सेवा सरकार से नागरिक (G2C) अनुप्रयोगों के लिए एसएसओ ढांचे का हिस्सा है, इसलिए ऐसे ढांचे का कोई भी सेवा/उत्पाद हिस्सा डिफ़ॉल्ट रूप से जन परिचय एप्लिकेशन का हिस्सा है। एनआईसी के तहत किसी भी अन्य उत्पाद/सेवा को प्राप्त करना जो G2C एसएसओ ढांचे का हिस्सा नहीं हैं, आपको एनआईसी जन परिचय सेवा तक पहुँच की गारंटी नहीं देगा।",
    title2: "उपयोगकर्ता खाता",
    p4: "जन परिचय सेवा के एक पंजीकृत उपयोगकर्ता के रूप में, आप एक खाता स्थापित कर सकते हैं। अपने खाते का विवरण किसी को न बताएं। आप अपने खाते की गोपनीयता और सुरक्षा बनाए रखने के लिए पूरी तरह से ज़िम्मेदार हैं। आपके खाते पर या उसके माध्यम से होने वाली सभी गतिविधियाँ आपकी ज़िम्मेदारी हैं, और आप तुरंत अपने खाते के किसी भी सुरक्षा उल्लंघन के बारे में एनआईसी को सूचित करने के लिए सहमत हैं। एनआईसी आपके खाते के अनधिकृत उपयोग से होने वाले किसी भी नुकसान के लिए ज़िम्मेदार नहीं होगा।",
    p5: "जन परिचय सेवा का उपयोग करने के लिए, आपको ईमेल आईडी/मोबाइल नंबर का उपयोग करके पंजीकरण करना होगा और आधार कार्ड, पैन कार्ड, ड्राइविंग लाइसेंस, ईमेल आईडी, या मोबाइल नंबर सहित किसी भी सत्यापन पैरामीटर का उपयोग करके अपनी पहचान सत्यापित करनी होगी। सत्यापन पैरामीटर उपयोगकर्ता को पूर्व सूचना दिए बिना बदलने के अधीन हैं। पंजीकरण के बाद, अपने खाते को प्रमाणित करने के लिए अपना लॉगिन आईडी और पासवर्ड दर्ज करें। जन परिचय एक केंद्रीकृत सत्र और उपयोगकर्ता प्रमाणीकरण सेवा है जिसमें लॉगिन क्रेडेंशियल के एक सेट का उपयोग कई अनुप्रयोगों तक पहुँचने के लिए किया जा सकता है। सेवा उपयोगकर्ता को एक निर्दिष्ट प्लेटफ़ॉर्म पर प्रमाणित करती है, जिससे उपयोगकर्ता हर बार लॉगिन और लॉगआउट किए बिना कई सेवाओं का उपयोग कर सकता है। एप्लिकेशन को वेब के माध्यम से एक्सेस किया जा सकता है और मल्टी-फैक्टर ऑथेंटिकेशन को एंड्रॉइड ऑथ ऐप के माध्यम से कॉन्फ़िगर किया जा सकता है। जब उपयोगकर्ता janparichay.nic.in पर पंजीकरण करता है, तो एप्लिकेशन पंजीकरण आईडी के अस्तित्व की जांच करता है और फिर कई एकीकृत सेवाओं तक पहुँचने के लिए अपनी पहचान सत्यापित करने के लिए बुनियादी विवरण और सत्यापन पैरामीटर भरने के लिए कहता है।",
    p6: "आप जन परिचय सेवा का पंजीकरण और उपयोग करते समय सटीक और पूर्ण जानकारी प्रदान करने के लिए सहमत हैं। आप जानकारी को सटीक और पूर्ण रखने के लिए समय-समय पर अपने जन परिचय पंजीकरण डेटा को अपडेट करने के लिए भी सहमत हैं। एनआईसी आधार कार्ड जैसी महत्वपूर्ण जानकारी का उपयोग केवल उपयोगकर्ता की पहचान को सत्यापित करने के लिए करता है और डेटाबेस में कभी कुछ संग्रहीत नहीं करता है। हालांकि, अन्य जन परिचय पंजीकरण डेटा के लिए, आप सहमत हैं कि एनआईसी समन्वय उद्देश्य के लिए संग्रहीत और उपयोग कर सकता है।",
    bullets: [
      "आप केवल व्यक्तिगत उपयोग के लिए जन परिचय सेवा का उपयोग करने के लिए अधिकृत हैं।",
      "इस सेवा का कोई भी व्यावसायिक उपयोग सख्त वर्जित है।",
      "केवल 5 वर्ष से अधिक आयु के उपयोगकर्ताओं को जन परिचय पर पंजीकरण करने की अनुमति है।",
      "आप स्वीकार करते हैं कि, यदि एनआईसी जन परिचय सेवा को बदलता है या बंद करता है, जिसे एनआईसी अपने विवेक से कर सकता है, तो आप इस तरह के बदलाव या बंदी से पहले की तरह जन परिचय सेवा का उपयोग करने में सक्षम नहीं हो सकते हैं, और एनआईसी की ऐसी स्थिति में आपके प्रति कोई देनदारी नहीं होगी।",
      "जन परिचय सेवा का प्रावधान आपको एनआईसी उत्पादों और सेवाओं के लिए कोई व्यावसायिक या प्रचारक उपयोग का अधिकार प्रदान नहीं करता है।",
      "एक बार सफलतापूर्वक स्थापित होने के बाद एनआईसी सेवाओं या उत्पादों को न खोना, नष्ट न करना या क्षति न पहुँचाना आपकी ज़िम्मेदारी है।",
      "एनआईसी उत्पाद या सेवाएँ ऐसी सेवा की पेशकश कर सकती हैं जो आपको अनुसंधान से संबंधित विभिन्न क्षेत्रों पर सामग्री प्रस्तुत करने की अनुमति देती है। आप सहमत हैं कि ऐसी सुविधाओं का आपका उपयोग, आपके द्वारा प्रस्तुत किसी भी सामग्री सहित, आपकी एकमात्र ज़िम्मेदारी होगी, किसी अन्य पक्ष के अधिकारों का उल्लंघन नहीं करेगी या किसी कानून का उल्लंघन नहीं करेगी या अन्यथा अश्लील या आपत्तिजनक नहीं होगी। आप यह भी सहमत हैं कि आपने आपके द्वारा प्रस्तुत सामग्री से संबंधित सभी आवश्यक अधिकार और लाइसेंस प्राप्त कर लिए हैं। आप एनआईसी सेवा पर किसी भी सामग्री को प्रस्तुत करने के संबंध में सटीक और पूर्ण जानकारी प्रदान करने के लिए सहमत हैं। आप एतद्द्वारा एनआईसी को एनआईसी सेवा के हिस्से के रूप में और एनआईसी उत्पादों के संबंध में ऐसी सामग्री का उपयोग करने के लिए एक विश्वव्यापी, रॉयल्टी-मुक्त, गैर-विशेष लाइसेंस प्रदान करते हैं, बिना किसी मुआवजे या दायित्व के।",
      "एनआईसी के पास आपके द्वारा प्रस्तुत या अन्यथा एनआईसी सेवा पर उपलब्ध किसी भी सामग्री की निगरानी करने का अधिकार है, लेकिन ज़िम्मेदारी नहीं है। एनआईसी इस समझौते के किसी भी रिपोर्ट किए गए या स्पष्ट उल्लंघन की जांच करेगा और कोई भी कार्रवाई कर सकता है जिसे एनआईसी अपने विवेक से उपयुक्त समझता है, जिसमें उपयोगकर्ता की सेवा को तुरंत समाप्त करना शामिल है।"
    ]
  },
  'മലയാളം': {
    banner: "ജൻ ജൻപരിചയ് ഉപയോഗിച്ചതിന് നന്ദി. ദേശീയ വിവരവിജ്ഞാന കേന്ദ്രം (NIC) ആണ് ഈ സേവനം നൽകുന്നത്, ബ്ലോക്ക്- എ, സിജിഒ കോംപ്ലക്സ്, ലോധ് റോഡ്, ന്യൂഡൽഹി, ഇന്ത്യ എന്ന വിലാസത്തിലാണ് ഇത് സ്ഥിതി ചെയ്യുന്നത്. ഈ സേവനം ഉപയോഗിക്കുന്നതിലൂടെ, താഴെ പറയുന്ന നിബന്ധനകളും വ്യവസ്ഥകളും നിങ്ങൾ അംഗീകരിക്കുന്നു. ദയവായി അവ ശ്രദ്ധാപൂർവ്വം വായിക്കുക",
    title1: "സേവന വ്യവസ്ഥകൾ",
    p1: "നിങ്ങളും ദേശീയ വിവരവിജ്ഞാന കേന്ദ്രവും (NIC) തമ്മിലുള്ള ഈ നിയമപരമായ കരാർ ജൻ പരിചയ് സേവനത്തിന്റെ നിങ്ങളുടെ ഉപയോഗത്തെ നിയന്ത്രിക്കുന്നു.",
    p2: "ഗവൺമെന്റ് വകുപ്പുകൾക്ക് ഇ-അതന്റിക്കേഷൻ സേവനം നൽകുന്ന സ്ഥാപനമാണ് എൻഐസി. ഇതിലൂടെ ഉപയോക്താക്കൾക്ക് സുരക്ഷിതമായും എളുപ്പത്തിലും സർക്കാർ സേവനങ്ങൾ ലഭ്യമാക്കാനും അവരുടെ വിവരങ്ങളുടെ സത്യാവസ്ഥ ഉറപ്പുവരുത്താനും സാധിക്കും. ജൻ പരിചയ് സേവനങ്ങൾ ഇന്ത്യയിലും ഇന്ത്യക്ക് പുറത്തും ലഭ്യമാണ്.",
    p3: "ജൻ പരിചയ് സേവനം ഉപയോഗിക്കുന്നതിന് അനുയോജ്യമായ ഉപകരണങ്ങളും ഇന്റർനെറ്റ് കണക്റ്റിവിറ്റിയും ആവശ്യമാണ്. ഇവ ഉറപ്പാക്കേണ്ടത് നിങ്ങളുടെ മാത്രം ഉത്തരവാദിത്തമാണ്. ഈ നിബന്ധനകൾ ആവശ്യാനുസരണം മാറ്റങ്ങൾക്ക് വിധേയമാണ്.",
    title2: "ഉപയോക്തൃ അക്കൗണ്ട്",
    p4: "രജിസ്റ്റർ ചെയ്ത ഉപയോക്താക്കൾക്ക് അക്കൗണ്ടുകൾ സ്വന്തമായി നിയന്ത്രിക്കാം. പാസ്‌വേഡ് വിവരങ്ങൾ മറ്റാരുമായും പങ്കുവെക്കരുത്. അക്കൗണ്ടിന്റെ സുരക്ഷിതത്വം നിങ്ങളുടെ മാത്രം ഉത്തരവാദിത്തമാണ്.",
    p5: "ഇമെയിൽ അല്ലെങ്കിൽ മൊബൈൽ നമ്പർ ഉപയോഗിച്ച് രജിസ്റ്റർ ചെയ്യാം. ആധാർ കാർഡ്, പാൻ കാർഡ്, ഡ്രൈവിംഗ് ലൈസൻസ് എന്നിവ ഉപയോഗിച്ച് വെരിഫിക്കേഷൻ പൂർത്തിയാക്കാം.",
    p6: "രജിസ്ട്രേഷൻ സമയത്ത് കൃത്യമായ വിവരങ്ങൾ നൽകാൻ ഉപയോക്താക്കൾ ബാധ്യസ്ഥരാണ്. വ്യക്തിവിവരങ്ങൾ ഒത്തുനോക്കാൻ മാത്രമാണ് ആധാർ വിവരങ്ങൾ എൻഐസി ഉപയോഗിക്കുന്നത്.",
    bullets: [
      "വ്യക്തിഗത ആവശ്യങ്ങൾക്ക് മാത്രമേ ജൻ പരിചയ് സേവനം ഉപയോഗിക്കാൻ അനുവാദമുള്ളൂ.",
      "വാണിജ്യപരമായ ആവശ്യങ്ങൾക്ക് ഈ സേവനം ഉപയോഗിക്കുന്നത് കർശനമായി നിരോധിച്ചിരിക്കുന്നു.",
      "5 വയസ്സിന് മുകളിലുള്ള കുട്ടികൾക്ക് മാത്രമേ ഈ സേവനത്തിൽ രജിസ്റ്റർ ചെയ്യാൻ അനുവാദമുള്ളൂ.",
      "എൻഐസിക്ക് സ്വന്തം താല്പര്യപ്രകാരം ഈ സേവനങ്ങൾ നിർത്തലാക്കാനോ മാറ്റം വരുത്താനോ അവകാശമുണ്ട്.",
      "എൻഐസി ഉൽപ്പന്നങ്ങളുടെ വാണിജ്യപരമായ പരസ്യങ്ങൾക്ക് ഈ പ്ലാറ്റ്‌ഫോം ഉപയോഗിക്കാൻ അനുവാദമില്ല.",
      "ഇൻസ്റ്റാൾ ചെയ്ത ഉൽപ്പന്നങ്ങൾ നശിച്ചുപോകാതെ സംരക്ഷിക്കേണ്ടത് ഉപയോക്താവിന്റെ ഉത്തരവാദിത്തമാണ്.",
      "ഗവേഷണ ആവശ്യങ്ങൾക്ക് ഉള്ള വിവരങ്ങൾ സമർപ്പിക്കാൻ ഈ സംവിധാനം ഉപയോഗിക്കാം.",
      "ഉപയോക്താക്കൾ സമർപ്പിക്കുന്ന വിവരങ്ങൾ കൃത്യമാണോ എന്ന് പരിശോധിക്കാൻ എൻഐസിക്ക് പൂർണ്ണ അവകാശമുണ്ട്."
    ]
  },
  'తెలుగు': {
    banner: "జన్ జన్ పరిచయ్ ఉపయోగించినందుకు ధన్యవాదాలు. ఈ సేవ జాతీయ సమాచార కేంద్రం (NIC) ద్వారా అందించబడుతుంది. ఈ సేవను ఉపయోగించడం ద్వారా, మీరు క్రింది నిబంధనలు మరియు షరతులకు అంగీకరిస్తున్నారు. దయచేసి వాటిని జాగ్రత్తగా చదవండి",
    title1: "సేవా నిబంధనలు",
    p1: "మీకు మరియు జాతీయ సమాచార కేంద్రానికి (NIC) మధ్య ఉన్న ఈ చట్టపరమైన ఒప్పందం జన్ పరిచయ్ సేవ యొక్క వినియోగాన్ని నియంత్రిస్తుంది.",
    p2: "ప్రభుత్వ విభాగాలకు ఇ-అథెంటికేషన్ సేవను అందించే సంస్థ ఎన్ఐసి. జన్ పరిచయ్ సేవ భారతదేశంలో మరియు వెలుపల కూడా అందుబాటులో ఉంది.",
    p3: "జన్ పరిచయ్ సేవను ఉపయోగించడానికి అనుకూలమైన పరికరాలు మరియు ఇంటర్నెట్ సదుపాయం అవసరం.",
    title2: "వినియోగదారు ఖాతా",
    p4: "నమోదిత వినియోగదారుగా మీరు ఖాతాను ఏర్పాటు చేసుకోవచ్చు. మీ ఖాతా వివరాలను ఎవరికీ వెల్లడించవద్దు. మీ ఖాతా భద్రతకు మీదే పూర్తి బాధ్యత.",
    p5: "మొబైల్ నెంబర్ లేదా ఈమెయిల్ ఉపయోగించి నమోదు చేసుకోవచ్చు. ఆధార్ కార్డ్, పాన్ కార్డ్, డ్రైవింగ్ లైసెన్స్ ఉపయోగించి గుర్తింపును ధృవీకరించుకోవాలి.",
    p6: "రిజిస్ట్రేషన్ సమయంలో ఖచ్చితమైన సమాచారాన్ని అందించాలి. ఆధార్ సమాచారాన్ని కేవలం ధృవీకరణ కోసం మాత్రమే ఎన్ఐసి ఉపయోగిస్తుంది.",
    bullets: [
      "జన్ పరిచయ్ సేవ కేవలం వ్యక్తిగత ఉపయోగం కోసం మాత్రమే అనుమతించబడుతుంది.",
      "ఈ సేవ యొక్క వాణిజ్యపరమైన వినియోగం ఖచ్చితంగా నిషేధించబడింది.",
      "5 సంవత్సరాల కంటే ఎక్కువ వయస్సు ఉన్నవారు మాత్రమే ఇందులో నమోదు చేసుకోవడానికి అర్హులు.",
      "ఈ సేవలను నిలిపివేయడానికి లేదా మార్పులు చేయడానికి ఎన్ఐసికి పూర్తి హక్కులు ఉన్నాయి.",
      "ఉత్పత్తుల వాణిజ్య ప్రకటనల కోసం ఈ వేదికను ఉపయోగించకూడదు.",
      "ఇన్స్టాల్ చేసిన ఉత్పత్తులను సురక్షితంగా ఉంచుకోవడం వినియోగదారు బాధ్యత.",
      "పరిశోధన రంగాలకు సంబంధించిన సమాచారాన్ని పంచుకోవడానికి ఈ సేవను ఉపయోగించవచ్చు.",
      "వినియోగదారులు సమర్పించిన సమాచారాన్ని పర్యవేక్షించే హక్కు ఎన్ఐసికి ఉంటుంది."
    ]
  },
  'मराठी': {
    banner: "जन जनपरिचय वापरल्याबद्दल धन्यवाद. ही सेवा राष्ट्रीय सूचना विज्ञान केंद्र (एनआयसी) द्वारे प्रदान केली जाते. या सेवेचा वापर करून, आपण खालील अटी व शर्तींशी सहमत आहात. कृपया त्या काळजीपूर्वक वाचा",
    title1: "सेवा अटी",
    p1: "तुमच्या आणि राष्ट्रीय सूचना विज्ञान केंद्र (NIC) मधील हा कायदेशीर करार जन परिचय सेवेच्या वापराचे नियमन करतो.",
    p2: "सरकारी विभागांना ई-प्रमाणिकरण सेवा पुरवणारी एनआयसी ही संस्था आहे. जन परिचय सेवा भारतात आणि भारताबाहेरही उपलब्ध आहे.",
    p3: "या सेवेच्या वापरासाठी सुसंगत उपकरणे आणि इंटरनेट जोडणी आवश्यक आहे.",
    title2: "वापरकर्ता खाते",
    p4: "नोंदणीकृत वापरकर्ता म्हणून तुम्ही खाते तयार करू शकता. तुमच्या खात्याची माहिती कोणालाही सांगू नका. खात्याच्या सुरक्षेची सर्व जबाबदारी तुमची असेल.",
    p5: "मोबाईल क्रमांक किंवा ईमेल वापरून नोंदणी करता येते. आधार कार्ड, पॅन कार्ड किंवा ड्रायव्हिंग लायसन्स वापरून ओळख पडताळणी करावी लागेल.",
    p6: "नोंदणी करताना अचूक माहिती देणे बंधनकारक आहे. आधार माहितीचा वापर केवळ पडताळणीसाठी केला जातो.",
    bullets: [
      "जन परिचय सेवेचा वापर केवळ वैयक्तिक वापरासाठीच मर्यादित आहे.",
      "या सेवेचा व्यावसायिक कारणांसाठी वापर करण्यास सक्त मनाई आहे.",
      "५ वर्षांपेक्षा जास्त वय असलेले वापरकर्तेच नोंदणी करू शकतात.",
      "या सेवांमध्ये बदल करण्याचे किंवा त्या बंद करण्याचे अधिकार एनआयसीकडे राखीव आहेत.",
      "एनआयसीच्या उत्पादनांच्या जाहिरातीसाठी या मंचाचा वापर करता येणार नाही.",
      "यशस्वी स्थापनेनंतर उत्पादनांचे नुकसान होणार नाही याची काळजी वापरकर्त्याने घ्यावी.",
      "संशोधनाशी संबंधित माहिती सादर करण्यासाठी या सेवेचा वापर केला जाऊ शकतो.",
      "वापरकर्त्याने सादर केलेल्या माहितीचे निरीक्षण करण्याचा अधिकार एनआयसीकडे आहे."
    ]
  },
  'தமிழ்': {
    banner: "ஜன் ஜன்பரிச்சயைப் பயன்படுத்தியதற்கு நன்றி. இந்தச் சேவை தேசிய தகவலியல் மையத்தால் (NIC) வழங்கப்படுகிறது. இந்தச் சேவையைப் பயன்படுத்துவதன் மூலம், கீழே உள்ள விதிமுறைகளையும் நிபந்தனைகளையும் ஏற்கிறீர்கள். தயவுசெய்து அவற்றை கவனமாகப் படிக்கவும்",
    title1: "சேவை விதிமுறைகள்",
    p1: "உங்களுக்கும் தேசிய தகவலியல் மையத்திற்கும் (NIC) இடையிலான இந்த சட்டபூர்வமான ஒப்பந்தம் ஜன் பரிச்சய் சேவையின் பயன்பாட்டை நிர்வகிக்கிறது.",
    p2: "அரசுத் துறைகளுக்கு மின்-அடையாளச் சான்று சேவையை வழங்கும் நிறுவனம் என்ஐசி ஆகும். ஜன் பரிச்சய் சேவை இந்தியாவிலும் வெளிநாட்டிலும் கிடைக்கிறது.",
    p3: "இச்சேவையைப் பயன்படுத்த இணக்கமான சாதனங்களும் இணைய வசதியும் தேவை.",
    title2: "பயனர் கணக்கு",
    p4: "பதிவுசெய்த பயனராக நீங்கள் ஒரு கணக்கை உருவாக்கலாம். உங்கள் கணக்கு விவரங்களை யாருக்கும் பகிர வேண்டாம். உங்கள் கணக்கின் பாதுகாப்பிற்கு நீங்களே பொறுப்பு.",
    p5: "கைபேசி எண் அல்லது மின்னஞ்சல் முகவரி மூலம் பதிவு செய்யலாம். ஆதார், பான் கார்டு, ஓட்டுநர் உரிமம் மூலம் அடையாளத்தை உறுதிப்படுத்த வேண்டும்.",
    p6: "பதிவின் போது துல்லியமான தகவல்களை வழங்க வேண்டும். ஆதார் தகவல்கள் சரிபார்ப்பிற்கு மட்டுமே பயன்படுத்தப்படும்.",
    bullets: [
      "ஜன் பரிச்சய் சேவை தனிநபர் பயன்பாட்டிற்கு மட்டுமே அனுமதிக்கப்படுகிறது.",
      "இந்த சேவையின் வணிக ரீதியான பயன்பாடு முற்றிலும் தடைசெய்யப்பட்டுள்ளது.",
      "5 வயதிற்கு மேற்பட்டவர்கள் மட்டுமே இதில் பதிவு செய்ய தகுதியுடையவர்கள்.",
      "இச்சேவையில் மாற்றங்களைச் செய்ய அல்லது நிறுத்த என்ஐசிக்கு முழு உரிமை உண்டு.",
      "வணிக விளம்பரங்களுக்காக இந்த தளத்தைப் பயன்படுத்தக் கூடாது.",
      "நிறுவப்பட்ட தயாரிப்புகளைப் பாதுகாப்பாக வைத்திருப்பது பயனர் பொறுப்பாகும்.",
      "ஆராய்ச்சித் தகவல்களைப் பகிர்ந்து கொள்ள இந்தச் சேவையைப் பயன்படுத்தலாம்.",
      "பயனர்கள் சமர்ப்பிக்கும் தகவல்களைக் கண்காணிக்கும் உரிமை என்ஐசிக்கு உள்ளது."
    ]
  },
  'ଓଡ଼ିଆ': {
    banner: "ଜନ ଜନପରିଚୟ ବ୍ୟବହାର କରିଥିବାରୁ ଧନ୍ୟବାଦ | ଏହି ସେବା ଜାତୀୟ ସୂଚନା ବିଜ୍ଞାନ କେନ୍ଦ୍ର (NIC) ଦ୍ୱାରା ପ୍ରଦାନ କରାଯାଇଛି | ଏହି ସେବା ବ୍ୟବହାର କରି ଆପଣ ନିମ୍ନଲିଖିତ ସର୍ତ୍ତାବଳୀରେ ସହମତ ହେଉଛନ୍ତି | ଦୟାକରି ଏହାକୁ ଧ୍ୟାନର ସହ ପଢନ୍ତୁ",
    title1: "ସେବା ସର୍ତ୍ତାବଳୀ",
    p1: "ଆପଣ ଏବଂ ଜାତୀୟ ସୂଚନା ବିଜ୍ଞାନ କେନ୍ଦ୍ର (NIC) ମଧ୍ୟରେ ଥିବା ଏହି ଆଇନଗତ ଚୁକ୍ତିନାମା ଜନ ପରିଚୟ ସେବାର ବ୍ୟବହାରକୁ ନିୟନ୍ତ୍ରଣ କରିଥାଏ |",
    p2: "ସରକାରୀ ବିଭାଗଗୁଡିକୁ ଇ-ପ୍ରମାଣୀକରଣ ସେବା ପ୍ରଦାନ କରୁଥିବା ସଂସ୍ଥା ହେଉଛି NIC | ଜନ ପରିଚୟ ସେବା ଭାରତ ଏବଂ ଭାରତ ବାହାରେ ମଧ୍ୟ ଉପଲବ୍ଧ |",
    p3: "ଜନ ପରିଚୟ ସେବା ବ୍ୟବହାର କରିବା ପାଇଁ ସୁସଙ୍ଗତ ଡିଭାଇସ୍ ଏବଂ ଇଣ୍ଟରନେଟ୍ ସଂଯୋଗ ଆବଶ୍ୟକ |",
    title2: "ଉପଭୋକ୍ତା ଆକାଉଣ୍ଟ",
    p4: "ଜଣେ ପଞ୍ଜୀକୃତ ଉପଭୋକ୍ତା ଭାବରେ ଆପଣ ଏକ ଆକାଉଣ୍ଟ୍ ଖୋଲିପାରିବେ | ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ବିବରଣୀ କାହାକୁ ପ୍ରକାଶ କରନ୍ତୁ ନାହିଁ | ଆକାଉଣ୍ଟ୍ ସୁରକ୍ଷା ପାଇଁ ଆପଣ ନିଜେ ଦାୟୀ |",
    p5: "ମୋବାଇଲ୍ ନମ୍ବର କିମ୍ବା ଇମେଲ୍ ବ୍ୟବହାର କରି ପଞ୍ଜୀକରଣ କରାଯାଇପାରିବ | ଆଧାର କାର୍ଡ, ପାନ କାର୍ଡ କିମ୍ବା ଡ୍ରାଇଭିଂ ଲାଇସେନ୍ସ ବ୍ୟବହାର କରି ପରିଚୟ ଯାଞ୍ଚ କରିବାକୁ ହେବ |",
    p6: "ପଞ୍ଜୀକରଣ ସମୟରେ ସଠିକ୍ ସୂଚନା ପ୍ରଦାନ କରିବା ବାଧ୍ୟତାମୂଳକ | ଆଧାର ସୂଚନା କେବଳ ଯାଞ୍ଚ ପାଇଁ ବ୍ୟବହୃତ ହୁଏ |",
    bullets: [
      "ଜନ ପରିଚୟ ସେବା କେବଳ ବ୍ୟକ୍ତିଗତ ବ୍ୟବହାର ପାଇଁ ଅନୁମତିପ୍ରାପ୍ତ |",
      "ଏହି ସେବାର ବ୍ୟବସାୟିକ ବ୍ୟବହାର ସମ୍ପୂର୍ଣ୍ଣ ନିଷେଧ |",
      "୫ ବର୍ଷରୁ ଅଧିକ ବୟସର ବ୍ୟକ୍ତି ହିଁ ପଞ୍ଜୀକରଣ କରିପାରିବେ |",
      "ସେବାରେ ପରିବର୍ତ୍ତନ କରିବା କିମ୍ବା ବନ୍ଦ କରିବା ଅଧିକାର NIC ପାଖରେ ସଂରକ୍ଷିତ |",
      "ବ୍ୟବସାୟିକ ବିଜ୍ଞାପନ ପାଇଁ ଏହି ପ୍ଲାଟଫର୍ମ ବ୍ୟବହାର କରାଯାଇପାରିବ ନାହିଁ |",
      "ସଫଳ ସଂସ୍ଥାପନ ପରେ ଉତ୍ପାଦଗୁଡିକର ସୁରକ୍ଷା କରିବା ଉପଭୋକ୍ତାଙ୍କ ଦାୟିତ୍ୱ |",
      "ଗବେଷଣା ସମ୍ବନ୍ଧୀୟ ସୂଚନା ପ୍ରଦାନ କରିବା ପାଇଁ ଏହି ସେବା ବ୍ୟବହୃତ ହୋଇପାରିବ |",
      "ଉପଭୋକ୍ତାଙ୍କ ଦ୍ୱାରା ଦିଆଯାଇଥିବା ସୂଚନାକୁ ଯାଞ୍ଚ କରିବା ପାଇଁ NIC ର ଅଧିକାର ଅଛି |"
    ]
  }
}

export default function TermsConditions() {
  const navigate = useNavigate()
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('English')
  const langRef = useRef(null)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'mr', label: 'मराठी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'or', label: 'ଓଡ଼ିଆ' }
  ]

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false)
      }
    }
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langDropdownOpen])

  const text = TRANSLATIONS[selectedLang] || TRANSLATIONS.English

  return (
    <div className="tc-page">
      {/* TC Header */}
      <header className="tc-header">
        <div className="tc-header-logo-container">
          <img src={meriPehchaanLogo} alt="Meri Pehchaan" className="tc-header-logo" />
        </div>
        <div className="tc-header-lang" ref={langRef}>
          <div 
            className="tc-lang-trigger" 
            onClick={() => setLangDropdownOpen(prev => !prev)}
          >
            <span>{selectedLang}</span>
            <i className="bi bi-chevron-down tc-lang-chevron"></i>
          </div>
          {langDropdownOpen && (
            <ul className="tc-lang-menu">
              {languages.map(lang => (
                <li 
                  key={lang.code} 
                  className={`tc-lang-item ${selectedLang === lang.label ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLang(lang.label)
                    setLangDropdownOpen(false)
                  }}
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Scrollable Content Wrapper */}
      <div className="tc-content-wrapper">

        {/* Info Banner */}
        <div className="tc-banner-container">
          <div className="tc-banner">
            {text.banner}
          </div>
        </div>

        <div className="tc-body">
          {/* TERMS OF SERVICE */}
          <h1 className="tc-heading">{text.title1}</h1>

          <p className="tc-para">{text.p1}</p>
          <p className="tc-para">{text.p2}</p>
          {text.p3 && <p className="tc-para">{text.p3}</p>}

          {/* USER ACCOUNT */}
          <h1 className="tc-heading">{text.title2}</h1>

          <p className="tc-para">{text.p4}</p>
          <p className="tc-para">{text.p5}</p>
          {text.p6 && <p className="tc-para">{text.p6}</p>}

          {/* Bullet box */}
          <div className="tc-bullet-box">
            {text.bullets.map((bullet, idx) => (
              <p key={idx}>
                <span className="tc-bullet-star">✶</span> 
                <span>{bullet}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
