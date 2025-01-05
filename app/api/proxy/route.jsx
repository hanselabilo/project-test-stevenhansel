export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pageNumber = url.searchParams.get('page[number]') || 1;
    const pageSize = url.searchParams.get('page[size]') || 10;
    const append = url.searchParams.getAll('append[]') || [];
    const sort = url.searchParams.get('sort') || 'published_at';

    const apiUrl = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=${append.join('&append[]=')}&sort=${sort}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
