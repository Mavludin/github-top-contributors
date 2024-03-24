type HeaderProps = Readonly<{
    region: string
}>

export const Header = ({
  region,
}: HeaderProps) => {
  return (
    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
      Region: {region}
    </h1>
  );
}
