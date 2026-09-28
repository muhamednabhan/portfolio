/* NABHAN PORTFOLIO — LOCAL CHATBOT
   No API, no backend, no tracking. Everything runs in the browser.
*/
(() => {
  const email = 'mailto:muhamednabhan1@gmail.com';
  const linkedin = 'https://www.linkedin.com/in/muhamed-nabhan';
  const github = 'https://github.com/Nabhan-niz';
  const whatsapp = 'https://wa.me/971556749142';
  const resume = './assets/Nabhan_Resume.pdf';
  const phone = 'tel:+971556749142';

  const link = (href, label, external = true) => `<a href="${href}" ${external ? 'target="_blank" rel="noopener"' : ''}>${label} ↗</a>`;

  const answers = [
    {
      keys: ['hello','hi','hey','who are you','what are you'],
      answer: `Hey! 👋 I’m Nabhan. This is basically the little version of me hiding in the corner of my portfolio 😄<br><br>Ask me anything about what I’ve built, what I’ve worked on, my AI/ML stack, research, or how to reach me. I’ll try not to make it sound like a boring CV. Promise.`
    },
    {
      keys: ['best project','favorite project','favourite project','top project','strongest project'],
      answer: `If I had to pick one I’d happily talk about for a while 😄, it would probably be my <strong>Explainable Multispectral Crop Stress Detection</strong> project. I used Sentinel-2 satellite imagery with a Vision Transformer, then added SHAP and Grad-CAM so the model doesn’t just throw out a prediction and disappear into the void 😂. I also built a RAG chatbot around the results. It’s probably the project that best shows how I like mixing research, computer vision and something people can actually interact with.`
    },
    {
      keys: ['crop','satellite','sentinel','multispectral','vit','vision transformer'],
      answer: `<strong>Explainable Multispectral Crop Stress Detection</strong> uses Sentinel-2 satellite imagery and a Vision Transformer to detect crop stress. SHAP and Grad-CAM are used to make the model's decisions more interpretable, while a RAG chatbot helps explain the results. The interface was built with Gradio.`
    },
    {
      keys: ['patient','healthcare','health care','medical','arabic','hindi','malayalam','whisper','deepgram','tts'],
      answer: `I built a <strong>multilingual LLM-based patient assistance system</strong> supporting English, Arabic, Hindi and Malayalam. The system combines Groq LLMs, Whisper, Deepgram and Edge TTS with FastAPI. It can retrieve patient profiles, recommend doctors, generate email/PDF confirmations and detect emergencies. I also worked on sentence-level streaming/speculative TTS and regression testing.`
    },
    {
      keys: ['cultural','heritage','europeana','wikidata','smithsonian'],
      answer: `I built the <strong>RAG-Based Cultural Heritage Knowledge Retrieval</strong> system because cultural information is scattered across different sources, and asking one source everything isn’t exactly ideal 😅. I connected Europeana, Wikidata SPARQL and Smithsonian, retrieved relevant information from multiple places, and generated context-aware answers with source attribution. The interface uses Python, Streamlit and Pandas.`
    },
    {
      keys: ['gesture','hand gesture','mediapipe','cursor','volume','hci'],
      answer: `The <strong>Real-Time Hand Gesture Recognition for HCI</strong> project uses MediaPipe, OpenCV and NumPy to track hand landmarks and turn gestures into computer interactions such as cursor movement, volume control and click operations.`
    },
    {
      keys: ['diabetes','shap','prediction assistant'],
      answer: `I built the <strong>Diabetes Prediction Assistant</strong> as a healthcare AI project focused on prediction plus explainability. It uses machine-learning prediction with SHAP explanations and connects the workflow through FastAPI and Telegram.`
    },
    {
      keys: ['invoice','gst','pdf','invoice bot'],
      answer: `I built the <strong>Automated Invoice Bot</strong> to turn invoice information into an automated document-generation workflow. It uses Python, the Telegram Bot API and PDF generation to move from structured input to a usable invoice.`
    },
    {
      keys: ['yolo','object detection','computer vision project','helmet','ppe'],
      answer: `I’ve worked with <strong>YOLOv8 and computer vision</strong> for real-time object detection. The workflow includes image annotation, model training and inference using OpenCV, LabelImg and Google Colab. I’ve also worked on construction-safety/PPE detection and real-time detection workflows.`
    },
    {
      keys: ['mental health','mental health chatbot','chatbot project','nlp chatbot','nltk'],
      answer: `I built the <strong>Mental Health Support Chatbot</strong> as an NLP/conversational AI project using Python, NLTK and Flask. It was designed to provide conversational support around mental-health queries and was also part of my earlier LLM/GenAI work.`
    },
    {
      keys: ['automation','agent','agents','workflow','copilot studio','business automation'],
      answer: `I’ve built automation workflows around <strong>AI agents</strong>, data fetching, automated messaging and invoice generation. My experience includes Python, Copilot Studio, GitHub and VS Code, and my current stack also includes n8n, OpenClaw, Claude Code and Cursor.`
    },
    {
      keys: ['python','tensorflow','keras','scikit','opencv','pillow','numpy','pandas'],
      answer: `Yes. Python is one of my main languages. My ML/CV stack includes TensorFlow, Keras, Scikit-learn, OpenCV, Pillow, NumPy and Pandas.`
    },
    {
      keys: ['rag','retrieval augmented','retrieval'],
      answer: `Yep 😄 — RAG is a pretty big part of my portfolio. I’ve used it in the crop-stress project to make model results easier to understand, and I also built a cultural-heritage retrieval system that pulls information from multiple sources and keeps the sources attached to the answer. I really like RAG because it gives an LLM something useful to actually look at instead of just letting it freestyle everything 😂.`
    },
    {
      keys: ['llm','generative ai','genai','transformers','hugging face','fine tuning','fine-tuning'],
      answer: `I’ve spent quite a bit of time around <strong>LLMs, RAG, Transformers, Hugging Face, prompting and fine-tuning</strong>. During Intel Unnati, I worked with Intel neural-chat-7b-v3 on an AI chatbot using Intel Developer Cloud. So yes, I’ve had my fair share of arguing with models until they finally behave 😅.`
    },
    {
      keys: ['experience','work experience','internship','internships','worked'],
      answer: `I’ve had three main internship/trainee experiences: <strong>AI Engineering Intern at Innobayt</strong>, <strong>Product Documentation Intern at OHC</strong>, and <strong>Intel Unnati AI Trainee</strong>. Across them I worked on AI agents, automation, documentation/UI testing, LLM fine-tuning and GenAI. Basically, I’ve spent a lot of time building things and then figuring out why they broke five minutes later 😅.`
    },
    {
      keys: ['innobayt'],
      answer: `At <strong>Innobayt Innovative Solutions</strong>, I worked as an AI Engineering Intern and developed AI agents and small-scale AI models for business automation workflows, including data-fetching, automated messaging and invoice-generation systems.`
    },
    {
      keys: ['intel','unnati'],
      answer: `During <strong>Intel Unnati</strong>, I worked on an AI-powered mental-health chatbot using Intel neural-chat-7b-v3, deployed work on Intel Developer Cloud and explored LLM fine-tuning and personalized healthcare responses.`
    },
    {
      keys: ['ohc','documentation'],
      answer: `At <strong>OHC</strong>, I worked on product documentation and tutorials for the CARE website, performed UI testing and validated module outputs through local deployment.`
    },
    {
      keys: ['research','publication','paper','kscst'],
      answer: `My research includes <strong>“Effective Explainable Model to Detect Multispectral Crop Stress Using ViT”</strong>. I also worked on a KSCST government-funded research project under the 49th Student Project Programme and presented research at the State-Level Poster Presentation & Exhibition.`
    },
    {
      keys: ['certification','certificates','certifications','certificate'],
      answer: `My listed certifications include AWS Cloud Practitioner, Data Science for Engineers (NPTEL), Retrieval-Augmented Generation for Enhanced AI Outputs (IBM SkillsBuild), Computer Vision (IIT Tirupati), Introduction to Cybersecurity (Cisco), and Introduction to Model Context Protocol (Anthropic).`
    },
    {
      keys: ['mcp','model context protocol','anthropic'],
      answer: `Yes — I’ve completed <strong>Introduction to Model Context Protocol (MCP)</strong> from Anthropic. MCP is also part of the broader agent/tooling direction I’m exploring.`
    },
    {
      keys: ['skills','tech stack','technology','technologies','tools'],
      answer: `My stack spans <strong>Python, ML/CV, GenAI/RAG, backend APIs, agents and web interaction</strong>. Tools include TensorFlow, Keras, Scikit-learn, OpenCV, YOLOv8, MediaPipe, FastAPI, Flask, Gradio, n8n, OpenClaw, Copilot Studio, Claude Code, Cursor, Git, GitHub, Docker, AWS, HTML, CSS, JavaScript, GSAP and Three.js.`
    },
    {
      keys: ['linkedin'],
      answer: `You can find me on LinkedIn here:<br><br>${link(linkedin, 'Open my LinkedIn')}`
    },
    {
      keys: ['github','code','repositories','repo'],
      answer: `My GitHub is here:<br><br>${link(github, 'Open my GitHub')}`
    },
    {
      keys: ['resume','cv'],
      answer: `You can open or download my resume here:<br><br>${link(resume, 'Open / download resume', false)}`
    },
    {
      keys: ['email','mail','contact','reach','hire','hiring'],
      answer: `The easiest way to reach me is email:<br><br>${link(email, 'Email me', false)}<br><br>You can also ${link(linkedin, 'connect on LinkedIn')} or ${link(whatsapp, 'message on WhatsApp')}.`
    },
    {
      keys: ['whatsapp','wa'],
      answer: `You can message me directly on WhatsApp:<br><br>${link(whatsapp, 'Open WhatsApp')}`
    },
    {
      keys: ['phone','call','number'],
      answer: `You can call me at <strong>+971 55 674 9142</strong>:<br><br>${link(phone, 'Call me', false)}`
    },
    {
      keys: ['education','university','college','christ'],
      answer: `I’m a B.Tech student in <strong>Artificial Intelligence & Machine Learning</strong> at Christ University, with the programme running from Aug 2022 to May 2026.`
    },
    {
      keys: ['location','where are you','dubai'],
      answer: `I’m based in <strong>Dubai, UAE</strong>.` 
    },
    {
      keys: ['project','projects','built','portfolio'],
      answer: `I’ve got nine featured projects in the portfolio, covering satellite/computer vision, multilingual healthcare voice AI, RAG, HCI, explainable healthcare AI, automation, YOLO, conversational AI and agent workflows. You can open the detailed project archive from the <strong>Things I Built</strong> section.`
    }
  ];

  const presets = [
    'What is your best project?',
    'Tell me about your AI experience',
    'Did you work with RAG?',
    'What technologies do you use?',
    'Tell me about the satellite project',
    'Can I see your resume?',
    'How can I contact you?',
    'Can I see your LinkedIn?'
  ];

  const root = document.createElement('div');
  root.id = 'nabhan-chatbot';
  root.innerHTML = `
    <button class="nb-chat-launch" aria-label="Open Ask Nabhan chatbot" aria-expanded="false">
      <span class="nb-launch-ring"></span>
      <span class="nb-robot-face mini" aria-hidden="true"><img class="nb-bot-image" src="/assets/icon.png" alt="" /></span>
      <span class="nb-launch-label">ASK NABHAN</span>
    </button>
    <section class="nb-chat-panel" aria-label="Ask Nabhan chatbot" aria-hidden="true">
      <header class="nb-chat-head">
        <div class="nb-head-bot">
          <span class="nb-robot-face"><img class="nb-bot-image" src="/assets/icon.png" alt="" /></span>
          <div><span class="nb-overline">PORTFOLIO AI</span><strong>ASK NABHAN</strong><small><span class="nb-live-dot"></span> ONLINE · LOCAL</small></div>
        </div>
        <button class="nb-close" aria-label="Close chatbot">×</button>
      </header>
      <div class="nb-chat-body">
        <div class="nb-greeting">
          <span class="nb-msg-label">NABHAN / 01</span>
          <p>Hi — this is Nabhan. 👋<br><br>Ask me anything you want to know about my work, projects, experience, tech stack, research or how to reach me.</p>
        </div>
        <div class="nb-presets" aria-label="Suggested questions"></div>
        <div class="nb-messages" aria-live="polite"></div>
      </div>
      <form class="nb-chat-input"><input autocomplete="off" placeholder="Ask me about my work…" aria-label="Ask Nabhan a question"/><button aria-label="Send message">↗</button></form>
      <div class="nb-chat-foot"><span>NO API · NO TRACKING</span><span>AI / ML · CREATIVE TECHNOLOGY</span></div>
    </section>`;
  document.body.appendChild(root);

  const launch = root.querySelector('.nb-chat-launch');
  const panel = root.querySelector('.nb-chat-panel');
  const close = root.querySelector('.nb-close');
  const form = root.querySelector('.nb-chat-input');
  const input = form.querySelector('input');
  const messages = root.querySelector('.nb-messages');
  const presetBox = root.querySelector('.nb-presets');
  const faces = root.querySelectorAll('.nb-robot-face');

  presets.forEach(q => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = q;
    b.addEventListener('click', () => ask(q));
    presetBox.appendChild(b);
  });

  const setEmotion = emotion => {
    faces.forEach(face => {
      face.classList.remove('happy','thinking','wink','neutral');
      face.classList.add(emotion);
    });
  };

  const addMessage = (html, who='bot') => {
    const item = document.createElement('div');
    item.className = `nb-message ${who}`;
    item.innerHTML = `<span class="nb-msg-label">${who === 'bot' ? 'NABHAN AI' : 'YOU'}</span><div>${html}</div>`;
    messages.appendChild(item);
    messages.parentElement.scrollTop = messages.parentElement.scrollHeight;
    return item;
  };

  const normalize = s => s.toLowerCase().replace(/[^a-z0-9+.#\s-]/g, ' ');

  function getAnswer(query) {
    const q = normalize(query);
    let best = null, score = 0;
    answers.forEach(item => {
      let s = 0;
      item.keys.forEach(k => {
        const key = normalize(k);
        if (q.includes(key)) s += key.includes(' ') ? 3 : 2;
      });
      if (s > score) { score = s; best = item.answer; }
    });
    if (best) return best;
    return `I can tell you about <strong>my projects, experience, AI/ML stack, RAG, computer vision, research, certifications and contact details</strong>.<br><br>Try asking me things like “Did you work with RAG?”, “What project are you most proud of?”, “Did you work with YOLO?”, “Can I see your resume?” or “How can I contact you?” 😄`;
  }

  function ask(query) {
    const text = query.trim();
    if (!text) return;
    addMessage(text.replace(/</g,'&lt;').replace(/>/g,'&gt;'), 'user');
    input.value = '';
    presetBox.classList.add('is-hidden');
    setEmotion('thinking');
    const typing = addMessage('<span class="nb-typing"><i></i><i></i><i></i></span>', 'bot');
    setTimeout(() => {
      typing.remove();
      addMessage(getAnswer(text), 'bot');
      setEmotion(/best|great|awesome|project|love|hello|hi/.test(normalize(text)) ? 'happy' : 'neutral');
    }, 420);
  }

  const open = () => {
    root.classList.add('is-open');
    launch.setAttribute('aria-expanded','true');
    panel.setAttribute('aria-hidden','false');
    setEmotion('happy');
    setTimeout(() => input.focus(), 220);
  };
  const shut = () => {
    root.classList.remove('is-open');
    launch.setAttribute('aria-expanded','false');
    panel.setAttribute('aria-hidden','true');
    setEmotion('neutral');
  };

  launch.addEventListener('click', () => root.classList.contains('is-open') ? shut() : open());
  close.addEventListener('click', shut);
  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('is-open')) shut(); });
})();
