import Head from "next/head";
import { FormEvent, useState, useContext } from "react";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import styles from "../../../styles/home.module.scss";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";
import { toast } from "react-toastify";
export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function HandleSignUp(event: FormEvent) {
    event.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.warn("Preencha todos os campos");
      return;
    }
    setLoading(true);
    let data = { name, email, password };
    await signUp(data);
    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo do restaurante" height="500" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={HandleSignUp}>
            <Input
              placeholder="Digite seu Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite seu E-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <a className={styles.text}>Já possui uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  );
}
