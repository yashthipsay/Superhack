import "./confirmations.css";

// @ts-ignore
export default function build(confirmations) {
    return `
       <label> Confirmations (${confirmations.length}) </label>
       <div class="confirmations">
         
         ${confirmations.map((address: any) => (
           `<div class="confirmation">
               ${address}
            </div>`
         )).join('')}
       </div>
    `;
}