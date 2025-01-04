import React, { useEffect } from 'react'
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from './ui/alert-dialog'
import { Button } from './ui/button'
import axios from 'axios'

const LogoutDialog = ({ token }) => {
    const logout = async () => {
        try {
            await axios.post('/api/logout', {
                token: token
            })
            if (typeof window !== "undefined") {
                localStorage.clear();
            }
            window.location.href = '/'
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="mx-2">LOGOUT</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-9/12">
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Setelah anda logout, anda harus login kembali untuk melanjutkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>Lanjutkan</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutDialog
