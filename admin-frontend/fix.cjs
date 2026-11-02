const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.startsWith("import React from 'react';\n")) {
        fs.writeFileSync(p, c.replace("import React from 'react';\n", ""));
      } else if (c.includes("import React, { useState } from 'react';")) {
        fs.writeFileSync(p, c.replace("import React, { useState } from 'react';", "import { useState } from 'react';"));
      }
    }
  });
};

walk('./src/pages');
let r = fs.readFileSync('./src/router.tsx', 'utf8');
fs.writeFileSync('./src/router.tsx', r.replace("import React from 'react';\n", ""));
console.log('Fixed imports');
