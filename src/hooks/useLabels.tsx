import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { Label } from "../issues/interfaces/label";
import { sleep } from "../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Label[]>('/labels');
    return data;
}

export const useLabels = () => {
    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            // staleTime: 1000 * 60 * 60,
            // Fecha inicial y si se usa el cache con el STALE TIME,
            // se considera Initial data como FRESH y no refresca ni trae la informacion
            // de la base de datos.
            initialData: [],
            // Mientras se obtiene la informacion mostrar el placeholder data
            placeholderData: [
                {
                    "id": 725156255,
                    "node_id": "MDU6TGFiZWw3MjUxNTYyNTU=",
                    "url": "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                    "name": "good first issue (taken)",
                    "color": "b60205",
                    "default": false,
                    "description": ''
                }


            ]
        }
    );

    return labelsQuery;
}
