export function safeReturnTo(value:string|null|undefined){return value&&value.startsWith("/app")&&!value.startsWith("//")?value:"/app"}
