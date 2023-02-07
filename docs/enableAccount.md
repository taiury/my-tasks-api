# Habilitar conta

> ## POST **/enable**

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
   <td>code</td>
    <td>String</td>
    <td>✅</td>
  </tr>
</table>

> ## Caso de sucesso

1.  ✅ Retorna **200** sem corpo.

> ## Exceções

1. ✅ Retorna **401** caso o email ou senha estejam incorretas.
2. ✅ Retorna **401** caso a conta não estejá habilitada.
3. ✅ Retorna **400** se faltar algum parâmetro ou algum parâmetro enviado estejá mal formatado.
