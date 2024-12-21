"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('smad-token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = 
      await axios.post(`${process.env.NEXT_PUBLIC_API_PROD}/login`, { email, password }).then((res) => {
        // console.log(res.data.data);
        Cookies.set('smad-token', res.data.data.token);
        Cookies.set('smad-name', res.data.data.user.name);
        setIsLoading(false);
        setErrorResponse(null);
        // Cookies.remove('token');
        // Cookies.remove('name');
        // console.log(Cookies.get());
        router.push('/dashboard');
      }).catch((err) => {
        // console.log(err.response.data.message);
        setErrorResponse(err.response.data.message);
        setIsLoading(false);
      });
    // console.log(response);
    // try {
      // Cookies.set('token', response.data.token);
      // Cookies.set('name', response.data.user.name);
      // redirect('/dashboard');
      //   // const response = await fetch('/api/login', {
      //   //   method: 'POST',
      //   //   headers: {
      //   //     'Content-Type': 'application/json',
      //   //   },
      //   //   body: JSON.stringify({ email, password }),
      //   // });
        

      //   // if (response.ok) {
      //   //   router.push('/dashboard');
      //   // } else {
      //   //   setError('Invalid email or password');
      //   // }
    // } catch (error) {
    //   if (error.response) {
    //     // Server merespons dengan status code di luar 2xx
    //     console.error('Error Response:', error.response.data.message);
    //     setErrorResponse(error.response.data.message);
    //     console.log(error);
        
    //     // console.error('Status Code:', error.response.status);
    //     // console.error('Headers:', error.response.headers);
    //   } else if (error.request) {
    //     // Tidak ada respons dari server
    //     console.error('No Response:', error.request);
    //   } else {
    //     // Kesalahan saat membuat permintaan
    //     console.error('Request Error:', error.message);
    //   }
    // }
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen p-2">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Login SMAD</CardTitle>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="grid gap-1">
                  <label htmlFor="password">Password</label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? "Loading . . ." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        {errorResponse && (
            <div className="text-white text-center mt-4 bg-red-500 p-2 rounded w-full lg:w-1/2">
              {errorResponse}
            </div>
        )}
      </div>
    </div>
  );
}
