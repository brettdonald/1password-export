import { item } from "@1password/op-js"
import fs from 'fs'

const dataDirectory = './data'
const outputFileName = dataDirectory + '/poppy.html'

const formatDate = s => {
  const date = new Date(s * 1000)
  return date.toLocaleDateString()
}

console.log('fetching item list ...')
const items = item.list({vault: "Poppy"})
items.sort((a,b) => {
  const at = a.title.toLowerCase()
  const bt = b.title.toLowerCase()
  if (at < bt) return -1
  if (at > bt) return 1
  return 0
})
const a = []
for (let j = 0; j < items.length; j++) {
  const i = items[j]
  console.log(`processing ${j+1}/${items.length} – ${i.title}`)
  const d = item.get(i.id)
  a.push('<div class="entry">')
  a.push(`<h4>${i.title.replace('(Poppy)', '')}</h4>`)
  a.push('<p>')
  if (i.category == 'LOGIN') d.urls.forEach(u => {
    a.push(`<span class="label">${u.label}</span><span class="monospace"}>${u.href.replace('https://','')}</span>`)    
  })
  d.fields.forEach(f => {
    const label = (f.label == 'notesPlain' ? 'notes' : f.label)
    const value = (f.type == 'DATE' ? formatDate(f.value) : f.value)
    if (f.value) a.push(`<span class="label">${label}</span><span${f.purpose == 'USERNAME' || f.purpose == 'PASSWORD' ? ' class="monospace"' : ''}>${value}</span>`)
  })
  a.push('</p>')
  a.push('</div>')
}

const h1 = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Lato:wght@400;700&display=swap" rel="stylesheet">
<style>
  body {
    font-family: 'Lato', sans-serif;
    columns: 2;
    margin: 0;
  }
  .entry {
    border: 1px solid #888;
    border-radius: 1em;
    padding: 1em; 
    margin-bottom: 1em;
    break-inside: avoid;
    box-sizing: border-box;
  }
  .entry>h4 {
    margin: 0 0 0.2em;
  }
  .entry>p {
    display: inline-grid;
/*    grid-template-columns: minmax(4em,1fr) minmax(0,max-content); */
    grid-template-columns: auto auto;
    gap: 0.1em 0.5em;
    align-items: baseline;
    overflow-wrap: anywhere;
  }
  .entry>p>span.label {
    color: #888;
    justify-self: end;
    text-align: right;
    font-size: 0.9em;
    white-space: nowrap;
  }
  .entry>p:last-child {
    margin-bottom: 0; 
  }
  .monospace {
    font-family: 'Courier Prime', monospace;
  }
</style>
</head>
<body>
`

// write the HTML string as a local file
try {
	fs.writeFileSync(outputFileName, h1 + a.join('\n') + '\n</body>\n</html>')
	console.log('wrote output file ' + outputFileName)
}
catch(e) {
	console.log('error writing output file: ' + e)
}




/*


{
  id: '2xs42gyodvt5ok2uo7twqqcpr4',
  title: 'Australian Mutual Bank',
  version: 13,
  vault: { id: 'zlxfhvxbmi7fctuamlcvyarsku', name: 'Poppy' },
  category: 'LOGIN',
  last_edited_by: 'OTNWZVPVSJC6NMUWUKJA6WMDAM',
  created_at: '2023-09-19T22:19:04Z',
  updated_at: '2023-10-21T22:54:14Z',
  additional_information: '139344',
  urls: [ [Object] ]
}
  
  
  
{
  id: '2xs42gyodvt5ok2uo7twqqcpr4',
  title: 'Australian Mutual Bank',
  version: 13,
  vault: { id: 'zlxfhvxbmi7fctuamlcvyarsku', name: 'Poppy' },
  category: 'LOGIN',
  last_edited_by: 'OTNWZVPVSJC6NMUWUKJA6WMDAM',
  created_at: '2023-09-19T22:19:04Z',
  updated_at: '2023-10-21T22:54:14Z',
  additional_information: '139344',
  urls: [
    {
      label: 'website',
      primary: true,
      href: 'https://australianmutual.bank'
    }
  ],
  sections: [
    { id: 'add more' },
    {
      id: 'jhnx64luyzcpm5xnhcyln7cj6q',
      label: 'First membership (Len alone)'
    },
    {
      id: 'dvj6thr2qsvqpm47xofxmbwlvi',
      label: 'Second membership (Len & Narrelle)'
    }
  ],
  fields: [
    {
      id: 'username',
      type: 'STRING',
      purpose: 'USERNAME',
      label: 'username',
      value: '139344',
      reference: 'op://Poppy/Australian Mutual Bank/username'
    },
    {
      id: 'password',
      type: 'CONCEALED',
      purpose: 'PASSWORD',
      label: 'password',
      value: 'Cloncurry66!',
      reference: 'op://Poppy/Australian Mutual Bank/password',
      password_details: [Object]
    },
    {
      id: 'notesPlain',
      type: 'STRING',
      purpose: 'NOTES',
      label: 'notesPlain',
      reference: 'op://Poppy/Australian Mutual Bank/notesPlain'
    },
    {
      id: '4vluccb2g56jbtukokosmlr354',
      section: [Object],
      type: 'STRING',
      label: 'Member number (Len)',
      value: '139344',
      reference: 'op://Poppy/Australian Mutual Bank/jhnx64luyzcpm5xnhcyln7cj6q/4vluccb2g56jbtukokosmlr354'
    },
    {
      id: 'ovvfvna3n6gdm4ftr5qnq63b5m',
      section: [Object],
      type: 'STRING',
      label: 'Account number',
      value: '100208119',
      reference: 'op://Poppy/Australian Mutual Bank/jhnx64luyzcpm5xnhcyln7cj6q/Account number'
    },
    {
      id: 'wkyf2wbd6lqsbz5em6zted5sva',
      section: [Object],
      type: 'STRING',
      label: 'Member number',
      value: '27424',
      reference: 'op://Poppy/Australian Mutual Bank/dvj6thr2qsvqpm47xofxmbwlvi/Member number'
    },
    {
      id: 'letby27anz7fmd4g4uiigvsqpi',
      section: [Object],
      type: 'STRING',
      label: 'Account numbers (3)',
      value: '100021266',
      reference: 'op://Poppy/Australian Mutual Bank/dvj6thr2qsvqpm47xofxmbwlvi/letby27anz7fmd4g4uiigvsqpi'
    },
    {
      id: 'i36plxfwesrnm7mhlz3ivv6v74',
      section: [Object],
      type: 'STRING',
      label: 'BSB',
      value: '611100',
      reference: 'op://Poppy/Australian Mutual Bank/add more/BSB'
    }
  ]
}

*/