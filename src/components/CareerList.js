import { SelectBox } from 'devextreme-react/select-box'
import TreeList, {
  Button,
  Column,
  Editing,
  HeaderFilter,
} from 'devextreme-react/tree-list'
import React, { useEffect, useState } from 'react'
import { CareerApi } from '../api/career-api'
import './CareerList.css'

export default function CareerList() {
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  const onAddItem = (event) => {
    console.log('onAddItem', event)
  }

  const onSelectCareerValueChanged = (e) => {
    if (e.value !== e.previousValue) {
      setSelectedCareer(e.value)
      e.component.close()
    }
  }

  const getFilteredItems = () => {
    const getChildren = (itemId, parent) => {
      const item = items.find((i) => i._id == itemId)
      if (!item) return []

      let result = [{ ...item, parent: parent ? parent : '0' }]

      item.children.map((childId) => {
        const t = items.find((i) => i._id == childId)
        if (t) result.push(...getChildren(t._id, item._id))
      })

      return result
    }

    return selectedCareer ? getChildren(selectedCareer, null) : []
  }

  useEffect(() => {
    CareerApi.fetchAllCareers()
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result)
          setSelectedCareer(result[0]._id)
          setIsLoaded(true)
        },

        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const filteredItems = getFilteredItems()
  const allIds = filteredItems.map((i) => i._id)

  return (
    <div className="container">
      <h2>Career List</h2>
      <SelectBox
        className="career-select-box"
        dataSource={items}
        displayExpr={'title'}
        valueExpr={'_id'}
        searchEnabled={true}
        searchMode={'contains'}
        searchExpr={'title'}
        showDataBeforeSearch={true}
        defaultValue={items[0]._id}
        onValueChanged={onSelectCareerValueChanged}
      />

      <TreeList
        dataSource={filteredItems}
        showBorders={false}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        keyExpr="_id"
        parentIdExpr="parent"
        onRowInserting={onAddItem}
        autoExpandAll={true}
        expandedRowKeys={allIds}
      >
        <HeaderFilter visible={true} />
        <Column dataField="title" />
        <Column dataField="description" />
        <Column dataField="url" />
        <Column type="buttons">
          <Button name="edit" />
          <Button name="delete" />
        </Column>
        <Editing
          mode="popup"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
      </TreeList>
    </div>
  )
}
