export default function HelloWorld(){ //parent - component
     const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01",
        usia: 16 
    } //variabel javascript, selalu sebelum return, props js
    return ( // return hanya untuk html
        <div>
            <h1>Hello World</h1>
            <img src="./img/22868706_6701299.jpg" width="90" height="90"/>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai/>
            <hr />
            <UserCard 
	            nama="Amelia Golisa" 
	            nim="2457301013"
	            tanggal={new Date().toLocaleDateString()}
                usia="19"
	          />
            <UserCard {...propsUserCard}/>
            {/* <GreetingBinjai/>
            <GreetingBinjai/> */}
            <QuoteText/>
        </div>
    )
}
function GreetingBinjai(){ //child - component
    return(
        <small>Salam dari Binjai</small> //componen tidak dapat memanggil diri nya sendiri
    )
}

function QuoteText() { // javascript - component
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan";
    return (
        <div className="card">
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserCard(props){ // Properties - component, parent ke child, child tidak boleh pakai props
    return (
        <div className="card">
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
            <p>Usia: {props.usia}</p>
        </div>
    )
}