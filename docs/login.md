# Login

> ## POST **/login**

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
</table>

> ## Caso de sucesso

1.  ✅ Retorna **200**
<table>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
  </tr>
  <tr>
    <td>age</td>
    <td>Number</td>
  </tr>
  <tr>
    <td>token</td>
    <td>String</td>
  </tr>
</table>

> ## Exceções

1. ✅ Retorna **400** caso o email ou senha estejam incorretas.
2. ✅ Retorna **400** se faltar algum parâmetro.
