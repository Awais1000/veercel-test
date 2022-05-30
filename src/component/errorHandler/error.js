export function ShowMessage(params) {

  if (params.status == 200) {
    return <h4 className="response" role="alert">
      {params.message}
    </h4>

  } else if (params.status == 422) {
    return <h4 className="error" role="alert">
      {params.message}

    </h4>

  } else if (params.status == 401) {
    return <h4 className="error" role="alert">
      {params.message}
    </h4>
  }
}