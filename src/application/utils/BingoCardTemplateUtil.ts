export class BingoCardTemplateUtil {
   static generteTableHTML(values: number[][]): string {
      let html = `
      <table>
         <tr>
            <th>B</th>
            <th>I</th>
            <th>N</th>
            <th>G</th>
            <th>O</th>
         </tr> 
    `;

      for (let i = 0; i < values.length; i++) {
         html += `<tr>`;
         for (let j = 0; j < values[i].length; j++) {
            html += `<td>${values[j][i]}</td>`;
         }
         html += `</tr>`;
      }

      html += `
      </table>
    `;

      return html;
   }

   static generateCardHTML(values: number[][]): string {
      return `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              margin: 20px auto;
            }
            td, th {
              border: 1px solid black;
              width: 50px;
              height: 50px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${BingoCardTemplateUtil.generteTableHTML(values)}
        </body>
      </html>
    `;
   }
}
