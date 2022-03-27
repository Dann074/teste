const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: '(URPF) As invasões germânicas têm início no século IV d.C. e promovem importantes transformações no panorama mediterrâneo, as quais atingem as estruturas do mundo clássico.  Identifique, dentre as transformações abaixo, a que corresponde à raiz da protofeudalização da Europa Ocidental:',
    choice1: 'Substituição do cristianismo pelos cultos celtas e godos nos reinos germânicos.',
    choice2: 'Ruralização e fragmentação do poder político.',
    choice3: 'Desaparecimento do latim como língua escrita e falada, substituída pelos dialetos germânicos.',
    choice4: 'Imposição da maneira de viver dos povos germânicos e consequente destruição da cultura dos povos dominados.',
    answer: 2,
  },
  {
    question: 'Aponte uma consequência direta que resultou do processo de invasão germânica:',
    choice1: 'Aumento da produção agrícola, uma vez que os germânicos eram exímios agricultores.',
    choice2: 'Ruralização da Europa, pois a população fugia das invasões e abrigava-se nas zonas rurais do Império.',
    choice3: 'Fortalecimento do paganismo na Europa, uma vez que parte dos povos germânicos não era cristã.',
    choice4: 'Desagregação do Império Romano do Oriente a partir da conquista de Constantinopla em 476 d.C.',
    answer: 2,
  },
  {
    question: 'Com o desmantelamento do Império Romano do Ocidente, o Norte da África e a Europa Ocidental passaram por uma reconfiguração política, advindo daí a fundação de vários reinos bárbaros. Constituem exemplos referentes a esse contexto histórico, EXCETO:',
    choice1: 'Reino dos Suevos, Reino dos Visigodos, Reino dos Ostrogodos.',
    choice2: 'Reino dos Bretões, Reino dos Francos, Reino dos Anglo-Saxões.',
    choice3: 'Reino de Castela, Reino de Navarra, Reino de Aragão.',
    choice4: 'Reino da Lombardia, Reino dos Vândalos, Reino dos Alamanos.',
    answer: 3,
  },
  {
    question: 'Os povos, que não habitavam o Império romano ou que não sabiam se expressar em latim, eram denominados pelos romanos de bárbaros. Sobre os bárbaros, é incorreto afirmar.',
    choice1: 'Eram povos germânicos na sua grande maioria e nem sempre tiveram relações conflituosas com os romanos.',
    choice2: 'Viviam em comunidade, não tendo, portanto, a complexidade social das cidades romanas nem tampouco as instâncias burocráticas de um grande império.',
    choice3: 'As leis que regiam a vida desses grupos baseavam-se nos costumes e tradições.',
    choice4: 'Professavam uma religião animista e antropomórfica, e os sacerdotes tinham, além de função religiosa, poder militar e político.',
    answer: 4,
  },
  {
    question: 'Qual das alternativas contém somente ascendencias de povos bárbaros?',
    choice1: 'Eslavos, cáucasos, germânicos, escandinavos e celtas.',
    choice2: 'Germânicos, eslavos, tártaro-mongóis, visigodos e ostrogos.',
    choice3: 'Georgianos, escandinavos, eslavos, germânicos e tártaro-mongóis.',
    choice4: 'Eslavos, tártaro-mongóis, celtas, germânicos armênios.',
    answer: 2,
  },
  {
    question: 'Como era a relação entre bárbaros e romanos?',
    choice1: 'Os bárbaros eram escravizados depois de capturados durante conflitos com romanos.',
    choice2: 'Eram indiferentes, os bárbaros não ousavam atravessar os limites do império romano.',
    choice3: 'Era sempre amigável uma vez que haviam comércio e troca de produtos entre eles.',
    choice4: 'Era alternada, haviam momentos harmônicos mas também haviam momentos conflituosos devido as incursões barbaras.',
    answer: 4,
  },
  {
    question: 'A queda do Império Romano do Ocidente...',
    choice1: 'Deu-se no séc. V, com as invasões bárbaras.',
    choice2: 'Deu-se no séc. XV, com a derrubada de Constantinopla.',
    choice3: 'Deu-se no séc. XV com as invasões bárbaras.',
    choice4: 'Deu-se no séc. XIV, último soberano carolíngio.',
    answer: 1,
  },
  {
    question: 'Em que ano se deu o fim do Império Romano do Ocidente?',
    choice1: '476',
    choice2: '764',
    choice3: '674',
    choice4: '467',
    answer: 1,
  },
  {
    question: 'Na visão Grega, qual era a definição de Barbáros?',
    choice1: 'Vikings, que eram conhecidos por serem brutais.',
    choice2: 'Qualquer povo que não falava Latim.',
    choice3: 'Germânicos, por causa de sua brutalidade.',
    choice4: 'Estrangeiros, qualquer povo que não falava a língua grega e nem compartilhavam dos mesmos costumes da Grécia.',
    answer: 4,
  },
  {
    question: 'O rio que, de forma natural, estabeleceu inicialmente fronteira entre os romanos e os bárbaros, era o:',
    choice1: 'Rio Tibre.',
    choice2: 'Rio Sena.',
    choice3: 'Rio Reno.',
    choice4: 'Rio Tâmisa.',
    answer: 3,
  },
  {
    question: 'A queda do império Romano do Ocidente se deu no ano de 476, pois ocorreu a deposição do último imperador romano Rômulo Augusto. O até então rei de hérulos, povo germano, foi quem tomara seu lugar. Qual dessas figuras históricas se encaixa nessa descrição.',
    choice1: 'Teodorico, o Grande. Tinha um grande respeito pela cultura romana, vendo a si mesmo como um de seus representantes.',
    choice2: 'Flávio Odoacro. Aquele que introduziu algumas mudanças importantes no sistema administrativo da Itália.',
    choice3: 'Atilá, o Huno. Durante seu reinado, levou a cabo uma política agressiva de cobrança de tributos e eventualmente de intervenção militar em reinos vizinhos.',
    choice4: 'Amalasunta. Filha mais nova de Teodorico, o Grande, e acreditava firmemente na defesa das virtudes e valores romanos.',
    answer: 2,
  },
  {
    question: 'Após a morte de Teodósio o império foi dividido entre seus dois filhos, Honório e Arcádio. O primeiro recebeu os territórios do Ocidente, o outro recebia territórios do Oriente. A alternativa que, respectivamente, dá as sedes corretas dessas regiões é:',
    choice1: 'Roma e Veneza.',
    choice2: 'Roma e Constantinopla.',
    choice3: 'Veneza e Constantinopla.',
    choice4: 'Constantinopla e Roma.',
    answer: 2,
  },
  {
    question: 'Durante três séculos, romanos e germanos conviveram pacificamente. Entretanto um povo, proveniente de outro continente, acabou ocupando os territórios pertencentes aos germanos. Que povo era esse? E de que continente ele veio?',
    choice1: 'Os hunos, excelentes criadores de cavalos e adeptos de combates a cavalo. Povo originário da Ásia.',
    choice2: 'Os povos iranianos. Dominaram toda a Ásia Central e o Irã por um período considerável, após isso continuaram suas conquistas vindo para Europa. Provenientes do Médio Oriente.',
    choice3: 'Os mongóis, formadores de sociedades complexas na Idade Média, e também grupo étnico que habitou inicialmente as estepes da Ásia Central.',
    choice4: 'Os Goturcos, sob a liderança do grão-cã Bumim formaram o chamado Canato Túrquico ou Canato Goturco. Foi uma Confederação nômade da Ásia Central.',
    answer: 1,
  },
  {
    question: 'No processo de desagregação do Império Romano, ocorreu uma fusão entre as instituições romanas e as instituições dos povos bárbaros, acrescida do processo de cristianização. Surgiram então reinos cristão bárbaros. A alternativa que apresenta corretamente um desses reinos é:',
    choice1: 'Reino dos eslavos.',
    choice2: 'Reino dos alamanos.',
    choice3: 'Reino dos lombardos.',
    choice4: 'Reino dos ostrogodos.',
    answer: 4,
  },
  {
    question: 'Há um mar que durante o auge do império romano detinha suma importância econômica, geográfica e política uma vez que era responsável por interligar quase todo o império. Com a queda do império romano do ocidente, ele também foi o único mar que ligou o império remanescente do oriente ao reinos cristão bárbaros. Esse mar era o:',
    choice1: 'Mar do Norte.',
    choice2: 'Mar Negro.',
    choice3: 'Mar Mediterrâneo.',
    choice4: 'Mar Vermelho.',
    answer: 3,
  },
  {
    question: 'Qual das opções abaixo era o imperador conhecido como o suposto responsável por colocar fogo em Roma:',
    choice1: 'Caracala.',
    choice2: 'Vesperiano.',
    choice3: 'Nero.',
    choice4: 'Alexandre Severo.',
    answer: 3,
  },
  {
    question: 'Quais foram os legados da civilização romana ao mundo moderno:',
    choice1: 'Campo militar, matemática e arte.',
    choice2: 'Política, direito e engenharia.',
    choice3: 'Arte, literatura e filosofia.',
    choice4: 'Direito, química e arquitetura.',
    answer: 2,
  },
  {
    question: 'A decadência da porção ocidental do Império Romano contribuiu para que uma nova capital se estabelecesse no Império\nEssa cidade foi:',
    choice1: 'Constantinopla.',
    choice2: 'Ravena.',
    choice3: 'Alexandria.',
    choice4: 'Cápua.',
    answer: 1,
  },
  {
    question: 'Após a expansão romana muitos agricultores mudaram-se para a cidade, o que aconteceu devido a essa super lotação?',
    choice1: 'Falta de comida, pois os agricultores haviam saído do campo.',
    choice2: 'A insatisfação dos moradores da cidade que perderam os seus empregos para os novos moradores.',
    choice3: 'Acúmulo de demanda de alimentos aos agricultores que continuaram no campo.',
    choice4: 'Tensões sociais, pois não havia estrutura suficiente para essa população.',
    answer: 4,
  },
  {
    question: 'Qual era o principal desafio do Império Romano?',
    choice1: 'A Grande Fome causada pelo expansão romana.',
    choice2: 'Consolidar o Império sem causar manifestações contrárias.',
    choice3: 'Administrar um vasto Império de maneira eficiente.',
    choice4: 'Tensões sociais nas cidades causadas pela expansão romana.',
    answer: 2,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 9

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS + 1}`
  progressBarFull.style.width = `${[questionCounter/(MAX_QUESTIONS + 1)] * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()