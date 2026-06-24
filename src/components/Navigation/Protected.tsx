// #region imports
import { Outlet } from "react-router-dom"
import { useAuthorized } from "@/hooks"
import { LoginForm } from "@/components/Forms"
// #endregion

export function Protected() {
    const { authorized } = useAuthorized()
    if (!authorized) return <LoginForm/>
    return <Outlet />
}