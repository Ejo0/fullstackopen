const Filter = ({nameFilter, handler}) => (
    <div>
      filter shown with <input value={nameFilter} onChange={handler}/>
    </div>
  )

export default Filter
