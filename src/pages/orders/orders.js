import React, { useMemo } from 'react'
import { 
    Fab,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Typography
 } from '@material-ui/core'
 import { Check, DonutLarge, Motorcycle } from '@material-ui/icons'
 import { TableContainer, TableTitle, THead, Th } from '../../ui' 
 import { singularOrPlural } from '../../utils'

 import { useOrders } from '../../hooks'

const Orders = () => {
    const { orders, status, updateOrder } = useOrders()
    console.log('orders', orders)

    const allOrderStatus = useMemo(()=> {
        return [
            {
                title: 'Pedidos pendentes',
                type: status.pending,
                nextAction: status.inProgress,
                nextButtonTitle: 'Em produção',
                icon: DonutLarge
            },
            {
                title: 'Pedidos em produção',
                type: status.inProgress,
                nextAction: status.outForDelivery,
                nextButtonTitle: 'Saiu para entrega',
                icon: Motorcycle
            },
            {
                title: 'Saiu para entrega',
                type: status.outForDelivery,
                nextAction: status.delivered,
                nextButtonTitle: 'Entregue',
                icon: Check
            },
            {
                title: 'Pedidos finalizados',
                type: status.delivered
            }
        ]
    }, [status])

    function getHour (date) {
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        }
        return Intl.DateTimeFormat('pt-BR', options).format(date);
    }

    return allOrderStatus.map(orderStatus => (
        <TableContainer key={orderStatus.title}>
            <>
            <TableTitle>
                {orderStatus.title}
            </TableTitle>
            <Table>
                <THead>
                    <TableRow>
                        <Th>
                            <Typography>
                            Informações do pedido
                            </Typography>
                        </Th>
                        {orderStatus.nextAction && (                            
                            <Th>
                                <Typography align='center'>
                                    Mudar status
                                </Typography>
                            </Th>
                        )}
                    </TableRow>
                </THead>    

                <TableBody>
                    {orders?.[orderStatus.type].length ===  0 && (
                        <TableRow>
                            <TableCell>
                                <Typography>
                                    Nenhum pedido com esse status
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    {orders?.[orderStatus.type].map(order => {
                        const {
                            address,
                            number,
                            complement,
                            district,
                            code: cep,
                            city, 
                            state
                        } = order.address

                        return (                            
                            <TableRow key={order.id}>
                                <TableCell>
                                    <div>
                                        <Typography variant='button'>
                                            Horário do pedido: {getHour(order.createdAt.toDate())}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                            Pedido:
                                        </Typography>
                                        <ul>
                                            {order.pizzas.map((pizza, index) => (
                                                <li key={index}>
                                                    <Typography variant='button'>
                                                        {pizza.quantity} {' '}
                                                        {singularOrPlural(pizza.quantity, 
                                                            'pizza', 
                                                            'pizzas'
                                                        )}{' '}
                                                        {pizza.size.name.toUpperCase()} de {' '}
                                                        {pizza.flavours
                                                            .map(flavour => flavour.name.name)
                                                            .reduce((acc, flavour, index, array) => {
                                                                if(index === 0) {
                                                                    return flavour
                                                                }
                                                                if(index === array.length -1) {
                                                                    return `${acc} e ${flavour}`
                                                                }
                                                                return `${acc}, ${flavour}`
                                                        }, '')}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <Typography variant='button'>
                                            Endereço do pedido
                                        </Typography>

                                        <Typography>
                                            {address}, {number && `${number}`} {' '}
                                            {complement && `, ${complement}`} <br />
                                            Bairro: {district} - CEP: {cep} <br />
                                            {city} / {state}
                                        </Typography>
                                    </div>
                                </TableCell>
                                {orderStatus.nextAction && (
                                    <TableCell align='center'>
                                        <Fab
                                            color='primary'
                                            title={`Mudar status para "${orderStatus.nextButtonTitle}"`}
                                            onClick={() => updateOrder({
                                                orderId: order.id,
                                                status: orderStatus.nextAction
                                            })}
                                        >
                                            <orderStatus.icon />
                                        </Fab>
                                    </TableCell>   
                                )}                          
                            </TableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
            </>
        </TableContainer>
    ))}

export default Orders