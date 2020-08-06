import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../componentes/PageDefault";
import FormField from "../../../componentes/FormField";
import Button from '../../../componentes/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descrição: "",
    cor: "",
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    // chave: nome, descricao
    setValues({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handle(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute("name"),
      infosDoEvento.target.value
    );
  }

  useEffect(() => {
    console.log('alo');
    const URL = 'http://localhost:8080/categorias';

    fetch(URL)
    .then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias([
        ...resposta
      ]);
    });

  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>

      <form
        onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          setCategorias([...categorias, values]);

          setValues(valoresIniciais);
        }}
      >
        
        <FormField
          label="Nome da Categoria" 
          type="text"
          name="nome"
          value={values.nome}
          onChange={handle}
        />

        <FormField 
          label="Descrição"
          type="textarea"
          name="descrição"
          value={values.descrição}
          onChange={handle}
        />


       <FormField 
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handle} 
        />


        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Loading . . .
        </div>
      )}

      <ul>
        {categorias.map((categoria) => {
          return <li key={`${categoria.nome}`}>
          {categoria.nome}
        </li>;
        })}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
