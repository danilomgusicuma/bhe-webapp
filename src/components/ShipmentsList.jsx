import React, { useEffect, useState } from 'react'
import {
  Card,
  Text,
  CardBody,
  Box,
  TextInput,
  Button,
  Layer,
  Form,
  FormField,
  RadioButtonGroup,
  DateInput,
  Select,
  Heading
} from 'grommet'
import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment-timezone';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import api from '../service/api';

const ShipmentsList = () => {

  const [costQueue, setCostQueue] = useState([])
  const [berthList, setBerthList] = useState([])
  const [update, setUpdate] = useState(false)
  const [priorization, setPriorization] = useState()


  async function getCostQueue(){
    await api.get('/cost-queue')
    .then((response)=>{
      console.log('cost-queue:', response)
      const { data } = response
      setCostQueue(data.entries)
    })
  }

  async function getBerths(){
    await api.get('/berths')
    .then((response)=>{
      console.log('berths', response)
      const { data } = response
      setBerthList(data.entries)
    })
  }

  async function prioritaze(){
    await api.post('/prioritize')
    .then((response)=>{
      const {data} = response
      const costQueueCopy = costQueue
      data.forEach(berth => berth.ships.forEach(ship => costQueueCopy.find(shipment => shipment.id === ship.entry_id).berth = berth.berth_id))
      console.log('priorization', costQueueCopy)
      setCostQueue(costQueueCopy)
    })
  }

  useEffect(()=>{
    getCostQueue()
    getBerths()
  },[update])

  const [shipmentValue, setShipmentValue] = useState('')
  const [showShipmentCreation, setShowShipmentCreation] = useState(false)
  const [selectedBerth, setSelectedBerth] = useState('')

  const onDragEnd = (result) => {
    const items = Array.from(costQueue)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setCostQueue(items)
  }

  function selectBerth(option){
    if (option === "Limpar filtro"){
      console.log('alo', selectedBerth)

      setSelectedBerth(()=>'')
    }
    else{
      setSelectedBerth(option)
    }
  }

  return(
    <>
      <Box
        width="100%"
      >
        <Box
          direction="row"
          pad="medium"
          justify="between"
          width="flex"
        >
          <Box
            width="medium"
            margin={{right:"small"}}
          >
            <TextInput
              icon = {<i class="fas fa-search"></i>}
              placeholder="Buscar Embarcação"
              value={shipmentValue}
              onChange={event => setShipmentValue(event.target.value)}
            />
          </Box>
          <Box
            direction="row"
            height="42.16px"
          >
            <Select
              clear={true}
              placeholder="Berço"
              options={["Limpar filtro",...berthList.map((berth)=>berth.name)]}
              value={selectedBerth}
              onChange={({ option }) => selectBerth(option)}
              margin={{right:'small'}}
            />
            <Button
              onClick={()=>setShowShipmentCreation(true)}
              margin={{right:'small'}}
              background="brand"
              label="Nova Embarcação"          
            />
            <Button
              primary
              margin={{right:'small'}}
              label="Alocar"   
              onClick={()=>prioritaze()}       
            />
          </Box>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`ShipmentsList`}>
            {provided => (
              <Box
                style={{display:'block', overflow:'scroll'}}
                justifyContent = "center"
                alignContent = "start"
                gap="small"
                pad="medium"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {costQueue
                  .filter((shipment) =>  selectedBerth.includes(shipment.berth) || selectedBerth === '')
                  .filter((shipment) => shipment.ship_details.ship_name.includes(shipmentValue) || shipmentValue === '')
                  .map((shipment, index) => <Draggable key={shipment.id} draggableId={`${shipment.id}`} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        height="xsmall"
                        width="flex"
                        background="light-1"
                        elevation="small"
                      >
                        <CardBody
                          direction='row'
                          pad="medium"
                        >
                          <Box direction="row" width="100%" alignContent="center">
                            <Box>
                              <Heading level={4} margin="none">{`${shipment.ship_details.ship_name}`}</Heading>
                              <Text size="small">{moment(shipment.ship_details.estimated_mooring).format('l')}</Text>
                            </Box>
                            {shipment.berth && <Box round="4px" margin={{left:"auto"}} pad="medium" alignContent="center" justify="center" background="brand">
                              <Heading  level={4} margin="none">{`Berço ${shipment.berth}`}</Heading>
                            </Box>}
                          </Box>
                        </CardBody>
                      </Card>
                    )}
                  </Draggable>)}
                  {provided.placeholder}
              </Box>
              )}
          </Droppable>
        </DragDropContext>
      </Box>
      {showShipmentCreation && <Layer
        onEsc={() => setShowShipmentCreation(false)}
        onClickOutside={() => setShowShipmentCreation(false)}
      >
        <Box
          width="xlarge"
          height="large"
          margin="medium"
          pad="medium"
        >
          <CardBody
            overflow={{vertical:'scroll'}}
          >
            <CreateShipmentForm setShowShipmentCreation={setShowShipmentCreation} setUpdate={setUpdate}/>
          </CardBody>
        </Box>
      </Layer>}
    </>
  )
}

