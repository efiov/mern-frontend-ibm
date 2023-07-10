import Input from '../atoms/Input'
import Button from '../atoms/Button'

const SearchBar = () => {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      <Input />
      <Button label="Press me" />
    </div>
  )
}

export default SearchBar
