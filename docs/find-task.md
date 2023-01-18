# Buscar todas as tarefas do usuário

> ## GET **/task/:taskId/**

<table>
  <tr>
    <th>Send in</th>
    <th>Parameter</th>
    <th>Type</th>
    <th>Required</th>
  </tr>
  <tr>
   <td>Headers</td>
   <td>authentication</td>
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
    <td>Number</td>
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
  </tr>
  <tr>
    <td>authorId</td>
    <td>Number</td>
  </tr>
  <tr>
    <td>finalized</td>
    <td>Boolean</td>
  </tr>
  <tr>
    <td>createdAt</td>
    <td>Date</td>
  </tr>
  <tr>
    <td>deleteAt</td>
    <td>Date | null</td>
  </tr>
</table>

> ## Exceções

1. ✅ Retorna Status Error **400 ou 401** caso authentication estejá mal formatada, formato corretor: **Bearer `space` Token**
