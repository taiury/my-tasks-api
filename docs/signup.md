# Cadastro

> ## POST **/user**

<table>
  <tr>
    <th>Send in</th>
    <th>Parameter</th>
    <th>Type</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>Body</td>
    <td>email</td>
    <td>String</td>
    <td>✅</td>
  </tr>
  <tr>
   <td>Body</td>
   <td>password</td>
    <td>String</td>
    <td>✅</td>
  </tr>
  <tr>
   <td>Body</td>
   <td>name</td>
    <td>String</td>
    <td>✅</td>
  </tr>
  <tr>
   <td>Body</td>
   <td>age</td>
    <td>Number</td>
    <td>✅</td>
  </tr>
</table>

> ## Caso de sucesso

1.  ✅ Retorna **200** sem corpo.

> ## Exceções

1. ✅ Retorna **400** caso o email já exista.
2. ✅ Retorna **400** se faltar algum parâmetro.
