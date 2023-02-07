# modificar Cadastro

> ## PUT **/user**

<table>
  <tr>
    <th>Send in</th>
    <th>Parameter</th>
    <th>Type</th>
    <th>Required</th>
  </tr>
  <tr>
   <td>Body</td>
   <td>password</td>
    <td>String</td>
    <td>❌</td>
  </tr>
  <tr>
   <td>Body</td>
   <td>name</td>
    <td>String</td>
    <td>❌</td>
  </tr>
  <tr>
   <td>Body</td>
   <td>age</td>
    <td>Number</td>
    <td>❌</td>
  </tr>
   <tr>
   <td>Headers</td>
   <td>authentication</td>
    <td>String</td>
    <td>✅</td>
  </tr>
</table>

> ## Caso de sucesso

1.  ✅ Retorna **200** sem corpo.

> ## Exceções

1. ✅ Retorna Status Error **400** caso algum parâmetro enviado estejá mal formatado.
2. ✅ Retorna Status Error **400 ou 401** caso authentication estejá mal formatada, formato corretor: **Bearer `space` Token**.
