import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import t from 'prop-types'
import { 
    Grid,
    TableBody,
    TableCell,
    TableRow,
    Table,
    ListItemText,
    List, 
    ListItem as MaterialListItem
} from '@material-ui/core'
import { TableTitleContainer, TableTitle, TableButton, TableContainer, THead, Th } from '../../ui'
import { PIZZAS_FLAVOURS, NEW, EDIT } from '../../routes'
import { Add, Edit, Delete } from '@material-ui/icons'

function TablePizzasFlavours () {
    const newFlavourPath = useRouteMatch(`${PIZZAS_FLAVOURS}${NEW}`)

    return (
        <TableContainer>
            <TableTitleContainer>
                <TableTitle>
                    Sabores cadastrados
                </TableTitle>
            <Grid item>
                <TableButton 
                    color='primary' 
                    startIcon={<Add />}
                    component={Link}
                    to={`${PIZZAS_FLAVOURS}${NEW}`}
                    disabled={!!newFlavourPath}
                >
                    Adicionar novo sabor
                </TableButton>
            </Grid>
            </TableTitleContainer>

            <Table>
                <THead>
                    <TableRow>
                        <Th>Foto</Th>
                        <Th>Nome</Th>
                        <Th>Valores</Th>
                        <Th />
                    </TableRow>
                </THead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <img
                                src=''
                                alt=''
                                style={{
                                    background: '#fc0',
                                    display: 'block',
                                    height: '58px',
                                    width: '50px'
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            Sabor da pizza
                        </TableCell>

                        <TableCell>
                            <List>
                                <ListItem name='Broto' value={10} />
                                <ListItem name='Pequena' value={20} />
                                <ListItem name='Media' value={30} />
                            </List>
                        </TableCell>

                        <TableCell align='right'>
                            <TableButton 
                                startIcon={<Edit />}
                                component={Link}
                                to={`${PIZZAS_FLAVOURS}${EDIT(1)}`}
                            >
                                Editar
                            </TableButton>

                            <TableButton 
                                color='secondary' 
                                startIcon={<Delete />}
                                onClick={() => {}}
                            >
                                Remover
                            </TableButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const ListItem = ({name, value}) => (
    <MaterialListItem>
        <ListItemText>
            <strong>{name}</strong> R$ {value}
        </ListItemText>
    </MaterialListItem>
)

ListItem.propTypes = {
    name: t.string.isRequired,
    value: t.number.isRequired
}

export default TablePizzasFlavours