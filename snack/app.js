import React, {useState} from 'react'
import {View, Text, Button, TouchableOpacity, StyleSheet, FlatList} from 'react-native'

export default function App(){
  // Estado para armazenar o carrinho. Ex: { '1': { produto: {}, quantidade: 2 } }
  const [carrinho, setCarrinho] = useState({});
// Função para adicionar produto ao carrinho
const adicionarAoCarrinho = (produto) => {
  setCarrinho((prev) => {
    const atual = { ...prev }; // Copia o carrinho anterior
    if (atual[produto.id]) {
      atual[produto.id].quantidade += 1; // Se já tem o produto, aumenta a quantidade
    } else {
      atual[produto.id] = { produto, quantidade: 1 };
    }
    return atual;
  });
};
// Função para remover 1 unidade de um produto do carrinho
const removerCarrinho = (produtoId) => {
  setCarrinho ((prev) => {
    const atual = {...prev}; // Copia o carrinho atual

    if (atual[produtoId]) {
      atual[produtoId].quantidade -= 1; // Diminui 1 da quantidade

      if (atual[produtoId].quantidade <= 0) {
        delete atual[produtoId]; // Se quantidade for 0, remove o produto
      }
    }
    return atual; // Atualiza o estado
  });
};
// Função para calcular o total de itens e o valor total
const resumo = () => {
  let totalitens = 0;
  let totalvalor = 0;
  // Percorre todos os itens do carrinho
  Object.values(carrinho).forEach(({produto, quantidade}) => {
    totalitens += quantidade;
    totalvalor += produto.preco * quantidade;
  }); return {totalitens, totalvalor}
};

const {totalitens, totalvalor} = resumo(); // Calcula o resumo



  return (
    <View style={style.container}>
    {/* Título e boas-vindas */}
      <Text style={style.title}>
        Mercadinho de Madureira
      </Text>
      <Text style={style.subtitle}> 
        Seja bem vindo! Nossa oferta de hoje é: 
      </Text>
      {/* Produto do Dia em destaque */}
      <View style={style.produtoDia}>
        <Text style={style.ptitle}> Produto do Dia </Text>
        <Text style={style.guaraná}> {produtoDoDia.nome} </Text>
        <Text style={style.preço}> R$ {produtoDoDia.preco.toFixed(2)} </Text>
        <Button 
                title = 'Adicionar'
                onPress={() => adicionarAoCarrinho(produtoDoDia)}
              />
      </View>
        {/* Lista de produtos normais */}
        <Text style={style.listatitle}>Lista de Produtos: </Text>
        <FlatList
          data = {produtos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={style.titleprodutos}>
              <Text style={style.produtos}>{item.nome} - R$ {item.preco.toFixed(2)} </Text>
              <Button 
                title = 'Adicionar'
                onPress={() => adicionarAoCarrinho(item)}
              />
            </View>
          )}
        />
        {/* Resumo do Carrinho */}
        <View style={style.carrinho}>
          <Text style={style.titlecarrinho}>
            Resumo!
          </Text>
          {/* Se o carrinho estiver vazio */}
          {Object.values(carrinho).length === 0 ? (
            <Text> Seu carrinho está vazio.</Text>
          ) : (
            // Se houver produtos, lista eles com botão de remover
            Object.values(carrinho).map(({produto, quantidade}) => (
              <View key={produto.id} style={style.carrinhoItem} >
              <Text key={produto.id}> {produto.nome} (x{quantidade}) - R$ {(produto.preco * quantidade).toFixed(2)}</Text>
                <TouchableOpacity onPress={() => removerCarrinho(produto.id)} style={style.botaoRemover}> <Text> Remover </Text> </TouchableOpacity>              
              </View>
            ))
          )}
            {/* Exibe totais */}
          <Text style={style.total}> quantidade de protudos: {totalitens} </Text>
          <Text style={style.total}>valor total: {totalvalor.toFixed(2)} </Text>
        </View>
    </View>
  )
};
// Produto do dia (pode mudar manualmente)
const produtoDoDia = {
  id: '2', nome: 'Guaraná', preco: 10
};

// Lista de produtos do mercadinho (array de objetos)
const produtos = [
  { id: '1', nome: 'Alface', preco: 31.67 },
  { id: '2', nome: 'Pão de forma', preco: 10},
  { id: '3', nome: 'Arroz 1kg', preco: 18.99 },
  { id: '4', nome: 'Feijão 1kg', preco: 15 },
  { id: '5', nome: 'Bolinho ana Maria', preco: 4.0 },
  { id: '6', nome: 'Sucrilhos', preco: 17.90 },  
];

// Estilos para o layout do app
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#ade8f4',
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03045e',
  },
  subtitle: {
    fontSize: 16,
  },
  produtoDia: {
    backgroundColor: '#48cae4',
    marginButton: 20,
    borderRadius: 8,
    padding: 15,
    width: 300,
  },
  ptitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guaraná: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  preço: {
    fontSize:16,
    marginBottom: 10,
  },
  listatitle:{
    fontSize: 18,
    fontWeight: 'bold',
    maginBottom: 10,
    marginTop: 3,
    color: '#0077b6',
  },
  titleprodutos:{
    fontSize: 16,
    padding: 5,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  produtos:{
    fontSize: 15,
  },
  carrinho: {
    backgroundColor: '#90e0ef',
    marginButton: 20,
    borderRadius: 8,
    padding: 15,
    width: 300,
  },
  titlecarrinho:{
    fontSize: 20,
    fontWeight:'bold',
    textAlign:'center',
  },
  total: {
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 5,
},
  carrinhoItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
    botaoRemover: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
})



