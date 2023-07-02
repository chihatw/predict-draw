import Card from './Card';

const CardList = ({
  list,
  columns,
  selectedList,
}: {
  list: string[];
  columns: number;
  selectedList: string[];
}) => {
  return (
    <div
      style={{
        display: 'grid',
        columnGap: 8,
        rowGap: 8,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {list.map((color) => (
        <Card
          key={color}
          cardId={color}
          isActive={selectedList.includes(color)}
        />
      ))}
    </div>
  );
};

export default CardList;
