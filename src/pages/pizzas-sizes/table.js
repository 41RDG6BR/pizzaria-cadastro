import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { 
    TableContainer, 
    TableTitle, 
    THead, 
    TableTitleContainer,
    TableButton,
    Th 
} from '../../ui'
import { useCollection } from '../../hooks'
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableRow, 
    Grid
} from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'
import { singularOrPlural } from '../../utils'
import { PIZZAS_SIZES, NEW, EDIT } from '../../routes'

function TablePizzasSizes () {
    const { data: pizzasSizes, remove } = useCollection('pizzasSizes')
    const newSizePath = useRouteMatch(`${PIZZAS_SIZES}${NEW}`)

    return (
        <TableContainer>
            <TableTitleContainer>
                <TableTitle>
                    Tamanhos cadastrados
                </TableTitle>
            <Grid item>
                <TableButton 
                    color='primary' 
                    startIcon={<Add />}
                    component={Link}
                    to={`${PIZZAS_SIZES}${NEW}`}
                    disabled={!!newSizePath}
                >
                    Adicionar novo tamanho
                </TableButton>
            </Grid>
            </TableTitleContainer>

            <Table>
                <THead>
                    <TableRow>
                        <Th>Nome</Th>
                        <Th>Diametro</Th>
                        <Th>Fatias</Th>
                        <Th>Sabores</Th>
                        <Th />
                    </TableRow>
                </THead>
                <TableBody>
                    {pizzasSizes?.map(pizza => (
                        <TableRow key={pizza.id}>
                            <TableCell>{pizza.name}</TableCell>
                            <TableCell>{pizza.size} cm</TableCell>
                            <TableCell>{pizza.slices} fatias</TableCell>
                            <TableCell>{pizza.flavours} {' '}
                            {singularOrPlural(pizza.flavours, 'sabor', 'sabores')}
                            </TableCell>

                            <TableCell align='right'>
                                <TableButton 
                                    startIcon={<Edit />}
                                    component={Link}
                                    to={`${PIZZAS_SIZES}${EDIT(pizza.id)}`}
                                >
                                    Editar
                                </TableButton>

                                <TableButton 
                                 color='secondary' 
                                 startIcon={<Delete />}
                                 onClick={() => remove(pizza.id)}
                                >
                                    Remover
                                </TableButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
} 

export default TablePizzasSizes