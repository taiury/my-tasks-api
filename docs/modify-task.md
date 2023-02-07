# Modificar tarefa

> ## PUT **/task**

<table>
  <tr>
    <th>Send in</th>
    <th>Parameter</th>
    <th>Type</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>Body</td>
    <td>taskId</td>
    <td>number</td>
    <td>✅</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>title</td>
    <td>String</td>
    <td>❌</td>
  </tr>
  <tr>
   <td>Body</td>
   <td>description</td>
    <td>String</td>
    <td>❌</td>
  </tr>
  <tr>
   <td>Body</td>
   <td>finalized</td>
    <td>Boolean</td>
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

1. ✅ Retorna **400** se faltar algum parâmetro obrigatório ou os parâmetros enviados estejam mal formatados.
2. ✅ Retorna Status Error **400 ou 401** caso authentication estejá mal formatada, formato corretor: **Bearer `space` Token**
