export type AdminLoginResponseType = {
    token: string
    user: AdminUserDataType
}

export type AdminUserDataType = {
    _id: string,
    name: string,
    email: string,
    role: string,
    status: StatusType
}

export type StatusType = "active" | "inactive";

export type ClassResponseType = {
    _id: string,
    class: string,
    status: string,
    createdAt: Date,
    udpatedAt: Date
}