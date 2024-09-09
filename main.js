const board=[
    ["","",""],
    ["","",""],
    ["","",""]  
    ]

let turn=0; //usuario 0, pc 1

const divPlayer=document.querySelector(".player")
const divBoard=document.querySelector(".board")


//___________FUNCION RENDERIZAR EL TABLERO____________
function renderBoard(){
  const html=board.map(row=>{
    
    const cells=row.map(cell=>{
       
            return `<button class="cell">${cell}</button>`
        })
    
        return `<div class="row">${cells.join("")}</div>`
        
    })
    return divBoard.innerHTML=html.join("")
}

//_______________FUNCION COMENZAR PARTIDA_____________
function startGame(){
    renderBoard()
    turn=Math.random() <= 0.5 ? 0 : 1
 
    renderCurrentPlayer()

    if(turn===0){
        playerPlays()
    }
    if(turn===1){
        pcPlays()
    }
}
//_______________FUNCION RENDERIZAR QUIEN TIENE EL TURNO______________
function renderCurrentPlayer(){
divPlayer.textContent=`${turn===0 ? "User Plays" : "Pc Plays"}  `

}

//_____________FUNCION PROGRAMAR TIRADA DEL JUGADOR_____________

function playerPlays(){

   const cells=document.querySelectorAll(".cell")
   
   cells.forEach((cell,i)=>{
        const row=parseInt(i/3)
        const column=i%3
    
        if(board[row][column]===""){
            cell.addEventListener("click",e=>{
                board[row][column]="O"
                cell.textContent=board[row][column]
                turn=1
                const won=checkIfWinner()
                
                if(won==="none"){
                     pcPlays()
                    return
                }
                if(won==="draw"){
                    renderDraw()
                    cell.removeEventListener("click",this)
                    return
                }
                if(won==="User Won" || won==="PC Won"){
                    return
                }
                             
            })
    }
   })
}

//__________________________FUNCION PC PLAYS QUE GESTIONA LA TIRADA DEL PC______________

function pcPlays(){
    
    renderCurrentPlayer()
    
    setTimeout(()=>{
        let played=false
       
        let options=checkIfCanWin()
        
        if(options.length>0){
            
            let bestOption=options[0]
            
            bestOption.forEach(option=>{
               
               if(option.value===0){
                    let posi=option.i
                    let posj=option.j
                    board[posi][posj]="X"
                                   
                     played=true
                  
                    }
                    
                })
             }
             else{
                  for(let i=0;i<board.length; i++){
                    for(let j=0; j<board.length; j++){
                        if(board[i][j]==="" && !played){
                            board[i][j]="X"
                            played=true
                           
                            turn=0
                           
                           
                        }
                    }
                }
             }
             renderBoard()
             renderCurrentPlayer()
            const won=checkIfWinner()
           
            if(won==="none"){
                playerPlays()
                return
            }
            if(won==="draw"){
                renderDraw();
                return
            }
              turn=0;
              playerPlays()
            },1500)

}

//________________FUNCION CHECKIFCANWIN DEVUELVES OPCIONES DE GANAR____________

function checkIfCanWin(){
const arr=JSON.parse(JSON.stringify(board))

for(let i=0; i<arr.length;i++){
    for(let j=0; j<arr.length;j++){
       if(arr[i][j]==="X"){
        arr[i][j]={value:1,i,j}
       }
       else if(arr[i][j]==="O"){
        arr[i][j]={value:-2,i,j}

       }
       else if(arr[i][j]===""){
        arr[i][j]={value:0,i,j}

       }
    }
}
//________________las casillas____
    const p1=arr[0][0];
    const p2=arr[0][1];
    const p3=arr[0][2];

    const p4=arr[1][0];
    const p5=arr[1][1];
    const p6=arr[1][2];

    const p7=arr[2][0];
    const p8=arr[2][1];
    const p9=arr[2][2];
//_________cada una de las soluciones para ganar
    const s1=[p1,p2,p3];
    const s2=[p4,p5,p6];
    const s3=[p7,p8,p9];
    const s4=[p1,p4,p7];
    const s5=[p2,p5,p8];
    const s6=[p3,p6,p9];
    const s7=[p1,p5,p9];
    const s8=[p3,p5,p7];

    const res=[s1,s2,s3,s4,s5,s6,s7,s8].filter(row=>{
               return row[0].value+row[1].value+row[2].value===2 || row[0].value+row[1].value+row[2].value===-4
    }) 
   return res
}


//______________________FUNCION CHECKIFWINNER_______comprueba si hay ganador

function checkIfWinner(){

    //________________las casillas____
    const p1=board[0][0];
    const p2=board[0][1];
    const p3=board[0][2];

    const p4=board[1][0];
    const p5=board[1][1];
    const p6=board[1][2];

    const p7=board[2][0];
    const p8=board[2][1];
    const p9=board[2][2];
//_________cada una de las soluciones para ganar
    const s1=[p1,p2,p3];
    const s2=[p4,p5,p6];
    const s3=[p7,p8,p9];
    const s4=[p1,p4,p7];
    const s5=[p2,p5,p8];
    const s6=[p3,p6,p9];
    const s7=[p1,p5,p9];
    const s8=[p3,p5,p7];

   
    
    const res=[s1,s2,s3,s4,s5,s6,s7,s8].filter(line=>{
        
        return line[0]+line[1]+line[2]==="XXX" || line[0]+line[1]+line[2]==="OOO"
    }) 
    
    
       if(res.length>0){
        const lineRes=res[0]
        const sumLineRes=lineRes[0]+lineRes[1]+lineRes[2]
        
        if(sumLineRes==="XXX"){

            divPlayer.textContent="PC Won"
            return "PC Won"
            
        }
         if(sumLineRes==="OOO"){
           
            divPlayer.textContent="User Won"
         
            return "User Won"
        }
    }
        else{
            let draw=true
            for(let i=0; i<board.length; i++){
                for(let j=0; j<board.length; j++){
                    if(board[i][j]===""){
                        draw=false
                    }
                }
            }
           return draw ? "draw": "none"
        }
       
}

//_________________FUNCION RENDER DRAW QUE MUESTRA EL TEXTO EN PANTALLA "DRAW"
function renderDraw(){
    divPlayer.textContent="DRAW"


}
startGame()