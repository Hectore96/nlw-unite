// array
let participantes = [
    {
        nome: "Hector Vinicius",
        email: "hector@live.com",
        dataInsc: new Date(2024, 2, 1, 12, 33),
        dataCheckIn: null
    },
    {
        nome: "Sabrina Almeira",
        email: "sabrina@yahoo.com",
        dataInsc: new Date(2024, 2, 2, 12, 33),
        dataCheckIn: null
    },
    {
        nome: "José da Silva",
        email: "jose@gmail.com",
        dataInsc: new Date(2024, 2, 3, 12, 33),
        dataCheckIn: new Date(2024, 2, 10, 19, 13)
    },
    {
        nome: "Maria Souza",
        email: "maria@hotmail.com",
        dataInsc: new Date(2024, 2, 4, 12, 33),
        dataCheckIn: new Date(2024, 2, 11, 19, 13)
    },
    {
        nome: "Pedro Junior",
        email: "pedro@example.com",
        dataInsc: new Date(2024, 2, 5, 12, 33),
        dataCheckIn: new Date(2024, 2, 12, 19, 13)
    },
    {
        nome: "Ana Silva",
        email: "ana@example.com",
        dataInsc: new Date(2024, 2, 6, 12, 33),
        dataCheckIn: new Date(2024, 2, 13, 19, 13)
    },
    {
        nome: "Marcos Oliveira",
        email: "marcos@example.com",
        dataInsc: new Date(2024, 2, 7, 12, 33),
        dataCheckIn: new Date(2024, 2, 14, 19, 13)
    },
    {
        nome: "Aline Santos",
        email: "aline@example.com",
        dataInsc: new Date(2024, 2, 8, 12, 33),
        dataCheckIn: new Date(2024, 2, 15, 19, 13)
    },
    {
        nome: "João Oliveira",
        email: "joao@example.com",
        dataInsc: new Date(2024, 2, 9, 12, 33),
        dataCheckIn: new Date(2024, 2, 16, 19, 13)
    },
    {
        nome: "Luana Souza",
        email: "luana@example.com",
        dataInsc: new Date(2024, 2, 10, 12, 33),
        dataCheckIn: new Date(2024, 2, 17, 19, 13)
    },
    {
        nome: "Rafaela Santos",
        email: "rafaela@example.com",
        dataInsc: new Date(2024, 2, 11, 12, 33),
        dataCheckIn: new Date(2024, 2, 18, 19, 13)
    },
    {
        nome: "Carlos Silva",
        email: "carlos@example.com",
        dataInsc: new Date(2024, 2, 12, 12, 33),
        dataCheckIn: new Date(2024, 2, 19, 19, 13)
    },
    {
        nome: "Fernanda Oliveira",
        email: "fernanda@example.com",
        dataInsc: new Date(2024, 2, 13, 12, 33),
        dataCheckIn: new Date(2024, 2, 20, 19, 13)
    }
];

const criarNovoParticipante = (participante) => {
    const dtInsc = dayjs(Date.now())
        .to(participante.dataInsc);
    let dtCheck = dayjs(Date.now())
        .to(participante.dataCheckIn)

    //condicional
    if (participante.dataCheckIn == null) {
        dtCheck = `
        <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
        >
        Confirmar Check-In
        </button>
        `
    }
    return `
<tr>
        <td>
            <strong>
            ${participante.nome}
        </strong>
        <br>
        <small>
        ${participante.email}
        </small>
        </td>
        <td>
        ${dtInsc}
        </td>
        <td>
        ${dtCheck}
        </td>
</tr>`
}

const atualizarLista = (participantes) => {
    // pegando informação do HTML
    let output = ""
    // estrutura de repetição - loop
    for (let participante of participantes) {
        // faça alguma coisa
        output = output + criarNovoParticipante(participante)
    }
    // substituindo informação do HTML
    document
        .querySelector('tbody')
        .innerHTML = output
}
atualizarLista(participantes)

const addParticipante = (event) => {
    event.preventDefault()

    const dadosForm = new FormData(event.target)

    const participante = {
        nome: dadosForm.get("nome"),
        email: dadosForm.get("email"),
        dataInsc: new Date(),
        dataCheckIn: null
    }
    // verificando se tem um participante com o email
    const existPart = participantes.find(
        (p) => p.email == participante.email
    )
    if (existPart) {
        alert('Email já cadastrado, não pode se increver.')
        return
    }
    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar o form
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    // confirmar se quer fazer o check-in
    const msgConfirm = "Você clicou em fazer Check-In, deseja confirmar?"
    if (confirm(msgConfirm) == false) {
        return alert('Confirmação, cancelada pelo usuario!')
    }

    // encontrar o participante dentro da lista
    const participante = participantes.find(
        (p) => p.email == event.target.dataset.email
    )
    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes
    atualizarLista(participantes)
}