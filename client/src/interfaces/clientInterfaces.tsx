interface Ad {
  id: number;
  imgurl: string;
  title: string;
}

interface AdsProps {
  ads: Ad[];
  loading: boolean;
}

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

export type { Ad, AdsProps, PaginationProps };
