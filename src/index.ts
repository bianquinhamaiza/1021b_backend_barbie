import express from 'express'
import ListaFilme from './aplicacao/lista-filme.use-case'
import BancoMongoDB from './infra/banco/banco-mongodb'
import SalvaFilme from './aplicacao/salva-filme.use-case'
import cors from 'cors'

const app = express()
const bancoMongoDB = new BancoMongoDB()
app.use(express.json())
app.use(cors())
//Tenho que ter uma rota post para cadastrar um filme
type Filme = {
    id:number,
    titulo:string,
    descricao:string,
    imagem:string
}
let filmesCadastrados:Filme[] = []
app.post('/filmes',async (req,res)=>{
    const {id,titulo,descricao,imagem} = req.body
    const filme = {
        id,
        titulo,
        descricao,
        imagem
    }
    //Como eu salvo o filme que foi cadastrado no meu vetor de filmes (Banco de dados)
    const salvaFilme = new SalvaFilme(bancoMongoDB)
    const resposta = await salvaFilme.execute(filme)
    res.status(201).send(filme)
    // try{
    // }catch(error){
    //     res.status(400).send({"mensagem":"Erro ao cadastrar o filme"})
    // }
})

app.get('/filmes', async(req,res)=>{
    //usem o listarFilme para listar os filmes
    const listaFilme = new ListaFilme(bancoMongoDB)
    const filmes = await listaFilme.executar()
    res.send(filmes).status(200)

})

app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filmeId = filmesCadastrados.find(Filme => Filme.id == id);
    if(!filmeId) return res.status(404).send("Filme não encontrado");
    res.status(200).send(filmeId);      
});

//Tenho que iniciar o servidor na porta 3000
app.listen(3000,()=>{
    console.log('Servidor rodando na porta 3000')
})

//Tenho que ter uma rota post para cadastrar um filme

//Salvar em algum lugar o filme que foi cadastrado.
let filmesCadastros:Filme[] = [];


