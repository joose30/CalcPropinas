import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const CalculadoraDePropina = () => {
  const [monto, setMonto] = useState('');
  const [porcentaje, setPorcentaje] = useState('10');
  const [propina, setPropina] = useState(0);
  const [total, setTotal] = useState(0);

  interface ItemDeHistorial {
    clave: string;
    monto: number;
    porcentaje: number;
    propina: number;
    total: number;
  }

  const [historial, setHistorial] = useState<ItemDeHistorial[]>([]);

  const calcularPropina = () => {
    const montoNumero = parseFloat(monto);
    if (isNaN(montoNumero) || montoNumero <= 0) {
      alert('Por favor ingresa un monto válido');
      return;
    }

    const porcentajeNumero = parseFloat(porcentaje);
    const propinaCalculada = (montoNumero * porcentajeNumero) / 100;
    const totalCalculado = montoNumero + propinaCalculada;

    setPropina(propinaCalculada);
    setTotal(totalCalculado);

    setHistorial([ 
      { clave: `${historial.length + 1}`, monto: montoNumero, porcentaje: porcentajeNumero, propina: propinaCalculada, total: totalCalculado },
      ...historial,
    ]);
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Calculadora de Propinas</Text>

      <TextInput
        style={estilos.entrada}
        placeholder="Monto de consumo"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />

      <Text style={estilos.etiqueta}>Selecciona el porcentaje de propina:</Text>

      <View style={estilos.contenedorPorcentajes}>
        {['10', '15', '20'].map((valor) => (
          <Button key={valor} title={`${valor}%`} onPress={() => setPorcentaje(valor)} color="#6C63FF" />
        ))}
      </View>

      <TextInput
        style={estilos.entrada}
        placeholder="Porcentaje personalizado"
        keyboardType="numeric"
        value={porcentaje !== '10' && porcentaje !== '15' && porcentaje !== '20' ? porcentaje : ''}
        onChangeText={setPorcentaje}
      />

      <Button title="Calcular Propina" onPress={calcularPropina} color="#FF4C4C" />

      <Text style={estilos.resultado}>Monto de la Propina: ${propina.toFixed(2)}</Text>
      <Text style={estilos.resultado}>Total a Pagar: ${total.toFixed(2)}</Text>

      <Text style={estilos.tituloHistorial}>Historial de Cálculos:</Text>
      <FlatList
        data={historial}
        renderItem={({ item }) => (
          <View style={estilos.itemHistorial}>
            <Text style={estilos.textoHistorial}>{`Consumo: $${item.monto}, Propina: $${item.propina}, Total: $${item.total}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  entrada: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  etiqueta: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  contenedorPorcentajes: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  resultado: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
    textAlign: 'center',
  },
  tituloHistorial: {
    fontSize: 22,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  itemHistorial: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textoHistorial: {
    fontSize: 16,
    color: '#555',
  },
});

export default CalculadoraDePropina;
