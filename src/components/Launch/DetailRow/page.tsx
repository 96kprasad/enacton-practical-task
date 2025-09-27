import { DetailRowProps } from '@/types/spacex';

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div>
      <span className="text-gray-600">{label}: </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}