const CreateShipmentForm = ({setShowShipmentCreation, setUpdate}) => {
  const [formValue, setFormValue] = useState({})

  async function createShipment(values){
    const withNumbers = {
      ...values,
      ship_length_in_meters: Number(values.ship_length_in_meters),
      ship_capacity_in_teu: Number(values.ship_capacity_in_teu),
      draft_size_in_meters: Number(values.draft_size_in_meters),
      cargo_weight: Number(values.cargo_weight),
      needs_fiscalization: values.needs_fiscalization === "sim",
      is_cargo_dangerous: values.is_cargo_dangerous === "sim",
      is_cargo_important: values.is_cargo_important === "sim",
      has_living_animals: values.has_living_animals === "sim",
      is_off_shore: values.is_off_shore === "sim",

    }
    console.log(withNumbers)
    api.post('/cost-queue', withNumbers)
    .then(()=>{
      setShowShipmentCreation(false)
      setUpdate(prev=>!prev)
    })
  }

  return (
    <Form
      value={formValue}
      onChange={nextValue => setFormValue(nextValue)}
      onReset={() => setFormValue({})}
      onSubmit={({ value }) => {createShipment(value)}}
    >
      <FormField name="code" htmlfor="code-input" label="Código">
        <TextInput id="code-input" name="code" />
      </FormField>
      <FormField name="ship_name" htmlfor="text-input-id" label="Nome da embarcação">
        <TextInput id="text-input-id" name="ship_name" />
      </FormField>
      <FormField name="ship_type" htmlfor="ship_type-id" label="Tipo da embarcação">
        <Select
          id="ship_type-id"
          name="ship_type"
          options={["BulkCarrier", "Other"]}
        />
      </FormField>
      <FormField name="ship_purpose" htmlfor="purpose-input" label="Objetivo">
        <Select
          id="purpose-input"
          name="ship_purpose"
          options={[ "Dredging", "PortSupport", "Fishing", "MaritimeSupport", "Research", "TransportBulkLiquidAndGeneral", "GeneralTransport", "TubeRelease", "TransportBulkSolidAndGeneral", "CableRelease", "TransportBulkSolid", "TransportBulkLiquid", "Pleasure", "ContainerAndGeneral", "Recreation", "ContainerTransport", "VehicleTransport", "PassengerTransport", "Other" ]}
        />
      </FormField>
      <FormField name="ship_length_in_meters" htmlfor="size-input" label="Comprimento (m)">
        <TextInput type="number" id="text-input-id" name="ship_length_in_meters" />
      </FormField>
      <FormField name="ship_capacity_in_teu" htmlfor="capacity-input" label="Capacidade (teus)">
        <TextInput type="number" id="capacity-input" name="ship_capacity_in_teu" />
      </FormField>
      <FormField name="draft_size_in_meters" htmlfor="draft-input" label="Calagem (m)">
        <TextInput type="number" id="draft-input" name="draft_size_in_meters" />
      </FormField>
      <FormField name="cargo_weight" htmlfor="cargo_weight-input" label="Peso da Carga (kg)">
        <TextInput type="number" id="cargo_weight-input" name="cargo_weight" />
      </FormField>
      <FormField name="cargo_type" htmlfor="cargo_type-input" label="Tipo da Carga">
        <Select
          id="cargo_type-input"
          name="cargo_type"
          options={[ "Bulk", "General" ]}
        />
      </FormField>
      <FormField name="estimated_mooring" htmlfor="estimated_mooring-input" label="Data de atracação estimada">
        <DateInput
          id="estimated_mooring-input"
          format="mm/dd/yyyy"
          name="estimated_mooring"
          defaultValue=""
        />
      </FormField>
      <FormField name="estimated_unmooring" htmlfor="estimated_unmooring-input" label="Data de desatracação">
        <DateInput
          id="estimated_unmooring-input"
          format="mm/dd/yyyy"
          name="estimated_unmooring"
          defaultValue=""
        />
      </FormField>
      <FormField name="time_of_arrival_in_port" htmlfor="time_of_arrival_in_port-input" label="Chegada ao Porto">
        <DateInput
          id="time_of_arrival_in_port-input"
          format="mm/dd/yyyy"
          name="time_of_arrival_in_port"
          defaultValue=""
        />
      </FormField>
      <FormField name="cargo_validity_date" htmlfor="validity-input" label="Validade da Carga">
        <DateInput
          id="validity-input"
          name="cargo_validity_date"
          format="mm/dd/yyyy"
          onChange={({ value }) => {}}
          defaultValue=""
        />
      </FormField>
      <FormField name="is_off_shore" htmlfor="offshore-input" label="É offshore?">
        <RadioButtonGroup
          id="offshore-input"
          name="is_off_shore"
          options={['sim', 'não']}
        />
      </FormField>
      <FormField name="needs_fiscalization" htmlfor="fiscalization-input" label="Requer fiscalização?">
        <RadioButtonGroup
          id="fiscalization-input"
          name="needs_fiscalization"
          options={['sim', 'não']}
        />
      </FormField>
      <FormField name="is_cargo_important" htmlfor="important-input" label="Possui carga importante?">
        <RadioButtonGroup
          id="important-input"
          name="is_cargo_important"
          options={['sim', 'não']}
        />
      </FormField>
      <FormField name="has_living_animals" htmlfor="living-input" label="Possui animais vivos?">
        <RadioButtonGroup
          id="living-input"
          name="has_living_animals"
          options={['sim', 'não']}
        />
      </FormField>
      <Box direction="row" gap="medium">
        <Button margin={{left:'auto'}} type="submit" primary label="Adicionar embarcação" />
      </Box>
    </Form>
  )
}

export default ShipmentsList