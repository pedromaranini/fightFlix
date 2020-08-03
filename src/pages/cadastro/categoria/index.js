import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../componentes/PageDefault";
import FormField from "../../../componentes/FormField";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descrição: "",
    cor: "#f4f4f4",
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
          label="Nome da Categoria: " 
          type="text"
          name="nome"
          value={values.nome}
          onChange={handle}
        />

        <FormField 
          label="Descrição"
          type="text"
          name="descrição"
          value={values.descrição}
          onChange={handle}
        />


       <FormField 
          label="Cor: "
          type="color"
          name="cor"
          value={values.cor}
          onChange={handle} 
        />


        <button>Cadastrar</button>
      </form>

      <ul>
        {categorias.map((categoria, indice) => {
          return <li key={`${categoria}${indice}`}>
          {categoria.nome}
        </li>;
        })}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
