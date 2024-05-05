export class CreatePageDto {
  title: string;
  slug: string;
  metaTagList: { property: string; content: string }[];
  uiJson: Record<string, any>;
}
