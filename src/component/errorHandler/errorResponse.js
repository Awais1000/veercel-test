export function InputError(params) {
  if (params.name) {
    return <div className="errormessage">{params.name}</div>

  } else if (params.email) {
    return <div className="errormessage">{params.email}</div>

  } else if (params.password) {
    return <div className="errormessage">{params.password}</div>
  }
}