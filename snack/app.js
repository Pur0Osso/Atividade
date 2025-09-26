import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  // Estado para armazenar o carrinho. Ex: { '1': { produto: {}, quantidade: 2 } }
  const [carrinho, setCarrinho] = useState({});
  // Função para adicionar produto ao carrinho
const adicionarAoCarrinho = (produto) => {
  setCarrinho((prev) => {
    const atual = { ...prev }; // Copia o carrinho anterior
    
    // Verifica se é o produto do dia
    const isProdutoDoDia = produto.id === produtoDoDia.id;

    const produtoComPreco = {
      ...produto,
      preco: isProdutoDoDia ? produto.desconto : produto.preco, // Define o preço baseado no produto do dia
    };

    if (atual[produto.id]) {
      atual[produto.id].quantidade += 1; // Incrementa a quantidade
    } else {
      atual[produto.id] = { produto: produtoComPreco, quantidade: 1 }; // Adiciona o produto ao carrinho
    }

    return atual;
  });
};
  // Função para remover 1 unidade de um produto do carrinho
  const removerCarrinho = (produtoId) => {
    setCarrinho((prev) => {
      const atual = { ...prev }; // Copia o carrinho atual

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
    Object.values(carrinho).forEach(({ produto, quantidade }) => {
      totalitens += quantidade;
      totalvalor += produto.preco * quantidade;
    });
    return { totalitens, totalvalor };
  };

  const { totalitens, totalvalor } = resumo(); // Calcula o resumo

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
        <View style={style.container}>
          {/* Título e boas-vindas */}
            <Text style={style.title}>Mercadinho de Madureira</Text>
            <Text style={style.subtitle}>
            Seja bem vindo! Nossa oferta de hoje é:
            </Text>
            {/* Produto do Dia em destaque */}
            <View style={style.produtoDia}>
            <Text style={style.ptitle}> Produto do Dia </Text>
            <Text style={style.guaraná}> {produtoDoDia.nome} </Text>
            <Text style={style.preço}>
              R$ {produtoDoDia.desconto.toFixed(2)}
            </Text>
          <TouchableOpacity
            key={produtoDoDia.id}
            style={style.botaoadicionar}
            onPress={() => adicionarAoCarrinho(produtoDoDia)}>
            <Text style={style.title}>adicionar</Text>
          </TouchableOpacity>
        </View>
          {/* Lista de produtos normais */}
          <Text style={style.listatitle}>Lista de Produtos: </Text>
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={style.titleprodutos}>
            <Image
              style={style.produtoImg}
              source={
              item.foto && item.foto.trim() !== ''
                ? { uri: item.foto }
                : {
                  uri: 'https://t3.ftcdn.net/jpg/10/34/39/40/360_F_1034394041_F0TwFmDeWtjn3XXtrNjeBB7SYYfvJz6n.jpg',
                      }
                }
              />
              <Text style={style.produtos}>
                {item.nome} - R$ {item.preco.toFixed(2)}
              </Text>
            <TouchableOpacity
            style={style.botaoadicionar}
            onPress={() => adicionarAoCarrinho(item)}
            >
            <Text style={style.botaoTittle}>adicionar</Text>
            </TouchableOpacity>
          </View>
          )}
          />

          {/* Resumo do Carrinho */}
          <View style={style.carrinho}>
            <Text style={style.titlecarrinho}>Resumo!</Text>
            {/* Se o carrinho estiver vazio */}
            {Object.values(carrinho).length === 0 ? (
              <Text> Seu carrinho está vazio.</Text>
            ) : (
              // Se houver produtos, lista eles com botão de remover. Se o produto tiver desconto, mostra o desconto ao invés da quantidade
              Object.values(carrinho).map(({ produto, quantidade}) => (
                <View key={produto.id} style={style.carrinhoItem}>
                  <Text key={produto.id}>
                    {produto.nome} (x{quantidade}) - R$
                    {(produto.preco * quantidade).toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removerCarrinho(produto.id)}
                    style={style.botaoRemover}>
                    
                    <Text> X </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
            {/* Exibe totais */}
            <Text style={style.total}>
              quantidade de protudos: {totalitens}
            </Text>
            <Text style={style.total}>
              valor total: {totalvalor.toFixed(2)}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Lista de produtos do mercadinho (array de objetos)
const produtos = [
  { id: '1', 
  nome: 'Guaraná', 
  preco: 10,
  foto: 'https://images.tcdn.com.br/img/img_prod/1086086/180_refrigerante_guarana_antarctica_lata_350ml_365_1_9564261f1096642556780e150602b4ad.jpg',
  desconto: 5,
  },
  { id: '2', 
  nome: 'Alface', 
  preco: 31.67,
  foto: 'https://i0.wp.com/safraviva.com.br/wp-content/uploads/alface-repolhuda-lisa-2.jpg?resize=768%2C768&ssl=1',
  desconto: 15.83,
  },
  { id: '3', 
  nome: 'Pão de forma', 
  preco: 10,
  foto: 'https://www.diaspanificacao.com.br/wp-content/uploads/2017/10/foto_produto_03.jpg',
  desconto: 5,
  },
  { id: '4', 
  nome: 'Arroz 1kg', 
  preco: 18.99,
  foto: 'https://tse1.mm.bing.net/th/id/OIP.HwB4POYXsxPCQQ4sbeV0JAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
  desconto: 9.99,
  },
  { id: '5', 
  nome: 'Feijão 1kg', 
  preco: 15,
  foto: 'https://bompreco.vtexassets.com/arquivos/ids/156960/FeijaoPretoTipo1Kicaldo1Kg.jpg?v=637460781401600000',
  desconto: 7.5,
  },
  { id: '6', 
  nome: 'Bolinho ana Maria', 
  preco: 4.0,
  foto: 'https://www.bolinhosanamaria.com.br/wp-content/themes/ana-maria/images/bolinhos/bolinhos-2_033_new.png',
  desconto: 2.0,
  },
  { id: '7', 
  nome: 'Sucrilhos', 
  preco: 17.9,
  foto: 'https://tse2.mm.bing.net/th/id/OIP.PIXR8LOcdhN-hpkZJVTMnQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
  desconto: 8.9,
  },
];

//Escolhe o produto do dia aleatoriamente
const randomIndex = Math.floor(Math.random() * produtos.length);
const produtoDoDia = produtos[randomIndex];

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
  marginBottom: 20, 
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
    fontSize: 16,
    marginBottom: 10,
  },
  
  listatitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  marginTop: 3,
  color: '#0077b6',
  },
  titleprodutos: {
    fontSize: 16,
    padding: 5,
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  produtos: {
    fontSize: 15,
  },
  produtoImg: {
    height: 130,
    width: 120,
    borderRadius: 10,
  },
  carrinho: {
  backgroundColor: '#90e0ef',
  marginBottom: 20, 
  borderRadius: 8,
  padding: 15,
  width: 300,
  },
  titlecarrinho: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
  botaoadicionar: {
    backgroundColor: '#00b4d8',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  botaoTittle: {
  fontSize: 14,
  fontWeight: 'normal',
  color: '#fff', 
  textAlign: 'center',
},
});
