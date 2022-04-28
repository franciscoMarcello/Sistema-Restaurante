import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { api } from "../../services/apiClient";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";
export default function Category() {
  const [category, setCategory] = useState("");
  async function handleCategory(event: FormEvent) {
    event.preventDefault();
    if (category === "") {
      toast.warn("Preencha o campo com o nome da categoria");
      return;
    }
    await api.post("/category", {
      name: category,
    });
    toast.success("Categoria cadastrada com sucesso🔥");
    setCategory("");
  }
  return (
    <>
      <Head>
        <title>Nova categoria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categoria</h1>
          <form className={styles.form} onSubmit={handleCategory}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx)=> {
  return{
    props:{}
  }
})
