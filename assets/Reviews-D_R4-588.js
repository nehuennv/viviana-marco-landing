import{c as i,j as r,q as e,t as c}from"./index-s4waeJzP.js";import{M as v}from"./map-pin-BSWAymgU.js";const g=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],b=i("circle-check",g);const w=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],j=i("pen-line",w);const y=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"rib7q0"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"1ymkrd"}]],N=i("quote",y);const k=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],m=i("star",k),C="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-slate-200 backdrop-blur-md text-slate-600 text-xs font-bold uppercase tracking-widest shadow-sm mb-6",_=()=>{const[d,p]=r.useState([]),[n,x]=r.useState(null),[o,h]=r.useState(0),u=[{id:1,name:"Mariana Lahournere",date:"13 Dic, 2025",text:"Viviana fue una verdadera bendición para mis tres nenes. No solo les dejó una sonrisa hermosa, sino que también los ayudó desde lo estructural, corrigiendo la mordida. Es una profesional súper responsable.",stars:5,googleColor:"#8D6E63"},{id:2,name:"Cynthia Brualla",date:"11 Dic, 2025",text:"Excelente profesional la doctora Marco!! Agradecida por cuidar y ser tan delicada con mi hija en cada etapa del tratamiento, su paciencia y atención a los detalles hace una diferencia enorme!!!",stars:5,googleColor:"#C2185B"},{id:3,name:"Guillermo Perez",date:"16 Dic, 2025",text:"Quiero destacar la excelente atención y profesionalismo! Tuve la oportunidad de hacer un tratamiento de ortodoncia y los resultados fueron positivos en tiempo y forma. Destacar la buena atención en higiene.",stars:5,googleColor:"#00897B"}];return r.useEffect(()=>{const a=[...u].sort(()=>.5-Math.random());p(a.slice(0,3))},[]),r.useEffect(()=>{if(!n)return;const a=new IntersectionObserver(t=>{t.forEach(l=>{if(l.isIntersecting){const s=l.target.dataset.index;s!=null&&h(Number(s))}})},{root:n,threshold:.5});return Array.from(n.children).forEach(t=>{t.hasAttribute("data-index")&&a.observe(t)}),()=>a.disconnect()},[n,d]),e.jsxs("section",{id:"reviews",className:"py-12 md:py-24 relative overflow-hidden z-10",children:[e.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -z-10"}),e.jsxs("div",{className:"max-w-7xl mx-auto px-0 md:px-6 relative z-10",children:[e.jsxs("div",{className:"text-center mb-12 px-6",children:[e.jsxs("div",{className:C,"data-aos":"fade-down",children:[e.jsx("div",{className:"bg-amber-100 p-1 rounded-full text-amber-500",children:e.jsx(m,{size:14,fill:"currentColor"})}),e.jsx("span",{children:"Google Reviews"})]}),e.jsxs("h2",{className:"text-4xl md:text-5xl font-bold text-slate-800 tracking-tight","data-aos":"fade-up","data-aos-delay":"100",children:["Pacientes",e.jsxs("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-400 drop-shadow-sm",children:[" ","felices."]})]})]}),e.jsxs("div",{ref:x,"data-aos":"fade-up","data-aos-delay":"200",className:`\r
            relative\r
            flex \r
            md:flex-wrap md:justify-center\r
            gap-4 md:gap-6\r
            overflow-x-auto snap-x snap-mandatory \r
            pl-[calc((100vw-280px)/2)] pr-[calc((100vw-280px)/2)]\r
            md:px-6 \r
            pb-8 md:pb-0\r
            scroll-smooth\r
            hide-scrollbar\r
          `,children:[d.map((a,t)=>{const l=a.name.charAt(0).toUpperCase(),s=o===t;return e.jsx("div",{"data-index":t,className:"h-full snap-center flex-shrink-0",children:e.jsx(c.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:s?1:.9},transition:{duration:.5,ease:"easeOut"},className:`\r
                    min-w-[280px] w-[280px] \r
                    md:min-w-0 md:w-[350px]\r
                    h-full \r
                    md:!scale-100 md:!opacity-100\r
                  `,children:e.jsxs("div",{className:`\r
                      group relative rounded-[2rem] p-6 md:p-8 h-full flex flex-col justify-between overflow-hidden\r
                      \r
                      /* ESTILOS BASE (Mobile First) */\r
                      bg-gradient-to-br from-white via-violet-50/30 to-purple-50/20\r
                      border border-violet-200/60\r
                      shadow-none\r
\r
                      /* ESTILOS DESKTOP (md:) */\r
                      md:bg-white\r
                      md:border-slate-200\r
                      md:shadow-sm\r
                      \r
                      /* HOVER (Solo Desktop) */\r
                      transition-all duration-300 ease-in-out\r
                      md:hover:bg-white \r
                      md:hover:border-violet-200 \r
                      md:hover:shadow-2xl md:hover:shadow-violet-500/20 \r
                      md:hover:-translate-y-1\r
                    `,children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"}),e.jsx("div",{className:"absolute top-6 right-6 transition-transform duration-500 ease-out md:group-hover:rotate-12 hidden md:block",children:e.jsx(N,{className:"text-slate-200/50 transition-colors duration-500 md:group-hover:text-violet-200",size:60,fill:"currentColor"})}),e.jsxs("div",{className:"relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.jsxs("div",{className:"relative w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-inner shrink-0",children:[e.jsx("span",{className:"absolute inset-0 rounded-2xl",style:{backgroundColor:a.googleColor}}),e.jsx("span",{className:"relative z-10",children:l})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold text-slate-800 text-sm line-clamp-1",children:a.name}),e.jsxs("div",{className:"flex items-center gap-1 mt-0.5 opacity-60",children:[e.jsx(b,{size:12,className:"text-green-500"}),e.jsx("span",{className:"text-[10px] uppercase font-bold tracking-wide",children:"Verificado"})]})]})]}),e.jsx("div",{className:"flex gap-1 mb-4",children:[...Array(a.stars)].map((z,f)=>e.jsx(m,{size:16,className:"text-amber-400 fill-amber-400 drop-shadow-sm"},f))}),e.jsxs("p",{className:"text-slate-600 text-xs md:text-[15px] leading-relaxed font-medium text-pretty whitespace-normal break-words",children:['"',a.text,'"']})]}),e.jsxs("div",{className:"mt-6 md:mt-8 pt-5 border-t border-slate-100/50 flex items-center justify-between relative z-10 text-slate-400/80 transition-colors duration-300 md:group-hover:border-violet-100",children:[e.jsxs("div",{className:"flex items-center gap-2 filter grayscale opacity-70 transition-all duration-300 md:group-hover:grayscale-0 md:group-hover:opacity-100",children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),e.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),e.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),e.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),e.jsx("span",{className:"text-xs font-bold md:group-hover:text-slate-600 transition-colors",children:"Google"})]}),e.jsx("span",{className:"text-xs font-medium md:group-hover:text-slate-500 transition-colors",children:a.date})]})]})})},a.id)}),e.jsx("div",{className:"w-1 md:hidden flex-shrink-0"})]}),e.jsx("div",{className:"flex md:hidden justify-center gap-2 mt-2 mb-12",children:d.map((a,t)=>e.jsx(c.div,{animate:{width:o===t?24:8,backgroundColor:o===t?"#7c3aed":"#cbd5e1",opacity:o===t?1:.5},className:"h-2 rounded-full",transition:{type:"spring",stiffness:300,damping:30}},t))}),e.jsxs("div",{className:"flex flex-col md:flex-row justify-center gap-3 md:gap-6 px-6 md:px-0 md:mt-12","data-aos":"fade-up","data-aos-delay":"300",children:[e.jsxs("a",{href:"https://www.google.com/maps/place/?q=place_id:ChIJm3osuPUzCpYR-i-TI3gOw20",target:"_blank",rel:"noopener noreferrer",className:`\r
              outline-none focus:outline-none\r
              flex items-center justify-center gap-2 px-8 py-3.5 rounded-full\r
              border border-slate-200 bg-white text-slate-500 font-semibold text-sm tracking-wide shadow-sm\r
              transition-all duration-300\r
              hover:border-violet-200 hover:text-violet-600 hover:shadow-lg hover:shadow-violet-500/10\r
              active:scale-[0.98]\r
              w-full sm:w-auto\r
            `,children:[e.jsx(v,{size:18})," Ver reseñas"]}),e.jsxs("a",{href:"https://search.google.com/local/writereview?placeid=ChIJm3osuPUzCpYR-i-TI3gOw20",target:"_blank",rel:"noopener noreferrer",className:`\r
              outline-none focus:outline-none\r
              flex items-center justify-center gap-2 px-8 py-3.5 rounded-full\r
              bg-violet-600 text-white font-semibold text-sm tracking-wide \r
              shadow-lg shadow-violet-500/30\r
              transition-all duration-300\r
              hover:shadow-violet-500/50 hover:brightness-110\r
              active:scale-[0.98]\r
              w-full sm:w-auto\r
            `,children:[e.jsx(j,{size:18})," Opinar"]})]})]})]})};export{_ as default};
