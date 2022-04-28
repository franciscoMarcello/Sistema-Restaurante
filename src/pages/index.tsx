import Head from "next/head";
import { useContext, FormEvent, useState } from "react";
import Image from "next/image";
import logoImg from "../../public/logo.png";
import styles from "../../styles/home.module.scss";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSSRGuest";
export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function login(event: FormEvent) {
    event.preventDefault();
    if (email === "" || password === "") {
      toast.warn("Preencha todos os campos");
      return;
    }
    setLoading(true);
    let data = {
      email,
      password,
    };
    await signIn(data);
    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Sistema - Restaurante</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo do restaurante" height="500" />
        <div className={styles.login}>
          <form onSubmit={login}>
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
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
